export type Influencer = {
  username: string
  followers: number
}

export type EngagingPost = {
  id: string
  username: string
  engagement: number
}

export type CampaignData = {
  campaign_hashtag: string
  total_tweets: number
  total_likes: number
  total_comments: number
  total_retweets: number
  total_engagement: number
  total_reach_estimated: number
  velocity_tweets_per_hour: number
  most_influential_persons: Influencer[]
  most_engaging_posts: EngagingPost[]
  top_hashtags: string[]
  top_mentions: string[]
  new_account_ratio: number
  campaign_summary: string
  potential_harms: string[]
  top_talking_points: string[]
  anti_india_indicators: string[]
  coordination_indicators: string[]
  risk_score: number
}

export function maskSensitive(input: string) {
  const patterns: Array<[RegExp, string]> = [/\bfuck\b/gi, /\bwhore\b/gi].map(
    (re) => [re, (m: string) => m[0] + "*".repeat(Math.max(0, m.length - 1))] as unknown as [RegExp, string],
  )
  return patterns.reduce((txt, [re, sub]) => txt.replace(re, sub), input)
}

export const sampleCampaignData: CampaignData = {
  campaign_hashtag: "#AsiaCup2025",
  total_tweets: 580,
  total_likes: 382798,
  total_comments: 24547,
  total_retweets: 31584,
  total_engagement: 438929,
  total_reach_estimated: 681023780,
  velocity_tweets_per_hour: 0.02,
  most_influential_persons: [
    { username: "sachin_rt", followers: 40865983 },
    { username: "BCCI", followers: 27735181 },
    { username: "BCCI", followers: 27735180 },
    { username: "BCCI", followers: 27735180 },
    { username: "BCCI", followers: 27735180 },
  ],
  most_engaging_posts: [
    { id: "1568171410400452610", username: "rashidkhan_19", engagement: 78116 },
    { id: "1701148716311449799", username: "sachin_rt", engagement: 51046 },
    { id: "1957734682218373496", username: "BCCI", engagement: 40315 },
    { id: "1957738817525272849", username: "BCCI", engagement: 39753 },
    { id: "1957730261296111733", username: "BCCI", engagement: 18164 },
  ],
  top_hashtags: ["AsiaCup", "AsiaCup2025", "TeamIndia", "Cricket", "ShreyasIyer"],
  top_mentions: ["BCCI", "FIBAAsiaCup", "BoriaMajumdar", "anjanaomkashyap", "ESPNAusNZ"],
  new_account_ratio: 0.05,
  campaign_summary:
    "The tweets revolve around the selection of the Indian cricket team for the upcoming Asia Cup 2025, expressing strong opinions about player selections, the BCCI's decisions, and India's participation in the tournament, especially considering that Pakistan is also participating. A significant portion of the tweets criticize the BCCI for prioritizing financial gains over national sentiment, given the strained relationship between India and Pakistan.",
  potential_harms: [
    "Erosion of trust in the Board of Control for Cricket in India (BCCI) and government institutions.",
    "Incitement of communal tension due to the India-Pakistan rivalry being framed as a betrayal of national interests.",
    "Damage to India's reputation if the campaign leads to a boycott or tarnishes the image of Indian cricket.",
  ],
  top_talking_points: [
    "Controversy surrounding the selection/rejection of specific players (Shreyas Iyer, Shubman Gill, Yashasvi Jaiswal).",
    "Allegations of bias and unfairness in team selection by Gautam Gambhir and the BCCI.",
    "Ethical concerns about playing cricket with Pakistan, given ongoing tensions and terrorist activities.",
    "Accusations of the BCCI being 'Deshdrohi' (traitorous) for prioritizing money over national sentiment.",
    "Debate on whether sports and politics should be mixed.",
    "Discussion around Shubman Gill being made vice-captain",
    "Comparisons of players from various sports league",
  ],
  anti_india_indicators: [
    "Use of the hashtag #DeshdrohiBCCI.",
    "Accusations that the BCCI is bidding for the blood of martyrs.",
    "Statements suggesting that playing with Pakistan is an act of treason.",
    "Claims that BCCI and the Indian government only care about money.",
    "Framing the BCCI as acting against national interests and security.",
    "Accusations of 'shame on BCCI and Indian Govt'.",
    "Assertion that Team India is acting like a 'hopeless whore'.",
    "Assertion that the real traitor is Jay Shah (Amit Shah's son)",
    "Questions about why Bollywood gets more boycott movement than cricket with Pakistan",
  ],
  coordination_indicators: [
    'Repetition of the phrase "Fuck BCCI".',
    "Frequent use of the hashtags #DeshdrohiBCCI, #AsiaCup, #BoycottAsiaCup, and #AsiaCup2025.",
    'Copy-pasted text: "India and Pakistan won’t play any bilateral sports. But India will still take part in the upcoming Asia Cup".',
    'Copy-pasted text: "खून और पानी एक साथ नहीं बह सकते लेकिन क्रिकेट अलग है!!" (Blood and water cannot flow together, but cricket is different!!).',
    "Like & Retweet call to actions",
    "Repetition of the slogan : Team India, under their coach Gautam Gambhir will play #AsiaCup against Pakistan",
  ],
  risk_score: 65,
}
