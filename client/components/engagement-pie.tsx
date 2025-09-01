"use client"

import { useMemo } from "react"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import { Card } from "@/components/ui/card"

type Props = {
  likes: number
  comments: number
  retweets: number
}

function useChartColors() {
  return useMemo(() => {
    if (typeof window === "undefined") return ["#059669", "#ec4899", "#475569"]
    const cs = getComputedStyle(document.documentElement)
    return [
      cs.getPropertyValue("--color-chart-1").trim() || "#059669",
      cs.getPropertyValue("--color-chart-2").trim() || "#ec4899",
      cs.getPropertyValue("--color-chart-3").trim() || "#475569",
    ]
  }, [])
}

export function EngagementPie({ likes, comments, retweets }: Props) {
  const COLORS = useChartColors()
  const data = [
    { name: "Likes", value: likes },
    { name: "Comments", value: comments },
    { name: "Retweets", value: retweets },
  ]

  return (
    <Card className="p-4 bg-card text-card-foreground border border-border">
      <h3 className="text-lg font-semibold mb-2">Engagement breakdown</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={4}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
