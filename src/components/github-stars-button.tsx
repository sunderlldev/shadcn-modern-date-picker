import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GitHubStarsButtonProps {
  username: string;
  repo: string;
}

export function GitHubStarsButton({ username, repo }: GitHubStarsButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      nativeButton={false}
      className="gap-2 font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full px-4 h-8"
      render={
        <a
          href={`https://github.com/${username}/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
        />
      }
    >
      <Star className="h-4 w-4" />
      <span className="hidden sm:inline">Star on GitHub</span>
      <span className="flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 px-2 py-0.5 text-xs text-black dark:text-zinc-300 ml-1 border border-zinc-200 dark:border-transparent shadow-sm dark:shadow-none">
        <span className="dark:hidden">;)</span>
        <span className="hidden dark:inline">:(</span>
      </span>
    </Button>
  );
}
