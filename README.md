# ArcLinkPay

USDC payments on Arc, as simple as sharing a link.

Live demo: [https://arclinkpay.vercel.app](https://arclinkpay.vercel.app)

## What ArcLinkPay Is

ArcLinkPay is a simple USDC payment link platform built for Arc. It is designed to help users create payment requests, share a link with a payer, receive USDC, and track payment status with a clear receipt.

The current version is an integration-ready MVP foundation. It includes wallet connection UI, payment link API routes, a database-ready payment link model, mock fallback storage, simulated demo payments, and opt-in Arc Testnet USDC payment execution.

## Current Milestone

ArcLinkPay is no longer only a static frontend mock. This milestone adds the foundation needed for future production integrations:

- Wallet connection UI and EVM wallet foundation
- Payment link create, read, list, and status update API routes
- Database-ready payment link data model
- Supabase-ready client/server structure with mock fallback when env vars are missing
- Arc Testnet USDC payment execution using the connected wallet
- Simulated payment flow remains available for demo and testing

Real Arc Testnet USDC execution is available as an explicit payment mode. Production or mainnet payments are not live.

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
- Opt-in real Arc Testnet USDC payment flow
- Receipt page at `/receipt/[id]`
- Dashboard loaded through the payment link API foundation
- Database-ready payment link model for future persistence
- Supabase-ready client/server setup with mock fallback when env vars are missing
- Arc USDC execution preparation layer for future wallet transactions
- Dark-mode friendly, responsive UI
- Safe fallback UI for unknown payment and receipt IDs

## Demo Flow

1. Visit the live demo.
2. Open **Create payment link**.
3. Fill in a mock title, amount, recipient address, note, and optional expiry date.
4. Generate the mock payment link.
5. Open the public payment page.
6. Connect an EVM wallet.
7. Use the default simulated mode for a safe demo, or switch to **Real Arc Testnet** when your wallet is connected to Arc Testnet.
8. For real testnet mode, submit the USDC ERC-20 transfer and wait for confirmation.
9. View the receipt page.
10. Open the dashboard to review payment links and statuses.

## How Arc Is Used

ArcLinkPay is designed around Arc as the target payment network. The MVP UI already presents Arc as the payment network on payment and receipt screens so the user flow is clear before protocol integration.

This milestone adds wallet-based Arc Testnet payment execution while keeping simulated mode available. Real production/mainnet settlement is planned later.

The onchain layer targets Arc Testnet configuration: chain ID `5042002`, RPC `https://rpc.testnet.arc.network`, WebSocket `wss://rpc.testnet.arc.network`, block explorer `https://testnet.arcscan.app`, faucet `https://faucet.circle.com`, and USDC ERC-20 interface address `0x3600000000000000000000000000000000000000`.

Arc uses USDC as the native gas token. For app-level USDC balance reads and payment transfers, ArcLinkPay uses the USDC ERC-20 interface with 6 decimals. The app still uses simulated payment execution by default unless the payer explicitly selects real Arc Testnet mode.

## How USDC Is Used

USDC is the payment asset for ArcLinkPay requests. On Arc Testnet, USDC is also the native gas token, while the configured ERC-20 interface address is used for app-level payment transfers. The MVP supports both simulated payments and opt-in real Arc Testnet USDC transfers.

Production or mainnet USDC transfers are not enabled yet.

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
- Keep simulated mode for demos while hardening Arc Testnet execution
- Production-ready Arc USDC settlement
- Transaction status detection
- Real receipt generation from transaction data
- Payment link persistence
- Basic recipient dashboard and link management
- Optional expiry handling and payment metadata

## Current Status

ArcLinkPay is currently an integration-ready MVP foundation.

The app is ready to demonstrate the product direction, core screens, wallet connection foundation, payment link API/data foundation, Supabase-ready structure, simulated payment journey, and opt-in Arc Testnet payment execution. It does not support production or mainnet payments.

## Disclaimer

This project does not process production payments. Simulated mode remains available for demos. Real payment execution is limited to Arc Testnet and should be treated as testnet-only infrastructure.

## Environment Variables

ArcLinkPay runs without environment variables by falling back to in-memory demo data.

Future Supabase persistence can use:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Arc Testnet network configuration defaults:

```bash
NEXT_PUBLIC_ARC_CHAIN_ID=5042002
NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.network
NEXT_PUBLIC_ARC_WS_URL=wss://rpc.testnet.arc.network
NEXT_PUBLIC_ARC_USDC_TOKEN_ADDRESS=0x3600000000000000000000000000000000000000
NEXT_PUBLIC_ARC_BLOCK_EXPLORER_URL=https://testnet.arcscan.app
NEXT_PUBLIC_ARC_FAUCET_URL=https://faucet.circle.com
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
