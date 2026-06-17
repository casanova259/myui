import { ThemeToggle } from "./ThemeToggle";

export default function ThemeTogglePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black dark:bg-black dark:text-white">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-medium">Theme Toggle Demo</h1>
        <ThemeToggle start="center" />
      </div>
    </div>
  );
}