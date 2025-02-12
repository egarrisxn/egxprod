import { TimeDisplay } from "./time-display";
import ThemeToggle from "./theme-toggle";
import GitHubIcon from "./icons/github";

export default function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="mx-auto flex items-center justify-between p-4 sm:p-6 lg:p-8">
        <div className="flex flex-row items-center gap-2.5">
          <a
            href="https://github.com/egarrisxn/xprod"
            className="duration-200 hover:opacity-50"
          >
            <GitHubIcon className="size-5" />
          </a>
          <p>EG | {new Date().getFullYear()}</p>
        </div>

        <div className="flex flex-row items-center gap-2">
          <TimeDisplay />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
