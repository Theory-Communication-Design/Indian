<!--mobile version script start-->

    var agent = navigator.userAgent.toLowerCase();
    if ((navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1)) { // iPhone Device
 
	  //document.getElementById("phone").style.paddingTop = "5px";
	  
	 } else if (agent.indexOf('Mac') != -1) {
		 
		  document.getElementById("phone").style.paddingTop = "5px";

    } else if (agent.indexOf('android') != -1) { // Google phones running Android OS
 
        //document.getElementById("phone").style.paddingTop = "5px";

    }

<!--mobile version script end-->