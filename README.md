# PFT-Finance — Setup Guide

## Why PFT-Finance instead of a budgeting app from the App Store?

Most budgeting apps ask you to hand your financial data to a company's servers, then charge you a monthly subscription to keep seeing your own numbers. PFT-Finance works differently:

- **You own your data, literally.** Every rupee you log is stored in a private GitHub Gist that belongs to *your* GitHub account — not on a company's servers, not sold to advertisers, not held hostage behind a paywall. You can open that Gist yourself anytime and see the exact raw data.
- **Free, forever, with no catch.** No subscription, no "premium tier," no ads. GitHub Pages (which hosts the app) and Gists (which store your data) are both free for personal use.
- **Nothing is hidden from you.** The entire app is open source — every line of code that touches your money is right there in this repository for you (or anyone you trust) to read. No mystery data collection.
- **A real bank-statement feel.** Every deposit and spend can carry a note, shows up with a timestamp, and nothing is ever silently deleted — correcting a mistake adds a reversing entry next to the original, exactly like a real bank statement, so your history always tells the truth.
- **Installs like a real app.** Once set up, it lives on your home screen with its own icon — no browser tabs, no bookmarks to dig through.
- **Category budgets that actually reset.** Set a monthly budget per category (food, rent, etc.) and it automatically refreshes at the start of each month, so you always know what's left to spend.
- **Built for privacy-conscious control**, not for growth metrics. There's no company on the other end trying to keep you "engaged" — it's just your ledger, doing exactly what a ledger should.

## The actual problem this solves: your bank balance alone is a black box

Knowing you have ₹30,000 in the bank tells you almost nothing about whether you're on track. It's one number covering rent, food, going out, travel, everything — mixed together. You can't tell if you're overspending on one thing until it's too late, because the overall number just quietly goes down and you don't know *which* habit is draining it.

Panda Ledger fixes this by splitting your money into **categories with their own budget**, so you get visibility into each spending habit separately instead of one opaque total.

**Example:** Say you set ₹4,500 for Food and ₹2,000 for Travel this month.
- If Travel is sitting at ₹1,800 left by the 10th of the month, that's a clear, early signal: you've been taking cabs too often. You can consciously switch to the metro for the rest of the month instead of finding out on the 28th that you're broke and not knowing why.
- Meanwhile Food might still have ₹3,200 left — completely healthy — but your *total* bank balance wouldn't have told you that Travel specifically was the problem. It would've just looked like "money going down," with no clue where to course-correct.

That's the core idea: instead of one black-box number, you get per-category visibility that tells you *where* to adjust your behavior, not just *that* you need to.

The tradeoff is honest: this takes about 15 minutes to set up yourself (rather than tapping "Sign up" on an app store listing), because you're the one who owns the pieces instead of a company owning them for you. The rest of this guide walks through that setup, one small step at a time.

---

PFT-Finance is a personal budgeting app that lives in your web browser but installs like a real app on your phone. Your data is stored privately in a GitHub Gist (a small private notebook GitHub gives every account), so it stays yours and syncs across devices.

This guide assumes you've never done anything like this before. Just follow the steps in order — don't skip any.

You'll need:
- A free GitHub account (sign up at [github.com](https://github.com) if you don't have one)
- About 15 minutes
- Your phone, with Chrome installed (Android) or Safari (iPhone)

---

## Step 1 — Get your own copy of the app

1. Open the app's GitHub repository page in your browser (the link your friend/developer gave you).
2. Near the top-right of the page, click the **Fork** button. This creates your own personal copy of the app under your GitHub account.
3. On the page that appears, just click **Create fork**. Wait a few seconds — it'll take you to your new copy.

You now own a copy of the app that only you control.

## Step 2 — Turn on GitHub Pages (this puts your app on the internet)

1. On your forked repo's page, click **Settings** (near the top, it has a gear icon).
2. In the left sidebar, click **Pages**.
3. Under "Build and deployment", find the dropdown that says **Branch**. Change it from "None" to **main**, leave the folder as **/ (root)**, then click **Save**.
4. Wait about 1–2 minutes, then refresh the page. You'll see a message like:
   > Your site is live at `https://yourusername.github.io/PFT-finance/`

That link is now your personal, working copy of the app. Save/bookmark it — you'll open it on your phone in Step 5.

## Step 3 — Create your private data notebook (a "Gist")

This is where your budget numbers and transactions actually get saved.

1. Go to [gist.github.com](https://gist.github.com) (make sure you're logged into GitHub).
2. In the **filename** box, type exactly: `gist.json`
3. In the big text box below, paste exactly this starter content (you can change the numbers later in the app, this is just to get started):

   ```json
   {
     "metadata": {
       "last_refresh": "2026-07"
     },
     "bank_balance": 0,
     "categories": {
       "food": {
         "name": "Food",
         "allocated_budget": 3000,
         "current_balance": 3000
       }
     },
     "transactions": []
   }
   ```

4. Click the dropdown next to the green button at the bottom — choose **Create secret gist** (not "public"). Secret means only people with the exact link can see it — it keeps your finances private.
5. Once created, look at the address bar of your browser. The URL will look like:
   `https://gist.github.com/yourusername/9f3c1a7e2b5d4681c0a9e3f7`
6. The long string of letters and numbers at the end (`9f3c1a7e2b5d4681c0a9e3f7` in this example) is your **Gist ID**. Copy it somewhere safe (like a Notes app) — you'll need it in Step 5.

## Step 4 — Create your access key (a "Personal Access Token")

This is like a special password that lets the app read and update your Gist. Only you will ever see it.

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens).
2. Click **Generate new token**, then choose **Generate new token (classic)**.
3. Under "Note", type something like `PFT-Finance Access`.
4. Under "Expiration", choose **No expiration** (or a long duration like 1 year — your choice).
5. Scroll down to the list of checkboxes. Find the one called **gist** and check it. Leave everything else unchecked.
6. Scroll to the bottom and click **Generate token**.
7. GitHub will show you a long code starting with `ghp_...`. **Copy it immediately and save it somewhere safe** (like the same Notes app). GitHub will never show you this exact code again — if you lose it, you'll have to make a new one.

⚠️ Treat this code like a password. Don't share it or post it anywhere public.

## Step 5 — Connect the app to your data

1. On your phone, open Chrome (or Safari on iPhone) and go to the link you saved in Step 2 (`https://yourusername.github.io/PFT-finance/`).
2. The app will ask you to connect. Tap into the first box and paste your access key from Step 4 (the `ghp_...` code).
3. Tap into the second box and paste your Gist ID from Step 3 (the short code from the gist URL).
4. Tap **Connect Database**.
5. If everything was entered correctly, your budget categories will appear on screen. 🎉

If you see a red error message instead, it will tell you exactly what's wrong (usually a typo in one of the two codes — just double check and try again).

## Step 6 — Install it on your phone like a real app

**On Android (Chrome):**
1. With the app open, look at the top of the screen for a small **download/install icon** (⇩) — tap it.
2. Tap **Install** when Chrome asks for confirmation.
3. The app icon will now appear on your home screen, just like any other app.

**On iPhone (Safari):**
1. With the app open in Safari, tap the **Share** button (square with an arrow pointing up) at the bottom of the screen.
2. Scroll down and tap **Add to Home Screen**.
3. Tap **Add** in the top-right corner.
4. The app icon will now appear on your home screen.

From now on, just tap the app icon on your home screen like any other app — no need to open a browser again.

---

## Everyday use — quick reference

- **Tap the ⊕ button** (bottom-right) to record a spend or deposit, with an optional note.
- **Tap the pencil icon** (top-right) to edit your budgets, add new categories, or delete one.
- **Tap "Statement"** to see your full transaction history like a bank statement, with your balance masked by default — tap **Show Balance** to reveal it.
- **Tap ↺ on any transaction** to reverse it (adds a correcting entry, keeps your full history intact — nothing is ever silently deleted).
- Your budgets automatically refresh back to their full allocated amount at the start of each new month.
- If you spend more than a category's budget, its balance goes negative (shown in red) instead of stopping you — the app doesn't block overspending, it just makes it visible so you notice and adjust. That negative number is the whole point: it's telling you Food (or Travel, or whichever category) went over this month, so you know exactly where to cut back next month.

## If something goes wrong

- **"Credentials mandatory" error** — you tapped Connect before both boxes were actually filled in. Type or paste again directly into each box.
- **A red error box with "HTTP 401"** — your access key is wrong or was typed incorrectly. Go back to Step 4 and check you copied the whole code.
- **A red error box with "HTTP 404"** — your Gist ID is wrong, or the gist isn't accessible with your access key. Check Step 3.
- **The app looks outdated after an update** — fully close the installed app (swipe it away from your recent apps) and reopen it while connected to the internet. It will fetch the latest version automatically.

If you're ever stuck, the person who gave you this app is your best first point of contact — they can look at the exact error message with you.
