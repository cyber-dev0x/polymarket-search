"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-6 text-center">
      <div className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">Error</div>
      <h2 className="text-2xl font-bold text-white mb-3">Something went wrong.</h2>
      <p className="text-white/30 text-sm mb-8">
        The 3D scene may not be supported on this device or browser.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-white text-black text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all"
      >
        Try again
      </button>
    </div>
  );
}
