# FitCoach

Photo based fitness coaching and meal tracking.

- **Check in**: send a progress photo (plus optional weight and a note). The coach compares it with your previous check in and replies with observations, training and nutrition advice, and three actions for the week.
- **Weekly actions**: the three actions from the latest check in sit on the Today screen as a checklist. The coach chat sees what is ticked, and the next check in follows up on them.
- **Steps**: type in the day's steps on the Today screen against a daily goal set on the Plan tab (8,000 by default). A website cannot read a phone's step counter, so this is manual. The coach sees the last week of steps.
- **Meals**: snap a meal (or describe it). Calories, protein, carbs, and fat are estimated per item and added to your day against your targets.
- **Coach**: chat with a coach that knows your plan, your meals, and your check ins. It advises only; it cannot change the account.
- **Plan**: daily calorie and protein targets from your age, height, weight, goal, and activity (Mifflin St Jeor).

The site can be added to a phone's home screen and then opens full screen like an app (`static/manifest.webmanifest`, icons in `static/`). `static/sw.js` keeps no copy of the app; it only shows `static/offline.html` when there is no connection.

## Run

```bash
copy .env.example .env
```

Put your Anthropic API key in `.env`, then:

```bash
.venv\Scripts\python app.py
```

Open http://127.0.0.1:5055. To use it from your phone on the same wifi, set `HOST=0.0.0.0` in `.env` and open `http://<your computer's IP>:5055`.

First time on a new machine: `python -m venv .venv` then `.venv\Scripts\pip install -r requirements.txt`.

## Deploy (Render)

1. Push this repo to GitHub.
2. Render dashboard → **New → Blueprint** → pick the repo. `render.yaml` sets up a Python web service (Starter plan, Frankfurt) with a 1 GB persistent disk at `/var/data` for the database and photos.
3. Render asks for `ANTHROPIC_API_KEY`. Paste your key and apply.

Pushes to `main` redeploy automatically. Cost controls: `FITCOACH_DAILY_AI_LIMIT` (per account) and `FITCOACH_GLOBAL_DAILY_LIMIT` (all accounts together) cap photo analyses per day.

## Notes

- Data lives in `fitcoach.db` (SQLite) and `uploads/` next to the app.
- The AI model is `claude-opus-5-5`; change it with `FITCOACH_MODEL` in `.env`.
- Each account gets 40 photo analyses a day (`FITCOACH_DAILY_AI_LIMIT`). Fixing a meal counts as one.
- Coach chat runs on `claude-sonnet-5-5` (`FITCOACH_CHAT_MODEL`) with 30 messages per account a day (`FITCOACH_DAILY_CHAT_LIMIT`) and 600 across all accounts (`FITCOACH_GLOBAL_CHAT_LIMIT`).
- Calorie numbers and coaching are estimates, not medical advice.
