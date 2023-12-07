document.addEventListener('DOMContentLoaded', function () {
    // Read the product ID from session storage
    const productId = sessionStorage.getItem('productClicked');
  
    if (productId) {
      // Fetch product details using the product ID
      fetch('flat-fabrics.json')
        .then(response => response.json())
        .then(data => {
          const product = data.products.find(p => p.id == productId);
          displayProductDetails(product);
        });
  
      // Clear the session storage item after reading
      sessionStorage.removeItem('productClicked');
    } else {
      // Handle the case where there is no product ID
      console.error('No product ID found in session storage.');
    }
  });
  
  function displayProductDetails(product) {
    // Update existing elements with product data
    document.getElementById('product-name').innerText = product.name;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-description').innerText = product.description;
    document.getElementById('product-price').innerText = `Price: $${product.price.toFixed(2)}`;
  }
  