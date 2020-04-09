pragma solidity >= 0.5.0 < 0.7.0;

contract DataStore {
    string public data = "Default Data";

    function set(string memory input) public {
        data = input;
    }
}
