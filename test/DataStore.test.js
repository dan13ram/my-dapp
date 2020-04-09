const DataStore = artifacts.require("DataStore");

contract('DataStore', (accounts) => {
    before(async () => {
        this.dataStore = await DataStore.deployed();
    });

    it('deploys successfully', async () => {
        const address = await this.dataStore.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    });

    it('gets data', async () => {
        const data = await this.dataStore.data();
        assert.notEqual(data, '');
        assert.notEqual(data, null);
        assert.notEqual(data, undefined);
        assert.equal(data, 'Default Data');
    });

    it('sets data', async () => {
        const input = "input";
        const result = await this.dataStore.set(input);
        const event = result.logs[0].args;
        const data = event.data;
        assert.notEqual(data, '');
        assert.notEqual(data, null);
        assert.notEqual(data, undefined);
        assert.notEqual(data, 'Default Data');
        assert.equal(data, input);
    });
});
