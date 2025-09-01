"use client"

import { Card } from "@/components/ui/card"

type Stat = {
  label: string
  value: string | number
  sub?: string
  variant?: "primary" | "accent" | "default"
}

export function MetricsGrid({ items }: { items: Stat[] }) {
  const tone: Record<NonNullable<Stat["variant"]>, string> = {
    primary: "text-primary",
    accent: "text-accent",
    default: "text-foreground",
  }

  return (
    <section aria-label="Key metrics" className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((s, i) => (
        <Card key={i} className="p-4 bg-card text-card-foreground border border-border">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-semibold ${tone[s.variant || "default"]}`}>{s.value}</p>
            {s.sub ? <p className="text-xs text-muted-foreground">{s.sub}</p> : null}
          </div>
        </Card>
      ))}
    </section>
  )
}
