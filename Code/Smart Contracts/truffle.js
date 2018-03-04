module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks:{
    development:{
      host:"localhost",
      port: 8545,
      network_id:"*", // Match any network id
      gas: 4600000,
      gasPrice: 10000000000,
      from:'0x475cB31d321210Fa8459d5b7D3De85a9E254971F'
    }
  }
};