# Coin Railz ElizaOS Plugin
x402 micropayment protocol plugin for ElizaOS, enabling AI agents to autonomously access blockchain infrastructure services.
## Features
- **18 x402 Services** on Base mainnet
- **Automatic Payment** via Coinbase CDP facilitator
- **USDC Payments** on Base Chain
- **TypeScript** with full type definitions
## Installation
```bash
npm install github:tdnupe3/coinrailz-eliza-plugin

Usage
import { coinrailzPlugin } from 'coinrailz-eliza-plugin';
const agent = new Agent({
  plugins: [coinrailzPlugin]
});

Available Services
Multi-chain balance checking
Gas price oracle
Token price feeds
Smart contract scanning
Wallet risk analysis
And 13 more services...
Protocol
Uses x402 (HTTP 402 Payment Required) protocol with Coinbase CDP facilitator for autonomous AI agent payments.

License
MIT
