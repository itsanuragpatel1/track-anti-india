"use client"

import { Card } from "@/components/ui/card"
import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts"
import { useMemo } from "react"

export function RiskGauge({ score }: { score: number }) {
  const clamp = Math.max(0, Math.min(100, score))
  const { ok, high } = useMemo(() => {
    if (typeof window === "undefined") return { ok: "#10b981", high: "#ec4899" }
    const cs = getComputedStyle(document.documentElement)
    return {
      ok: cs.getPropertyValue("--color-chart-5").trim() || "#10b981",
      high: cs.getPropertyValue("--color-accent").trim() || "#ec4899",
    }
  }, [])
  const data = [{ name: "Risk", value: clamp, fill: clamp >= 60 ? high : ok }]

  return (
    <Card className="p-4 bg-card text-card-foreground border border-border">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Risk score</h3>
        <span className="text-sm text-muted-foreground">0-100</span>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="70%" outerRadius="100%" startAngle={180} endAngle={0} data={data}>
            <RadialBar dataKey="value" cornerRadius={8} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center text-2xl font-bold">
        <span className={clamp >= 60 ? "text-accent" : "text-primary"}>{clamp}</span>
      </p>
      <p className="text-center text-sm text-muted-foreground">
        {clamp >= 60 ? "Elevated coordination/harms indicators detected" : "Low to moderate risk"}
      </p>
    </Card>
  )
}
