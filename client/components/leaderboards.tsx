"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Influencer = { username: string; followers: number }
type EngagingPost = { id: string; username: string; engagement: number }

function initials(u: string) {
  return u
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("")
}

export function InfluencersList({ items }: { items: Influencer[] }) {
  return (
    <Card className="p-4 bg-card text-card-foreground border border-border">
      <h3 className="text-lg font-semibold mb-2">Most influential</h3>
      <ul className="flex flex-col gap-3">
        {items.map((it, i) => (
          <li key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{initials(it.username)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">@{it.username}</p>
                <p className="text-xs text-muted-foreground">{Intl.NumberFormat().format(it.followers)} followers</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">#{i + 1}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export function TopPosts({ items }: { items: EngagingPost[] }) {
  return (
    <Card className="p-4 bg-card text-card-foreground border border-border">
      <h3 className="text-lg font-semibold mb-2">Top posts by engagement</h3>
      <ul className="flex flex-col gap-3">
        {items.map((it, i) => {
          const url = `https://x.com/${it.username}/status/${it.id}`
          return (
            <li key={i} className="flex items-center justify-between">
              <div className="flex flex-col">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  @{it.username}
                </a>
                <p className="text-xs text-muted-foreground">ID: {it.id}</p>
              </div>
              <p className="text-sm text-muted-foreground">{Intl.NumberFormat().format(it.engagement)} engagement</p>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
