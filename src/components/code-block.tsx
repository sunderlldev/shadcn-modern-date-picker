"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CodeBlock({ code }: { code: string }) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="group relative mt-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <pre className="p-4 text-sm font-mono leading-relaxed min-w-max">
          <code>{code}</code>
        </pre>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-800 bg-zinc-100/80 dark:bg-zinc-950/80 backdrop-blur rounded-md cursor-pointer border border-zinc-200 dark:border-zinc-800"
        onClick={copyToClipboard}
      >
        {hasCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">Copy</span>
      </Button>
    </div>
  );
}
