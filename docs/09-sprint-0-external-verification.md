# Sprint 0 External Verification

Sprint 0 code-level checks and CI migration proof are complete. DEV-001 and DEV-003 remain incomplete until an operator verifies a real Preview/Staging environment.

## Manual checklist

- [ ] Create or connect the Preview/Staging deployment for the reviewed branch.
- [ ] Provision an isolated non-production PostgreSQL database.
- [ ] Configure environment-specific secrets and public settings through the deployment provider; do not commit them.
- [ ] Deploy `main` and record the deployment URL and environment name in the release record.
- [ ] Apply the committed Drizzle migrations through the documented deployment workflow.
- [ ] Verify `GET /api/health` returns a healthy response.
- [ ] Verify the consumer shell renders.
- [ ] Verify the Admin shell renders without exposing protected data.
- [ ] Verify no secrets, credentials, raw SQL errors, or provider internals are exposed in pages, responses, or logs.
- [ ] Document the database backup, restore, and forward-fix/recovery approach used for the environment.
- [ ] Record the deployment URL, environment, migration version, verification date, and operator in the release record. Never record secret values.

## Evidence and decision

Attach deployment/check results and migration output to the Sprint 0 closeout PR or release record. Do not mark DEV-001, DEV-003, or Sprint 0 complete from repository changes alone.