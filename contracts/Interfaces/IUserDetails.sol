// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <=0.8.19;

interface IUserDetails {
   
  struct userDetails{
      string userType;
      bytes userName;
      bytes userPhysicalAddress;
      bytes userImage;
      bool userStatus;
  }
  event eventUserData(address indexed _address, string _type, bytes _name, bytes _physicalAddress,bytes _image, uint256 _timeUpdated);
  event eventDeleteUser(address indexed _address);

  function addEntityType(string memory _type)external;

  function addUser(string memory _type, bytes calldata _name, bytes calldata _physicalAddress,bytes memory _image)external;
  function deleteUser()external;
  function editName(bytes memory _name)external;
  function editPhysicalAddress(bytes memory _physicalAddress)external;
  function editImage(bytes memory _image)external;
}