import ImageIcon from "~/components/ImageIcon/ImageIcon";
// SPVC ABI
import erc20ContractABI from "~/files/erc20Contract.json";
import OrderBookETHABI from "~/files/orderBookETHContract.json";
import OrderBookTOKENABI from "~/files/contract.json";

export const PRODUCTION_MODE: boolean = false;

export const MAX_BLOCKS_TO_QUERY = 5000;
export const MAX_ITERATIONS = 14;
export const PAGE_SIZE = 50;
export const TOKEN_DECIMAL_PLACE = 4;
export const OFFER_ORDER_EXPIRY_DIRATION = 3 * 60 * 60; // in seconds
// export const OFFER_ORDER_EXPIRY_DIRATION = 5 * 60; // in seconds
export const BTC_DECIMAL_PLACE = 5;
export const ETH_DECIMAL_PLACE = 5;
export const DEFAULT_COLLETARAL_FEES = 10;

export const ERC20TokenKey = "spvc"; // it should be in lower case
export const ERC20TokenLabel = "SPVC"; // To show in the dropdown
export const ERC20TokenValue = "SPVC";

// Networks List
export const networks = [
  { networkKey: "polygon_matic" },
  { networkKey: "trustlex_testnet" },
  // { networkKey: "ganache_testnet" },
  { networkKey: "bnb_testnet" },
];

// Default Network
export const DEFAULT_NETWORK = "polygon_matic";
export const DEFAULT_TOKEN = "ETH"; // It should be in upper case

// Networks details Object
export const NetworkInfo: {
  [key: string]: {
    NetworkName: string;
    RPC_URL: string;
    ChainID: number;
    ChainIDHexaDecimal: string;
    CurrencySymbol: string;
    ExplorerUrl: null | string;
  };
} = {
  polygon_matic: {
    NetworkName: "Mumbai Polygon Testnet",
    RPC_URL: "https://matic-mumbai.chainstacklabs.com",
    ChainID: 80001,
    ChainIDHexaDecimal: "0x13881",
    CurrencySymbol: "MATIC",
    ExplorerUrl: "https://mumbai.polygonscan.com/",
  },
  trustlex_testnet: {
    NetworkName: "Trustless Remote Test Network",
    RPC_URL: "https://134.209.22.120:8545",
    ChainID: 1337,
    ChainIDHexaDecimal: "0x539",
    CurrencySymbol: "TRST",
    ExplorerUrl: null,
  },
  ganache_testnet: {
    NetworkName: "Ganache Local Test Network",
    RPC_URL: "http://localhost:8545",
    ChainID: 1337,
    ChainIDHexaDecimal: "0x539",
    CurrencySymbol: "Ganache",
    ExplorerUrl: null,
  },
  bnb_testnet: {
    NetworkName: "BNB Smart Chain Testnet",
    RPC_URL: "https://data-seed-prebsc-1-s3.binance.org:8545/",
    ChainID: 97,
    ChainIDHexaDecimal: "0x61",
    CurrencySymbol: "tBNB",
    ExplorerUrl: "https://testnet.bscscan.com/",
  },
};

export const activeExchange = [
  { currency: "btc", value: "", networkName: "", networkKey: "" },

  /* Start Currencies for Polygon Testnet Matic */
  {
    currency: "matic",
    value: "",
    networkName: "Polygon Testnet Matic",
    networkKey: "polygon_matic",
  },
  {
    currency: ERC20TokenKey,
    value: "",
    networkName: "Polygon Testnet Matic",
    networkKey: "polygon_matic",
  },
  /* End Currencies for Polygon Testnet Matic */
  /* Start Currencies for Trustlex Testnet */
  {
    currency: "eth",
    value: "",
    networkName: "Trustlex Testnet",
    networkKey: "trustlex_testnet",
  },
  {
    currency: ERC20TokenKey,
    value: "",
    networkName: "Trustlex Testnet",
    networkKey: "trustlex_testnet",
  },
  /* End Currencies for Trustlex Testnet */
  /* Start Currencies for Ganache Testnet */
  {
    currency: "eth",
    value: "",
    networkName: "Ganache Testnet",
    networkKey: "ganache_testnet",
  },
  {
    currency: ERC20TokenKey,
    value: "",
    networkName: "Ganache Testnet",
    networkKey: "ganache_testnet",
  },
  /* End Currencies for Ganache Testnet */
  /* Start Currencies for Ganache Testnet */
  {
    currency: "tbnb",
    value: "",
    networkName: "BNB Testnet",
    networkKey: "bnb_testnet",
  },
  // {
  //   currency: ERC20TokenKey,
  //   value: "",
  //   networkName: "BNB Testnet",
  //   networkKey: "bnb_testnet",
  // },
  /* End Currencies for Ganache Testnet */
];

export const currencyObjects: {
  [network: string]: {
    // network should be in lower case
    [key: string]: {
      // key should be in lower case
      label: string;
      value: string;
      icon: string | JSX.Element;
      orderBookContractAddreess?: string;
      orderBookContractABI?: any;
      ERC20Address?: string;
      ERC20ABI?: any;
      decimalPlace: Number;
      isNativeToken: boolean;
    };
  };
} = {
  polygon_matic: {
    btc: {
      label: "BTC",
      value: "bitcoin",
      icon: <ImageIcon image={"/icons/bitcoin.svg"} />,
      decimalPlace: 8,
      isNativeToken: true,
    },
    matic: {
      label: "Matic", // Please always keep the label  in upper case
      value: "Matic",
      icon: <ImageIcon image={"/icons/matic-token.png"} />,
      orderBookContractAddreess: "0x432d85454a618C4Bd7b6AC084C316007C155480A",
      orderBookContractABI: OrderBookETHABI.abi,
      decimalPlace: 18,
      isNativeToken: true,
    },

    [ERC20TokenKey]: {
      label: ERC20TokenLabel,
      value: ERC20TokenValue,
      icon: <ImageIcon image={"/icons/bitcoin.svg"} />,
      orderBookContractAddreess: "0x86E7a1c97dD7618C86070EbA5dF2bc87CF4a6f46",
      orderBookContractABI: OrderBookTOKENABI.abi,
      ERC20Address: "0xa89315E69a8eE3EFbE835736B35aaf265c84B3e1",
      ERC20ABI: erc20ContractABI.abi,
      decimalPlace: 18,
      isNativeToken: false,
    },
  },
  trustlex_testnet: {
    btc: {
      label: "BTC",
      value: "bitcoin",
      icon: <ImageIcon image={"/icons/bitcoin.svg"} />,
      decimalPlace: 8,
      isNativeToken: true,
    },
    eth: {
      label: "ETH", // Please always keep the label  in upper case
      value: "Ethereum",
      icon: <ImageIcon image={"/icons/ethereum-2.svg"} />,
      orderBookContractAddreess: "0x775f08Ec7F275782d2B1a8074Ff3e4651789dbCd",
      orderBookContractABI: OrderBookETHABI.abi,
      decimalPlace: 18,
      isNativeToken: true,
    },

    [ERC20TokenKey]: {
      label: ERC20TokenLabel,
      value: ERC20TokenValue,
      icon: <ImageIcon image={"/icons/bitcoin.svg"} />,
      orderBookContractAddreess: "0xC6c4584ad434d7e976f0DAD5b34A0B373a5Ad29a",
      orderBookContractABI: OrderBookTOKENABI.abi,
      ERC20Address: "0xFDc516d3C5fd36F5a3710c8D90208003e4dd4619",
      ERC20ABI: erc20ContractABI.abi,
      decimalPlace: 18,
      isNativeToken: false,
    },
  },
  ganache_testnet: {
    btc: {
      label: "BTC",
      value: "bitcoin",
      icon: <ImageIcon image={"/icons/bitcoin.svg"} />,
      decimalPlace: 8,
      isNativeToken: true,
    },
    eth: {
      label: "ETH", // Please always keep the label  in upper case
      value: "Ethereum",
      icon: <ImageIcon image={"/icons/ethereum-2.svg"} />,
      orderBookContractAddreess: "0x432d85454a618C4Bd7b6AC084C316007C155480A",
      orderBookContractABI: OrderBookETHABI.abi,
      decimalPlace: 18,
      isNativeToken: true,
    },
    [ERC20TokenKey]: {
      label: ERC20TokenLabel,
      value: ERC20TokenValue,
      icon: <ImageIcon image={"/icons/bitcoin.svg"} />,
      orderBookContractAddreess: "0x86E7a1c97dD7618C86070EbA5dF2bc87CF4a6f46",
      orderBookContractABI: OrderBookTOKENABI.abi,
      ERC20Address: "0xa89315E69a8eE3EFbE835736B35aaf265c84B3e1",
      ERC20ABI: erc20ContractABI.abi,
      decimalPlace: 18,
      isNativeToken: false,
    },
  },
  bnb_testnet: {
    btc: {
      label: "BTC",
      value: "bitcoin",
      icon: <ImageIcon image={"/icons/bitcoin.svg"} />,
      decimalPlace: 8,
      isNativeToken: true,
    },
    tbnb: {
      label: "tBNB", // Please always keep the label  in upper case
      value: "tBNB",
      icon: <ImageIcon image={"/icons/bnb.png"} />,
      orderBookContractAddreess: "0x27e7b02c4032ac81301b64725ff730e1734f1df2",
      orderBookContractABI: OrderBookETHABI.abi,
      decimalPlace: 18,
      isNativeToken: true,
    },

    // [ERC20TokenKey]: {
    //   label: ERC20TokenLabel,
    //   value: ERC20TokenValue,
    //   icon: <ImageIcon image={"/icons/bitcoin.svg"} />,
    //   orderBookContractAddreess: "0x86E7a1c97dD7618C86070EbA5dF2bc87CF4a6f46",
    //   orderBookContractABI: OrderBookTOKENABI.abi,
    //   ERC20Address: "0xa89315E69a8eE3EFbE835736B35aaf265c84B3e1",
    //   ERC20ABI: erc20ContractABI.abi,
    //   decimalPlace: 18,
    // isNativeToken: false,
    // },
  },
};
