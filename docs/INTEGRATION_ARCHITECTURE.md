# KisanSaathi — Integration Architecture Specification

**Product:** KisanSaathi — Multilingual Farmer Mobile Application  
**Architect:** Senior Full-Stack & React Native Architect  
**Version:** 1.0 (Phase 1 Deliverable)  

---

## 1. Architectural Overview

The KisanSaathi architecture connects an accessible, responsive mobile frontend to existing domain services, backend REST APIs, and external agricultural intelligence engines. 

```mermaid
flowchart TB
    subgraph ClientLayer ["Mobile Client (React Native / Expo + Prototype)"]
        UI["KisanSaathi UI Layer\n(Dashboard, My Farm, GIS Map, Weather, Pest Scan, Sugarcane)"]
        I18N["i18n Localization Engine\n(English, Hindi, Marathi)"]
        OfflineStore["Offline Cache\n(SQLite / LocalStorage)"]
        SyncMgr["Sync Engine & Queue Manager"]
    end

    subgraph BackendLayer ["Existing Ktor 2.3 Backend (JVM Port 8080)"]
        KtorServer["Ktor REST API Server (Netty)"]
        AuthRoute["JWT Auth & Security Handler\n(/api/auth)"]
        FarmRoute["Farms & GIS Fields Service\n(/api/farms, /api/fields)"]
        CropRoute["Crops & Lifecycle Service\n(/api/crops)"]
        ActivityRoute["Activities & Telemetry Service\n(/api/activities)"]
        SyncRoute["Bidirectional Sync Service\n(/api/sync)"]
        DB[(PostgreSQL / SQLite Storage\nExposed ORM)]
    end

    subgraph ExternalServices ["External Agro-Services"]
        WeatherAPI["Agro-Weather Service\n(Open-Meteo / IMD)"]
        PestAI["Plant Health & Pest Diagnostic Engine\n(Image Analysis)"]
        AgroRules["Sugarcane & Crop Advisory Rulebase"]
    end

    UI --> I18N
    UI --> SyncMgr
    SyncMgr --> OfflineStore
    SyncMgr -->|HTTP/REST with JWT| KtorServer

    KtorServer --> AuthRoute
    KtorServer --> FarmRoute
    KtorServer --> CropRoute
    KtorServer --> ActivityRoute
    KtorServer --> SyncRoute

    AuthRoute --> DB
    FarmRoute --> DB
    CropRoute --> DB
    ActivityRoute --> DB
    SyncRoute --> DB

    UI -->|Geo Coordinates| WeatherAPI
    UI -->|Leaf Photo Upload| PestAI
    UI -->|Growth Stage Queries| AgroRules
```

---

## 2. Existing Backend Inspection & Endpoint Inventory

The backend located in `C:\Sam's Work\Kotlin-Farmer App\backend` is an existing, operational Ktor service written in Kotlin with Exposed ORM.

### 2.1 Discovered REST API Endpoints

| Method | Endpoint | Description | Auth Required | Request Payload | Response Schema |
|---|---|---|---|---|---|
| `POST` | `/api/auth/login` | Authenticates farmer by phone/email and password | No | `LoginRequest(username, password)` | `ApiResponse<AuthResponse>` (JWT token, user & farmer profile) |
| `POST` | `/api/auth/register` | Registers new farmer profile | No | `RegisterRequest(fullName, phoneNumber, email, password, village, taluka, district, state)` | `ApiResponse<AuthResponse>` |
| `POST` | `/api/auth/logout` | Invalidates farmer session | Yes (JWT) | None | `ApiResponse<Unit>` |
| `GET` | `/api/farmers/me` | Fetches active farmer profile details | Yes (JWT) | None | `ApiResponse<FarmerDto>` |
| `GET` | `/api/farms` | Returns all farms owned by the farmer | Yes (JWT) | None | `ApiResponse<List<FarmDto>>` |
| `GET` | `/api/farms/{id}` | Returns single farm with soil and geo specs | Yes (JWT) | None | `ApiResponse<FarmDto>` |
| `GET` | `/api/fields` | Returns all field plots with GPS boundary polygons | Yes (JWT) | None | `ApiResponse<List<FieldDto>>` |
| `GET` | `/api/crops` | Returns active crop cycles and growth statuses | Yes (JWT) | None | `ApiResponse<List<CropDto>>` |
| `GET` | `/api/activities` | Returns logged agronomy tasks (irrigation, spray, etc.) | Yes (JWT) | None | `ApiResponse<List<ActivityDto>>` |
| `GET` | `/api/sync/status` | Heartbeat & backend sync readiness probe | No | None | `Map<String, String>` (`status: healthy`) |
| `POST` | `/api/sync` | Batch synchronization endpoint for offline edits | Yes (JWT) | `SyncBatchRequest(items: List<SyncItem>)` | `ApiResponse<SyncBatchResponse>` |

### 2.2 Domain Entities & Schema Definition

```mermaid
erDiagram
    USERS ||--|| FARMERS : "has profile"
    FARMERS ||--o{ FARMS : "owns"
    FARMS ||--o{ FIELDS : "contains"
    FIELDS ||--o{ CROPS : "grows"
    FIELDS ||--o{ FARM_ACTIVITIES : "logs"

    USERS {
        string id PK
        string phoneNumber UK
        string email
        string passwordHash
        string role "FARMER / ADMIN"
    }

    FARMERS {
        string id PK
        string userId FK
        string farmerCode UK
        string fullName
        string phoneNumber
        string village
        string taluka
        string district
        string state
    }

    FARMS {
        string id PK
        string farmerId FK
        string farmName
        double totalArea
        string areaUnit "Acres / Guntha"
        string soilType
        double latitude
        double longitude
    }

    FIELDS {
        string id PK
        string farmId FK
        string fieldName
        double area
        string boundaryCoordinates "JSON Polygon"
        string soilType
    }

    CROPS {
        string id PK
        string fieldId FK
        string cropName
        string variety
        string season "Kharif / Rabi / Adsali"
        string sowingDate
        string expectedHarvestDate
        string status "PLANNED / SOWN / GROWING / READY_FOR_HARVEST"
    }

    FARM_ACTIVITIES {
        string id PK
        string fieldId FK
        string activityType "IRRIGATION / PESTICIDE / FERTILIZATION"
        string description
        string activityDate
        string notes
    }
```

---

## 3. Integration Strategy for the 5 Modules

### Module 1: Weather & Weather-Based Advisory
- **Data Source**: Integrated with Open-Meteo Agro API (no private key needed) using the farmer's coordinates (default: Baramati/Pune `18.1523° N, 74.5768° E`).
- **Telemetry Calculated**:
  - Temperature (°C), Humidity (%), Wind Speed (km/h), Precipitation probability (%), Pressure (hPa).
  - Daily UV Index and Astronomical cycle (Sunrise & Sunset timestamps).
- **Rule-Based Agro Advisories**:
  - *Spray Window Advisory*: If wind speed < 15 km/h, humidity between 50-80%, and rain probability < 20% -> *"Optimal day for pesticide and foliar fertilizer application."*
  - *Irrigation Advisory*: If forecasted rainfall > 15mm in next 24h -> *"Hold scheduled irrigation to prevent waterlogging and nutrient leaching."*

### Module 2: Pest & Disease Detection & Prevention
- **User Flow**: Farmers select the crop (Tomato, Sugarcane, Wheat, Onion, Cotton), capture/upload a photo of the affected leaf/stem, and receive a diagnosis.
- **Diagnostic Output**:
  - Disease Name (in EN, HI, MR).
  - Confidence Score (e.g., 94%).
  - Severity Level (Low, Medium, Critical).
  - Primary Symptoms.
  - Organic Remedy (e.g., Neem oil extract 5ml/L, Trichoderma viride).
  - Chemical Remedy (e.g., Mancozeb 75% WP @ 2.5g/L, Chlorpyrifos).
  - Prevention Checklist.
- **Disclaimer**: Clear note displayed that diagnostic results in the prototype are simulated for advisory purposes.

### Module 3: Sugarcane Cultivation & Guidance
- **Variety Target**: **Co-86032 (Nira)** and **Co-0238**, the dominant commercial cultivars in Maharashtra, Karnataka, and Uttar Pradesh.
- **Lifecycle Stages**:
  1. *Germination Phase (Days 1–35)*: Soil moisture maintenance, sett treatment with carbendazim.
  2. *Tillering Phase (Days 36–100)*: Nitrogen top-dressing, earthing up, weed control.
  3. *Grand Growth Phase (Days 101–270)*: Heavy irrigation demand, potash application, stem borer monitoring.
  4. *Ripening & Maturity Phase (Days 271–360)*: Gradual irrigation withdrawal, Brix testing (>18% Brix), trash mulching.
- **Calculators Included**:
  - Sett rate calculator per Acre.
  - Fertilizer dose calculator (N:P:K 250:115:115 kg/ha).
  - Drip irrigation schedule based on soil type.

### Module 4: GIS Farm & Field Boundary Mapping
- **Integration**: Leverages the field polygons seeded in `FarmerDatabaseWrapper.kt`:
  - Field 1: North Canal Block (4.0 Acres)
  - Field 2: Well Plot (5.0 Acres)
  - Field 3: Roadside Plot (3.5 Acres)
- **Visual Presentation**:
  - Interactive canvas/SVG map rendering the farm layout.
  - Color-coded boundary outlines representing crop types and moisture status.
  - Plot inspection modal showing crop stage, soil type, and GPS vertex coordinates.

### Module 5: Agronomy Telemetry, Activities & Offline Sync
- **Integration**: Reuses the `/api/activities` and `/api/sync` endpoints of the Ktor server.
- **Offline Sync Queue**:
  - Client logs activities offline into local storage.
  - Sync status indicator: Green (`Synced`), Amber (`Pending - 3 changes`), Blue (`Syncing`).
  - Auto-synchronization on network reconnect with idempotency keys.

---

## 4. Network Topology & Emulator Architecture

Running mobile applications against local backends on Windows requires explicit IP configuration:

| Client Environment | Backend Address | Explanation |
|---|---|---|
| **Web Browser (HTML Prototype)** | `http://localhost:8080` | Direct same-machine loopback |
| **Android Emulator (AVD)** | `http://10.0.2.2:8080` | `10.0.2.2` is the special Android loopback alias routing to the Windows host's `localhost` |
| **Physical Phone (Expo Go / APK)** | `http://<WIFI_LAN_IP>:8080` | Requires both phone and PC to be on the same local Wi-Fi subnet; Windows Defender firewall port 8080 must be open |

---

## 5. Security & Authentication Flow

```mermaid
sequenceDiagram
    autonumber
    actor Farmer as Farmer
    participant App as KisanSaathi Mobile App
    participant Storage as SecureStore / LocalStorage
    participant API as Ktor Backend (/api)

    Farmer->>App: Enter Mobile (9822012345) & Password
    App->>API: POST /api/auth/login {username, password}
    API->>API: Verify BCrypt hash against UsersTable
    API-->>App: 200 OK {token: JWT, user: UserDto, farmer: FarmerDto}
    App->>Storage: Persist JWT Token & Farmer Session
    App->>API: GET /api/farms (Header: Bearer <JWT>)
    API-->>App: 200 OK [FarmDto list]
    App->>Farmer: Display Personalized Farmer Dashboard
```

1. **Token Persistence**: JWT stored securely (Expo `SecureStore` in mobile, `localStorage` in prototype).
2. **Session Expiry**: Interceptor catches `401 Unauthorized` and cleanly navigates the farmer back to the login screen with a friendly message.
3. **Data Isolation**: All backend SQL queries enforce `where farmerId = :farmerId` extracted from the verified JWT claims.
