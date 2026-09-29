"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-start justify-center gap-4 px-6">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-foreground/70">
        The page could not be loaded. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="bg-primary min-h-11 rounded-lg px-5 font-medium text-white"
      >
        Try again
      </button>
    </main>
  );
}
