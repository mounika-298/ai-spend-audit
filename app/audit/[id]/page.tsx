type AuditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: AuditPageProps) {
  const { id } = await params;

  return {
    title: "AI Spend Audit Report",
    description: `View AI spend audit report ${id}. Discover potential monthly and annual AI tool savings.`,
    openGraph: {
      title: "AI Spend Audit Report",
      description:
        "Discover how much your startup may be overspending on AI tools.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Spend Audit Report",
      description: "Discover AI tool savings and optimization opportunities.",
    },
  };
}

export default async function AuditPublicPage({ params }: AuditPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <p className="text-sm text-emerald-400 font-semibold mb-4">
          Public Audit Report
        </p>

        <h1 className="text-4xl font-bold mb-4">
          AI Spend Audit Report
        </h1>

        <p className="text-zinc-400 mb-8">
          This is a shareable public audit report page. Private information such as email and company details are not shown.
        </p>

        <div className="bg-black border border-zinc-800 rounded-xl p-5">
          <p className="text-sm text-zinc-500">Report ID</p>
          <p className="text-xl font-bold mt-1">{id}</p>
        </div>

        <p className="text-sm text-zinc-500 mt-6">
          Open Graph and Twitter preview metadata are configured for this public route.
        </p>
      </div>
    </main>
  );
}