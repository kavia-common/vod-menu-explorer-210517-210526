# Testing Strategy

Tools:
- Vitest with jsdom environment.
- Testing Library is included for potential DOM-like queries if needed, but Lightning renders via WebGL; most logic tested via component instances and services.

Coverage:
- Unit tests cover validation, access control, audit trail, data source, and store/auth.
- Integration tests verify routing config, audit generation during catalog/search operations, view toggling, and access denial in details modal.

Targets:
- >80% coverage by focusing on service logic and page methods.
- Future E2E (device-level) tests recommended for rendering and input focus behavior.

Commands:
- `npm run test` for headless coverage.
- `npm run test:watch` during development.

Data:
- Mock dataset generated within dataSource with categories and deterministic title generation.

Compliance:
- Include tests that assert audit trail entries for read and error operations.
