import { sampleCampaignData } from "@/components/campaign-data"
import { IndicatorsPanel } from "@/components/indicators"
import Link from "next/link"

export default function IndicatorsPage() {
  const d = sampleCampaignData
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-extrabold">
              Indicators — <span className="text-primary">TrackAntiIndia</span>
            </h1>
            <p className="text-sm text-muted-foreground">Campaign: {d.campaign_hashtag}</p>
          </div>
          <Link href="/trackantiindia" className="text-sm text-primary underline">
            Back to dashboard
          </Link>
        </header>
        <IndicatorsPanel antiIndicators={d.anti_india_indicators} coordination={d.coordination_indicators} />
      </div>
    </main>
  )
}
