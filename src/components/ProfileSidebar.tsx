"use client";

interface ProfileSidebarProps {
  email: string;
  progress: number; // 0 to 100
  onLogout: () => void;
}

export default function ProfileSidebar({
  email,
  progress,
  onLogout,
}: ProfileSidebarProps) {
  return (
    <div className="flex w-64 flex-col items-start rounded-2xl bg-white/60 p-7 backdrop-blur-sm">
      {/* Email */}
      <p className="mb-6 text-base font-medium text-foreground/80 break-all">
        {email}
      </p>

      {/* Progress */}
      <div className="w-full">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-sm font-medium text-muted">Your progress</span>
          <span className="text-sm font-semibold text-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-foreground transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="mt-6 cursor-pointer text-sm text-muted transition-colors hover:text-foreground"
      >
        Sign out
      </button>
    </div>
  );
}
