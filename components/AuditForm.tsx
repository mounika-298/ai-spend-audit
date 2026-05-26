/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export type AITool =

  | "Cursor" | "GitHub Copilot" | "Claude" | "ChatGPT"
  | "Anthropic API direct" | "OpenAI API direct" | "Gemini" | "Windsurf";

export type ToolPlan =

  | "Hobby" | "Plus" | "Individual" | "Pro" | "Max" | "Free"
  | "Business" | "Team" | "Enterprise" | "API direct" | "Ultra";

export interface UserToolInput {
  id: string;
  toolName: AITool;
  plan: ToolPlan;
  monthlySpend: number;
  seats: number;
}

const AVAILABLE_PLANS: Record<AITool, ToolPlan[]> = {
  "Cursor": ["Hobby", "Pro", "Business", "Enterprise"],
  "GitHub Copilot": ["Individual", "Business", "Enterprise"],
  "Claude": ["Free", "Pro", "Max", "Team", "Enterprise", "API direct"],
  "ChatGPT": ["Plus", "Team", "Enterprise", "API direct"],
  "Anthropic API direct": ["API direct"],
  "OpenAI API direct": ["API direct"],
  "Gemini": ["Pro", "Ultra", "API direct"],
  "Windsurf": ["Hobby", "Pro", "Enterprise"],
};

export default function AuditForm() {
  const [teamSize, setTeamSize] = useState<number>(5);
  const [primaryUseCase, setPrimaryUseCase] = useState<string>("mixed");
  
  const [selectedTool, setSelectedTool] = useState<AITool>("Cursor");
  const [selectedPlan, setSelectedPlan] = useState<ToolPlan>("Pro");
  const [spendInput, setSpendInput] = useState<string>("");
  const [seatsInput, setSeatsInput] = useState<string>("1");

  const [toolsList, setToolsList] = useState<UserToolInput[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  // Day 3 state trigger check variable
  const [showReport, setShowReport] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Load configuration inputs parameters snapshot ledger profile from localStorage

  useEffect(() => {
    const savedTools = localStorage.getItem("credex_audit_tools");
    const savedTeamSize = localStorage.getItem("credex_audit_teamsize");
    const savedUseCase = localStorage.getItem("credex_audit_usecase");
    const savedReportState = localStorage.getItem("credex_show_report");
    
    if (savedTools) setToolsList(JSON.parse(savedTools));
    if (savedTeamSize) setTeamSize(Number(savedTeamSize));
    if (savedUseCase) setPrimaryUseCase(savedUseCase);
    if (savedReportState) setShowReport(savedReportState === "true");
    
    setIsLoaded(true);
  }, []);

  // Sync state data elements persistence sequence
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("credex_audit_tools", JSON.stringify(toolsList));
    localStorage.setItem("credex_audit_teamsize", teamSize.toString());
    localStorage.setItem("credex_audit_usecase", primaryUseCase);
    localStorage.setItem("credex_show_report", showReport.toString());
  }, [toolsList, teamSize, primaryUseCase, showReport, isLoaded]);

  const handleToolChange = (tool: AITool) => {
    setSelectedTool(tool);
    const plans = AVAILABLE_PLANS[tool];
    if (plans && plans.length > 0) {
      setSelectedPlan(plans[0]);
    }
  };

  const addToolToStack = () => {
    if (!spendInput || Number(spendInput) <= 0) return;
    
    const newTool: UserToolInput = {
      id: Math.random().toString(36).substring(2, 9),
      toolName: selectedTool,
      plan: selectedPlan,
      monthlySpend: Number(spendInput),
      seats: Number(seatsInput) || 1,
    };

    setToolsList([...toolsList, newTool]);
    setSpendInput("");
    setSeatsInput("1");
    setShowReport(false); // Hide reports temporarily until user clicks update trigger button element
  };

  const removeToolFromStack = (id: string) => {
  setToolsList(toolsList.filter((item) => item.id !== id));
  setShowReport(false);
};
const generateAISummary = async () => {

  setLoadingSummary(true);

  try {

    const response = await fetch("/api/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tools: toolsList,
        savings: Math.floor(totalMonthlySavings),
        useCase: primaryUseCase,
      }),
    });

    const data = await response.json();

    setAiSummary(data.summary);

  } catch (error) {

    console.error(error);

    setAiSummary(
      "AI summary generation temporarily unavailable. Your audit results are still valid."
    );

  }

  setLoadingSummary(false);
};
const saveAuditReport = async () => {

  if (!email) {
    alert("Please enter your email");
    return;
  }

  const { error } = await supabase
    .from("audit_leads")
    .insert([
      {
        email: email,
        team_size: teamSize,
        use_case: primaryUseCase,
        tools: toolsList,
        monthly_savings: Math.floor(totalMonthlySavings),
      },
    ]);

  if (error) {
    console.log("SUPABASE ERROR:", error);
    alert(JSON.stringify(error));
  } else {
   await emailjs.send(
  "service_pptw06d",
  "template_8fyj3wv",
  {
    to_email: email,
    monthly_savings: Math.floor(totalMonthlySavings),
    annual_savings: totalAnnualSavings,
  },
  "81IPxDaho_cB62mAd"
);

alert("Your audit report has been saved and emailed successfully!");
setEmail("");

alert("Your audit report has been saved and emailed successfully!");
setEmail("");
  }
};

// Pricing calculations logic
const totalCurrentSpend = toolsList.reduce(
  (acc, curr) => acc + curr.monthlySpend,
  0
);

const auditBreakdowns = toolsList.map((item) => {
  let potentialSavings = 0;

  let recommendation =
    "Your current setup already appears reasonably optimized.";

  if (
    (item.plan === "Team" || item.plan === "Business") &&
    item.seats <= 2
  ) {
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
    ...item,
    savings: Math.floor(potentialSavings),
    recommendation,
  };
});

const totalMonthlySavings = auditBreakdowns.reduce(
  (total, item) => total + item.savings,
  0
);

  const totalAnnualSavings = Math.floor(totalMonthlySavings * 12);
  const remainingCalculatedSpend = Math.max(0, totalCurrentSpend - totalMonthlySavings);

  const currentSpendFactor = totalCurrentSpend > 0 ? 100 : 0;
  const savingsPercentageFactor = totalCurrentSpend > 0 ? Math.floor((totalMonthlySavings / totalCurrentSpend) * 100) : 0;
  const alternativeSpendPercentageFactor = Math.max(0, 100 - savingsPercentageFactor);

  if (!isLoaded) return <div className="text-center text-gray-500 py-10">Syncing security context ledger updates...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-10 text-white">
      {/* 1. Core Inputs Dashboard Card Container Panel */}
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Calculate Potential Savings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Total Team Size</label>
            <input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(Math.max(1, Number(e.target.value)))}
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Primary Operations Focus</label>
            <select
              value={primaryUseCase}
              onChange={(e) => setPrimaryUseCase(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none"
            >
              <option value="mixed">Mixed Applications</option>
              <option value="coding">Engineering & Code Heavy</option>
              <option value="writing">Content & Documentation</option>
              <option value="data">Data Research Analytics</option>
            </select>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-6">
          <p className="text-sm font-semibold text-gray-300 mb-4">Add Subscription Target Rows:</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Target Engine</label>
              <select
                value={selectedTool}
                onChange={(e) => handleToolChange(e.target.value as AITool)}
                className="w-full text-sm bg-black border border-zinc-700 rounded-lg p-2 text-white focus:outline-none"
              >
                {Object.keys(AVAILABLE_PLANS).map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Current Tier</label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value as ToolPlan)}
                className="w-full text-sm bg-black border border-zinc-700 rounded-lg p-2 text-white focus:outline-none"
              >
                {(AVAILABLE_PLANS[selectedTool] || []).map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Seats Active</label>
              <input
                type="number"
                value={seatsInput}
                onChange={(e) => setSeatsInput(e.target.value)}
                className="w-full text-sm bg-black border border-zinc-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Invoice ($/mo)</label>
              <input
                type="number"
                value={spendInput}
                onChange={(e) => setSpendInput(e.target.value)}
                placeholder="e.g. 105"
                className="w-full text-sm bg-black border border-zinc-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={addToolToStack}
              className="w-full bg-white text-black font-semibold text-sm h-[38px] rounded-lg hover:bg-gray-200 transition"
            >
              + Add Tool
            </button>
          </div>
        </div>
      </div>

      {/* 2. Added Stack summary queue lines container panel matrix */}
      {toolsList.length > 0 && (
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <h3 className="text-lg font-bold text-white">Current Stack Selection Overview</h3>
            <span className="text-xs font-semibold bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full">
              {toolsList.length} Connected Subscriptions
            </span>
          </div>
          
          <div className="space-y-3">
            {toolsList.map((item) => (
              <div key={item.id} className="bg-zinc-900 p-4 rounded-xl flex items-center justify-between border border-zinc-800">
                <div>
                  <span className="font-semibold text-white">{item.toolName} ({item.plan})</span>
                  <p className="text-xs text-zinc-500 mt-1">{item.seats} Active Workspace Seats</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-zinc-300">${item.monthlySpend}/mo</span>
                  <button onClick={() => removeToolFromStack(item.id)} className="text-xs text-red-400 hover:text-red-300 transition">Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Explicit Day 3 Action Button Hook block line path container element */}
          <div className="pt-4 text-center border-t border-zinc-900">
            <button
              type="button"
              onClick={() => {
                setShowReport(true);
                generateAISummary();
             }}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-3.5 rounded-xl text-sm transition shadow-lg w-full md:w-auto"
            >
              Generate Audit Performance Report 
            </button>
          </div>
        </div>
      )}

      {/* 3. Conditional Report Metrics Visual Panels (Renders cleanly ONLY after trigger click confirms true state status) */}
      {showReport && toolsList.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-8 animate-fadeIn">
          
          {/* Dashboard Summary Value Cards Grid layout metrics lines */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/40 border border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">Gross Expense Load</p>
              <p className="text-3xl font-black text-white mt-2">${totalCurrentSpend}<span className="text-xs text-zinc-500 font-normal"> / mo</span></p>
            </div>
            <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-5">
              <p className="text-xs text-emerald-400 uppercase tracking-widest font-semibold">Strategic Savings Yield</p>
              <p className="text-3xl font-black text-green-400 mt-2">${Math.floor(totalMonthlySavings)}<span className="text-xs text-emerald-600 font-normal"> / mo</span></p>
            </div>
            <div className="bg-black/40 border border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">Projected Capital Recovered</p>
              <p className="text-3xl font-black text-emerald-400 mt-2">${totalAnnualSavings.toLocaleString()}<span className="text-xs text-zinc-500 font-normal"> / yr</span></p>
            </div>
          </div>

          {/* Custom Proportional Visual Bars Comparison Analytics Area */}
          <div className="bg-black/30 border border-zinc-800/60 rounded-xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Infrastructure Volume Comparison Visual</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-1">
                  <span>Current Outlay</span>
                  <span className="font-semibold text-white">100% (${totalCurrentSpend}/mo)</span>
                </div>
                <div className="w-full bg-zinc-800 h-3.5 rounded-full overflow-hidden">
                  <div className="bg-zinc-500 h-full transition-all" style={{ width: `${currentSpendFactor}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-1">
                  <span>Optimized Target Strategy</span>
                  <span className="font-semibold text-green-400">{alternativeSpendPercentageFactor}% (${remainingCalculatedSpend}/mo)</span>
                </div>
                <div className="w-full bg-zinc-800 h-3.5 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full transition-all" style={{ width: `${alternativeSpendPercentageFactor}%` }}></div>
                  <div className="bg-red-500 h-full transition-all" style={{ width: `${savingsPercentageFactor}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Granular Strategy Analysis breakdown advisory lists rows */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Per-Vendor Granular Strategy Analysis</h4>
            <div className="bg-black/30 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
    AI-Generated Personalized Summary
            </h4>

            {loadingSummary ? (
              <p className="text-sm text-zinc-400">
                Generating AI insights...
              </p>
            ) : (
              <p className="text-sm text-zinc-300 leading-relaxed">
                {aiSummary}
              </p>
           )}
           </div>
            <div className="space-y-3">
              {auditBreakdowns.map((tool) => (
                <div key={tool.id} className="bg-zinc-950/60 border border-zinc-800 p-5 rounded-xl space-y-2">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="font-bold text-white">{tool.toolName} ({tool.plan})</span>
                    <span className="text-xs text-red-400 font-semibold">Leaking spend: ${tool.savings}/mo</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed"><b className="text-amber-400">Action Plan:</b> {tool.recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Lead Registration capture block wrapper line layout */}
          <div className="pt-4 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {totalMonthlySavings > 500 && (
              <div className="bg-emerald-950/30 border border-emerald-700 rounded-xl p-6">
                <h4 className="text-lg font-bold text-emerald-400">
                  High Savings Opportunity Detected
                </h4>

                <p className="text-sm text-zinc-300 mt-2">
                  Your audit shows more than $500/month in potential savings. Credex can help capture more of this through discounted AI infrastructure credits.
                </p>

                <button
                  type="button"
                  onClick={() => alert("Consultation request captured. Credex will reach out after review.")}
                  className="mt-4 bg-white text-black font-bold px-5 py-3 rounded-xl text-sm border border-emerald-400 shadow-lg hover:bg-emerald-100"
                >
                  Book Credex Consultation
                </button>
              </div>
           )}

           {totalMonthlySavings < 100 && (
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
                <h4 className="text-lg font-bold text-white">
                  You’re spending well
                </h4>

                <p className="text-sm text-zinc-400 mt-2">
                  Your current AI spend looks reasonably optimized. Leave your email and we’ll notify you when new optimizations apply to your stack.
                </p>
              </div>
    )}
            <div>
              <div className="bg-black/30 border border-zinc-800 rounded-xl p-5 space-y-3 mb-4">
                <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
                  Share This Audit
                </h4>

                <p className="text-xs text-zinc-400">
                  Copy this public URL to share your audit report. Private details like email are not shown.
                </p>

                <div className="flex gap-2">
                  <input
                    value={`${window.location.origin}/audit/demo-report`}
                    readOnly
                    className="bg-black border border-zinc-700 text-xs rounded-xl px-4 py-2 text-white flex-1"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/audit/demo-report`
                      );
                      alert("Share URL copied!");
                    }}
                    className="bg-white text-black font-bold text-xs px-4 py-2 rounded-xl"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <h4 className="font-bold text-white text-base">Save Your Audit Report</h4>
              <p className="text-xs text-zinc-400 mt-1">Get your personalized AI spend audit report delivered securely.</p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border border-zinc-700 text-xs rounded-xl px-4 py-2 text-white flex-1 focus:outline-none"
/>
              <button onClick={saveAuditReport} className="bg-white text-black font-bold text-xs px-4 py-2 rounded-xl">Email My Audit</button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
