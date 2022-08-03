/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { CarbonRewards, CarbonRewardsInterface } from "../CarbonRewards";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Recovered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "RewardAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "RewardPaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newDuration",
        type: "uint256",
      },
    ],
    name: "RewardsDurationUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "carbonCollection",
    outputs: [
      {
        internalType: "contract ICarbonizedCollection",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "closeWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "earned",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getRewardForDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_rewardsDistributor",
        type: "address",
      },
      {
        internalType: "address",
        name: "_rewardsToken",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isWhitelist",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastTimeRewardApplicable",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastUpdateTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "notifyRewardAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "onlyWhitelist",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "openWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "periodFinish",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "recoverERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardPerToken",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardPerTokenStored",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "rewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardsDistributor",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardsDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardsToken",
    outputs: [
      {
        internalType: "contract IERC20Upgradeable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_carbonCollection",
        type: "address",
      },
    ],
    name: "setCarbonCollection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_rewardsDistributor",
        type: "address",
      },
    ],
    name: "setRewardsDistribution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rewardsDuration",
        type: "uint256",
      },
    ],
    name: "setRewardsDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rewardsDuration",
        type: "uint256",
      },
    ],
    name: "updateActiveRewardsDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "updateReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userRewardPerTokenPaid",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "whiteList",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "whiteListAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50613234806100206000396000f3fe608060405234801561001057600080fd5b50600436106102055760003560e01c80637b0a47ee1161011a578063c8f33c91116100ad578063d44d8d611161007c578063d44d8d611461056a578063df136d6514610586578063ebe2b12b146105a4578063f2fde38b146105c2578063f97fb15f146105de57610205565b8063c8f33c91146104f4578063cc1a378f14610512578063cd3daf9d1461052e578063d1af0c7d1461054c57610205565b80638b876347116100e95780638b8763471461046c5780638da5cb5b1461049c5780639cd2c60d146104ba578063a88e0996146104d657610205565b80637b0a47ee146103f857806380faa57d146104165780638980f11f146104345780638b0c95601461045057610205565b80633d18b9121161019d578063586b9a7c1161016c578063586b9a7c1461037a5780635c975abb14610384578063632447c9146103a257806370a08231146103be578063715018a6146103ee57610205565b80633d18b912146103185780633f2a5540146103225780634146ed0a14610340578063485cc9551461035e57610205565b80631c1f78eb116101d95780631c1f78eb14610290578063372c12b1146102ae578063386a9525146102de5780633c6b16ab146102fc57610205565b80628cc2621461020a5780630700037d1461023a578063083bbe7f1461026a5780631976214314610274575b600080fd5b610224600480360381019061021f9190612486565b6105fc565b60405161023191906124cc565b60405180910390f35b610254600480360381019061024f9190612486565b610769565b60405161026191906124cc565b60405180910390f35b610272610781565b005b61028e60048036038101906102899190612486565b61081a565b005b6102986108da565b6040516102a591906124cc565b60405180910390f35b6102c860048036038101906102c39190612486565b6108f1565b6040516102d59190612502565b60405180910390f35b6102e6610911565b6040516102f391906124cc565b60405180910390f35b61031660048036038101906103119190612549565b610917565b005b610320610b99565b005b61032a610e04565b6040516103379190612585565b60405180910390f35b610348610e2a565b6040516103559190612502565b60405180910390f35b610378600480360381019061037391906125a0565b610e7e565b005b610382610fd3565b005b61038c61106c565b6040516103999190612502565b60405180910390f35b6103bc60048036038101906103b79190612486565b611083565b005b6103d860048036038101906103d39190612486565b61116b565b6040516103e591906124cc565b60405180910390f35b6103f661121f565b005b6104006112a7565b60405161040d91906124cc565b60405180910390f35b61041e6112ad565b60405161042b91906124cc565b60405180910390f35b61044e600480360381019061044991906125e0565b6112c7565b005b61046a60048036038101906104659190612486565b611443565b005b61048660048036038101906104819190612486565b61151a565b60405161049391906124cc565b60405180910390f35b6104a4611532565b6040516104b19190612585565b60405180910390f35b6104d460048036038101906104cf9190612486565b61155c565b005b6104de61161c565b6040516104eb9190612502565b60405180910390f35b6104fc61162f565b60405161050991906124cc565b60405180910390f35b61052c60048036038101906105279190612549565b611635565b005b610536611738565b60405161054391906124cc565b60405180910390f35b6105546118dd565b604051610561919061267f565b60405180910390f35b610584600480360381019061057f9190612549565b611903565b005b61058e611c30565b60405161059b91906124cc565b60405180910390f35b6105ac611c36565b6040516105b991906124cc565b60405180910390f35b6105dc60048036038101906105d79190612486565b611c3c565b005b6105e6611d34565b6040516105f391906126bb565b60405180910390f35b600060d160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054670de0b6b3a764000060d060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461068f611738565b6106999190612705565b60d260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635edd6eb4866040518263ffffffff1660e01b81526004016106f49190612585565b60206040518083038186803b15801561070c57600080fd5b505afa158015610720573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610744919061274e565b61074e919061277b565b6107589190612804565b6107629190612835565b9050919050565b60d16020528060005260406000206000915090505481565b610789611d5a565b73ffffffffffffffffffffffffffffffffffffffff166107a7611532565b73ffffffffffffffffffffffffffffffffffffffff16146107fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107f4906128e8565b60405180910390fd5b600160d460006101000a81548160ff021916908315150217905550565b610822611d5a565b73ffffffffffffffffffffffffffffffffffffffff16610840611532565b73ffffffffffffffffffffffffffffffffffffffff1614610896576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161088d906128e8565b60405180910390fd5b8060cf60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600060cc5460cb546108ec919061277b565b905090565b60d36020528060005260406000206000915054906101000a900460ff1681565b60cc5481565b60cf60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146109a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099e90612954565b60405180910390fd5b60006109b1611738565b60ce819055506109bf6112ad565b60cd81905550600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610a8c57610a02816105fc565b60d160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060ce5460d060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b610adb33308460c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16611d62909392919063ffffffff16565b60ca544210610afd5760cc5482610af29190612804565b60cb81905550610b43565b60004260ca54610b0d9190612705565b9050600060cb5482610b1f919061277b565b905060cc548185610b309190612835565b610b3a9190612804565b60cb8190555050505b4260cd8190555060cc5442610b589190612835565b60ca819055507fde88a922e0d3b88b24e9623efeb464919c6bf9f66857a65e2bfcf2ce87a9433d82604051610b8d91906124cc565b60405180910390a15050565b60026001541415610bdf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bd6906129c0565b60405180910390fd5b600260018190555033610bf0611738565b60ce81905550610bfe6112ad565b60cd81905550600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610ccb57610c41816105fc565b60d160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060ce5460d060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b600060d160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000811115610df957600060d160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610daa338260c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16611deb9092919063ffffffff16565b3373ffffffffffffffffffffffffffffffffffffffff167fe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e048682604051610df091906124cc565b60405180910390a25b505060018081905550565b60cf60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060d360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905090565b6000610e8a6001611e71565b90508015610eae576001600060016101000a81548160ff0219169083151502179055505b610eb6611f61565b610ebe611fba565b8160c960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260cf60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060ca81905550600060cb8190555062ed4e0060cc81905550600160d460006101000a81548160ff0219169083151502179055508015610fce5760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024986001604051610fc59190612a28565b60405180910390a15b505050565b610fdb611d5a565b73ffffffffffffffffffffffffffffffffffffffff16610ff9611532565b73ffffffffffffffffffffffffffffffffffffffff161461104f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611046906128e8565b60405180910390fd5b600060d460006101000a81548160ff021916908315150217905550565b6000606560009054906101000a900460ff16905090565b8061108c611738565b60ce8190555061109a6112ad565b60cd81905550600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611167576110dd816105fc565b60d160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060ce5460d060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b5050565b600060d260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635edd6eb4836040518263ffffffff1660e01b81526004016111c89190612585565b60206040518083038186803b1580156111e057600080fd5b505afa1580156111f4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611218919061274e565b9050919050565b611227611d5a565b73ffffffffffffffffffffffffffffffffffffffff16611245611532565b73ffffffffffffffffffffffffffffffffffffffff161461129b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611292906128e8565b60405180910390fd5b6112a56000612013565b565b60cb5481565b600060ca5442106112c05760ca546112c2565b425b905090565b6112cf611d5a565b73ffffffffffffffffffffffffffffffffffffffff166112ed611532565b73ffffffffffffffffffffffffffffffffffffffff1614611343576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161133a906128e8565b60405180910390fd5b60d260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156113d4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113cb90612ab5565b60405180910390fd5b6114066113df611532565b828473ffffffffffffffffffffffffffffffffffffffff16611deb9092919063ffffffff16565b7f8c1256b8896378cd5044f80c202f9772b9d77dc85c8a6eb51967210b09bfaa288282604051611437929190612ad5565b60405180910390a15050565b61144b611d5a565b73ffffffffffffffffffffffffffffffffffffffff16611469611532565b73ffffffffffffffffffffffffffffffffffffffff16146114bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114b6906128e8565b60405180910390fd5b600160d360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b60d06020528060005260406000206000915090505481565b6000609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b611564611d5a565b73ffffffffffffffffffffffffffffffffffffffff16611582611532565b73ffffffffffffffffffffffffffffffffffffffff16146115d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115cf906128e8565b60405180910390fd5b8060d260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60d460009054906101000a900460ff1681565b60cd5481565b61163d611d5a565b73ffffffffffffffffffffffffffffffffffffffff1661165b611532565b73ffffffffffffffffffffffffffffffffffffffff16146116b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116a8906128e8565b60405180910390fd5b60ca5442116116f5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116ec90612b4a565b60405180910390fd5b8060cc819055507ffb46ca5a5e06d4540d6387b930a7c978bce0db5f449ec6b3f5d07c6e1d44f2d360cc5460405161172d91906124cc565b60405180910390a150565b60008060d260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637dbad26c6040518163ffffffff1660e01b815260040160206040518083038186803b1580156117a357600080fd5b505afa1580156117b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117db919061274e565b14156117eb5760ce5490506118da565b60d260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637dbad26c6040518163ffffffff1660e01b815260040160206040518083038186803b15801561185357600080fd5b505afa158015611867573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061188b919061274e565b670de0b6b3a764000060cb5460cd546118a26112ad565b6118ac9190612705565b6118b6919061277b565b6118c0919061277b565b6118ca9190612804565b60ce546118d79190612835565b90505b90565b60c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60cf60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611993576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161198a90612954565b60405180910390fd5b600061199d611738565b60ce819055506119ab6112ad565b60cd81905550600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611a78576119ee816105fc565b60d160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060ce5460d060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b60ca544210611abc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ab390612bdc565b60405180910390fd5b60008211611aff576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611af690612c6e565b60405180910390fd5b600060cc54905060004260ca54611b169190612705565b905081841115611b49578184611b2c9190612705565b60ca6000828254611b3d9190612835565b92505081905550611b6e565b8382611b559190612705565b60ca6000828254611b669190612705565b925050819055505b4260ca5411611bb2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ba990612d00565b60405180910390fd5b600060cb5482611bc2919061277b565b905060004260ca54611bd49190612705565b90508082611be29190612804565b60cb819055508560cc819055507ffb46ca5a5e06d4540d6387b930a7c978bce0db5f449ec6b3f5d07c6e1d44f2d360cc54604051611c2091906124cc565b60405180910390a1505050505050565b60ce5481565b60ca5481565b611c44611d5a565b73ffffffffffffffffffffffffffffffffffffffff16611c62611532565b73ffffffffffffffffffffffffffffffffffffffff1614611cb8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611caf906128e8565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611d28576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d1f90612d92565b60405180910390fd5b611d3181612013565b50565b60d260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600033905090565b611de5846323b872dd60e01b858585604051602401611d8393929190612db2565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506120d9565b50505050565b611e6c8363a9059cbb60e01b8484604051602401611e0a929190612ad5565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506120d9565b505050565b60008060019054906101000a900460ff1615611ee85760018260ff16148015611ea05750611e9e306121a0565b155b611edf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ed690612e5b565b60405180910390fd5b60009050611f5c565b8160ff1660008054906101000a900460ff1660ff1610611f3d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f3490612e5b565b60405180910390fd5b816000806101000a81548160ff021916908360ff160217905550600190505b919050565b600060019054906101000a900460ff16611fb0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611fa790612eed565b60405180910390fd5b611fb86121c3565b565b600060019054906101000a900460ff16612009576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161200090612eed565b60405180910390fd5b612011612224565b565b6000609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081609760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600061213b826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166122909092919063ffffffff16565b905060008151111561219b578080602001905181019061215b9190612f39565b61219a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161219190612fd8565b60405180910390fd5b5b505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff16612212576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161220990612eed565b60405180910390fd5b61222261221d611d5a565b612013565b565b600060019054906101000a900460ff16612273576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161226a90612eed565b60405180910390fd5b6000606560006101000a81548160ff021916908315150217905550565b606061229f84846000856122a8565b90509392505050565b6060824710156122ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016122e49061306a565b60405180910390fd5b6122f6856121a0565b612335576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161232c906130d6565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff16858760405161235e9190613170565b60006040518083038185875af1925050503d806000811461239b576040519150601f19603f3d011682016040523d82523d6000602084013e6123a0565b606091505b50915091506123b08282866123bc565b92505050949350505050565b606083156123cc5782905061241c565b6000835111156123df5782518084602001fd5b816040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161241391906131dc565b60405180910390fd5b9392505050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061245382612428565b9050919050565b61246381612448565b811461246e57600080fd5b50565b6000813590506124808161245a565b92915050565b60006020828403121561249c5761249b612423565b5b60006124aa84828501612471565b91505092915050565b6000819050919050565b6124c6816124b3565b82525050565b60006020820190506124e160008301846124bd565b92915050565b60008115159050919050565b6124fc816124e7565b82525050565b600060208201905061251760008301846124f3565b92915050565b612526816124b3565b811461253157600080fd5b50565b6000813590506125438161251d565b92915050565b60006020828403121561255f5761255e612423565b5b600061256d84828501612534565b91505092915050565b61257f81612448565b82525050565b600060208201905061259a6000830184612576565b92915050565b600080604083850312156125b7576125b6612423565b5b60006125c585828601612471565b92505060206125d685828601612471565b9150509250929050565b600080604083850312156125f7576125f6612423565b5b600061260585828601612471565b925050602061261685828601612534565b9150509250929050565b6000819050919050565b600061264561264061263b84612428565b612620565b612428565b9050919050565b60006126578261262a565b9050919050565b60006126698261264c565b9050919050565b6126798161265e565b82525050565b60006020820190506126946000830184612670565b92915050565b60006126a58261264c565b9050919050565b6126b58161269a565b82525050565b60006020820190506126d060008301846126ac565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612710826124b3565b915061271b836124b3565b92508282101561272e5761272d6126d6565b5b828203905092915050565b6000815190506127488161251d565b92915050565b60006020828403121561276457612763612423565b5b600061277284828501612739565b91505092915050565b6000612786826124b3565b9150612791836124b3565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156127ca576127c96126d6565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061280f826124b3565b915061281a836124b3565b92508261282a576128296127d5565b5b828204905092915050565b6000612840826124b3565b915061284b836124b3565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156128805761287f6126d6565b5b828201905092915050565b600082825260208201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006128d260208361288b565b91506128dd8261289c565b602082019050919050565b60006020820190508181036000830152612901816128c5565b9050919050565b7f43616c6c6572206973206e6f7420526577617264734469737472696275746f72600082015250565b600061293e60208361288b565b915061294982612908565b602082019050919050565b6000602082019050818103600083015261296d81612931565b9050919050565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b60006129aa601f8361288b565b91506129b582612974565b602082019050919050565b600060208201905081810360008301526129d98161299d565b9050919050565b6000819050919050565b600060ff82169050919050565b6000612a12612a0d612a08846129e0565b612620565b6129ea565b9050919050565b612a22816129f7565b82525050565b6000602082019050612a3d6000830184612a19565b92915050565b7f43616e6e6f7420776974686472617720746865207374616b696e6720746f6b6560008201527f6e00000000000000000000000000000000000000000000000000000000000000602082015250565b6000612a9f60218361288b565b9150612aaa82612a43565b604082019050919050565b60006020820190508181036000830152612ace81612a92565b9050919050565b6000604082019050612aea6000830185612576565b612af760208301846124bd565b9392505050565b7f5265776172647320706572696f64206d75737420626520696e61637469766500600082015250565b6000612b34601f8361288b565b9150612b3f82612afe565b602082019050919050565b60006020820190508181036000830152612b6381612b27565b9050919050565b7f436172626f6e5374616b696e673a2052657761726420706572696f64206e6f7460008201527f2061637469766500000000000000000000000000000000000000000000000000602082015250565b6000612bc660278361288b565b9150612bd182612b6a565b604082019050919050565b60006020820190508181036000830152612bf581612bb9565b9050919050565b7f436172626f6e5374616b696e673a20526577617264206475726174696f6e206d60008201527f757374206265206e6f6e2d7a65726f0000000000000000000000000000000000602082015250565b6000612c58602f8361288b565b9150612c6382612bfc565b604082019050919050565b60006020820190508181036000830152612c8781612c4b565b9050919050565b7f436172626f6e5374616b696e673a206e6577207265776172642064757261746960008201527f6f6e206973206578706972656400000000000000000000000000000000000000602082015250565b6000612cea602d8361288b565b9150612cf582612c8e565b604082019050919050565b60006020820190508181036000830152612d1981612cdd565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000612d7c60268361288b565b9150612d8782612d20565b604082019050919050565b60006020820190508181036000830152612dab81612d6f565b9050919050565b6000606082019050612dc76000830186612576565b612dd46020830185612576565b612de160408301846124bd565b949350505050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6000612e45602e8361288b565b9150612e5082612de9565b604082019050919050565b60006020820190508181036000830152612e7481612e38565b9050919050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b6000612ed7602b8361288b565b9150612ee282612e7b565b604082019050919050565b60006020820190508181036000830152612f0681612eca565b9050919050565b612f16816124e7565b8114612f2157600080fd5b50565b600081519050612f3381612f0d565b92915050565b600060208284031215612f4f57612f4e612423565b5b6000612f5d84828501612f24565b91505092915050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b6000612fc2602a8361288b565b9150612fcd82612f66565b604082019050919050565b60006020820190508181036000830152612ff181612fb5565b9050919050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b600061305460268361288b565b915061305f82612ff8565b604082019050919050565b6000602082019050818103600083015261308381613047565b9050919050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b60006130c0601d8361288b565b91506130cb8261308a565b602082019050919050565b600060208201905081810360008301526130ef816130b3565b9050919050565b600081519050919050565b600081905092915050565b60005b8381101561312a57808201518184015260208101905061310f565b83811115613139576000848401525b50505050565b600061314a826130f6565b6131548185613101565b935061316481856020860161310c565b80840191505092915050565b600061317c828461313f565b915081905092915050565b600081519050919050565b6000601f19601f8301169050919050565b60006131ae82613187565b6131b8818561288b565b93506131c881856020860161310c565b6131d181613192565b840191505092915050565b600060208201905081810360008301526131f681846131a3565b90509291505056fea264697066735822122039b857ace177353d1838ec8cad68ee6e296c3b2d989e131e151a1543a707625a64736f6c63430008090033";

export class CarbonRewards__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CarbonRewards> {
    return super.deploy(overrides || {}) as Promise<CarbonRewards>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CarbonRewards {
    return super.attach(address) as CarbonRewards;
  }
  connect(signer: Signer): CarbonRewards__factory {
    return super.connect(signer) as CarbonRewards__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CarbonRewardsInterface {
    return new utils.Interface(_abi) as CarbonRewardsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CarbonRewards {
    return new Contract(address, _abi, signerOrProvider) as CarbonRewards;
  }
}