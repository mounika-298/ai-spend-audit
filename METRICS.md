METRICS.md

## North Star Metric

The primary North Star metric for AI Spend Audit is:
text: Completed Audit Reports Per Week
I selected this metric because the core value of the product is delivered only when users fully complete the audit flow and receive recommendations. A completed audit means the user:
understood the product
entered real AI subscription information
generated savings insights
interacted with the recommendation engine

This metric directly reflects whether the product is successfully solving the AI spending visibility problem.

The project is not optimized primarily for page views or signups. Instead, the most important indicator is whether users actually complete the audit workflow and receive value from the product.
Input Metrics Driving The North Star

1. Landing Page → Audit Start Rate

This measures how many visitors actually begin entering AI subscription data after landing on the homepage.
This helps evaluate:
headline effectiveness
CTA clarity
onboarding friction
A low conversion here would indicate that the value proposition is unclear or not compelling enough.

2. Audit Completion Rate
This measures how many users finish the entire audit flow after starting it.
This is important because users may abandon the workflow if:
the form feels too long
recommendations appear confusing
the UI feels slow
trust is low
Improving completion rate directly improves the North Star metric.

3. Email Capture Rate
This measures how many completed audits result in users requesting email delivery of the report.
This metric is important because it indicates:
perceived product value
trust in the platform
lead generation potential
Users who request emailed reports are more likely to revisit or share the product later.
* What I Would Instrument First
The first analytics events I would instrument are:
Landing page visits
Audit started
Audit completed
Share URL copied
Email report requested
Consultation CTA clicked
These events provide visibility into:

onboarding friction
product engagement
recommendation usefulness
viral sharing behavior
monetization potential

* Pivot Decision Trigger
I would consider a major product pivot if:
audit completion rate remains below 20%
users rarely generate shareable reports
consultation CTA engagement stays below 2%
users do not return after initial usage

This would indicate that users do not perceive enough value in AI spending audits or that the recommendation system is not solving a strong enough problem.

In that situation, I would consider pivoting toward:

1 team-based AI spend management
2 enterprise analytics dashboards
3 AI subscription tracking
4 recurring optimization monitoring
5 developer productivity analytics

instead of one-time audit generation alone.