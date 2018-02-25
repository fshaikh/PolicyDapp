var PolicyContract = artifacts.require('./PolicyContract.sol');

module.exports = function(deployer){
    deployer.deploy(PolicyContract);
}