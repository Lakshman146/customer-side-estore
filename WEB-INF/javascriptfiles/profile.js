function addToCart(productId) {

  $.ajax({
    url: "addToCart",
    method: 'GET',
    data: { productId: productId },
    success: function(response) {
      if (response.success) {
        var bt = '<button class="removeFromCart" data-product-id="' + productId + '">Remove from Cart</button>';
        $(".addToCartButton").html(bt);
      }
    },
    error: function(xhr, status, error) {
      console.log('AJAX Error: ' + error);
    }
  });
}

function addToWishlist(productId) {
  $.ajax({
    url: "addToWishlist",
    method: 'GET',
    data: { productId: productId },
    success: function(response) {
      $('#display').html(response);
    },
    error: function(xhr, status, error) {
      console.log('AJAX Error: ' + error);
    }
  });
}

function removeFromCart(productId) {
  console.log("Remove from cart called");
  $.ajax({
    url: "removeFromCart",
    method: 'GET',
    data: { productId: productId },
    success: function(response) {
      showCart();
    },
    error: function(xhr, status, error) {
      console.log('AJAX Error: ' + error);
    }
  });
}

function removeFromWishlist(productId) {
  console.log("Remove from wishlist called");
  $.ajax({
    url: "removeFromWishlist",
    method: 'GET',
    data: { productId: productId },
    success: function(response) {
      showCart();
    },
    error: function(xhr, status, error) {
      console.log('AJAX Error: ' + error);
    }
  });
}

function showCart() {
  console.log("Show cart called");
  $.ajax({
    url: "cartDisplay",
    method: 'GET',
    data: { userId: 1 },
    success: function(response) {
      $('#edit').html(response);
    },
    error: function(xhr, status, error) {
      console.log('AJAX Error: ' + error);
    }
  });
}

function showWishlist() {
  $.ajax({
    url: "wishlistItems",
    method: 'GET',
    data: { userId: 1 },
    success: function(response) {
      console.log("Profile wishlist");
      $('#edit').html(response);
    },
    error: function(xhr, status, error) {
      console.log('AJAX Error: ' + error);
    }
  });
}

function buynow() {
  console.log("Buy now");
  var notAvailable = $(".not-available");
  if (notAvailable.length > 0) {
    alert("Please check the availability of all products before placing the order!");
  } else {
    window.location.href = "buycartitems";
  }
}

$(document).ready(function() {
  $(document).on('click', '.buyid', function(event) {
    event.preventDefault();
    buynow();
  });

  $(document).on('click', '.addToCartButton', function(event) {
    event.preventDefault();
    var productId = $(this).data('product-id');
    console.log(productId);
    addToCart(productId);
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

  $('#cart-button').click(function() {
    showCart();
  });

  $('#Wishlist-button').click(function() {
    showWishlist();
  });
});

$(document).on('click', '.checkCustomerOrders', function(event) {
  event.preventDefault();
  console.log("Entered customer orders profile");
  displayProfile();
});

function displayProfile() {
  $.ajax({
    url: "CustomerOrdersProfile",
    method: 'GET',
    success: function(response) {
      console.log(response);
      $('#edit').html(response);
    },
    error: function(xhr, status, error) {
      console.log('AJAX Error: ' + error);
    }
  });
}


