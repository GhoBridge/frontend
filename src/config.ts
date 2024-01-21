export const contractAddresses: Record<
  number,
  {
    chainName: string;
    chainSelector: string;
    ghoToken: `0x${string}`;
    bridgeContract: `0x${string}`;
  }
> = {
  11155111: {
    chainName: "Sepolia",
    chainSelector: "16015286601757825753",
    ghoToken: "0xa91cb2eee15f7a7f932dbc4041841b374dd04cd2",
    bridgeContract: "0x97d6e18bd712be37cc9173b162233607ae5245db",
  },
  80001: {
    chainName: "Polygon Mumbai",
    chainSelector: "12532609583862916517",
    ghoToken: "0xedfd5c267de8379523757abaa4e271fb70e2257c",
    bridgeContract: "0x007084a2f2c2f563071c953812701ece4cc500a7",
  },
};
