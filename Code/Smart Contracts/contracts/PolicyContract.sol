pragma solidity ^0.4.17;



contract PolicyContract {
    address public owner; // Insurance account
    mapping(uint => Policy) public policyBuyers; // Data structure holding all policies bought
    uint public numberOfBoughtPolicies;
    uint public totalPolicyBought;

    // Data structure representing a policy
    struct Policy {
        string name; // Name of the user purchasing the policy
        string city; // City for which the rain is being considered
        string email; // Email address to communicate with
        string day; // Day on which the rain is being considered
        address userAddress; // User account who is purchasing the policy
        uint amount; // Policy cost
    }

    // Constructor function. Called only once when this contract is deployed to
    // blockchain network
    function PolicyContract() public {
        owner = msg.sender;
        numberOfBoughtPolicies = 0;
        totalPolicyBought = 0;
    }

    //Call this contract function to purchase policy
    function purchasePolicy(string name,string city,string email,string day) public returns(bool) {
        // Do validations first
        // 1. Ensure the sender has enough ether balance to buy the policy
        // 2. Any other??

        // Store the bought policy
        policyBuyers[numberOfBoughtPolicies] = Policy(name,city,email,day,msg.sender,1);
        numberOfBoughtPolicies++;

        // transfer 0.01 Ether from the sender acccount to the contract account
        // Contract account represents the insurance company account
        return true;
    }

    function getBalance() public view returns(uint256) {
        return owner.balance;
    }

    // fallback function which will be called whenever ether is sent to the contract address
    function() public payable {
        totalPolicyBought += msg.value;

    }  

    // function getAccountPolicy(address account) public returns(Policy[]) {
    //     Policy[] accountPolicies;
    //     for (uint index = 0; index < numberOfBoughtPolicies; index++) {
    //          if (account == policyBuyers[index].userAddress) {
    //              accountPolicies.push(policyBuyers[index]);
    //          }
    //     }
    //     return accountPolicies;
    // }

    function getAccountPolicy() public view returns(uint) {
        uint accountPolicies = 0;
        // for (uint index = 0; index < numberOfBoughtPolicies; index++) {
        //     //  if (account == policyBuyers[index].userAddress) {
        //     //      accountPolicies++;
        //     //  }
        // }
        return accountPolicies;
    }
}