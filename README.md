# ArcLinkPay

USDC payments on Arc, as simple as sharing a link.

Live demo: [https://arclinkpay.vercel.app](https://arclinkpay.vercel.app)

GitHub: [this repository](.)

## What ArcLinkPay Is

ArcLinkPay is a USDC payment-link product for Arc Testnet. It lets a recipient create a payment request, share a link, receive a wallet-based Arc Testnet USDC payment, and track the result with a clear receipt.

The current milestone is an integration-ready MVP foundation. It includes wallet connection, payment link APIs, a database-ready payment model, Supabase-ready structure, Arc Testnet configuration, and real Arc Testnet USDC transfer execution.

ArcLinkPay does not support mainnet or production payments yet.

## Problem

Simple USDC payment requests still require too many manual steps: copying addresses, confirming the network, checking the asset, sharing transaction hashes, and tracking whether a payment has actually been completed.

This is especially painful for builders, grant recipients, freelancers, communities, and small teams that need a lightweight payment request flow.

## Solution

ArcLinkPay turns a payment request into a shareable link.

The recipient enters a title, amount, recipient wallet address, note, and optional expiry date. The payer opens the link, connects a wallet, switches to Arc Testnet if needed, sends USDC through the configured ERC-20 interface, and receives a receipt with transaction details and an ArcScan link.

## Current Status

ArcLinkPay is ready to demonstrate as an integration-ready MVP foundation.

Built now:

- Public landing page
- Create payment link flow
- Public payment page at `/pay/[id]`
- Receipt page at `/receipt/[id]`
- Dashboard for payment links and statuses
- Wallet connection UI
- Arc Testnet network handling
- Real Arc Testnet USDC ERC-20 transfer execution
- Transaction hash display and ArcScan links
- API routes for create, read, list, and status updates
- Database-ready payment link model
- Supabase-ready client/server structure
- Mock fallback data when no database is configured

Not live yet:

- Mainnet payments
- Production settlement
- Required Supabase persistence
- Full receipt verification from indexed onchain data

## MVP Features

- Create USDC payment requests for Arc Testnet
- Share a payment link with a payer
- Require wallet connection before payment
- Detect and switch/add Arc Testnet in the payer wallet
- Send Arc Testnet USDC using the ERC-20 interface
- Track unpaid and paid statuses through the API foundation
- Show paid receipts with payer, recipient, amount, timestamp, transaction hash, and ArcScan link
- Keep the app deploy-safe without environment variables through fallback data

## Demo Flow

1. Open the live demo.
2. Create a payment link.
3. Share or open the generated `/pay/[id]` link.
4. Connect an EVM wallet.
5. Switch to Arc Testnet if prompted.
6. Make sure the payer wallet has Arc Testnet USDC from the faucet.
7. Submit the USDC transfer.
8. Confirm the transaction in the wallet.
9. Open the receipt and verify the transaction on ArcScan.
10. Review the link status in the dashboard.

## How Arc Is Used

ArcLinkPay uses Arc Testnet as the payment network for this milestone.

Current Arc Testnet configuration:

- Network name: `Arc Testnet`
- Chain ID: `5042002`
- RPC URL: `https://rpc.testnet.arc.network`
- WebSocket URL: `wss://rpc.testnet.arc.network`
- Block explorer: `https://testnet.arcscan.app`
- Faucet: `https://faucet.circle.com`
- USDC ERC-20 interface: `0x3600000000000000000000000000000000000000`

Arc uses USDC as the native gas token. For app-level USDC balance reads and payment transfers, ArcLinkPay uses the configured USDC ERC-20 interface with 6 decimals.

## How USDC Is Used

USDC is the requested payment asset. On Arc Testnet, the payer sends USDC from their connected wallet to the recipient wallet address in the payment request.

Users need Arc Testnet USDC from [Circle's faucet](https://faucet.circle.com) to test real payments. Production or mainnet USDC payments are not live.

## Target Users

- Arc ecosystem builders accepting grants, bounties, or service payments
- Freelancers and small teams requesting stablecoin payments
- Community operators paying contributors in USDC
- Hackathon teams building around Arc
- Grant reviewers evaluating an Arc payment-link workflow

## Tech Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Wagmi
- Viem
- TanStack Query
- Supabase-ready client/server structure
- Vercel deployment target

## Environment Variables

ArcLinkPay runs without environment variables by using fallback data.

Future Supabase persistence can use:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Arc Testnet values are configured in the app and can be mirrored with:

```bash
NEXT_PUBLIC_ARC_CHAIN_ID=5042002
NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.network
NEXT_PUBLIC_ARC_WS_URL=wss://rpc.testnet.arc.network
NEXT_PUBLIC_ARC_USDC_TOKEN_ADDRESS=0x3600000000000000000000000000000000000000
NEXT_PUBLIC_ARC_BLOCK_EXPLORER_URL=https://testnet.arcscan.app
NEXT_PUBLIC_ARC_FAUCET_URL=https://faucet.circle.com
```

## Roadmap

- Replace in-memory fallback storage with Supabase persistence
- Add stronger transaction confirmation and receipt reconciliation
- Add recipient dashboard filtering and link management
- Add expiry handling and payment metadata improvements
- Prepare for production settlement when Arc mainnet support is ready

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run checks:

```bash
npm run lint
npm run build
```

## Disclaimer

ArcLinkPay currently supports Arc Testnet payments only. Mainnet and production payments are not live. Fallback records may appear when no database is configured, but public payment completion requires a wallet transaction on Arc Testnet.
