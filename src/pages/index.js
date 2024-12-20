import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(""); // Clear previous result
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResult(data.result || "No result generated.");
    } catch (error) {
      setResult("Error generating content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Content Creator
          </h1>
          <textarea
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-700 mb-4"
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows="6"
          ></textarea>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Generating..." : "Generate Content"}
          </button>
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Result:</h2>
            <div className="bg-gray-100 p-4 rounded-lg text-gray-700 whitespace-pre-wrap">
              {result || "Your content will appear here."}
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-black text-white text-center py-4">
        <p>
          © {new Date().getFullYear()} by{" "}
          <a
            href="https://twitter.com/lynnthelight"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline"
          >
            @lynnthelight
          </a>
        </p>
      </footer>
    </div>
  );
}
