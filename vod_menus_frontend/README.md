# VOD Menus Frontend (LightningJS Blits)

Ocean Professional themed VOD menus application with GxP controls.

## Scripts
- dev: Start app `npm run dev`
- build: Production build `npm run build`
- preview: Preview build `npm run preview`
- test: Run unit/integration tests with coverage `npm run test`
- test:watch: Run tests in watch mode `npm run test:watch`

## Features
- Routing: Home, Catalog, Search
- Components: Sidebar, TopNav, TitleGrid, TitleList, DetailsModal, Alert, AuditTrailConsole
- Services: validation, accessControl, auditTrail, dataSource
- State: store (view), auth (user roles), audit (event buffer)

## GxP Controls
- Audit trail with userId, isoTimestamp, actionType, entity, before/after, reason, error
- Role-based access control guards
- Centralized validation
- Friendly error handling with technical logging
- Electronic signature scaffold with binding artifact

## Theme
- Ocean Professional palette
  - primary #2563EB, secondary/success #F59E0B, error #EF4444
  - background #f9fafb, surface #ffffff, text #111827

## Development
- Launch via `src/index.js` with Blits.Launch
- WebGL rendering (no DOM/CSS)

See docs/ for architecture, compliance, traceability, and testing strategy.
