# Reflection
# 1. The hardest bug I hit this week, and how I debugged it

The hardest bug I faced during this project was the `saveAuditReport is not defined` runtime error inside `AuditForm.tsx`. The issue appeared after I added the Supabase lead capture feature. Initially, I thought the problem was related to imports or TypeScript types because the browser showed a runtime ReferenceError and VS Code also displayed “cannot find name saveAuditReport”. and in email enter (its failed to saved) this problem also i faced

My first hypothesis was that the function was missing completely, so I searched through the component file and checked whether the function existed. Later I realized that the actual problem was related to function scope placement. I had accidentally placed the `saveAuditReport` function inside another function while editing the file and using Ctrl+Z repeatedly during debugging. Because of that, React could not access the function from the button’s `onClick` handler.

I debugged the issue step by step by checking the browser error stack trace, VS Code Problems panel, and manually tracing the component structure. I also tested whether other functions in the component were accessible to isolate the problem further. Finally, I moved the function outside of the nested scope and placed it correctly alongside the other component-level functions.

Another related challenge was Supabase insertion failures caused by table policies and missing columns. I learned how to inspect database tables, environment variables, and console logs more carefully instead of changing multiple things at once.

This bug taught me the importance of understanding component scope, debugging incrementally, and reading runtime errors carefully instead of guessing.


# 2. A decision I reversed mid-week, and what made me reverse it

One major decision I reversed during the project was how much AI should control the audit logic itself. Initially, I considered using the OpenAI API to generate both optimization recommendations and pricing calculations dynamically. I thought this would make the app feel more “AI-powered.”

However, after working on the audit engine and reading the assignment requirements more carefully, I realized that using AI for financial calculations would make the results inconsistent and difficult to defend. AI responses sometimes suggested unrealistic savings or recommendations that did not actually match the user’s tool usage. In a few tests, the generated advice sounded impressive but was not financially reliable.
Because of this, I reversed the decision and switched to a hardcoded rule-based audit engine. I used explicit conditions for plan optimization, small-team recommendations, API-direct suggestions, and realistic savings percentages. This made the audit results much more predictable and easier to explain.

I still kept AI in the project, but only for generating personalized summary paragraphs. That aligned better with the assignment instructions because the PDF specifically said the audit math should not rely on AI reasoning.

Reversing this decision improved the overall quality of the application. The app became more stable, the savings calculations became consistent, and the recommendations felt more believable from a finance perspective. It also helped me understand that good engineering decisions , but about knowing where AI is actually useful and where deterministic logic is safer.
---
# 3. What I would build in week 2 if I had it

If I had an additional week to continue building this project, I would focus on improving the product from a simple MVP into a more polished and scalable SaaS-style application.

The first improvement would be creating real public shareable audit pages with dynamic URLs and proper Open Graph previews. Right now, the application can generate reports, but I would like each audit to have its own permanent public page with social sharing support for LinkedIn and Twitter previews.

I would also add PDF export functionality so founders could download professional audit reports and share them internally with finance or engineering teams. Another feature I would build is benchmark analytics. For example, the app could compare a startup’s AI spend per developer against averages from similar company sizes.

On the backend side, I would improve abuse protection using stronger server-side rate limiting and CAPTCHA validation. I would also implement email delivery using Resend or Postmark instead of only storing leads in Supabase.

For the audit engine itself, I would move the pricing logic into dedicated utility files with automated tests and scheduled pricing refreshes. This would make the system easier to maintain as vendor pricing changes.

Finally, I would spend more time on design polish and mobile optimization to improve Lighthouse performance and accessibility scores. I learned that small UI details matter a lot for products designed to be shared publicly.
---
## 4. How I used AI tools during the project

During my project, I used AI tools like ChatGPT and Cursor as development assistants, but I made sure they complemented my own work rather than replaced it. Roughly 40% of the project benefited from AI support, while 60% was my own implementation, debugging, and decision-making.

ChatGPT helped me understand the Next.js structure, resolve React component issues, and debug TypeScript errors. It was also valuable for brainstorming audit logic, designing documentation structures, and refining the wording of summaries and recommendations. Cursor, on the other hand, was more effective for repetitive UI adjustments and quick frontend edits, allowing me to save time on smaller tasks.

I deliberately avoided trusting AI with business logic or financial calculations. These areas require precision and contextual judgment, and I learned that AI suggestions can sound convincing but may not be realistic. For example, early in development, AI-generated savings recommendations looked impressive but were overly optimistic, suggesting infrastructure changes that didn’t align with actual user inputs.

One specific time I caught AI being wrong was during debugging of the saveAuditReport function. The AI suggested placing functions inside the wrong scope, which introduced new runtime errors. By carefully reviewing the code against React’s lifecycle rules, I identified the mistake and corrected it manually.

This experience taught me that AI tools are excellent for acceleration, debugging guidance, and documentation support, but they still require human oversight. The most important lesson was that understanding the code yourself matters far more than blindly accepting generated solutions.

# 5. Self-rating

Discipline — 10/10

I worked consistently across multiple days, maintained GitHub commits, and continued debugging even after repeated runtime and database issues slowed progress.

Code Quality — 7/10

The project structure became significantly cleaner over time, especially after reorganizing the audit logic and API integration, although there is still room for more modularization and testing.

Design Sense — 8/10

I focused heavily on creating a used multiple AI tools throughout the project,

To understand Next.js structure, React component issues, TypeScript errors, Supabase integration, and OpenAI API routing. I also used it to brainstorm audit logic ideas, generate documentation structure, and im polished audit report UI with visual hierarchy, responsive layouts, savings highlights, and clear calls-to-action designed for sharing.

Problem-Solving — 9/10

I solved several difficult issues involving Supabase integration, React component scope, environment variables, API routing, and conditional rendering through iterative debugging and testing. for my own and with the help of some ai tools

Entrepreneurial Thinking — 8/10

I understood that the project was not just a coding exercise but a lead-generation product. I focused on user value, honest savings recommendations, consultation CTAs, and shareable reports rather than only technical implementation.