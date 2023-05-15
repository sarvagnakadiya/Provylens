// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./userDetails.sol";

contract userDetailsFactory {
  mapping(address => userDetails) public userDetailsAddressMapping;

  function deployMyContract() public {
    userDetails userDetailsObj = new userDetails();
    userDetailsAddressMapping[msg.sender] = userDetailsObj;
  }

  function getUserDetailsContract(address _address) public view returns (address) {
    return address(userDetailsAddressMapping[_address]);
  }
  
}