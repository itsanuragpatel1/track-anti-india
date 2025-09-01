import praw
import pandas as pd
import os

keyword = "#BoycottBCCI"  
subreddit = reddit.subreddit("all") 


results = subreddit.search(keyword, sort="new", limit=2000)


data = []
for submission in results:
    data.append({

    "id": submission.id,
    "title": submission.title,
    "selftext": submission.selftext,
    "created_utc": submission.created_utc,
    "score": submission.score,
    "upvote_ratio": submission.upvote_ratio,
    "num_comments": submission.num_comments,
    "flair": submission.link_flair_text,
    "is_self": submission.is_self,
    "is_video": submission.is_video,
    "spoiler": submission.spoiler,
    "edited": submission.edited,
    "over_18": submission.over_18,
    "permalink": f"https://reddit.com{submission.permalink}",

    
    "author_id": getattr(submission.author, "id", None),
    "author_name": str(submission.author),
    "author_created_utc": getattr(submission.author, "created_utc", None),
    "author_link_karma": getattr(submission.author, "link_karma", None),
    "author_comment_karma": getattr(submission.author, "comment_karma", None),
    "author_is_mod": getattr(submission.author, "is_mod", None),

   
    "subreddit_id": submission.subreddit.id,
    "subreddit_name": str(submission.subreddit),
    "subreddit_subscribers": submission.subreddit.subscribers,
    "subreddit_active_users": getattr(submission.subreddit, "active_user_count", None),
    "subreddit_over18": submission.subreddit.over18,
    "subreddit_created_utc": submission.subreddit.created_utc,
})



df = pd.DataFrame(data)


json_path = os.path.join(os.getcwd(), "reddit_data.json")

df.to_json(json_path, orient="records", indent=2)

if os.path.exists(json_path):
    print(f"✓ Success! Saved {len(df)} posts containing keyword '{keyword}'")
    print(f"✓ JSON file saved at: {json_path}")
else:
    print("✗ Error: JSON file was not created. Check write permissions.")
