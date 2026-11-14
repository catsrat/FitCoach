# FitCoach

Photo based fitness coaching and meal tracking.

- **Check in**: send a progress photo (plus optional weight and a note). The coach compares it with your previous check in and replies with observations, training and nutrition advice, and three actions for the week.
- **Meals**: snap a meal (or describe it). Calories, protein, carbs, and fat are estimated per item and added to your day against your targets.
- **Plan**: daily calorie and protein targets from your age, height, weight, goal, and activity (Mifflin St Jeor).

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
- Each account gets 40 photo analyses a day (`FITCOACH_DAILY_AI_LIMIT`).
- Calorie numbers and coaching are estimates, not medical advice.
