const DataStore = artifacts.require("DataStore");

module.exports = function(deployer) {
  deployer.deploy(DataStore);
};
