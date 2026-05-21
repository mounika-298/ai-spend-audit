export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-800 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          AI Spend Audit
        </h1>

        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
          Get Started
        </button>

      </div>
    </nav>
  );
}