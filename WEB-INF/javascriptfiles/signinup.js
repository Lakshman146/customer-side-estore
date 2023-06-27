  function validateEmail()
   {
	   var email = $("#email").val();
	   console.log("email in verification "+email);
	   $.ajax({
   	    type: "POST",
   	    url: "emailValid",
   	    data: { email: email },
   	    success: function(response) {
   	      console.log("response of email verification " + response);
   	      if (response !== "no") {
   	    	 $("#emailCheck").text("Account already existed with this mail");
   	    	 $("#email").val("");
   	    	setTimeout(function() {
   	         $("#emailCheck").text("");
   	       }, 2000);
   	      }
   	      },error: function() {
	            alert("Error occurred. Please try again later.");
          }
        });
   }
function validateEmailsignin()
{
	   var email = $("#email").val();
	   console.log("email in verification "+email);
	   $.ajax({
	    type: "POST",
	    url: "emailValid",
	    data: { email: email },
	    success: function(response) {
	      console.log("response of email verification " + response);
	         if (response == "no") {
	    	 $("#emailVerify").text("Please enter valid email");
	    	
	    	setTimeout(function() {
	         $("#emailVerify").text("");
	       }, 2000);
	    	$("#email").val("");} 
	       //console.log("signin email verification response "+response);
	         
	      },error: function() {
	            alert("Error occurred. Please try again later.");
       }
     });
}
   
    function validatePassword() {
      var passwordInput = document.getElementById("password").value;
      console.log("Password: " + passwordInput);
      var confirmPassword = document.getElementById("confirm-password").value;
      var message = document.getElementById("confirm-password-message");
      
      if (passwordInput !== confirmPassword) {
        message.style.color = "red";
        message.innerHTML = "Passwords do not match";
        return false;
      } else {
        message.style.color = "green";
        message.innerHTML = "Passwords match";
        return true;
      }
    }
function usersignin()
{
    document.querySelector(".userlogin-form-container").style.cssText = "display: none;";
    document.querySelector(".adminlogin-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(56, 189, 149),  rgb(28, 139, 106));";
    document.querySelector(".button-1").style.cssText = "display: none";
    document.querySelector(".button-2").style.cssText = "display: block";

};