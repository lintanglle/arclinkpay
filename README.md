# ArcLinkPay

USDC payments on Arc, as simple as sharing a link.

Live demo: [https://arclinkpay.vercel.app](https://arclinkpay.vercel.app)

## What ArcLinkPay Is

ArcLinkPay is a simple USDC payment link platform built for Arc. It helps users create payment requests, share a link with a payer, receive USDC, and track payment status with a clear receipt.

The current version is a frontend MVP with a mock payment flow. It is designed to demonstrate the intended user experience before adding wallet connection and onchain settlement.

## Problem

Crypto payments are still too manual for many everyday payment requests. A payer often needs to copy wallet addresses, confirm the correct network, understand the requested asset, and separately share transaction details after payment.

For builders, grant recipients, freelancers, communities, and small teams, this creates avoidable friction around simple USDC payment requests.

## Solution

ArcLinkPay turns a payment request into a shareable link.

A recipient can create a request with a title, amount, recipient wallet address, note, and optional expiry date. The payer receives a clear payment page showing the amount, network, asset, recipient, and status. After payment, the flow provides a receipt-style page with transaction details.

## MVP Features

- Landing page for the product and core value proposition
- Create payment link page with mock request generation
- Public payment page at `/pay/[id]`
- Mock "Pay with USDC" flow
- Receipt page at `/receipt/[id]`
- Dashboard with mock stats and payment link status
- Dark-mode friendly, responsive UI
- Mock-safe fallback UI for unknown payment and receipt IDs

## Demo Flow

1. Visit the live demo.
2. Open **Create payment link**.
3. Fill in a mock title, amount, recipient address, note, and optional expiry date.
4. Generate the mock payment link.
5. Open the public payment page.
6. Click **Pay with USDC** to simulate a completed payment.
7. View the receipt page.
8. Open the dashboard to review mock payment links and statuses.

## How Arc Is Used

ArcLinkPay is designed around Arc as the target payment network. The MVP UI already presents Arc as the payment network on payment and receipt screens so the user flow is clear before protocol integration.

In a later milestone, ArcLinkPay will connect the frontend flow to wallet actions and onchain transaction data on Arc.

## How USDC Is Used

USDC is the payment asset for ArcLinkPay requests. The MVP uses mock USDC amounts and mock transaction hashes to demonstrate the request, payment, dashboard, and receipt experience.

Real USDC transfers are not enabled yet.

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
- Vercel deployment target
- Mock local data for the current MVP

## Roadmap

- Frontend MVP with mock payment flow
- Wallet connection for payers and recipients
- Onchain USDC payment execution on Arc
- Transaction status detection
- Real receipt generation from transaction data
- Payment link persistence
- Basic recipient dashboard and link management
- Optional expiry handling and payment metadata

## Current Status

ArcLinkPay is currently a frontend MVP with a mock payment flow.

The app is ready to demonstrate the product direction, core screens, and user journey. It does not yet perform real wallet interactions or onchain USDC settlement.

## Disclaimer

This project does not currently process real payments. Real wallet connection and onchain USDC settlement will be added in a later milestone.

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
