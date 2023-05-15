// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./provylens.sol";

contract provylensFactory {
  mapping(address => provylens) public provylensAddressMapping;

  function deployMyContract() public {
    provylens provylensObj = new provylens();
    provylensAddressMapping[msg.sender] = provylensObj;
  }

  function getDeployedContract(address _address) public view returns (address) {
    return address(provylensAddressMapping[_address]);
  }
}