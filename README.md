# TRACK-ANTI-INDIA

A project that collects social posts (Reddit, X) and analyzes them to detect possible anti-India campaigns.
This repo contains a Next.js frontend (client/) and the data tools (collectors + analyzer) under dataCollection/ and dataAnalyzer/.


## Overview

This project aims to collect and analyze social media posts from Reddit and X (formerly Twitter) to identify and summarize potential anti-India campaigns through data analysis.

### Workflow

1. **Collection**: Fetch posts from social platforms
2. **Storage**: Save raw data in JSON format
3. **Analysis**: Process using Python (LLM/rules-based)
4. **Visualization**: Display results via Next.js frontend


# Repo structure

```
TRACK-ANTI-INDIA/
├── client/                  # Next.js frontend application
├── dataCollection/          # Data collection tools
│   ├── reddit/
│   │   ├── redditScrapper.py   # Reddit data fetcher
│   │   └── reddit_data.json    # Collected Reddit data
│   └── x/
│       ├── xScrapper.py        # X (Twitter) data fetcher
│       └── results.json        # Collected X data
└── dataAnalyzer/           # Analysis components
    ├── contentAnalisis.py  # Data analysis logic
    └── analisisResult.json # Analysis results
```



## Components

### Frontend
- Located in `client/`
- Built with Next.js
- Currently static, can be connected to analyzer via API

### Data Collection
- Scripts to fetch data from:
  - Reddit (`dataCollection/reddit/`)
  - X/Twitter (`dataCollection/x/`)
- Raw data stored in JSON format

### Data Analysis
- Python-based analyzer using LLM and rule-based approaches
- Processes collected data and generates summary reports



## Future Improvements

- API integration between frontend and analyzer
- Enhanced visualization features