// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Dappcord is ERC721{
    uint256 public totalChannels; // default 0;
    uint256 public totalSupply;
    address public owner;

    struct Channel{
        uint256 id;
        string name;
        uint256 cost;
    }

    mapping(uint256 => Channel) public channels;
    mapping(uint256 => mapping(address => bool)) public hasJoined; // default bool false

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    constructor(string memory _name, string memory _symbol) 
        ERC721(_name, _symbol){
            owner = msg.sender; //deployer
    }

    function createChannel(string memory _name, uint256 _NFTJoinCost ) public onlyOwner{
        totalChannels++;
        channels[totalChannels] = Channel(totalChannels, _name, _NFTJoinCost);
    }

    function getChannel(uint256 _channelId) public view returns (Channel memory){
        return channels[_channelId];
    }

    function mint(uint256 _channelId) public payable {
        //join channel
        require(_channelId != 0);
        require(_channelId <= totalChannels);

        require(!hasJoined[_channelId][msg.sender]);
        require(msg.value >= channels[_channelId].cost);

        hasJoined[_channelId][msg.sender] = true; // sender: the address who called the function
        //mint NFT
        totalSupply++;
        _safeMint(msg.sender, totalSupply);
    } 

    function withdraw() public onlyOwner {
        (bool success,) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
