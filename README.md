# shop-demo

A tiny product catalog site: three pages and a redirect. The data is kept in an
in-memory SQLite database that is seeded on startup.

## Run

Requires Node.js 22.5 or newer (it uses the built-in `node:sqlite`).

```
npm install
npm start
```

Or with Docker:

```
docker build -t shop-demo .
docker run -p 3000:3000 shop-demo
```

The server listens on `http://localhost:3000`. You can change the port with `PORT`.

## Pages

| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | Home page with links to every page |
| GET | `/products?category=` | List products in a category |
| GET | `/search?q=` | Search products |
| GET | `/go?url=` | Partner link redirect |

## Deploy to Netlify

`netlify.toml` runs the app as a single Netlify Function
(`netlify/functions/app.js`) and routes every path to it. Leave the build
command and publish directory empty in the Netlify UI so the file settings
apply. The site must be public (not password protected) for a scanner to reach it.

## Scanning with Cytrix Finder

1. Deploy the site to a host Finder can reach (for example Netlify, a small VM,
   Render, Fly.io, or a tunnel such as `cloudflared tunnel --url http://localhost:3000`).
2. In the ART project, create a web asset that points to the public URL.
3. Start a Finder scan with a short max run time.
