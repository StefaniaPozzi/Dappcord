// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Dappcord is ERC721{
    uint256 public totalChannels; // default 0;
    address public owner;

    struct Channel{
        uint256 id;
        string name;
        uint256 cost;
    }

    mapping(uint256 => Channel) public channels;

    constructor(string memory _name, string memory _symbol) 
        ERC721(_name, _symbol){
            owner = msg.sender; //deployer
    }

    function createChannel(string memory _name, uint256 _NFTJoinCost )public{
        totalChannels++;
        channels[totalChannels] = Channel(totalChannels, _name, _NFTJoinCost);
    }

    function getChannel(uint256 _id) public view returns (Channel memory){
        return channels[_id];
    }
}
