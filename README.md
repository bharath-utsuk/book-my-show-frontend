# BookMyShow Frontend

React + TypeScript frontend for the BookMyShow API.

## Prerequisites

- Node.js 18+
- BookMyShow API running on `http://localhost:3000`

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

## Features

- **Movies**: Browse available movies
- **Shows**: View showtimes for each movie
- **Seat Selection**: Interactive seat picker with real-time availability
- **Bookings**: View your booking history

## API Proxy

The Vite dev server proxies `/api/*` requests to `http://localhost:3000/*`.

