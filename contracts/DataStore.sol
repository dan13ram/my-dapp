pragma solidity >= 0.5.0 < 0.7.0;

contract DataStore {
    string public data = "Default Data";
    event DataSet(uint256 timestamp, string data);

    function set(string memory input) public {
        data = input;
        emit DataSet(now, input);
    }
}
