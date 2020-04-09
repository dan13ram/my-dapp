
App = {
  contracts: {},

    load: async () => {
        App.dataDiv = document.getElementById("data");
        App.accountDiv = document.getElementById("account");
        App.inputDiv = document.getElementById("input");
        App.errorDiv = document.getElementById("error");
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
    },
    loadWeb3: async () => {
        if (window.ethereum) {
            App.web3Provider = ethereum;
            window.web3 = new Web3(ethereum);
            try {
                // Request account access if needed
                await ethereum.enable();
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */});
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider);
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */});
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    },
    loadAccount: async() => {
        let account = web3.eth.accounts[0];
        App.accountDiv.textContent = account;
    },
    loadContract: async() => {
        let dataStoreResponse = await fetch("DataStore.json");
        const dataStore = await dataStoreResponse.json();
        App.contracts.DataStore = TruffleContract(dataStore);
        App.contracts.DataStore.setProvider(App.web3Provider);
        App.dataStore = await App.contracts.DataStore.deployed();
        App.loadData();
    },
    loadData: async() => {
        let data = await App.dataStore.data();
        App.dataDiv.textContent = data;
    },
    set: async () => {
        App.cleanError();
        let value = App.inputDiv.value;
        if (!value || value === "") {
            App.showError("Data cannot be empty");
            return;
        }
        await App.dataStore.set(value);
        App.loadData();
    },
    cleanError: () => {
        App.errorDiv.textContent = "";
    },
    showError: (error) => {
        App.errorDiv.textContent = error;
    }

}

window.onload = () => {
    App.load();
}
