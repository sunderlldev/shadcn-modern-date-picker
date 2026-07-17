"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CodeTabs() {
  const [hasCopied, setHasCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("pnpm");

  const commands = {
    pnpm: "pnpm dlx shadcn@latest add \\\n  https://date-picker-2026.vercel.app/r/date-picker.json",
    npm: "npx shadcn@latest add \\\n  https://date-picker-2026.vercel.app/r/date-picker.json",
    yarn: "npx shadcn@latest add \\\n  https://date-picker-2026.vercel.app/r/date-picker.json",
    bun: "bunx --bun shadcn@latest add \\\n  https://date-picker-2026.vercel.app/r/date-picker.json",
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commands[activeTab as keyof typeof commands]);
    setHasCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="relative mt-2 max-w-full overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
      <div className="font-mono">
        <Tabs
          defaultValue="pnpm"
          onValueChange={setActiveTab}
          className="w-full flex-col"
        >
          <div className="relative flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-3 pt-2">
            <TabsList className="flex items-center justify-center gap-2 rounded-none bg-transparent p-0 pl-1 text-zinc-500 dark:text-zinc-400">
              {["pnpm", "npm", "yarn", "bun"].map((pm) => (
                <TabsTrigger
                  key={pm}
                  value={pm}
                  className="relative h-8 rounded-t-md border border-transparent bg-transparent px-4 pb-2 pt-1 font-mono text-sm font-medium outline-none transition-none hover:text-zinc-700 dark:hover:text-zinc-300 data-[state=active]:shadow-none! cursor-pointer data-[state=active]:bg-zinc-200! dark:data-[state=active]:bg-zinc-800! data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100"
                >
                  {pm}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2.5 top-2 z-10 h-6 w-6 rounded-[0.5rem] text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-50 cursor-pointer"
              onClick={copyToClipboard}
            >
              {hasCopied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              <span className="sr-only">Copy</span>
            </Button>
          </div>
          {Object.entries(commands).map(([pm, cmd]) => (
            <TabsContent key={pm} value={pm} className="mt-0">
              <div className="overflow-x-auto scrollbar-thin">
                <pre className="px-4 py-5 min-w-max">
                  <code className="relative font-mono text-sm leading-relaxed text-zinc-900 dark:text-zinc-50">
                    {cmd}
                  </code>
                </pre>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
