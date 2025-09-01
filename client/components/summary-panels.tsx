"use client"

import { Card } from "@/components/ui/card"

export function SummaryPanel({
  summary,
  talkingPoints,
  harms,
}: {
  summary: string
  talkingPoints: string[]
  harms: string[]
}) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="p-4 bg-card text-card-foreground border border-border md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Campaign summary</h3>
        <p className="text-sm leading-relaxed text-foreground">{summary}</p>
      </Card>
      <Card className="p-4 bg-card text-card-foreground border border-border">
        <h3 className="text-lg font-semibold mb-2 text-accent">Potential harms</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          {harms.map((h, i) => (
            <li key={i} className="text-foreground">{h}</li>
          ))}
        </ul>
      </Card>
      <Card className="p-4 bg-card text-card-foreground border border-border md:col-span-3">
        <h3 className="text-lg font-semibold mb-2">Top talking points</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          {talkingPoints.map((t, i) => (
            <li key={i} className="text-foreground">{t}</li>
          ))}
        </ul>
      </Card>
    </section>
  )
}
