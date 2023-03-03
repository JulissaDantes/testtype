// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "custom-tag/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {}
}

import "chainlink-dev/contracts/src/v0.8/dev/ValidatorProxy.sol";

abstract contract MyOtherContract is ValidatorProxy {

}

import "@openzeppelin/contracts/crosschain/arbitrum/CrossChainEnabledArbitrumL2.sol";

contract MyVulnerableContract is CrossChainEnabledArbitrumL2 {

}

import "contracts-playground/contracts/WizardToken.sol";

contract MyOtherToken is WizardToken {}

import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";

contract MyOtherVulnerableContract {
    using ERC165Checker for address;
}

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract MyOtherDowngradedContract {
    using ERC165Checker for address;
}
