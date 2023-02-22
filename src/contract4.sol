// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "custom-tag/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {}
}