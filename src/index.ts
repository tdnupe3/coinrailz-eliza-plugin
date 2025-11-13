import { Plugin } from "@ai16z/eliza";

export interface CoinRailzConfig {
  baseUrl?: string;
  network?: "base" | "base-sepolia";
}

export const coinrailzPlugin: Plugin = {
  name: "coinrailz",
  description: "x402 micropayment services for AI agents",
  
  actions: [
    {
      name: "GET_MULTI_CHAIN_BALANCE",
      description: "Query wallet balances across multiple EVM chains",
      handler: async (runtime, message, state, options, callback) => {
        const { walletAddress } = options;
        
        const response = await fetch("https://coinrailz.com/x402/multi-chain-balance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ walletAddress })
        });
        
        if (response.status === 402) {
          const paymentInfo = await response.json();
          return { success: false, paymentRequired: paymentInfo };
        }
        
        const data = await response.json();
        return { success: true, data };
      },
      validate: async (runtime, message) => {
        return message.content.walletAddress !== undefined;
      },
      examples: [[
        {
          user: "user",
          content: { text: "Check balance for 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" }
        }
      ]]
    },
    {
      name: "GET_GAS_PRICES",
      description: "Get current gas prices across multiple chains",
      handler: async (runtime, message, state, options, callback) => {
        const response = await fetch("https://coinrailz.com/x402/gas-price-oracle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chains: options.chains || [] })
        });
        
        if (response.status === 402) {
          const paymentInfo = await response.json();
          return { success: false, paymentRequired: paymentInfo };
        }
        
        const data = await response.json();
        return { success: true, data };
      },
      validate: async (runtime, message) => true,
      examples: [[
        {
          user: "user",
          content: { text: "What are the current gas prices?" }
        }
      ]]
    },
    {
      name: "GET_TOKEN_PRICE",
      description: "Get current token price and market data",
      handler: async (runtime, message, state, options, callback) => {
        const { tokenAddress, chain } = options;
        
        const response = await fetch("https://coinrailz.com/x402/token-price", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenAddress, chain })
        });
        
        if (response.status === 402) {
          const paymentInfo = await response.json();
          return { success: false, paymentRequired: paymentInfo };
        }
        
        const data = await response.json();
        return { success: true, data };
      },
      validate: async (runtime, message) => {
        return message.content.tokenAddress !== undefined;
      },
      examples: [[
        {
          user: "user",
          content: { text: "Get price for token 0x..." }
        }
      ]]
    }
  ],
  
  evaluators: [],
  providers: []
};

export default coinrailzPlugin;
