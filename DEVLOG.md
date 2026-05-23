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