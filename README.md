# ArcLinkPay

USDC payments on Arc, as simple as sharing a link.

Live demo: [https://arclinkpay.vercel.app](https://arclinkpay.vercel.app)

## What ArcLinkPay Is

ArcLinkPay is a simple USDC payment link platform built for Arc. It is designed to help users create payment requests, share a link with a payer, receive USDC, and track payment status with a clear receipt.

The current version is an integration-ready MVP foundation. It includes wallet connection UI, payment link API routes, a database-ready payment link model, and mock fallback storage. The payment flow is still simulated and does not execute real USDC transfers.

## Current Milestone

ArcLinkPay is no longer only a static frontend mock. This milestone adds the foundation needed for future production integrations:

- Wallet connection UI and EVM wallet foundation
- Payment link create, read, list, and status update API routes
- Database-ready payment link data model
- Supabase-ready client/server structure with mock fallback when env vars are missing
- Simulated payment flow for demo and testing

Real USDC transfer execution is not live yet. Real Arc onchain settlement is planned for the next milestone.

## Problem

Crypto payments are still too manual for many everyday payment requests. A payer often needs to copy wallet addresses, confirm the correct network, understand the requested asset, and separately share transaction details after payment.

For builders, grant recipients, freelancers, communities, and small teams, this creates avoidable friction around simple USDC payment requests.

## Solution

ArcLinkPay turns a payment request into a shareable link.

A recipient can create a request with a title, amount, recipient wallet address, note, and optional expiry date. The payer receives a clear payment page showing the amount, network, asset, recipient, and status. After payment, the flow provides a receipt-style page with transaction details.

## MVP Features

- Landing page for the product and core value proposition
- Create payment link page backed by the API foundation
- Public payment page at `/pay/[id]`
- Wallet connection foundation using a common EVM wallet stack
- Simulated payment flow for demo purposes
- Receipt page at `/receipt/[id]`
- Dashboard loaded through the payment link API foundation
- Database-ready payment link model for future persistence
- Supabase-ready client/server setup with mock fallback when env vars are missing
- Dark-mode friendly, responsive UI
- Safe fallback UI for unknown payment and receipt IDs

## Demo Flow

1. Visit the live demo.
2. Open **Create payment link**.
3. Fill in a mock title, amount, recipient address, note, and optional expiry date.
4. Generate the mock payment link.
5. Open the public payment page.
6. Connect an EVM wallet.
7. Click **Simulate USDC payment** to mark the request as paid in the app state.
8. View the receipt page.
9. Open the dashboard to review payment links and statuses.

## How Arc Is Used

ArcLinkPay is designed around Arc as the target payment network. The MVP UI already presents Arc as the payment network on payment and receipt screens so the user flow is clear before protocol integration.

This milestone adds the wallet and payment execution abstraction needed for a future Arc integration. Real Arc onchain settlement is planned next, and the real USDC transfer logic is intentionally left as a TODO in the payment execution layer.

## How USDC Is Used

USDC is the payment asset for ArcLinkPay requests. The MVP uses USDC-denominated payment requests and simulated transaction hashes to demonstrate the request, payment, dashboard, and receipt experience.

Real USDC transfers are not enabled yet. The current payment flow updates simulated status only.

## Target Users

- Arc ecosystem builders accepting grants, bounties, or service payments
- Freelancers and small teams requesting stablecoin payments
- Community operators paying contributors in USDC
- Hackathon teams and early projects that need a simple payment request flow
- Reviewers and partners evaluating an Arc payment-link experience

## Tech Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Wagmi
- Viem
- TanStack Query
- Supabase-ready client structure
- Vercel deployment target
- In-memory/mock fallback data for the current MVP

## Roadmap

- Frontend MVP with mock payment flow
- Wallet connection foundation for payers and recipients
- API route foundation for create, read, list, and status updates
- Supabase-ready payment link model
- Replace in-memory fallback with Supabase persistence when credentials are configured
- Real Arc onchain USDC settlement
- Transaction status detection
- Real receipt generation from transaction data
- Payment link persistence
- Basic recipient dashboard and link management
- Optional expiry handling and payment metadata

## Current Status

ArcLinkPay is currently an integration-ready MVP foundation.

The app is ready to demonstrate the product direction, core screens, wallet connection foundation, payment link API/data foundation, Supabase-ready structure, and simulated payment journey. It does not yet perform real USDC transfer execution or onchain Arc settlement.

## Disclaimer

This project does not currently process real payments. The wallet connection UI is present as an integration foundation, but payment execution remains simulated. Production wallet-based USDC transfer execution and onchain Arc settlement are planned for the next milestone.

## Environment Variables

ArcLinkPay runs without environment variables by falling back to in-memory demo data.

Future Supabase persistence can use:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Future Arc network configuration can use:

```bash
NEXT_PUBLIC_ARC_CHAIN_ID=504
NEXT_PUBLIC_ARC_RPC_URL=
NEXT_PUBLIC_ARC_USDC_TOKEN_ADDRESS=
```

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Run checks:

```bash
npm run lint
npm run build
```
