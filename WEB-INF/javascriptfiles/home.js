//method to get the all categories when page is load  
    $(document).ready(function() {
      function loadCategories() {
        loadAllProducts();
        $.ajax({
          url: "CategoriesServlet",
          method: 'GET',
          success: function(response) {
            $('#catg').html(response);
          },
          error: function(xhr, status, error) {
            console.log('AJAX Error: ' + error);
          }
        });
      }
//method to get all the products
      function loadAllProducts() {
        console.log("loadallproducts");
        $.ajax({
          url: "productsDisplay",
          method: 'GET',
          success: function(response) {
            $('#productsdisplay').html(response);
          },
          error: function(xhr, status, error) {
            console.log('AJAX Error: ' + error);
          }
        });
      }
//method to add the product to cart
      function addToCart(productId,quantity) {
        $.ajax({
          url: "addToCart",
          method: 'GET',
          data: { productId: productId, qty:quantity },
          success: function(response) {
            /* window.alert(response); */
            if(response=="Added to cart"){
        	  toastr.success(response);
            }else{
            	toastr.info("Already added to cart");
            }
          },
          error: function(xhr, status, error) {
            console.log('AJAX Error: ' + error);
          }
        });
      }
     //method to add the product to wishlist
  
function addToWishlist(productId) {
  if (customerSession.customer == null) {
  alert("please signIn");
    window.location.href = "signIn";
      } else {
    console.log("Add to wishlist called");
    $.ajax({
      url: "addToWishlist",
      method: 'GET',
      data: { productId: productId },
      success: function(response) {
        toastr.success(response);
      },
      error: function(xhr, status, error) {
        console.log('AJAX Error: ' + error);
      }
    });
  }
}
//method to remove the product from cart
      function removeFromCart(productId) {
        console.log("Remove from cart called");
        $.ajax({
          url: "removeFromCart",
          method: 'GET',
          data: { productId: productId },
          success: function(response) {
        	  toastr.success(response);
              showCart(); // Set the response HTML as the inner HTML of the cart items element
          },
          error: function(xhr, status, error) {
            console.log('AJAX Error: ' + error);
          }
        });
      }
//method to remove the product from wishlist
      function removeFromWishlist(productId) {
        console.log("Remove from wishlist called");
        $.ajax({
          url: "removeFromWishlist",
          method: 'GET',
          data: { productId: productId },
          success: function(response) {
        	  toastr.success(response);
        	  showWishlist(); // Set the response HTML as the inner HTML of the cart items element
          },
          error: function(xhr, status, error) {
            console.log('AJAX Error: ' + error);
          }
        });
      }
//when user clicks on cart button this method get all the cart items
      function showCart() {
        $.ajax({
          url: "cartDisplay",
          method: 'GET',
          data: { userId: 1 },
          success: function(response) {
        	 // window.location.href = "cart.jsp";
        	  $('#payment').html(response); // Set the response HTML as the inner HTML of the cart items element
          },
          error: function(xhr, status, error) {
            console.log('AJAX Error: ' + error);
          }
        });
      }
//when user clicks on wishlist button this method get all the wishlist items
      function showWishlist() {
      if (customerSession.customer == null) {
      alert("please signIn");
    window.location.href = "signIn";
  }
        else
        {
      
        $.ajax({
          url: "wishlistItems",
          method:'GET',
          success: function(response) {
        	  console.log("response of wishlist "+response);
            $('#payment').html(response); // Set the response HTML as the inner HTML of the cart items element
          },
          error: function(xhr, status, error) {
            console.log('AJAX Error: ' + error);
          }
        });
        }

      }
      //method to load all the products by category wise
     function loadProductsByCategory() {
    	 console.log("category selected");
    	  var category=document.getElementById("catg").value;
    	  console.log("category id when loading category "+category);
    	  $.ajax({
    	      url: "categoryProducts",
    	      method: 'post',
    	      data:{category_id:category},
    	      success: function(response) {
    	    	  console.log("response of category based prod "+response);
    	      
    	        $('#prod').html(response); // Set the response HTML as the inner HTML of the select element
    	      },
    	      error: function(xhr, status, error) {
    	        console.log('AJAX Error: ' + error);
    	      }
    	    });}

      // Call the loadCategories function when the page loads
      loadCategories();

      // Call the loadAllProducts function when the page loads
      loadAllProducts();

      // Add event listener for the "Add to Cart" button
      $(document).on('click', '.addToCartButton', function(event) {
        event.preventDefault();
        var productId = $(this).data('product-id');
        var quantity=$(this).data('quantity');
        console.log(productId);
        console.log(quantity+" quantityyyyy");
        addToCart(productId,quantity);
      });

      $(document).on('click', '.removeFromCart', function(event) {
        event.preventDefault();
        var productId = $(this).data('product-id');
        console.log(productId);
        removeFromCart(productId);
      });

      $(document).on('click', '.addToWishlistButton', function(event) {
        event.preventDefault();
        var productId = $(this).data('product-id');
        console.log(productId);
        addToWishlist(productId);
      });

      $(document).on('click', '.removeFromWishlist', function(event) {
        event.preventDefault();
        var productId = $(this).data('product-id');
        console.log(productId);
        removeFromWishlist(productId);
      });

      $('#catg').change(function() {
        loadProductsByCategory();
      });

      $('#cart-button').click(function() {
        showCart();
      });

      $('#Wishlist-button').click(function() {
        showWishlist();
      });
      $('#searchbtn').click(function() {
          event.preventDefault();

         search();
        });

      var slides = $('.slide');
      var currentSlide = 0;

      // Function to show the current slide
      function showSlide() {
        // Hide all slides
        slides.hide();
        // Show the current slide
        slides.eq(currentSlide).show();
      }

      // Function to move to the next slide
      function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
          currentSlide = 0;
        }
        showSlide();
      }

      // Start the slideshow
      setInterval(nextSlide, 3000); // Change slide every 3 seconds
    });
//this function used to get the product details
    function showProductDetails(productId) {
    	console.log("showproduct");   
    	$.ajax({
            type: "POST",
            url: "prodDescription",
            data: { productId: productId },
            success: function(response) {
            	 $('#payment').html(response);
            },
            error: function() {
                alert("Error occurred while retrieving product details.");
            }
        });
    }
    //this method used to get the products sorted
    function sortProducts() {
    	console.log("sort");  
    	var sort=document.getElementById("sortSelect").value;
    	$.ajax({
            type: "POST",
            url: "sortProducts",
            data: { sortOrder: sort },
            success: function(response) {
            	 $('#prod').html(response);
            },
            error: function() {
                alert("Error occurred while sorting product details.");
            }
        });
    }
    //this method filter the products
    function filterProducts() {
    	console.log("filters");   
    	var filter=document.getElementById("filterSelect").value;
    	$.ajax({
            type: "POST",
            url: "filterProducts",
            data: { priceRange: filter },
            success: function(response) {
            	 $('#payment').html(response);
            },
            error: function() {
                alert("Error occurred while filtering product details.");
            }
        });
    }
    //this method get all the products when user search something
    function search() {
    	  var searchTerm = document.getElementById("search").value;
    	  $.ajax({
    	    type: "GET",
    	    url: "searchProducts", // Update the URL to the correct endpoint
    	    data: { search: searchTerm },
    	    success: function(response) {
    	      $('#maindiv').html(response);
    	    },
    	    error: function() {
    	      alert("Error occurred while filtering product details.");
    	    }
    	  });
    	}
    
  