# Shadcn Modern Date Picker

A beautifully designed, modern date picker component built on top of [shadcn/ui](https://ui.shadcn.com/) and [react-day-picker](https://react-day-picker.js.org/) v9.

Unlike the default `react-day-picker` dropdowns which rely on native HTML `<select>` elements, this component introduces a seamless, inline view-switching architecture. Users can rapidly navigate through years and months via dedicated grid views, providing an experience similar to native iOS/Android date pickers—all without leaving the context of the popover.

## ✨ Features

- **Days View**: The classic day picker you know and love.
- **Months View**: A clean 3x4 grid for quick month selection.
- **Years View**: A paginated 4x3 grid for decade-hopping and rapid year selection.
- **Zero Native Dropdowns**: Replaces clumsy native `<select>` dropdowns with fluid UI state transitions.
- **V9 Ready**: Fully compatible with the new event architecture of `react-day-picker` v9.
- **100% Shadcn Native**: Uses your existing CSS variables, `Button` components, and utility classes.

## 🚀 Installation

### 1. Install via Shadcn CLI (Recommended)

```bash
npx shadcn@latest add https://shadcn-modern-date-picker.vercel.app/r/date-picker.json
```

### 2. Install via Prompt (Cursor / v0 / Copilot)
You can instantly install this component by pasting the following prompt into your AI assistant:

```text
Download the modern calendar component from:
https://raw.githubusercontent.com/sunderlldev/shadcn-modern-date-picker/main/src/components/ui/calendar.tsx
and place it in the components/ui folder.

Ensure date-fns and lucide-react are installed.
```

### 3. Manual Installation

Ensure you have the base dependencies installed in your Shadcn project:
```bash
npm install react-day-picker lucide-react date-fns
```

Make sure you have the standard `Button` and `Popover` components from shadcn/ui:
```bash
npx shadcn@latest add button popover
```

Copy the provided `src/components/ui/calendar.tsx` file into your project's `components/ui/` directory. You can safely overwrite the default shadcn calendar, as this version remains 100% backwards compatible.

## 💻 Usage

Use the component exactly as you would the standard Shadcn Calendar. To activate the advanced year/month grid views, simply pass the `captionLayout="dropdown"` prop.

```tsx
"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-70 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  )
}
```

## 🧠 Why this architecture?

If you've tried overriding `components={{ MonthCaption: ... }}` in `react-day-picker` v9 to build your own custom dropdowns, you likely ran into issues with clicks being swallowed by the library's internal event listeners. 

This component solves the issue by breaking out of the DayPicker DOM entirely when rendering the Month and Year views. By conditionally rendering standalone `MonthsView` and `YearsView` wrappers *outside* the DayPicker instance, we maintain perfect event isolation while preserving the exact layout constraints and class names of the original Shadcn configuration.

## 🤝 Contributing

Contributions are welcome :) Please feel free to submit a Pull Request.

<p align="center">
  Made by Juan Blas 👋
</p>
