/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  CarbonizerDeployer,
  CarbonizerDeployerInterface,
} from "../CarbonizerDeployer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_gtokenVault",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    inputs: [
      {
        internalType: "address",
        name: "_carbonizedCollection",
        type: "address",
      },
    ],
    name: "deploy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "gTokenVault",
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
    name: "renounceOwnership",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516114ee3803806114ee833981810160405281019061003291906101c4565b61004e61004361009560201b60201c565b61009d60201b60201c565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506101f1565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061019182610166565b9050919050565b6101a181610186565b81146101ac57600080fd5b50565b6000815190506101be81610198565b92915050565b6000602082840312156101da576101d9610161565b5b60006101e8848285016101af565b91505092915050565b6112ee806102006000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80634c96a3891461005c578063715018a61461008c5780638da5cb5b14610096578063b1dd03fa146100b4578063f2fde38b146100d2575b600080fd5b610076600480360381019061007191906103f0565b6100ee565b604051610083919061042c565b60405180910390f35b61009461014f565b005b61009e610163565b6040516100ab919061042c565b60405180910390f35b6100bc61018c565b6040516100c9919061042c565b60405180910390f35b6100ec60048036038101906100e791906103f0565b6101b2565b005b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168260405161012090610380565b61012b929190610447565b604051809103906000f080158015610147573d6000803e3d6000fd5b509050919050565b610157610236565b61016160006102b4565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6101ba610236565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561022a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610221906104f3565b60405180910390fd5b610233816102b4565b50565b61023e610378565b73ffffffffffffffffffffffffffffffffffffffff1661025c610163565b73ffffffffffffffffffffffffffffffffffffffff16146102b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102a99061055f565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b610d398061058083390190565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006103bd82610392565b9050919050565b6103cd816103b2565b81146103d857600080fd5b50565b6000813590506103ea816103c4565b92915050565b6000602082840312156104065761040561038d565b5b6000610414848285016103db565b91505092915050565b610426816103b2565b82525050565b6000602082019050610441600083018461041d565b92915050565b600060408201905061045c600083018561041d565b610469602083018461041d565b9392505050565b600082825260208201905092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006104dd602683610470565b91506104e882610481565b604082019050919050565b6000602082019050818103600083015261050c816104d0565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610549602083610470565b915061055482610513565b602082019050919050565b600060208201905081810360008301526105788161053c565b905091905056fe608060405234801561001057600080fd5b5060405162000d3938038062000d3983398181016040528101906100349190610208565b6100506100456100d960201b60201c565b6100e160201b60201c565b81600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050610248565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006101d5826101aa565b9050919050565b6101e5816101ca565b81146101f057600080fd5b50565b600081519050610202816101dc565b92915050565b6000806040838503121561021f5761021e6101a5565b5b600061022d858286016101f3565b925050602061023e858286016101f3565b9150509250929050565b610ae180620002586000396000f3fe6080604052600436106100915760003560e01c80638da5cb5b116100595780638da5cb5b14610131578063b1dd03fa1461015c578063d0e30db014610187578063f2fde38b14610191578063f3576220146101ba57610091565b80633ccfd60b146100965780634e71d92d146100ad5780636e5837b6146100c4578063715018a6146100ef5780637c26287114610106575b600080fd5b3480156100a257600080fd5b506100ab6101e6565b005b3480156100b957600080fd5b506100c2610277565b005b3480156100d057600080fd5b506100d96102fb565b6040516100e6919061078a565b60405180910390f35b3480156100fb57600080fd5b50610104610321565b005b34801561011257600080fd5b5061011b610335565b60405161012891906107be565b60405180910390f35b34801561013d57600080fd5b506101466103e7565b604051610153919061078a565b60405180910390f35b34801561016857600080fd5b50610171610410565b60405161017e9190610838565b60405180910390f35b61018f610436565b005b34801561019d57600080fd5b506101b860048036038101906101b39190610884565b6104c6565b005b3480156101c657600080fd5b506101cf61054a565b6040516101dd9291906108b1565b60405180910390f35b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166309cae2c830306040518363ffffffff1660e01b81526004016102439291906108da565b600060405180830381600087803b15801561025d57600080fd5b505af1158015610271573d6000803e3d6000fd5b50505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d6040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156102e157600080fd5b505af11580156102f5573d6000803e3d6000fd5b50505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6103296105ff565b610333600061067d565b565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166364c33977306040518263ffffffff1660e01b8152600401610392919061078a565b60206040518083038186803b1580156103aa57600080fd5b505afa1580156103be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103e2919061092f565b905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16632d2da80634306040518363ffffffff1660e01b8152600401610492919061078a565b6000604051808303818588803b1580156104ab57600080fd5b505af11580156104bf573d6000803e3d6000fd5b5050505050565b6104ce6105ff565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561053e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610535906109df565b60405180910390fd5b6105478161067d565b50565b600080600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a9262a2306040518263ffffffff1660e01b81526004016105a8919061078a565b604080518083038186803b1580156105bf57600080fd5b505afa1580156105d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f791906109ff565b915091509091565b610607610741565b73ffffffffffffffffffffffffffffffffffffffff166106256103e7565b73ffffffffffffffffffffffffffffffffffffffff161461067b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067290610a8b565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061077482610749565b9050919050565b61078481610769565b82525050565b600060208201905061079f600083018461077b565b92915050565b6000819050919050565b6107b8816107a5565b82525050565b60006020820190506107d360008301846107af565b92915050565b6000819050919050565b60006107fe6107f96107f484610749565b6107d9565b610749565b9050919050565b6000610810826107e3565b9050919050565b600061082282610805565b9050919050565b61083281610817565b82525050565b600060208201905061084d6000830184610829565b92915050565b600080fd5b61086181610769565b811461086c57600080fd5b50565b60008135905061087e81610858565b92915050565b60006020828403121561089a57610899610853565b5b60006108a88482850161086f565b91505092915050565b60006040820190506108c660008301856107af565b6108d360208301846107af565b9392505050565b60006040820190506108ef600083018561077b565b6108fc602083018461077b565b9392505050565b61090c816107a5565b811461091757600080fd5b50565b60008151905061092981610903565b92915050565b60006020828403121561094557610944610853565b5b60006109538482850161091a565b91505092915050565b600082825260208201905092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006109c960268361095c565b91506109d48261096d565b604082019050919050565b600060208201905081810360008301526109f8816109bc565b9050919050565b60008060408385031215610a1657610a15610853565b5b6000610a248582860161091a565b9250506020610a358582860161091a565b9150509250929050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610a7560208361095c565b9150610a8082610a3f565b602082019050919050565b60006020820190508181036000830152610aa481610a68565b905091905056fea2646970667358221220c682b8b042d40617e5250da6d20e21dd781eaeb717856bcf72bc05641b1e8f0064736f6c63430008090033a26469706673582212202cfb33b1045f8e00e77df7963fe7633836db39fb6f2e3888c71a25e1ee94569164736f6c63430008090033";

export class CarbonizerDeployer__factory extends ContractFactory {
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
    _gtokenVault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CarbonizerDeployer> {
    return super.deploy(
      _gtokenVault,
      overrides || {}
    ) as Promise<CarbonizerDeployer>;
  }
  getDeployTransaction(
    _gtokenVault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gtokenVault, overrides || {});
  }
  attach(address: string): CarbonizerDeployer {
    return super.attach(address) as CarbonizerDeployer;
  }
  connect(signer: Signer): CarbonizerDeployer__factory {
    return super.connect(signer) as CarbonizerDeployer__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CarbonizerDeployerInterface {
    return new utils.Interface(_abi) as CarbonizerDeployerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CarbonizerDeployer {
    return new Contract(address, _abi, signerOrProvider) as CarbonizerDeployer;
  }
}
