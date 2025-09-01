"use client"

import { Card } from "@/components/ui/card"

export function ChipsPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="p-4 bg-card text-card-foreground border border-border">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs bg-secondary text-secondary-foreground"
          >
            {t.startsWith("#") || t.startsWith("@") ? t : `#${t}`}
          </span>
        ))}
      </div>
    </Card>
  )
}
