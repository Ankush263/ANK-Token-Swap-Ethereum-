//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ERC20Interface{
    function totalSupply() external view returns(uint);
    function balanceOf(address tokenOwner) external view returns(uint balance);
    function transfer(address to, uint tokens)external returns(bool success);

    function allowance(address tokenOwner, address spender)external view returns(uint remaining);
    function approve(address spender, uint tokens)external returns(bool success);
    function transferFrom(address sender, address to, uint tokens)external returns(bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

contract TokenSwap is ERC20Interface {
    string public name = "DANKUSH";
    string public symbol = "ANK";

    uint public decimal = 18; 
    uint public override totalSupply;
    address public founder;
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) allowed;
    uint public tokenPrice;

    constructor(){
        totalSupply = 10000000000 * (10 ** decimal);
        founder = msg.sender;
        balances[founder] = totalSupply;
        tokenPrice = 0.001 ether;
    }

    function balanceOf(address tokenOwner) public view override returns(uint balance){
        return balances[tokenOwner];
    }

    function transfer(address to, uint tokens) public override virtual returns(bool success){
        require(balances[msg.sender] >= tokens);
        balances[to] += tokens;
        balances[msg.sender] -= tokens;
        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    function approve(address spender, uint tokens)public override returns(bool success){
        require(balances[msg.sender] >= tokens);
        require(tokens > 0);
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    function allowance(address tokenOwner, address spender)public view override returns(uint remaining){
        return allowed[tokenOwner][spender];
    }

    function transferFrom(address sender, address to, uint tokens)public override virtual returns(bool success){
        require(allowed[sender][to] >= tokens);
        require(balances[sender] >= tokens);
        balances[sender] -= tokens;
        balances[to] += tokens;
        return true;
    }

    function Buy(address _me, uint _tokenAmount)payable public {
        require(msg.value >= _tokenAmount * tokenPrice, "You don't have enough ether in your wallet");
        require(msg.sender != founder, "Owner can't call this function");
        balances[_me] += _tokenAmount;
        balances[founder] -= _tokenAmount;
        payable(founder).transfer((_tokenAmount * tokenPrice) / 10**18);
    }

    function updateTokenPrice(uint _newPrice) public returns(uint) {
        tokenPrice = _newPrice;
        return tokenPrice;
    }


}