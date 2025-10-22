# VOD Menus Frontend - Architecture

This application is built with LightningJS Blits (WebGL rendering). It follows a modular architecture:

- Application Root (src/App.js): Provides global theme colors, routes and renders `<RouterView />`.
- Pages:
  - Home: Landing with Sidebar and TopNav.
  - Catalog: Main browsing with Sidebar, TopNav, Grid/List toggle, DetailsModal, and Alert.
  - Search: Focused list view with debounced search and DetailsModal.
- Components:
  - Sidebar: Category list and selection.
  - TopNav: Title, pseudo search input display, view toggle, and profile.
  - TitleGrid/TitleList: Render collections.
  - DetailsModal: Shows title details and provides e-sign scaffold and admin delete action.
  - Alert: User friendly messages.
  - AuditTrailConsole: Developer tool showing recent events.
- Services:
  - validation: Centralized validation and structured errors.
  - accessControl: Role-based guard.
  - auditTrail: Writes audit events to state buffer.
  - dataSource: Mock dataset with pagination, sorting, filtering, and search.
- State:
  - store: View preferences and user accessors.
  - auth: Current user info.
  - audit: Event buffer with subscription.
- Theme:
  - Ocean Professional with hex colors for Lightning.

Routing:
- '/' -> Home, '/catalog' -> Catalog, '/search' -> Search.

Error Handling:
- Pages convert technical errors to friendly alerts and write error entries to audit trail.

Compliance:
- Audit trail events capture userId, isoTimestamp, actionType, entity, before/after, reason, and error where applicable.
- Access control enforces admin action on delete.
- Validation service ensures input/param correctness.
- E-sign scaffold event provides a binding artifact placeholder.
