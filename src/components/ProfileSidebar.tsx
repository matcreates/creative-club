"use client";

interface ProfileSidebarProps {
  email: string;
  progress: number; // 0 to 100
}

export default function ProfileSidebar({
  email,
  progress,
}: ProfileSidebarProps) {
  return (
    <div className="sticky top-8 flex w-56 flex-col items-center rounded-2xl bg-white/60 p-6 backdrop-blur-sm">
      {/* Avatar */}
      <div className="mb-4 h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-amber-200 to-orange-300">
        <svg
          className="h-full w-full text-white/80"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      </div>

      {/* Email */}
      <p className="mb-5 text-center text-sm font-medium text-foreground/80 break-all">
        {email}
      </p>

      {/* Progress */}
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-muted">Your progress</span>
          <span className="text-xs font-semibold text-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-foreground transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
