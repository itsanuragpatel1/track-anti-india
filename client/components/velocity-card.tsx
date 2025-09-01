"use client"

import { Card } from "@/components/ui/card"

export function VelocityCard({
  velocityPerHour,
  newAccountRatio,
}: {
  velocityPerHour: number
  newAccountRatio: number
}) {
  const suspicious = newAccountRatio >= 0.1
  return (
    <Card className="p-4 bg-card text-card-foreground border border-border">
      <h3 className="text-lg font-semibold mb-2">Velocity & provenance</h3>
      <div className="space-y-2 text-sm">
        <p className="text-foreground">
          Tweets per hour: <span className="font-medium text-primary">{velocityPerHour.toFixed(2)}</span>
        </p>
        <p className="text-foreground">
          New account ratio:{" "}
          <span className={suspicious ? "text-accent font-medium" : "text-primary font-medium"}>
            {(newAccountRatio * 100).toFixed(1)}%
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          New account ratio approximates potential inorganic activity (higher can indicate coordination).
        </p>
      </div>
    </Card>
  )
}
