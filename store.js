// store.js
document.addEventListener('DOMContentLoaded', function () {
    const productElements = document.querySelectorAll('.product');
  
    productElements.forEach(productElement => {
      productElement.addEventListener('click', function () {
        const productId = this.getAttribute('data-product-id');
        navigateToDetailsPage(productId);
      });
    });
  });
  
  function navigateToDetailsPage(productId) {
    // Set a session storage item as a signal for the details page
    sessionStorage.setItem('productClicked', productId);
  
    // Navigate to the details page
    window.location.href = 'details.html';
  }