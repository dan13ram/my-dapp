pragma solidity ^0.6.0;

contract MyContract {
    uint public data = 0;

    function set(uint input) public {
        data = input;
    }
}
