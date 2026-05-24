export type AuditInput = {
  toolName: string;
  plan: string;
  monthlySpend: number;
  seats: number;
};

export function calculateToolSavings(
  item: AuditInput,
  primaryUseCase: string
) {
  let potentialSavings = 0;
  let recommendation =
    "Your current setup already appears reasonably optimized.";

  if ((item.plan === "Team" || item.plan === "Business") && item.seats <= 2) {
    potentialSavings = item.monthlySpend * 0.3;
    recommendation =
      "Your team is small for a Team plan. Switching to individual Pro plans could reduce unnecessary seat costs.";
  } else if (
    primaryUseCase === "coding" &&
    (item.toolName === "ChatGPT" || item.toolName === "Claude") &&
    item.plan !== "API direct"
  ) {
    potentialSavings = item.monthlySpend * 0.45;
    recommendation =
      "Your workflow is coding-heavy. API-based usage may reduce costs compared to premium chat subscriptions.";
  } else if (item.monthlySpend < 25) {
    potentialSavings = 0;
    recommendation =
      "Your current setup already looks cost-efficient for your usage.";
  } else {
    potentialSavings = item.monthlySpend * 0.15;
    recommendation =
      "You may reduce costs by using discounted AI credits or lower-tier plans.";
  }

  return {
    savings: Math.floor(potentialSavings),
    recommendation,
  };
}

export function calculateAuditTotals(
  tools: AuditInput[],
  primaryUseCase: string
) {
  const totalCurrentSpend = tools.reduce(
    (total, item) => total + item.monthlySpend,
    0
  );

  const breakdowns = tools.map((item) => ({
    ...item,
    ...calculateToolSavings(item, primaryUseCase),
  }));

  const totalMonthlySavings = breakdowns.reduce(
    (total, item) => total + item.savings,
    0
  );

  return {
    totalCurrentSpend,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    breakdowns,
  };
}