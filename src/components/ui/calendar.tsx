"use client";

import * as React from "react";

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  type DayButton,
  DayPicker,
  getDefaultClassNames,
  type Locale,
} from "react-day-picker";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary! data-[selected-single=true]:text-primary-foreground! data-[range-middle=true]:bg-muted! data-[range-middle=true]:text-foreground! data-[range-start=true]:bg-primary! data-[range-start=true]:text-primary-foreground! data-[range-end=true]:bg-primary! data-[range-end=true]:text-primary-foreground! group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) [&>span]:text-xs [&>span]:opacity-70 cursor-pointer",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

function MonthsView({
  currentMonth,
  onSelect,
  onYearClick,
}: {
  currentMonth: Date;
  onSelect: (monthIndex: number) => void;
  onYearClick: () => void;
}) {
  const [year, setYear] = React.useState(currentMonth.getFullYear());

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 cursor-pointer"
          onClick={() => setYear((y) => y - 1)}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="h-7 px-2 text-sm font-medium cursor-pointer"
          onClick={() => onYearClick()}
        >
          {year}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 cursor-pointer"
          onClick={() => setYear((y) => y + 1)}
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {MONTHS.map((label, i) => (
          <Button
            key={label}
            type="button"
            variant={
              currentMonth.getMonth() === i &&
              currentMonth.getFullYear() === year
                ? "default"
                : "ghost"
            }
            className="h-9 font-normal text-sm cursor-pointer"
            onClick={() => onSelect(i + year * 100)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function YearsView({
  currentMonth,
  onSelect,
  onBack,
}: {
  currentMonth: Date;
  onSelect: (year: number) => void;
  onBack: () => void;
}) {
  const [page, setPage] = React.useState(
    () => Math.floor(currentMonth.getFullYear() / 12) * 12,
  );

  const years: number[] = [];
  for (let y = page; y < page + 12; y++) years.push(y);

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 cursor-pointer"
          onClick={() => setPage((p) => p - 12)}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="h-7 px-2 text-sm font-medium cursor-pointer"
          onClick={onBack}
        >
          {page} – {page + 11}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 cursor-pointer"
          onClick={() => setPage((p) => p + 12)}
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {years.map((y) => (
          <Button
            key={y}
            type="button"
            variant={currentMonth.getFullYear() === y ? "default" : "ghost"}
            className="h-9 font-normal text-sm cursor-pointer"
            onClick={() => onSelect(y)}
          >
            {y}
          </Button>
        ))}
      </div>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();
  const isDropdown = captionLayout === "dropdown";

  const [month, setMonth] = React.useState<Date>(
    props.defaultMonth ?? props.month ?? new Date(),
  );
  const [view, setView] = React.useState<"days" | "months" | "years">("days");

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (props.month) setMonth(props.month);
  }, [props.month]);

  const handleMonthSelect = React.useCallback(
    (encoded: number) => {
      const monthIdx = encoded % 100;
      const year = Math.floor(encoded / 100);
      const next = new Date(month);
      next.setFullYear(year);
      next.setMonth(monthIdx);
      setMonth(next);
      setView("days");
    },
    [month],
  );

  const handleYearSelect = React.useCallback(
    (year: number) => {
      const next = new Date(month);
      next.setFullYear(year);
      setMonth(next);
      setView("months");
    },
    [month],
  );

  // ---- Dropdown mode: render months/years views ----
  if (isDropdown && view === "months") {
    return (
      <div data-slot="calendar" className={cn("bg-background", className)}>
        <MonthsView
          currentMonth={month}
          onSelect={handleMonthSelect}
          onYearClick={() => setView("years")}
        />
      </div>
    );
  }

  if (isDropdown && view === "years") {
    return (
      <div data-slot="calendar" className={cn("bg-background", className)}>
        <YearsView
          currentMonth={month}
          onSelect={handleYearSelect}
          onBack={() => setView("days")}
        />
      </div>
    );
  }

  const dropdownOverrides = isDropdown
    ? {
        month,
        onMonthChange: setMonth,
        hideNavigation: true,
      }
    : {};

  const dropdownClassOverrides = isDropdown
    ? {
        month_caption: "hidden",
      }
    : {};

  return (
    <div data-slot="calendar" className={cn("bg-background", className)}>
      {isDropdown && (
        <div className="flex items-center justify-between px-3 pt-3 pb-0">
          <Button
            type="button"
            variant={buttonVariant}
            size="icon"
            className="size-(--cell-size) p-0 cursor-pointer"
            onClick={() => {
              const next = new Date(month);
              next.setMonth(next.getMonth() - 1);
              setMonth(next);
            }}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              className="h-7 px-2 text-sm font-medium cursor-pointer"
              onClick={() => setView("months")}
            >
              {month.toLocaleString(locale?.code, { month: "long" })}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-7 px-2 text-sm font-medium cursor-pointer"
              onClick={() => setView("years")}
            >
              {month.getFullYear()}
            </Button>
          </div>

          <Button
            type="button"
            variant={buttonVariant}
            size="icon"
            className="size-(--cell-size) p-0 cursor-pointer"
            onClick={() => {
              const next = new Date(month);
              next.setMonth(next.getMonth() + 1);
              setMonth(next);
            }}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      )}

      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn(
          "p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] group/calendar",
          String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
          String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        )}
        captionLayout="label"
        locale={locale}
        formatters={{
          formatMonthDropdown: (date) =>
            date.toLocaleString(locale?.code, { month: "short" }),
          ...formatters,
        }}
        classNames={{
          root: cn("w-fit", defaultClassNames.root),
          months: cn(
            "flex gap-4 flex-col md:flex-row relative",
            defaultClassNames.months,
          ),
          month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
          nav: cn(
            "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
            defaultClassNames.nav,
          ),
          button_previous: cn(
            buttonVariants({ variant: buttonVariant }),
            "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none cursor-pointer",
            defaultClassNames.button_previous,
          ),
          button_next: cn(
            buttonVariants({ variant: buttonVariant }),
            "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none cursor-pointer",
            defaultClassNames.button_next,
          ),
          month_caption: cn(
            "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
            defaultClassNames.month_caption,
          ),
          dropdowns: cn(
            "w-full flex items-center text-sm justify-center h-(--cell-size) gap-1.5",
            defaultClassNames.dropdowns,
          ),
          dropdown_root: cn(
            "relative rounded-(--cell-radius)",
            defaultClassNames.dropdown_root,
          ),
          dropdown: cn(
            "absolute bg-popover inset-0 opacity-0",
            defaultClassNames.dropdown,
          ),
          caption_label: cn(
            "select-none",
            captionLayout === "label"
              ? "text-sm"
              : "rounded-(--cell-radius) flex items-center gap-1 text-sm [&>svg]:text-muted-foreground [&>svg]:size-3.5",
            defaultClassNames.caption_label,
          ),
          month_grid: cn(
            "w-full border-collapse",
            defaultClassNames.month_grid,
          ),
          weekdays: cn("flex", defaultClassNames.weekdays),
          weekday: cn(
            "text-muted-foreground rounded-(--cell-radius) flex-1 font-normal text-[0.8rem] select-none",
            defaultClassNames.weekday,
          ),
          week: cn("flex w-full mt-2", defaultClassNames.week),
          week_number_header: cn(
            "select-none w-(--cell-size)",
            defaultClassNames.week_number_header,
          ),
          week_number: cn(
            "text-[0.8rem] select-none text-muted-foreground",
            defaultClassNames.week_number,
          ),
          day: cn(
            "relative w-full rounded-(--cell-radius) h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius) group/day aspect-square select-none",
            props.showWeekNumber
              ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)"
              : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
            defaultClassNames.day,
          ),
          range_start: cn(
            "rounded-l-(--cell-radius) bg-muted relative after:bg-muted after:absolute after:inset-y-0 after:w-4 after:right-0 z-0 isolate",
            defaultClassNames.range_start,
          ),
          range_middle: cn("rounded-none", defaultClassNames.range_middle),
          range_end: cn(
            "rounded-r-(--cell-radius) bg-muted relative after:bg-muted after:absolute after:inset-y-0 after:w-4 after:left-0 z-0 isolate",
            defaultClassNames.range_end,
          ),
          today: cn(
            "bg-muted text-foreground rounded-(--cell-radius) data-[selected=true]:rounded-none",
            defaultClassNames.today,
          ),
          outside: cn(
            "text-muted-foreground aria-selected:text-muted-foreground",
            defaultClassNames.outside,
          ),
          disabled: cn(
            "text-muted-foreground opacity-50",
            defaultClassNames.disabled,
          ),
          hidden: cn("invisible", defaultClassNames.hidden),
          ...classNames,
          ...dropdownClassOverrides,
        }}
        components={{
          Chevron: ({ className, orientation, ...chevronProps }) => {
            if (orientation === "left") {
              return (
                <ChevronLeftIcon
                  className={cn("size-4", className)}
                  {...chevronProps}
                />
              );
            }
            if (orientation === "right") {
              return (
                <ChevronRightIcon
                  className={cn("size-4", className)}
                  {...chevronProps}
                />
              );
            }
            return (
              <ChevronDownIcon
                className={cn("size-4", className)}
                {...chevronProps}
              />
            );
          },
          DayButton: (btnProps) => (
            <CalendarDayButton locale={locale} {...btnProps} />
          ),
          WeekNumber: ({ children, ...wnProps }) => (
            <td {...wnProps}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          ),
          ...components,
        }}
        {...props}
        {...dropdownOverrides}
      />
    </div>
  );
}

export { Calendar, CalendarDayButton };
