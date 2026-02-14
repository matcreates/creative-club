export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#09090b] px-6">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-pulse-glow absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[128px]" />
        <div className="animate-pulse-glow absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[128px]" style={{ animationDelay: "1.5s" }} />
        <div className="animate-pulse-glow absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[100px]" style={{ animationDelay: "0.75s" }} />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Content */}
      <main className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        {/* Badge */}
        <div
          className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-sm"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Coming Soon
        </div>

        {/* Logo / Title */}
        <h1
          className="animate-fade-in-up mb-6 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl"
          style={{ animationDelay: "0.2s" }}
        >
          Creative Club
        </h1>

        {/* Tagline */}
        <p
          className="animate-fade-in-up mb-10 max-w-md text-lg leading-relaxed text-zinc-400 sm:text-xl"
          style={{ animationDelay: "0.35s" }}
        >
          A space for bold creators, designers, and makers to connect, collaborate, and bring ideas to life.
        </p>

        {/* Email signup */}
        <div
          className="animate-fade-in-up flex w-full max-w-sm flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "0.5s" }}
        >
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-purple-500/50 focus:bg-white/[0.07]"
          />
          <button className="cursor-pointer rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.97]">
            Notify Me
          </button>
        </div>

        <p
          className="animate-fade-in mt-4 text-xs text-zinc-600"
          style={{ animationDelay: "0.65s" }}
        >
          Be the first to know when we launch. No spam, ever.
        </p>
      </main>

      {/* Footer */}
      <footer
        className="animate-fade-in absolute bottom-8 text-xs text-zinc-600"
        style={{ animationDelay: "0.8s" }}
      >
        &copy; {new Date().getFullYear()} Creative Club. All rights reserved.
      </footer>
    </div>
  );
}
