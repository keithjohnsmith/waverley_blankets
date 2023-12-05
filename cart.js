

//Function to show that page has loaded 
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}


//calling the ready function
function ready(){

    //removing item from cart function
    //variable for remove button in cart
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    //for loop to parse through all remove buttons
    for (var i = 0; i < removeCartItemButtons.length; i++){
        //variable for remove button for point in loop
        var button = removeCartItemButtons[i];
        //click event listener
        button.addEventListener('click', removeCartItem)
        saveCartToLocalStorage();
    }

    //variable for quantity inputs
    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged);
        saveCartToLocalStorage();
    }

    //Add to cart button functionality
    //variable for add to cart button
    var addToCartButtons = document.getElementsByClassName('cart-btn');
    for (var i = 0; i < addToCartButtons.length; i++){
        //variable for add to cart button for point in loop
        var button = addToCartButtons[i];
        //click event listener
        button.addEventListener('click', addToCartClicked);
    
    }

    var checkoutButtons = document.getElementsByClassName('checkout-btn');
        for (var i = 0; i < checkoutButtons.length; i++) {
        checkoutButtons[i].addEventListener('click', function(event) {
        checkOut(checkoutButtons[i]);  
        });
    }

    loadCartFromLocalStorage();
}

//function to remove item from cart to be called by event listener
function removeCartItem (event) {
    //variable for button clicked
    var buttonClicked = event.currentTarget;
    //remove button clicked
    console.log(buttonClicked.parentElement.parentElement);
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    saveCartToLocalStorage();
}

//function to change quantity of item in cart to be called by event listener
function quantityChanged(event){
    //variable for input
    var input = event.target;
    //if statement to check if input is a number and greater than 0
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;

    }
    updateCartTotal();
    saveCartToLocalStorage();
}



//function to add item to cart to be called by event listener
function addToCartClicked(event){
    //variable for button clicked
    var button = event.target;
    //variable for item container
    var shopItem = button.parentElement.parentElement;
    
    //variable for item name
    var title = shopItem.getElementsByClassName('product-name-shop')[0].innerText;
    //variable for item price
    var price = shopItem.getElementsByClassName('product-price-shop')[0].innerText;
    //variable for item image
    var imageSrc = shopItem.getElementsByClassName('product-image-shop')[0].src;
    
    //calling addItemToCart function
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

//function addItemToCart
function addItemToCart(title, price, imageSrc, quantity = 1){
    var cartRow = document.createElement('tr');
    cartRow.classList.add('table-body-row');
    
    
    var cartItems = document.getElementsByClassName('cart-table-body')[0];
    var cartItemNames = cartItems.getElementsByClassName('product-name');

    for (var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert('This item is already in your cart');
            return;
        }
    }

    var cartRowContents = `
        <td class="product-remove"><button class="btn btn-danger" type="button"><i class="far fa-window-close"></i></button></td>
        <td class="product-image"><img class="prod-img" src="${imageSrc}" alt=""></td>
        <td class="product-name">${title}</td>
        <td class="product-price">${price}</td>
        <td class="product-quantity"><input class="cart-quantity-input" type="number" value="${quantity}"></td>    
    `;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function(event){
        var buttonClicked = event.currentTarget;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
        saveCartToLocalStorage();
    });

    
    saveCartToLocalStorage();
}




function saveCartToLocalStorage() {
    var cartItemsContainer = document.getElementsByClassName('cart-table-body')[0];
    var cartRows = cartItemsContainer.getElementsByClassName('table-body-row');
    var cartItems = [];
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var title = cartRow.getElementsByClassName('product-name')[0].innerText;
        var price = cartRow.getElementsByClassName('product-price')[0].innerText;
        var quantity = cartRow.getElementsByClassName('cart-quantity-input')[0].value;
        var imageSrc = cartRow.getElementsByClassName('prod-img')[0].src;
            
        cartItems.push({
            title: title,
            imageSrc: imageSrc,
            price: price,
            quantity: quantity
                
        });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

saveCartToLocalStorage();


function loadCartFromLocalStorage() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
        for (var i = 0; i < cartItems.length; i++) {
            var quantity = cartItems[i].quantity;
            if (!isNaN(quantity) && quantity > 0) {
                addItemToCart(cartItems[i].title, cartItems[i].price, cartItems[i].imageSrc, quantity);
            }
        }
    }
    
        updateCartTotal();
    
    
}



//removing item from cart function
//variable for remove button in cart
var removeCartItemButtons = document.getElementsByClassName('btn-danger');
console.log(removeCartItemButtons);

//for loop to parse through all remove buttons
for (var i = 0; i < removeCartItemButtons.length; i++){
    //variable for remove button for point in loop
    var button = removeCartItemButtons[i];
    //click event listener
    button.addEventListener('click', function(event){
        
        //variable for button clicked
        var buttonClicked = event.target;
        //remove button clicked
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
    })
}


    //function to culculate and update total price
    function updateCartTotal(){
        //variable for cart item container and rows
        var cartItemContainer = document.getElementsByClassName('cart-table-body')[0];
        var cartRows = cartItemContainer.getElementsByClassName('table-body-row');

        //variable for subtotal shipping and total 
        var subtotal = 0;
        var shipping = 45;
        var total = 0;


        //for loop to parse through all cart rows
        for (var i = 0; i < cartRows.length; i++){
            //variable for individual cart row
            var cartRow = cartRows[i];
            //variable for price of item in cart
            var priceElement = cartRow.getElementsByClassName('product-price')[0];
            //variable for quantity of item in cart
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
            //variable for price of item in priceElement
            var price = parseFloat(priceElement.innerText.replace('$', ''));
            //variable for quantity of item in quantityElement as a value
            var quantity = quantityElement.value;
            subtotal = subtotal + (price * quantity);
            total = subtotal + shipping;
        }

        subtotal = Math.round(subtotal * 100) / 100;
        total = Math.round(total * 100) / 100;

        //update subtotal
        document.getElementsByClassName('sub-total')[0].innerText = '$' + subtotal;
        //update total
        document.getElementsByClassName('total')[0].innerText = '$' + total;

    }

   

function checkOut (){
    
     // Clear the table body
     while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    
    var cartItems = JSON.parse(localStorage.getItem('cartItems'));
    var tableBody = document.getElementsByClassName('order-details-body')[0];
    
   
    
    for (var i = 0; i < cartItems.length; i++) {
        var item = cartItems[i];
    
        var row = document.createElement('tr');
        row.classList.add('order-details-row');

        
    
        var checkoutRowContents = ` 
            <td>${item.title}</td>
            <td>${item.price}</td>   
        `;
    
       row.innerHTML= checkoutRowContents;
       
       /* var nameCell = document.createElement('td');
        nameCell.textContent = item.title;
        row.appendChild(nameCell);
    
        var priceCell = document.createElement('td');
        priceCell.textContent = item.price;
        row.appendChild(priceCell);*/
    
        tableBody.appendChild(row);
    }
}


//Pop up JS and functions
function openModal() {
    document.getElementById('checkout-popup').style.display = 'block';
  }
  
  function closeModal() {
    document.getElementById('checkout-popup').style.display = 'none';
  }
  
  // Open the checkout popup when the user clicks the "Proceed to checkout" button
  document.querySelector('#proceed-to-checkout').addEventListener('click', openModal);
  
  // Close the checkout popup when the user clicks the "Close" button
  document.querySelector('#checkout-popup .modal-footer button[type="button"]').addEventListener('click', closeModal);