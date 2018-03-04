var NotificationManager = NotificationManager || {};

NotificationManager = (function(){

    function showNotification(message){
        if(!supportsNotification()){
            alert(message.text);
            return;
        }
        if (Notification.permission === "granted") {
            // Create a notification
            var notification = new Notification(message.text);
        }else{
            Notification.requestPermission((permission)=>{
                var notification = new Notification(message.text);
            });
        }
        
        
    }

    function supportsNotification(){
        return ("Notification" in window || Notification.permission === "denied");
    }

    return {
        showNotification: showNotification
    };
    
})();