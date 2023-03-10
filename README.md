# Dapp - Discord

Decentralized application that enables users to mint NFTs and partecipate in a discord-style chat.

## Technology Stack & Tools

- Solidity, Javascript, [Hardhat](https://hardhat.org/), [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction),[React.js](https://reactjs.org/), [Socket.io](https://socket.io/), [NodeJS](https://nodejs.org/en/)
- NTF: [ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/#top


## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
`$ npm install`

### 3. Run tests
`$ npx hardhat test`

### 4. Start Hardhat node
`$ npx hardhat node`

### 5. Run deployment script
In a separate terminal execute:
`$ npx hardhat run ./scripts/deploy.js --network localhost`

### 6. Start Socket.io server
`$ node server.js`

### 7. Start frontend
In a separate terminal execute:
`$ npm run start`