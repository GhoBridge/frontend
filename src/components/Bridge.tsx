import { useEffect, useState } from "react";
import { erc20ABI, useAccount, useContractRead, usePublicClient } from "wagmi";
import { contractAddresses } from "../config";

export default function Bridge() {
  const { address } = useAccount();
  const { chain } = usePublicClient();
  const contracts = contractAddresses[chain.id];
  const [changeReceiver, setChangeReceiver] = useState(false);

  useEffect(() => {}, []);

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

  return (
    <div className="border-2 border-black p-10 rounded-lg">
      <input
        type="text"
        placeholder="amount"
        className="rounded border-2 w-full border-black text-black placeholder:text-gray-600 px-2"
      />
      <div className="text-right mb-2">
        Balance - {balance?.toString() || "0"}
      </div>
      <input
        type="text"
        placeholder="chain"
        className="rounded border-2 w-full border-black text-black placeholder:text-gray-600 px-2"
      />
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
    </div>
  );
}
