import { sampleCampaignData } from "@/components/campaign-data"
import { MetricsGrid } from "@/components/metrics-cards"
import { EngagementPie } from "@/components/engagement-pie"
import { RiskGauge } from "@/components/risk-gauge"
import { InfluencersList, TopPosts } from "@/components/leaderboards"
import { ChipsPanel } from "@/components/chips"
import { SummaryPanel } from "@/components/summary-panels"
import { VelocityCard } from "@/components/velocity-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  const d = sampleCampaignData
  const stats = [
    { label: "Total tweets", value: Intl.NumberFormat().format(d.total_tweets), variant: "primary" as const },
    { label: "Total reach (est.)", value: Intl.NumberFormat().format(d.total_reach_estimated), sub: "Impressions" },
    { label: "Total engagement", value: Intl.NumberFormat().format(d.total_engagement) },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-display font-extrabold text-balance">
            <span className="text-primary">TrackAntiIndia</span> — Campaign Analyzer
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{d.campaign_hashtag}</span>
            <Link href="/trackantiindia/indicators">
              <Button variant="outline" className="text-xs bg-transparent">
                View indicators
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        <MetricsGrid items={stats} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <EngagementPie likes={d.total_likes} comments={d.total_comments} retweets={d.total_retweets} />
          <RiskGauge score={d.risk_score} />
          <VelocityCard velocityPerHour={d.velocity_tweets_per_hour} newAccountRatio={d.new_account_ratio} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InfluencersList items={d.most_influential_persons} />
          <TopPosts items={d.most_engaging_posts} />
          <div className="flex flex-col gap-4">
            <ChipsPanel title="Top hashtags" items={d.top_hashtags.map((h) => (h.startsWith("#") ? h : `#${h}`))} />
            <ChipsPanel title="Top mentions" items={d.top_mentions.map((m) => `@${m}`)} />
          </div>
        </div>

        <SummaryPanel summary={d.campaign_summary} talkingPoints={d.top_talking_points} harms={d.potential_harms} />
      </section>
    </main>
  )
}
