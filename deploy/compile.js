const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, '../contracts', 'Example.sol');
const source = fs.readFileSync(contractPath, 'utf8');
// console.log(source);

const input = {
  language: 'Solidity',
  sources: {
    'Example.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}
const result = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Example.sol'].Example;
// console.log(result);

const { abi: interface, evm: { bytecode: { object } } } = result;
// console.log(interface, object);

module.exports = { interface, object }; // object is the actual name of the bytecode
