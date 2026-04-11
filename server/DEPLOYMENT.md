# Deployment Guide — Heroku

This guide deploys the portfolio as **two separate Heroku apps**: an API backend and a static frontend.

---

## Prerequisites

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed and authenticated
- MongoDB Atlas cluster with a connection string
- Groq API key from [console.groq.com](https://console.groq.com)
- GitHub personal access token (repo:read scope)

---

## 1. Backend Deployment

### Create the app

```bash
heroku create fasih-portfolio-api
```

### Set environment variables

```bash
heroku config:set -a fasih-portfolio-api \
  NODE_ENV=production \
  MONGODB_URI="mongodb+srv://<user>:<pass>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority" \
  GROQ_API_KEY="gsk_..." \
  GITHUB_USERNAME="CS-Fasih" \
  GITHUB_TOKEN="ghp_..." \
  GITHUB_WEBHOOK_SECRET="your-webhook-secret" \
  CLIENT_ORIGIN="https://fasih-portfolio-client.herokuapp.com"
```

### Deploy from the /server subdirectory

Option A — git subtree:

```bash
# From the repo root
git subtree push --prefix server heroku-api main
```

Option B — heroku-community/multi-procfile buildpack:

```bash
heroku buildpacks:add -a fasih-portfolio-api heroku-community/multi-procfile
heroku config:set -a fasih-portfolio-api PROCFILE=server/Procfile
git push heroku-api main
```

---

## 2. Frontend Deployment

### Create the app

```bash
heroku create fasih-portfolio-client
```

### Add the static buildpack

```bash
heroku buildpacks:set -a fasih-portfolio-client https://github.com/heroku/heroku-buildpack-static.git
```

### Set environment variables

Before building, set your API URL so Vite bakes it into the bundle:

```bash
heroku config:set -a fasih-portfolio-client \
  VITE_API_BASE_URL="https://fasih-portfolio-api.herokuapp.com"
```

### Build and deploy

```bash
cd client
npm run build
# The static buildpack serves static.json + dist/
```

Deploy using git subtree:

```bash
git subtree push --prefix client heroku-client main
```

> **Note**: The `static.json` in `client/` configures the SPA catch-all route and caching.

---

## 3. MongoDB Atlas — IP Whitelist

Heroku uses dynamic IPs. Allow all connections:

1. Go to MongoDB Atlas → Network Access
2. Click **Add IP Address**
3. Enter `0.0.0.0/0` (allow from anywhere)
4. Click **Confirm**

---

## 4. GitHub Webhook Setup

1. Go to your GitHub account → **Settings → Developer Settings → Webhooks** (or the repo's Settings → Webhooks)
2. **Payload URL**: `https://fasih-portfolio-api.herokuapp.com/api/github/webhook`
3. **Content type**: `application/json`
4. **Secret**: the same value as `GITHUB_WEBHOOK_SECRET`
5. **Events**: select **Pushes** and **Repositories**
6. Click **Add webhook**

---

## 5. Verify

- Backend health: `curl https://fasih-portfolio-api.herokuapp.com/api/health`
- Frontend: visit `https://fasih-portfolio-client.herokuapp.com`
- Chatbot: click the amber chat bubble and send a message
