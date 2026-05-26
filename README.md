# AI Spend Audit
AI Spend Audit is a free web application that helps developers, students, startups, and engineering teams understand whether they are overspending on AI tools like ChatGPT, Claude, Cursor, Gemini, GitHub Copilot, and others. Users can enter their current subscriptions, monthly spending, and usage type to instantly receive an audit report with savings recommendations and estimated monthly + annual savings.
The project was built as part of the Credex Web Development Internship assignment. My focus was building a realistic product instead of a simple coding assignment, including deployment, testing, AI integration, audit logic, public shareable URLs, and lead capture functionality.
## Features

- Multi-tool AI subscription audit system
- Support for ChatGPT, Claude, Cursor, Gemini, GitHub Copilot, Windsurf, and API-based plans
- Monthly and annual savings estimation
- Personalized AI-generated audit summaries
- Team-plan overspending detection
- API vs subscription optimization recommendations
- Public shareable audit URLs
- Email delivery for audit reports
- Responsive mobile-friendly UI
- Local storage persistence
- GitHub Actions CI integration
- Vercel deployment support
- Supabase lead capture integration
- Lighthouse performance optimization
# Live Deployment
https://ai-spend-audit-xi-seven.vercel.app

# Screenshots
* Landing Page
![Landing Page](./screenshots/home.png)

* Spend Calculation Form
![Spend Calculation Form](./screenshots/calculate.png)

* Audit Report Page
![Audit Report](./screenshots/report.png)

* Shareable Report Section
![Shareable Report](./screenshots/share.png)

* Public Audit URL
![Public Audit URL](./screenshots/url.png)

* Lighthouse Performance Check
![Lighthouse Performance](./screenshots/performance.png)

# Quick Start
* Install dependencies
npm install
RUN LOCALLY : npm run dev
it opens : http://localhost:3000
* TEST : npm run test
npm run lint
 DEPLOY : (This project is deployed using Vercel.)

* Decisions & Trade-offs
1. Rule-based audit engine instead of AI-generated pricing logic

I used deterministic audit rules for pricing recommendations because financial recommendations should remain transparent, explainable, and predictable instead of relying fully on AI-generated outputs.

2. AI used only for personalized summaries

The LLM is only used for generating personalized summaries while actual audit calculations remain rule-based. This reduces hallucination risks and improves trust in savings estimates.

3. No login required before showing value

Users can generate audits instantly without creating an account. I wanted the tool to feel lightweight and easy to try before requesting any personal information.

4. Honest low-savings messaging

Instead of forcing unnecessary recommendations, I added a “You’re spending well” state for already-optimized users to make the audit feel more trustworthy.

5. Shareable audit URLs over PDF-first export

I prioritized public shareable URLs because the assignment emphasized virality, screenshots, and social sharing instead of only static exports.

* Live Deployment

https://ai-spend-audit-xi-seven.vercel.app