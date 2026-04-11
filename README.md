# Muhammad Fasih — Portfolio Website

A production-grade MERN stack portfolio with an AI-powered chatbot, live GitHub project sync, and a dark editorial design system.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite, raw CSS (custom properties) |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| AI Chat | NVIDIA NIM API (Llama 3.1 70B) via OpenAI SDK |
| GitHub | Octokit REST SDK — repo README sync + webhooks |
| Deployment | Heroku (two apps: static frontend + API backend) |

## Local Development

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or Atlas URI)
- NVIDIA API key (free tier at [build.nvidia.com](https://build.nvidia.com))
- GitHub personal access token (repo:read scope)

### Setup

```bash
# Clone
git clone https://github.com/CS-Fasih/portfolio.git
cd portfolio

# Backend
cd server
cp .env.example .env        # fill in your keys
npm install
npm run dev

# Frontend (new terminal)
cd client
cp .env.example .env        # set VITE_API_BASE_URL=http://localhost:5000
npm install
npm run dev
```

### Environment Variables

See `server/.env.example` and `client/.env.example` for the full list.

## Project Structure

```
portfolio/
├── client/          # React 18 + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   └── data/
│   └── ...
├── server/          # Express.js API backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── DEPLOYMENT.md
└── README.md
```

## Deployment

See [server/DEPLOYMENT.md](server/DEPLOYMENT.md) for full Heroku deployment instructions.

## License

MIT — Muhammad Fasih
