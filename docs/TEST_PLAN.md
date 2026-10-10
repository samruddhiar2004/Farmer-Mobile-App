# KisanSaathi — Comprehensive Quality Assurance & Test Plan

**Product:** KisanSaathi — Better Farming, Brighter Future  
**QA Lead:** Senior QA Engineer & React Native Architect  
**Version:** 1.0 (Phase 1 Deliverable)  

---

## 1. Quality Assurance Scope & Objectives

The QA strategy ensures that KisanSaathi delivers an intuitive, fault-tolerant, accessible mobile application tailored for Indian farmers across diverse literacy levels, device capabilities, and network environments.

### Testing Dimensions Covered
1. **Functional Correctness**: Validation of all 8 screens, navigation transitions, modals, and calculators.
2. **Multilingual & Typography Integrity**: Comprehensive verification in English, Hindi (हिंदी), and Marathi (मराठी) without text clipping, broken characters, or layout overflow.
3. **Responsive Mobile Viewports**: Verification at common Android smartphone widths (360px, 390px, 412px) and tablet views.
4. **Offline Resilience & Data Integrity**: Validation of local state caching and backend sync queuing.
5. **Android Virtual Device (AVD) & Emulator Networking**: Validation over the Android `10.0.2.2` bridge.

---

## 2. Test Case Execution Matrix

### Category A: Authentication & Session Management

| Test ID | Test Case Description | Steps to Execute | Expected Result | Prototype Status | RN Status |
|---|---|---|---|---|---|
| `AUTH-01` | Trilingual Display on Login | Switch language between EN, HI, MR on login screen | All placeholders, buttons, and titles instantly change without page reload | Planned | Pending |
| `AUTH-02` | Valid Mobile & Password Login | Enter `9822012345` and `farmer123` -> Tap Login | Successfully navigates to Farmer Dashboard; farmer profile loaded | Planned | Pending |
| `AUTH-03` | Demo Quick Login Action | Tap "⚡ Quick Demo Login: Rahul Patil" | Credentials pre-filled and immediate login executed | Planned | Pending |
| `AUTH-04` | Invalid Credentials Handling | Enter invalid mobile or password | Friendly localized error displayed: *"Invalid mobile number or password"* | Planned | Pending |
| `AUTH-05` | Form Input Validation | Enter 8-digit number or empty fields | Localized validation cues: *"Enter a valid 10-digit mobile number"* | Planned | Pending |
| `AUTH-06` | Password Visibility Toggle | Tap the show/hide eye icon | Password toggles between masked dots and readable characters | Planned | Pending |
| `AUTH-07` | Logout & Session Cleared | Tap Logout in Profile Screen | Session token cleared, navigated back to Screen A | Planned | Pending |

### Category B: Multilingual & Devanagari Typography

| Test ID | Test Case Description | Steps to Execute | Expected Result | Prototype Status | RN Status |
|---|---|---|---|---|---|
| `LANG-01` | Instant UI Switching | Select Hindi or Marathi from top bar or profile | Active screen and all 4 bottom tabs update immediately | Planned | Pending |
| `LANG-02` | Zero Text Clipping / Truncation | Inspect all cards, buttons, badges in Hindi & Marathi | Devanagari conjuncts (`क्ष`, `ज्ञ`, `त्र`, `र्`) render cleanly without vertical truncation or wrapping breakage | Planned | Pending |
| `LANG-03` | Translation Coverage | Audit all 8 screens across all 3 languages | 100% of UI labels translated; no raw keys (`lang.title`) visible | Planned | Pending |
| `LANG-04` | Farmer Data Non-Translation | Check farmer's custom field names (e.g., "Well Plot") | User-entered farm names remain as typed and are not mangled by the dictionary | Planned | Pending |

### Category C: Dashboard & Core Module Navigation

| Test ID | Test Case Description | Steps to Execute | Expected Result | Prototype Status | RN Status |
|---|---|---|---|---|---|
| `DASH-01` | Personalized Farmer Greeting | Login as Rahul Patil | Header shows "Namaste, Rahul Patil" with avatar and Malegaon, Baramati location | Planned | Pending |
| `DASH-02` | Weather Summary Card | Inspect dashboard weather widget | Shows current temp (31°C), condition icon, rainfall, and agro-advisory pill | Planned | Pending |
| `DASH-03` | Module 1 Card: Weather | Tap Weather Card | Deep-links to Screen D (Full 7-day forecast & spray advisories) | Planned | Pending |
| `DASH-04` | Module 2 Card: Pest Scan | Tap Pest & Disease Card | Deep-links to Screen E (Plant Health Leaf Scanner) | Planned | Pending |
| `DASH-05` | Module 3 Card: Sugarcane | Tap Sugarcane Guide Card | Deep-links to Screen F (Co-86032 stage guide) | Planned | Pending |
| `DASH-06` | Module 4 Card: GIS Map | Tap Farm GIS Map Card | Deep-links to Screen G1 (Interactive polygon map) | Planned | Pending |
| `DASH-07` | Module 5 Card: Activities | Tap Activities & Telemetry Card | Deep-links to Screen G2 (Task logger & soil charts) | Planned | Pending |

### Category D: My Farm — Visual Farm Management

| Test ID | Test Case Description | Steps to Execute | Expected Result | Prototype Status | RN Status |
|---|---|---|---|---|---|
| `FARM-01` | Visual Farm Snapshot | Open My Farm screen | Displays Rahul Krishi Farm hero banner, 12.5 Acres, 3 field cards with realistic crop photos | Planned | Pending |
| `FARM-02` | Field Card Inspection | Tap "Field 2 - Well Plot (Sugarcane)" | Opens Field Inspection modal with crop status, variety Co-86032, soil type, and GPS coords | Planned | Pending |
| `FARM-03` | Add Field Local State | Tap "+ Add Field", enter name, area, soil type, crop | New field added to local state list immediately with success toast | Planned | Pending |
| `FARM-04` | Add Farm Local State | Tap "+ Add Farm", submit details | Local farm created and selectable | Planned | Pending |
| `FARM-05` | Sample Data Distinction | Review UI labels on map and mock cards | Clear visual badge indicating *"Sample Farm Data for Demonstration"* | Planned | Pending |

### Category E: Pest & Disease Scanner Simulation

| Test ID | Test Case Description | Steps to Execute | Expected Result | Prototype Status | RN Status |
|---|---|---|---|---|---|
| `PEST-01` | Crop Variety Selection | Choose "Sugarcane" or "Tomato" | Scanner dynamically updates context for that crop | Planned | Pending |
| `PEST-02` | Image Upload Preview | Select sample leaf photo or upload image | Photo is previewed in scanner frame with scanning laser animation | Planned | Pending |
| `PEST-03` | Diagnostic Result Delivery | Trigger scan analysis | Renders condition name, confidence (94%), symptoms, organic remedy, and chemical treatment | Planned | Pending |
| `PEST-04` | Prototype Advisory Disclaimer | Verify disclaimer note | Explicit disclaimer informing farmer that prototype analysis is illustrative | Planned | Pending |

### Category F: Mobile Viewports & Accessibility

| Test ID | Test Case Description | Steps to Execute | Expected Result | Prototype Status | RN Status |
|---|---|---|---|---|---|
| `RESP-01` | Small Android Phone (360px) | Test on 360x640 viewport | No horizontal scrollbars; cards stack gracefully; text remains legible | Planned | Pending |
| `RESP-02` | Standard Android Phone (390px) | Test on 390x844 viewport | Crisp proportions matching reference screenshots | Planned | Pending |
| `RESP-03` | Touch Target Minimums | Audit all clickable elements | All buttons and tab targets have minimum touch area of 48x48px | Planned | Pending |
| `RESP-04` | Color Contrast (WCAG AA) | Test primary green against white text | Contrast ratio >= 4.5:1 for effortless readability in outdoor sunlight | Planned | Pending |

---

## 3. Bug Logging & Defect Severity Protocol

Defects identified during test execution will be categorized as follows:

- **Blocker (Severity 1)**: Application crash, white screen, blocked login, or missing translation causing blank text.
- **Critical (Severity 2)**: Core functional feature non-responsive (e.g., cannot open field details or view weather advisory).
- **Major (Severity 3)**: Layout clipping in Devanagari text, horizontal overflow on narrow screens (360px).
- **Minor (Severity 4)**: Slight misalignment, minor phrasing improvements in Hindi/Marathi translations.

---

## 4. Acceptance & Sign-off Criteria for Phase 1 & 2

Before proceeding to Phase 6 (React Native application):
1. **Phase 1 Sign-Off**: User reviews and approves `PROJECT_PLAN.md`, `INTEGRATION_ARCHITECTURE.md`, `SCREEN_FLOW.md`, and `TEST_PLAN.md`.
2. **Phase 2 Sign-Off**: The standalone HTML, CSS, and JS prototype is fully playable in the browser, trilingual switching operates flawlessly, and all 5 modules are interactively demonstrable.
