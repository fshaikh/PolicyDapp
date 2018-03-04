var app = app || {};
app = (function(){

    var web3;
    var policyContractInstance;
    var emailProvider;
    var policyPurchaseEvent;
    var policyPurchaseEtherEvent;
    var notificationManager;

    /**
     * Initializes the app
     */
    function init(email,notificationProvider){
        emailProvider = email;
        notificationManager = notificationProvider;

        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
        
        // set the default account
        web3.eth.defaultAccount = web3.eth.accounts[1];
        fetch('./lib/PolicyContract.json')
            .then((response) => {
                return response.json();
            })
            .then((json)=>{
                createContractInstance(json);
                wireEvents();
            })
            .catch((reason)=>{
                console.log(reason);
            })
    }

    /**
     * Creates Policy Contract instance to invoke contract functions
     * @param {*} json - ABI of the contract
     */
    function createContractInstance(json){
        var policyContract = web3.eth.contract(json.abi);
        policyContractInstance = policyContract.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10');
    }

    /**
     * Wires all UI events
     */
    function wireEvents(){
        var submitBtn = document.querySelector("#purchasePolicyBtn");
        submitBtn.addEventListener("click",handlePurchasePolicy);

        var getAccountPoliciesBtn = document.querySelector("#getAccountPoliciesBtn");
        getAccountPoliciesBtn.addEventListener("click",getAccountPolicies);

        // Register for policy purchase event from smart contract
        policyPurchaseEvent = policyContractInstance.PolicyPurchase({from:web3.eth.defaultAccount});
        policyPurchaseEvent.watch(handlePolicyPurchaseEvent);

        // Register for policy purchase ether event from smart contract
        policyPurchaseEtherEvent = policyContractInstance.PolicyPurchaseEther({from:web3.eth.defaultAccount});
        policyPurchaseEtherEvent.watch(handlePolicyPurchaseEtherEvent);
    }

    /**
     * Handles policy purchase
     */
    async function handlePurchasePolicy(){
        if(web3 == null || policyContractInstance == null){
            return;
        }

        // read all the required values
        var inputRequest = getInput();
        var response = callPurchasePolicyContract(inputRequest);
        console.log(response);
        // Send email
        var emailBody = getEmailBody(response,inputRequest);
        // var emailResponse = await sendEmail(inputRequest.email,emailBody,"Policy Confirmed");
        // console.log(emailResponse);
        //alert('Policy request succesfully sent. You will receive a confirmatin email shortly with link to transaction');
    }

   

    /**
     * Constructs a JSON object from the UI elements
     */
    function getInput(){
        var input = {};
        
        input.name = document.querySelector("#name").value;
        input.city = document.querySelector("#city").value;
        input.email = document.querySelector("#email").value;
        input.day = document.querySelector("#day").value;
        return input;
    }

    /**
     * 
     * @param {*json} inputRequest 
     */
    function callPurchasePolicyContract(inputRequest){

        
        var transaction =  policyContractInstance.purchasePolicy.sendTransaction(
                                                      inputRequest.name,
                                                      inputRequest.city,
                                                      inputRequest.email,
                                                      inputRequest.day,{gas:3000000,from:web3.eth.defaultAccount});
        // send 0.01 ether to contract
        var send = web3.eth.sendTransaction(
                {
                    from:web3.eth.defaultAccount,
                    to:policyContractInstance.owner(),
                    value:web3.toWei(0.01, "ether")
                });
        return web3.eth.getTransactionReceipt(transaction);
    }

    function getEmailBody(txReceipt,inputRequest){
        var emailBody = `
            Hello ${inputRequest.name},
                Your policy purchase is confirmed. Details below:
            City: ${inputRequest.city}
            Day: ${inputRequest.day}
            Transaction Receipt : ${JSON.stringify(txReceipt)}

            Thanks.
        
        `;
        return emailBody;
    }

    async function sendEmail(to,body,subject){
        var response = await emailProvider.sendEmail({
            toEmail: to,
            body: body,
            subject:subject
        });
        console.log(response);
    }

    function handlePolicyPurchaseEvent(error,result){
        if(error){
            console.log(error);
            return;
        }
        notificationManager.showNotification({text:'Policy Purchase has been acknowledged.'});
        //policyPurchaseEvent.stopWatching();
    }

    function handlePolicyPurchaseEtherEvent(error,result){
        if(error){
            console.log(error);
            return;
        }
        notificationManager.showNotification({text:'Policy purchase has been confirmed. 0.01 ETH has been deposited.'});
        
    }

     function getAccountPolicies(){
        if(web3 == null || policyContractInstance == null){
            return;
        }
        alert('called');
        var response = policyContractInstance.getAccountPolicy(web3.eth.defaultAccount);
        console.log(response);

    }

    return{
        init : init
    };

})();