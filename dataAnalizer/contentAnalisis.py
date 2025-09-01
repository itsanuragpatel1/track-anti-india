import json
from collections import Counter
from datetime import datetime
import google.generativeai as genai


# Load the JSON data
with open("resultless.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# --- Basic Metrics ---
total_tweets = len(data)
total_likes = sum(tweet.get("likes", 0) for tweet in data)
total_comments = sum(tweet.get("replies", 0) for tweet in data)
total_retweets = sum(tweet.get("retweets", 0) for tweet in data)
total_engagement = total_likes + total_comments + total_retweets

# Estimated reach = sum of followers of all authors
total_reach_estimated = sum(tweet.get("user_followers", 0) for tweet in data)

# --- Velocity (tweets per hour) ---
# Parse timestamps
timestamps = [datetime.strptime(tweet["created_at"], "%a %b %d %H:%M:%S %z %Y") for tweet in data]
if timestamps:
    time_range = (max(timestamps) - min(timestamps)).total_seconds() / 3600
    velocity_tph = round(total_tweets / time_range, 2) if time_range > 0 else total_tweets
else:
    velocity_tph = 0

# --- Most influential persons (by followers) ---
influencers = sorted(data, key=lambda x: x.get("user_followers", 0), reverse=True)[:5]
most_influential = [{"username": t["username"], "followers": t["user_followers"]} for t in influencers]

# --- Most engaging posts ---
engaging_posts = sorted(data, key=lambda x: (x.get("likes", 0) + x.get("replies", 0) + x.get("retweets", 0)), reverse=True)[:5]
most_engaging = [{
    "id": t["id"],
    "username": t["username"],
    "engagement": t.get("likes", 0) + t.get("replies", 0) + t.get("retweets", 0)
} for t in engaging_posts]

# --- Top hashtags ---
hashtags = [h for t in data for h in t.get("hashtags", [])]
top_hashtags = [h for h, _ in Counter(hashtags).most_common(5)]

# --- Top mentioned users ---
mentions = []
for t in data:
    content = t.get("content", "")
    mentions.extend([word[1:] for word in content.split() if word.startswith("@")])
top_mentions = [m for m, _ in Counter(mentions).most_common(5)]

# --- New account ratio ---
# Define "new" as created within last 1 year of the latest tweet
if timestamps:
    latest_date = max(timestamps)
    one_year_ago = latest_date.replace(year=latest_date.year - 1)
    new_accounts = sum(1 for t in data if datetime.strptime(t["user_account_created"], "%a %b %d %H:%M:%S %z %Y") > one_year_ago)
    new_account_ratio = round(new_accounts / total_tweets, 2)
else:
    new_account_ratio = 0

# --- Final Report ---
report = {
    "total_tweets": total_tweets,
    "total_likes": total_likes,
    "total_comments": total_comments,
    "total_retweets": total_retweets,
    "total_engagement": total_engagement,
    "total_reach_estimated": total_reach_estimated,
    "velocity_tweets_per_hour": velocity_tph,
    "most_influential_persons": most_influential,
    "most_engaging_posts": most_engaging,
    "top_hashtags": top_hashtags,
    "top_mentions": top_mentions,
    "new_account_ratio": new_account_ratio
}

# Print nicely
# import pprint
# pprint.pprint(report)

#saving in json
# with open("check1.json", "w", encoding="utf-8") as f:
#     json.dump(report, f, indent=4)




# 🔑 Configure Gemini API key
genai.configure(api_key="AIzaSyAi_lb7Lt4hSIFQtI02-MvUNbQaQaU-0TE")

# Load tweets from result.json
# with open("resultless.json", "r", encoding="utf-8") as f:
#     data = json.load(f)

# Extract tweet contents
tweets = [item["content"] for item in data if "content" in item]

# Join tweets into a block
tweets_block = "\n".join([f"- {t}" for t in tweets])


# Build the prompt (no system role since Gemini doesn't support it)
prompt = f"""
You are a senior social-media campaign analyst. 
You will receive a collection of tweets about a single campaign. 
Work ONLY with the provided texts (no external sources, no hallucination). 
Be robust to Hinglish, slang, emojis, and sarcasm. 

Your task: analyze the tweets collectively at the CAMPAIGN level (not individual tweets). 

Focus on whether the campaign harms India in any way. 
Identify coordination only from text-level signals (duplicate phrases, repeated hashtags, copy-paste slogans). 
Respect free speech — you are only analyzing harmful/coordinated activity, not recommending action.

TWEETS:
{tweets_block}

INSTRUCTIONS:
Analyze the tweets collectively (campaign-level), not individually.

Infer coordination ONLY from text-level signals (duplicate phrases, identical hashtag sets, repeated CTAs, templated slogans, copy-paste text, near-duplicate wording).

Evaluate harms to India across possible dimensions: social cohesion, institutional trust, public safety, economic/diplomatic reputation, communal tension, and national security.

Avoid hallucination. If evidence is weak, say so.

Output STRICT JSON matching the schema below. Do NOT include any prose outside the JSON.

OUTPUT STRICTLY IN THIS JSON FORMAT (no extra text):

{{
  "campaign_summary": "string",
  "potential_harms": ["string"],
  "top_talking_points": ["string"],
  "anti_india_indicators": ["string"],
  "coordination_indicators": ["string"],
  "risk_score": 0-100
}}
"""



# Call Gemini
model = genai.GenerativeModel("gemini-2.0-flash")
response = model.generate_content(prompt)

# Save the response to a JSON file
# output_file = "check2.json"
# with open(output_file, "w", encoding="utf-8") as f:
#     f.write(response.text)

# Print the response
# print(response.text)


# Clean Gemini response text
raw_text = response.text.strip()
if raw_text.startswith("```json"):
    raw_text = raw_text[len("```json"):].strip()
if raw_text.endswith("```"):
    raw_text = raw_text[:-3].strip()

gemini_data = json.loads(raw_text)

# Merge flat (Gemini keys overwrite report keys if duplicate)
final_data = {**report, **gemini_data}

# Save only final merged JSON
with open("final_report.json", "w", encoding="utf-8") as f:
    json.dump(final_data, f, indent=4, ensure_ascii=False)

print("✅ Final JSON saved as final_report.json")
