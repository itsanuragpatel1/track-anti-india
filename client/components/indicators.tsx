"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { maskSensitive } from "./campaign-data"
import { Button } from "@/components/ui/button"

function List({ title, items, masked }: { title: string; items: string[]; masked: boolean }) {
  const display = masked ? items.map(maskSensitive) : items
  return (
    <Card className="p-4 bg-card text-card-foreground border border-border">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        {display.map((t, i) => (
          <li key={i} className="text-foreground">
            {t}
          </li>
        ))}
      </ul>
    </Card>
  )
}

export function IndicatorsPanel({
  antiIndicators,
  coordination,
}: {
  antiIndicators: string[]
  coordination: string[]
}) {
  const [masked, setMasked] = useState(true)
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Indicators</h2>
        <Button variant="outline" onClick={() => setMasked((v) => !v)}>
          {masked ? "Show raw text" : "Mask sensitive text"}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <List title="Anti-India indicators" items={antiIndicators} masked={masked} />
        <List title="Coordination indicators" items={coordination} masked={masked} />
      </div>
      <p className="text-xs text-muted-foreground">
        Content safety: potentially sensitive or offensive text is masked by default. Toggle to review raw strings for
        auditing.
      </p>
    </section>
  )
}
