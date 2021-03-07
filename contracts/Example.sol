// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.3;

contract Example {
    uint256 number;

    function store(uint256 num) public {
        number = num;
    }

    function retrieve() public view returns (uint256) {
        return number;
    }
}
