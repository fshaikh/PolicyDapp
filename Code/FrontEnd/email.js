var emailProvider = emailProvider || {};
emailProvider = (function(){
   
    var url = 'http://localhost:4000/api/email/send';

    async function sendEmail(emailRequest){
        return new Promise((resolve,reject)=>{
            fetch(url,{
                headers: new Headers({
                    'content-type': 'application/json',
                    // 'Access-Control-Allow-Origin': 'http://localhost:8080',
                    // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                    // 'Access-Control-Allow-Headers':'X-Requested-With' 
                  }),
                  body: getBody(emailRequest),
                  method: 'POST',
                  mode:'cors',
                  credentials:'include'
            })
            .then((response)=>{
                return response.json();
            })
            .then((response)=>{
                resolve(response);
            })
            .catch((reason)=>{
                console.log(reason);
                reject(reason);
            })
        });
    }

    function getBody(emailRequest){
        var json = {
            "toEmail":`${emailRequest.toEmail}`,
            "subject":emailRequest.subject,
            "body":emailRequest.body
        };
        return JSON.stringify(json);
    }

    return {
        sendEmail: sendEmail
    };
})();