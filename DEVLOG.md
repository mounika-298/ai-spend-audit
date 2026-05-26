## Day 1 — 2026-05-21

**Hours worked:** 6

**What I did:**  
Started the AI Spend Audit project setup using Next.js and Tailwind CSS. Created the main dashboard UI in VS Code and implemented the initial audit form with AI tool selection, monthly spend input, and savings calculation display. Added dynamic dropdowns and conditional rendering logic. Tested the project locally in the browser and fixed several layout and loading issues.

**What I learned:**  
Learned how React state management works using useState and useEffect. Understood how to structure a Next.js project and connect UI components together. Learned basic Git workflow and how to push a project to GitHub.

**Blockers / what I'm stuck on:**  
Initially faced confusion while running the project locally and loading it in the browser. Had issues understanding component structure and Tailwind styling. Also struggled with Git commands and project folder structure.

**Plan for tomorrow:**  
Improve audit engine logic, connect Supabase database, and start implementing report storage.


## Day 2 — 2026-05-22

**Hours worked:** 5

**What I did:**  
Improved the audit calculation logic and added realistic savings recommendations for different AI tools and pricing plans. Integrated Supabase for lead capture and report storage. Added email input and audit save functionality. Created the audit_leads table and configured Supabase environment variables. Worked on dynamic report rendering and visual analytics sections.

**What I learned:**  
Learned how Supabase works with Next.js applications and how to insert records into a database. Learned about environment variables, API keys, database policies, and debugging runtime errors. Improved understanding of conditional rendering and reusable React logic.

**Blockers / what I'm stuck on:**  
Spent significant time debugging saveAuditReport issues and Supabase insertion failures. Faced problems with invalid request URLs, missing functions, table permissions, and environment configuration mistakes. Also accidentally used Ctrl+Z multiple times and temporarily broke sections of the component file.

**Plan for tomorrow:**  
Implement AI-generated personalized summaries using OpenAI API routes and improve overall project polish.


## Day 3 — 2026-05-23

**Hours worked:** 4

**What I did:**  
Built the AI-generated personalized audit summary feature using OpenAI API integration inside app/api/summary/route.ts. Added graceful fallback handling when AI summary generation fails. Implemented shareable report URL generation and consultation CTA for high-savings audit cases. Improved GitHub commit history and started creating required documentation files like DEVLOG.md and REFLECTION.md.

**What I learned:**  
Learned how Next.js API routes work and how frontend components communicate with backend endpoints using fetch requests. Learned better debugging strategies for runtime errors and API failures. Improved GitHub workflow knowledge including commits, pushing updates, and maintaining project history.

**Blockers / what I'm stuck on:**  
Faced issues with OpenAI API key configuration and route setup. Initially created incorrect folder structures like api\summary instead of nested folders. Also struggled with Markdown documentation file placement and GitHub synchronization.

**Plan for tomorrow:**  
Complete remaining documentation files, add automated tests, configure GitHub Actions CI workflow, and finalize pricing references for all audit calculations.
## Day 4 — 2026-05-24
**Hours worked: 4

*What I did:
Worked on improving the audit results experience and deployment flow. Added the AI-generated summary feature with fallback handling when the API fails. Improved the report layout by adding savings breakdown sections, high-savings CTA blocks, and a more honest low-savings state for users already spending efficiently. Integrated Supabase lead capture and tested database insertion from the deployed app. Also started working on shareable audit URLs and deployment fixes on Vercel.

**What I learned: 
I learned how frontend state, deployment environments, and backend integrations can behave differently between localhost and production. I also understood the importance of graceful fallbacks when AI APIs fail.

**Blockers / what I'm stuck on:  
Had issues with Vercel deployment routes and debugging public audit URLs. Some state persistence logic also caused unexpected rendering behavior.

**Plan for tomorrow:  
Finish public shareable audit URLs, add automated tests, configure GitHub Actions CI, and complete remaining documentation files.
# Day 5 — 2026-05-25
**Hours worked:** 7

**What I did:  
Completed automated testing for the audit engine using Vitest and added GitHub Actions CI workflow for lint and test checks. Fixed multiple linting and rendering issues inside the AuditForm component. Improved the public audit sharing section with copy-link functionality and tested deployment behavior across browsers. Also completed Lighthouse verification, user interviews, and several required markdown documentation files including TESTS.md and USER_INTERVIEWS.md.

**What I learned: 
I learned how CI/CD pipelines work with GitHub Actions and how small lint issues can fail deployment workflows. I also improved my debugging process while fixing React state and effect-related problems.

**Blockers / what I'm stuck on:  
Spent significant time debugging ESLint hook warnings and understanding why GitHub Actions showed failed checks even after local fixes.

**Plan for tomorrow: 
Complete remaining documentation polish including pricing data, GTM, economics, metrics, and final README cleanup before submission. and submission also 
# Day 6

## Work Completed

Today I completed the final submission work for the AI Spend Audit project.

I improved the README.md file by adding:
- project overview
- screenshots
- quick start steps
- deployment link
- decisions and trade-offs section

I also added multiple screenshots of:
- landing page
- spend calculation section
- generated audit report
- shareable URL section
- Lighthouse performance report

I integrated email delivery functionality using EmailJS so users can receive their audit reports through email. Initially I tested Resend, but later switched to EmailJS because it supports sending emails to different users more easily for project demos and internship evaluation.

I tested:
- GitHub Actions CI workflow
- lint checks
- deployment flow
- email sending flow
- responsive design
- Vercel deployment

I also finalized:
- user interview documentation
- development logs
- README structure
- deployment verification

## Challenges Faced

I faced issues with:
- GitHub Actions lint errors
- React hook warnings
- email delivery setup
- screenshot management in README
- deployment failures on Vercel

I resolved them by debugging step-by-step and testing continuously.

## Final Status

The project is now ready for final submission and deployment review.