# PRICING_DATA.md

This document lists the pricing references used while building the AI Spend Audit project. All pricing assumptions were taken from official vendor pricing pages during development.

The audit engine uses simplified recommendation heuristics and estimated optimization rules for internship demonstration purposes. Actual enterprise pricing may vary depending on usage and custom contracts.


## ChatGPT

Official Pricing URL:
https://openai.com/chatgpt/pricing/

Date Accessed:
2026-05-26

Referenced Plans:
- ChatGPT Plus
- ChatGPT Team
- ChatGPT Enterprise
- OpenAI API usage

Used In Audit Logic:
- Detecting small teams overpaying for Team plans
- Suggesting API-based workflows for coding-heavy usage


## Claude / Anthropic

Official Pricing URL:
https://www.anthropic.com/pricing

Date Accessed:
2026-05-26

Referenced Plans:
- Claude Free
- Claude Pro
- Claude Team
- Claude Enterprise
- Anthropic API Direct

Used In Audit Logic:
- Coding-heavy workflow optimization
- API vs subscription recommendation logic


## Cursor

Official Pricing URL:
https://www.cursor.com/pricing

Date Accessed:
2026-05-26

Referenced Plans:
- Hobby
- Pro
- Business
- Enterprise

Used In Audit Logic:
- Small-team overspending detection
- Team-plan recommendation analysis



## GitHub Copilot

Official Pricing URL:
https://github.com/features/copilot

Date Accessed:
2026-05-26

Referenced Plans:
- Individual
- Business
- Enterprise

Used In Audit Logic:
- Subscription stack comparison
- Multi-tool usage evaluation


## Gemini

Official Pricing URL:
https://gemini.google.com/pricing

Date Accessed:
2026-05-26

Referenced Plans:
- Gemini Pro
- Gemini Ultra
- Gemini API Direct

Used In Audit Logic:
- Alternative AI tool comparison
- Multi-provider optimization suggestions


## Windsurf

Official Pricing URL:
https://codeium.com/windsurf

Date Accessed:
2026-05-26

Referenced Plans:
- Hobby
- Pro
- Enterprise

Used In Audit Logic:
- AI coding workflow comparison
- Subscription consolidation suggestions



## Audit Engine Notes

The audit engine intentionally uses simplified financial heuristics instead of exact enterprise financial modeling.

Savings recommendations are based on:
- plan tier
- team size
- coding-heavy workflows
- API vs subscription usage
- low-spend optimization patterns

The system is designed to identify obvious inefficiencies and provide directional recommendations rather than guaranteed financial outcomes.


## Limitations

- AI vendor pricing changes frequently
- Enterprise pricing is often custom quoted
- API pricing varies based on token usage
- Recommendations are estimated projections
- Real-world savings depend on actual usage behavior