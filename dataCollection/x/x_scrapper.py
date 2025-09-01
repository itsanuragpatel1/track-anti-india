import asyncio
import json
from twikit import Client

async def search_tweets(query, max_results=1000):
    client = Client('en-US')
    client.load_cookies("cookies.json")

    tweets = await client.search_tweet(query, product='Top', count=20)

    results = []
    for t in tweets:
        results.append({
            "id": t.id,
            "username": t.user.screen_name,
            "content": t.text,
            "likes": t.favorite_count,
            "retweets": t.retweet_count,
            "replies": t.reply_count,
            "hashtags": list(t.hashtags) if t.hashtags else [],
            "created_at": t.created_at,
            "user_followers": t.user.followers_count,
            "user_following": t.user.following_count,
            "user_tweets": t.user.statuses_count,
            "user_account_created": t.user.created_at
        })

    
    while len(results) < max_results:
        try:
            tweets = await tweets.next() 
        except Exception as e:
            print(" No more tweets or error:", e)
            break

        if not tweets:
            break

        for t in tweets:
            results.append({
                "id": t.id,
                "username": t.user.screen_name,
                "content": t.text,
                "likes": t.favorite_count,
                "retweets": t.retweet_count,
                "replies": t.reply_count,
                "hashtags": list(t.hashtags) if t.hashtags else [],
                "created_at": t.created_at,
                "user_followers": t.user.followers_count,
                "user_following": t.user.following_count,
                "user_tweets": t.user.statuses_count,
                "user_account_created": t.user.created_at
            })

        print(f"✅ Collected {len(results)} tweets so far...")

    return results[:max_results]


async def main():
    
    data = await search_tweets("#AsiaCup", max_results=1000)
    with open("results.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✅ Saved {len(data)} tweets to results.json")


if __name__ == "__main__":
    asyncio.run(main())
