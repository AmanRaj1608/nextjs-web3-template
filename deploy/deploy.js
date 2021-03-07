const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const { interface, object } = require('./compile');

const privateKey = '6ad90a424022be35f9a95ae44143db08c894ba44ed0de90b67199288e06924d5';
const rpcUrl = 'https://rinkeby.infura.io/v3/196440d5d02d41dfa2a8ee5bfd2e96bd';

const provider = new HDWalletProvider(privateKey, rpcUrl);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
  
  const result = await new web3.eth.Contract(interface)
    .deploy({ data: object })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};

deploy();
