# Story: Technical Optimization Tasks (TO)

## Rules for Branches and Commits

- **Branch naming convention**:  
  `{your_name}-{board_name}-{task_number}-{short_description}`  

  Example:  
  `roman-to-2-cleanup_package_scripts`

- **Commit naming convention**:  
  `{board_name}-{task_number} {short_description}`  

  Example:  
  `TO-2 remove unused scripts from package.json`

---

## Task TO-2 — Cleanup package.json scripts
**Description:**  
Review all scripts in `package.json` for both frontend and backend.  
Remove unnecessary or unused scripts, leaving only the ones that are actually needed for project development and deployment.

**Acceptance Criteria:**  
- Only essential scripts remain in both frontend and backend `package.json`.
- Project can be run and built without redundant scripts.

---

## Task TO-3 — Dependency audit and upgrade
**Description:**  
Currently, project dependencies must be installed using the `--legacy-peer-deps` flag.  
We need to audit all dependencies and attempt to update them to resolve compatibility issues.  

Special attention should be given to **frontend test dependencies**, which may cause conflicts.  
- If updating requires adjusting or replacing frontend test packages — that is acceptable, but should only be done as a last resort.  
- Tests are not critical, but the main functionality of the application must be preserved.

**Acceptance Criteria:**  
- Dependencies can be installed without `--legacy-peer-deps`.
- Project runs correctly after upgrade.
- Frontend test suite is preserved if possible, or adjusted only if strictly necessary.

---

## Task TO-4 — Implement request authorization via tokens
**Description:**  
Currently, authentication is only visual — requests are not actually authorized.  

We need to implement **real authorization** on the backend using **access tokens**, and update the frontend to handle tokens properly.  
- Tokens can be stored either in **localStorage** or in **cookies**.  
- No need to implement both access and refresh tokens — a single **access token** is sufficient.

**Acceptance Criteria:**  
- Backend requires token-based authorization for protected endpoints.
- Frontend correctly stores and attaches tokens to requests.
- Unauthorized requests are rejected by the backend.

---
