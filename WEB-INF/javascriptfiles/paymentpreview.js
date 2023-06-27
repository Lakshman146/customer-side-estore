function openCheckout() {
        var amt = document.getElementById("tid").value;
        console.log("amount in payment options jsp " + amt);
        var orderId;

        $.ajax({
            url: "getOrderId",
            method: 'GET',
            data: { amt: amt },
            success: function(response) {
                orderId = response;
                console.log("response == " + response);
                handleOrder(orderId, amt);
            },
            error: function(xhr, status, error) {
                console.log('AJAX Error: ' + error);
            }
        });
    }

    function handleOrder(orderId, amt) {
        var options = {
            key: "rzp_test_Eu94k5nuplVQzA",
            name: "E-Cart",
            // amount: 1000,
            description: "SLAM payments",
            image: "https://s29.postimg.org/r6dj1g85z/daft_punk.jpg",
            prefill: {
                name: "Adithya",
                email: "adithya.thandra@gmail.com",
                contact: "9290005690"
            },
            notes: {
                address: "India",
                merchant_order_id: orderId
            },
            theme: {
                color: "#F37254"
            },
            order_id: orderId,
            handler: function(response) {
                document.getElementById('paymentReference').value = response.razorpay_payment_id;
                document.getElementById('razorpay_order_id').value = orderId;
                // document.getElementById('razorpay_signature').value = response.razorpay_signature;
                document.getElementById('razorpay_amount').value = amt;

                    // Make an AJAX request to the server-side endpoint
                  
                document.razorpayForm.submit();
            },
            modal: {
                ondismiss: function() {
                    console.log("This code runs when the popup is closed");
                },
                escape: true,
                backdropclose: false
            }
        };

        var rzpButton = document.getElementById("rzp-button1");
        rzpButton.addEventListener("click", function(e) {
            e.preventDefault();
            console.log("inside");

            var rzp = new Razorpay(options);
            rzp.open();
        });
    }




function checkWalletAmount() {
        var total = document.getElementById("tod").value;
        var wallet =document.getElementById("wallet").value;
        var useWallet = document.getElementById("walletAmount10").checked;
        console.log(total+"==="+wallet);
        if (useWallet && total > wallet && wallet>=0) {
            total -= wallet;
            document.getElementById("tid").value=total;
        } else {
            document.getElementById("tid").value=total;
                   if(usewallet)
                	   {
                alert("Wallet amount is insufficient.");
                	   }
        }
    }
     

      

        $('#walletAmount10').click(function() {
        	checkWalletAmount();
          });