# Go on Vercel Fluid [experimental]

A demonstration of running Go applications on Vercel's Fluid compute platform,
displaying real-time Go runtime information.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsjc5%2Fgoinfo)

## How it Works

This uses a [Fluid Node.js function](./api/proxy.ts) that eagerly spins up a Go
process and proxies requests to it on Vercel's Fluid compute platform. The
proxy:

- Spawns the compiled Go binary on startup
- Waits for the Go app to be healthy before accepting requests
- Proxies all incoming HTTP requests to the Go process running on port 8080
- Handles process lifecycle and error recovery

## Key Files

- [`api/proxy.ts`](./api/proxy.ts) - Node.js proxy that manages the Go process
  lifecycle
- [`backend/router/goinfo.go`](./backend/router/goinfo.go) - Collects real-time
  Go runtime metrics
- [`frontend/home.tsx`](./frontend/home.tsx) - Frontend that displays the
  runtime information
- [`vercel.json`](./vercel.json) - Vercel configuration that routes all requests
  through the proxy

## Features

- **Real-time Go runtime metrics**: Version, OS, architecture, CPU cores
- **Memory statistics**: Heap, stack, and system memory usage
- **Garbage collector stats**: GC runs, pause times, CPU fraction
- **Environment variables**: Go-specific environment configuration
- **Build information**: Module dependencies and build settings

## Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```
