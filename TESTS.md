# TESTS.md
Test Framework
I used Vitest for automated unit testing.
To run the tests:
```bash
npm run test

5 tests covering the audit engine
1. lib/auditEngine.test.ts

Test name: returns 30% savings for small teams on Team plans

What it covers:
This test checks the audit engine rule for small teams using Team or Business plans. If a user has 2 or fewer seats on a Team-style plan, the engine estimates 30% savings because the plan may be overkill for that team size.

2. lib/auditEngine.test.ts

Test name: returns 45% savings for coding-heavy ChatGPT non-API usage

What it covers:
This test checks whether a coding-heavy workflow using ChatGPT on a non-API plan receives an API-direct optimization recommendation. The engine estimates 45% savings for this case.

3. lib/auditEngine.test.ts

Test name: returns 45% savings for coding-heavy Claude non-API usage

What it covers:
This test checks whether a coding-heavy workflow using Claude on a non-API plan receives an API-direct optimization recommendation. This confirms that the coding-heavy rule works for both ChatGPT and Claude.

4. lib/auditEngine.test.ts

Test name: returns zero savings for already efficient low spend

What it covers:
This test checks that the audit engine does not manufacture fake savings for users already spending efficiently. If monthly spend is below $25, the engine returns $0 savings and treats the setup as already cost-efficient.

5. lib/auditEngine.test.ts

Test name: calculates total monthly and annual savings

What it covers:
This test checks the complete audit total calculation across multiple tools. It verifies total current spend, total monthly savings, and total annual savings.

Latest Test Result
Test Files  1 passed (1)
Tests       5 passed (5)
