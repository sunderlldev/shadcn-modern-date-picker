"use client";

import { DatePickerDemo } from "@/components/date-picker-demo";
import { CodeTabs } from "@/components/code-tabs";
import { CodeBlock } from "@/components/code-block";
import { Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-24 max-w-4xl flex flex-col text-left">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Modern Date Picker
        </h1>
        <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
          A beautifully designed, modern date picker component built on top of
          shadcn/ui and react-day-picker v9. Replaces clumsy native dropdowns
          with fluid UI state transitions.
        </p>
      </div>

      <div className="flex justify-center items-center mb-24 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 py-32 px-8 min-h-70 shadow-sm">
        <DatePickerDemo />
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Terminal className="h-6 w-6" />
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            You can add this component directly to your project using the shadcn
            CLI. This will automatically install all required dependencies and
            the base shadcn components.
          </p>
          <CodeTabs />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Terminal className="h-6 w-6" />
            Install via Prompt (Cursor / Copilot)
          </h2>
          <p className="text-muted-foreground mb-4">
            Instantly add this to your project by asking your AI assistant:
          </p>
          <CodeBlock
            code={`Download the advanced calendar component from:
https://raw.githubusercontent.com/sunderlldev/date-picker-2026/main/src/components/ui/calendar.tsx
and place it in the components/ui folder.

Ensure date-fns and lucide-react are installed.`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Terminal className="h-6 w-6" />
            Manual Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            1. Make sure you have the base dependencies installed:
          </p>
          <CodeBlock code="npm install react-day-picker lucide-react date-fns" />
          <p className="text-muted-foreground mt-6 mb-4">
            2. Add the base Shadcn UI components:
          </p>
          <CodeBlock code="npx shadcn-ui@latest add button popover" />
          <p className="text-muted-foreground mt-6 mb-4">
            3. Download the modern calendar component:
          </p>
          <CodeBlock code="curl -o components/ui/calendar.tsx https://raw.githubusercontent.com/sunderlldev/shadcn-modern-date-picker/main/src/components/ui/calendar.tsx" />
        </section>
      </div>
    </div>
  );
}
