import { useEffect, useState } from "react";
import {
  erc20ABI,
  useAccount,
  useContractRead,
  usePrepareContractWrite,
  usePublicClient,
} from "wagmi";
import { contractAddresses } from "../config";
import { bytesToNumber, formatEther, parseEther } from "viem";
import { writeContract } from "wagmi/actions";
import { BridgeABI } from "../abi/Bridge";

export default function Bridge() {
  const { address } = useAccount();
  const { chain } = usePublicClient();
  const contracts = contractAddresses[chain.id];
  const [changeReceiver, setChangeReceiver] = useState(false);
  const [amount, setAmount] = useState("0");
  const [chainSelected, setChainSelected] = useState("");

  const { data: balance } = useContractRead(
    contracts && address
      ? {
          abi: erc20ABI,
          address: contracts.ghoToken,
          account: address,
          args: [address],
          functionName: "balanceOf",
        }
      : undefined
  );

  const { data: allowance } = useContractRead(
    contracts && address
      ? {
          abi: erc20ABI,
          address: contracts.ghoToken,
          account: address,
          args: [address, contracts.bridgeContract],
          functionName: "allowance",
        }
      : undefined
  );

  const { config } = usePrepareContractWrite(
    contracts && address
      ? {
          abi: erc20ABI,
          address: contracts.ghoToken,
          account: address,
          args: [contracts.bridgeContract, parseEther(amount) || 0n],
          functionName: "approve",
        }
      : undefined
  );

  const { config: bridgeConfig } = usePrepareContractWrite(
    contracts && address
      ? {
          abi: BridgeABI,
          address: contracts.bridgeContract,
          account: address,
          args: [chainSelected, parseEther(amount) || 0n],
          functionName: "initiateBridging",
        }
      : undefined
  );

  const availableChains = Object.keys(contractAddresses)
    .filter((k) => parseInt(k) != chain?.id)
    .map((k) => contractAddresses[parseInt(k)]);

  async function approve() {
    await writeContract(config);
  }

  async function bridge() {
    console.log(bridgeConfig);
    await writeContract(bridgeConfig);
  }

  return (
    <div className="border-2 border-black p-10 rounded-lg">
      <input
        type="number"
        name="amount"
        placeholder="amount"
        className="rounded border-2 w-full border-black text-black placeholder:text-gray-600 px-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="text-right mb-2">
        Balance - {formatEther(balance || 0n)}
      </div>
      <div>
        <label
          htmlFor="chain"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Destination Chain
        </label>
        <select
          id="chain"
          name="chain"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={availableChains[0].chainSelector}
          value={chainSelected}
          onChange={(e) => setChainSelected(e.target.value)}
        >
          {availableChains.map(({ chainName, chainSelector }) => (
            <option value={chainSelector} key={chainSelector}>
              {chainName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 my-2">
        <input
          id="change-receiver"
          aria-describedby="candidates-description"
          name="candidates"
          type="checkbox"
          checked={changeReceiver}
          onChange={(e) => setChangeReceiver(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <label htmlFor="change-receiver">Change Receiver</label>
      </div>
      {changeReceiver && (
        <input
          type="text"
          placeholder="chain"
          className="rounded border-2 w-full border-black text-black placeholder:text-gray-600 px-2"
        />
      )}

      {allowance !== undefined && allowance >= parseEther(amount) ? (
        <button
          onClick={bridge}
          className="mt-3 w-full bg-purple-500 hover:bg-purple-600 text-white py-1 rounded-lg"
        >
          Bridge
        </button>
      ) : (
        <button
          onClick={approve}
          className="mt-3 w-full bg-blue-700 hover:bg-blue-800 text-white py-1 rounded-lg"
        >
          Approve
        </button>
      )}
    </div>
  );
}
