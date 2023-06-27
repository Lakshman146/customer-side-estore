    
    $(document).ready(function() {
        updateCostOnLoad();
    });
    function buynow()
  {
    	 var notAvailable = $(".not-available");
    	     	 var outstock = $(".stockp");
    	     	 if(outstock.length<0)
    	     	 {
    	     	 
         if (notAvailable.length > 0) {
             alert("Please check the availability of Shipment Location before placing order!");
         } 
         else
        	 {
  	 $.ajax({
         url: 'buycartitems',
         method: 'GET',
         success: function(response) {
             $('#payment').html(response); // Set the response HTML as the inner HTML of the cart items element
         },
         error: function(xhr, status, error) {
             console.log('AJAX Error: ' + error);
         }
     });
        	 }
        	 }
        	 else
        	 {
        	 alert("Please the Check the Product Stock Availability");
      } 
  	    }
    function updateQuantity(input) {
        var quantity = input.value;
        console.log(quantity+"qnty!!!!!!!!!!!");
        var productId = input.getAttribute('data-product-id');
        console.log("qty in updateqty method "+quantity);
        console.log("product no=" + productId);
        $.ajax({
            url: 'updateQuantity',
            method: 'POST',
            data: { productId: productId, quantity: quantity },
            success: function(response) {
                console.log("response of updateqty  "+response);
                $("#tcost").html("Total Cost: " + response);
                
            },
            error: function(xhr, status, error) {
                console.log('AJAX Error: ' + error);
            }
        });
    }
    
  
    
    function updateCostOnLoad(){
        console.log("updateCostOnLoad");

    	$.ajax({
            url: 'updateCostOnLoad',
            method: 'POST',
            success: function(response) {
            	console.log(response);
                $("#tcost").html("Total Cost: " + response);

            },
            error: function(xhr, status, error) {
                console.log('AJAX Error: ' + error);
            }
        });
    }
    function showProductDetails(productId) {
        window.location.href = "prodDescription?productId=" + productId;
        console.log(productId);
    }
    
    function decreaseQuantity(input) {
        var quantityInput = input.parentNode.parentNode.querySelector('input[type="text"]');
        var currentQuantity = parseInt(quantityInput.value);

        if (currentQuantity > 1) {
            quantityInput.value = currentQuantity - 1;
            updateQuantity(quantityInput);
        }
    }

    function increaseQuantity(input) {
        var quantityInput = input.parentNode.parentNode.querySelector('input[type="text"]');
        var currentQuantity = parseInt(quantityInput.value);

        quantityInput.value = currentQuantity + 1;
        updateQuantity(quantityInput);
    }
    


$(document).ready(function(){
	  var pin=$("#custPincode");
	  console.log(pin.val());
	  checkPincodeAvailability(pin.val());
	  
	});
  
  

function checkPincodeAvailability(pincode) {
    console.log("Checking pincode availability for Product ID: "+pincode);

    $.ajax({
        type: "POST",
        url: "checkPincode",
        data: { pincode: pincode },
        success: function(response) {
            var availabilityElement = $("#availability");
            console.log(response);
            if (response=="true") {
                availabilityElement.text("Shipment is Available for this Pincode").removeClass("not-available").addClass("available");
            } else {
                availabilityElement.text("Shipment is not Available for this Pincode").removeClass("available").addClass("not-available");
            }
        },
        error: function(error) {
            console.error(error);
        }
    });
}

$(document).ready(function() {
    $('.changeaddress').click(function(e) {
        e.preventDefault();
        var submitButton = $(this);
        console.log("shipment address");

        var name = $("#custName").val();
        var add = $("#custSAddress").val();
        var pin = $(".custPincode").val(); // Corrected id here
        console.log(pin);

        $.ajax({
            type: 'POST',
            url: 'updateshipment',
            data: { name: name, custSAddress: add, custSpincode: pin },
            success: function(response) {
                console.log(response);
                if (response === "Valid") {
                    toastr.success("Address Changed");
                } else {
                    toastr.info("Shipment is Not available for this Address");
                }
            },
            error: function(error) {
                console.error(error);
            }
        });
    });
});

   
    