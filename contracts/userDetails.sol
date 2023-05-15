// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <=0.8.19;


/// @author ProvyLens team
/// @title The contract for handling userData
/// @notice Uses IUserDetails interface

import "./Interfaces/IUserDetails.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract userDetails is IUserDetails, Ownable{
    /// @notice mapping address with userDetails struct
    mapping(address=>userDetails) public userDetailsMapping;
    mapping(string => bool) private userTypesMapping;

    /// @notice array to keep track of user' catogery
    address[] public users;
    string[] private userTypes;

    function addEntityType(string memory _type)public onlyOwner override{
        require(!userTypesMapping[_type], "Entity already exists");
        userTypesMapping[_type] = true;
        userTypes.push(_type);
    }

    /// @notice function to add the user
    function addUser(string memory _type, bytes calldata _name, bytes calldata _physicalAddress,bytes memory _image)public override {
        require((userDetailsMapping[msg.sender].userName).length == 0, "User already registered");
        require((userTypesMapping[_type] == true), "UserType doesn't exists. You can add the userType using \"addEntityType()\" function  ");
        userDetailsMapping[msg.sender] = userDetails(_type,_name,_physicalAddress,_image, true);
        users.push(msg.sender);
        emit eventUserData(msg.sender,_type,_name,_physicalAddress,_image,block.timestamp);
    }

    /// @notice Function to delete the user
    function deleteUser()public override {
        userDetailsMapping[msg.sender].userStatus = false;
        emit eventDeleteUser(msg.sender);
    }

    /// @notice function to edit the name of the user
    function editName(bytes memory _name)public override {
        userDetailsMapping[msg.sender].userName = _name;
        userDetails memory u = userDetailsMapping[msg.sender];
        emit eventUserData(msg.sender,u.userType,_name,u.userPhysicalAddress,u.userImage,block.timestamp);
    }

    /// @notice function to edit the physical address of the user
    function editPhysicalAddress(bytes memory _physicalAddress)public override{
        userDetailsMapping[msg.sender].userPhysicalAddress = _physicalAddress;
        userDetails memory u = userDetailsMapping[msg.sender];
        emit eventUserData(msg.sender,u.userType,u.userName,_physicalAddress,u.userImage,block.timestamp);

    }

    /// @notice function to edit the Image of the user
    function editImage(bytes memory _image)public override {
        userDetailsMapping[msg.sender].userImage = _image;
        userDetails memory u = userDetailsMapping[msg.sender];
        emit eventUserData(msg.sender,u.userType,u.userName,u.userImage,_image,block.timestamp);
    }

    /// @notice function to return user details of any perticular user
    function getSingleUser(address _address) public view returns(userDetails memory){
        return userDetailsMapping[_address];
    }

    /// @notice function to return all the users registered on provyLens
    function getAllUsers() public view returns(userDetails[] memory){
        userDetails[] memory userD = new userDetails[](users.length);
        for(uint i=0;i<users.length;i++)
        {
            userD[i] = userDetailsMapping[users[i]];
        }
        return userD;
    }
}