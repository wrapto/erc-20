import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-chai-matchers"
import "@openzeppelin/hardhat-upgrades"
import "@typechain/hardhat";
import { config as dotenvConfig } from "dotenv";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";
import "solidity-coverage";
import { resolve, join } from "path";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || join(__dirname, ".env");
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
const account = process.env.PRIVATE_KEY;

const AMOY_RPC = process.env.AMOY_RPC;
const BSC_TESTNET_RPC = process.env.BSC_TESTNET_RPC;
const BASE_SEPOLIA_RPC = process.env.BASE_SEPOLIA_RPC;
const ETH_SEPOLIA_RPC = process.env.ETH_SEPOLIA_RPC;

const POLYGON_RPC = process.env.POLYGON_RPC_URL;
const BSC_RPC = process.env.BSC_RPC;
const BASE_RPC = process.env.BASE_RPC;


let config: HardhatUserConfig;

if (!process.env.CI) {
  // if (!etherscanApiKey) throw new Error("Hardhat_Config: etherscan api key is not defined.");
  if (!account) throw new Error("Hardhat_Config: account is not defined.");
  // if (!POLYGON_RPC) throw new Error("Hardhat_Config:POLYGON_RPC is not defined.");
  // if (!BSC_RPC) throw new Error("Hardhat_Config: BSC_RPC is not defined.");
  // if (!BASE_RPC) throw new Error("Hardhat_Config: BASE_RPC is not defined.");

  config = {
    defaultNetwork: "hardhat",
    solidity: "0.8.20",
    networks: {
      hardhat: {
        allowUnlimitedContractSize: false,
      },

      // Testnet Networks
      amoy: {
        url: AMOY_RPC,
        accounts: [account],
      },
      bsc_testnet: {
        url: BSC_TESTNET_RPC,
        accounts: [account],
      },
      base_sepolia: {
        url: BASE_SEPOLIA_RPC,
        accounts: [account],
      },
      eth_sepolia: {
        url: ETH_SEPOLIA_RPC,
        accounts: [account],
      },

      // Mainnet Networks
      // polygon: {
      //   url: POLYGON_RPC,
      //   accounts: [account],
      // },
      // bsc: {
      //   url: BSC_RPC,
      //   accounts: [account],
      // },
      // base: {
      //   url: BASE_RPC,
      //   accounts: [account],
      // },
    },
    etherscan: {
      apiKey: {
        bsc_testnet: etherscanApiKey!,
        // amoy: etherscanApiKey,
        // polygon: etherscanApiKey,
        // bsc: etherscanApiKey,
        // base: etherscanApiKey
      },
      customChains: [
        // {
        //   network: "polygon",
        //   chainId: 137,
        //   urls: {
        //     apiURL: "https://api.polygonscan.com/api",
        //     browserURL: "https://polygonscan.com",
        //   },
        // },
        // {
        //   network: "amoy",
        //   chainId: 80002,
        //   urls: {
        //     apiURL: "https://api-amoy.polygonscan.com/api",
        //     browserURL: "https://amoy.polygonscan.com",
        //   },
        // },
        {
          network: "bsc_testnet",
          chainId: 97,
          urls: {
            apiURL: "https://api.bscscan.com/api",
            browserURL: "https://bscscan.com",
          },
        },
        // {
        //   network: "base",
        //   chainId: 8453,
        //   urls: {
        //     apiURL: "https://api.basescan.org/api",
        //     browserURL: "https://basescan.com",
        //   },
        // },
      ],
    },
    gasReporter: {
      currency: "USD",
      enabled: true,
      excludeContracts: [],
      src: "./contracts",
    },
    typechain: {
      outDir: "types",
    },
    mocha: {
      timeout: 100000000,
    },
    paths: {
      artifacts: "./artifacts",
      cache: "./cache",
      sources: "./contracts",
    },
  };
} else {
  config = {
    defaultNetwork: "hardhat",
    solidity: "0.8.20",
    networks: {
      hardhat: {
        allowUnlimitedContractSize: false,
      },
    },
    gasReporter: {
      currency: "USD",
      enabled: true,
      excludeContracts: [],
      src: "./contracts",
    },
    typechain: {
      outDir: "types",
    },
    mocha: {
      timeout: 100000000,
    },
    paths: {
      artifacts: "./artifacts",
      cache: "./cache",
      sources: "./contracts",
    },
  };
}

export default config;
