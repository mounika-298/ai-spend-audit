import { describe, expect, it } from "vitest";
import { calculateAuditTotals, calculateToolSavings } from "./auditEngine";

describe("audit engine", () => {
  it("returns 30% savings for small teams on Team plans", () => {
    const result = calculateToolSavings(
      {
        toolName: "ChatGPT",
        plan: "Team",
        monthlySpend: 1000,
        seats: 2,
      },
      "mixed"
    );

    expect(result.savings).toBe(300);
  });

  it("returns 45% savings for coding-heavy ChatGPT non-API usage", () => {
    const result = calculateToolSavings(
      {
        toolName: "ChatGPT",
        plan: "Plus",
        monthlySpend: 200,
        seats: 5,
      },
      "coding"
    );

    expect(result.savings).toBe(90);
  });

  it("returns 45% savings for coding-heavy Claude non-API usage", () => {
    const result = calculateToolSavings(
      {
        toolName: "Claude",
        plan: "Pro",
        monthlySpend: 300,
        seats: 6,
      },
      "coding"
    );

    expect(result.savings).toBe(135);
  });

  it("returns zero savings for already efficient low spend", () => {
    const result = calculateToolSavings(
      {
        toolName: "Cursor",
        plan: "Pro",
        monthlySpend: 20,
        seats: 1,
      },
      "mixed"
    );

    expect(result.savings).toBe(0);
  });

  it("calculates total monthly and annual savings", () => {
    const result = calculateAuditTotals(
      [
        {
          toolName: "Cursor",
          plan: "Business",
          monthlySpend: 1000,
          seats: 2,
        },
        {
          toolName: "Gemini",
          plan: "Pro",
          monthlySpend: 100,
          seats: 5,
        },
      ],
      "mixed"
    );

    expect(result.totalCurrentSpend).toBe(1100);
    expect(result.totalMonthlySavings).toBe(315);
    expect(result.totalAnnualSavings).toBe(3780);
  });
});