import type { Address } from "viem";
import { parseUnits } from "viem";

export const erc20TransferAbi = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export function prepareErc20TransferArgs({
  recipientAddress,
  amount,
  decimals = 6,
}: {
  recipientAddress: Address;
  amount: string;
  decimals?: number;
}) {
  return [recipientAddress, parseUnits(amount.replace(",", ""), decimals)] as const;
}
