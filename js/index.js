const menu = document.querySelector(".menu");
const navOpen = document.querySelector(".hamburger");
const navClose = document.querySelector(".close");

const navLeft = menu.getBoundingClientRect().left;
navOpen.addEventListener("click", () => {
  if (navLeft < 0) {
    menu.classList.add("show");
    document.body.classList.add("show");
    navBar.classList.add("show");
  }
});

navClose.addEventListener("click", () => {
  if (navLeft < 0) {
    menu.classList.remove("show");
    document.body.classList.remove("show");
    navBar.classList.remove("show");
  }
});

// Fixed Nav
const navBar = document.querySelector(".nav");
const navHeight = navBar.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix-nav");
  } else {
    navBar.classList.remove("fix-nav");
  }
});

// Scroll To
const links = [...document.querySelectorAll(".scroll-link")];
links.map(link => {
  if (!link) return;
  link.addEventListener("click", e => {
    e.preventDefault();

    const id = e.target.getAttribute("href").slice(1);

    const element = document.getElementById(id);
    const fixNav = navBar.classList.contains("fix-nav");
    let position = element.offsetTop - navHeight;

    window.scrollTo({
      top: position,
      left: 0,
    });

    navBar.classList.remove("show");
    menu.classList.remove("show");
    document.body.classList.remove("show");
  });
});

// gsap.from(".logo", { opacity: 0, duration: 1, delay: 0.5, y: -10 });
// gsap.from(".hamburger", { opacity: 0, duration: 1, delay: 1, x: 20 });
// gsap.from(".hero-img", { opacity: 0, duration: 1, delay: 1.5, x: -200 });
// gsap.from(".hero-content h2", { opacity: 0, duration: 1, delay: 2, y: -50 });
// gsap.from(".hero-content h1", { opacity: 0, duration: 1, delay: 2.5, y: -45 });
// gsap.from(".hero-content a", { opacity: 0, duration: 1, delay: 3.5, y: 50 });

////////////////////////////// adding into wishlist or like
var addLikeButton = document.getElementsByClassName('btn-like');
for (var i = 0; i < addLikeButton.length; i++) {
  var button = addLikeButton[i];
  button.addEventListener('click', itemliked);
}

function itemliked(event) {
  var button = event.target;
  var likedItem = button.parentElement.parentElement.parentElement.parentElement;
  
  var like = likedItem.getElementsByClassName('liked')[0];

  if (like.getElementsByClassName('bx-heart')[0]) {
    var temp = like.getElementsByClassName('bx-heart')[0];
    temp.classList.replace('bx-heart', 'bxs-heart');
  }
  else {
    var temp = like.getElementsByClassName('bxs-heart')[0];
    temp.classList.replace('bxs-heart', 'bx-heart');
  }
}

////////////////////////////// adding into cart
var addCartButton = document.getElementsByClassName('btn-addCart');
for (var i = 0; i < addCartButton.length; i++) {
  var button = addCartButton[i];
  button.addEventListener('click', add_to_chart);
}

function add_to_chart(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement.parentElement.parentElement;
  var title = shopItem.getElementsByClassName('product-name')[0].innerText;
  var price = shopItem.getElementsByClassName('price')[0].innerText;
  var imageSrc = shopItem.getElementsByClassName('product-img')[0].src;

  // if(localStorage.length!=0){
  //   for (var i = 0; i < localStorage.length; i++) {
  //     var name = "cartItem[" + i.toString() + "]";
  //     var item = localStorage.getItem(name);
  //     var parsed = JSON.parse(item);
  //     var ptitle = parsed.pname;
  //     if (ptitle == title) {
  //       alert('This item is already added to the cart');
  //       return
  //     }
  //   }
  // }

  addItemToCart(title, price, imageSrc);
}

// storing product in localStorage
let j = 0;

function addItemToCart(title, price, imageSrc) {
  obj = {
    pname: title,
    pimage: imageSrc,
    pprice: price
  }

  var name = "cartItem[" + j.toString() + "]";
  jobj = JSON.stringify(obj);
  localStorage.setItem(name, jobj);

  j++;
}

// localStorage.clear();
//updating cart....
function updateCart() {
  var cartTable = document.getElementsByClassName('cart-items')[0];

  j = localStorage.length;   //local storage length
  for (var i = 0; i < j; i++) {
    var name = "cartItem[" + i.toString() + "]";
    var item = localStorage.getItem(name);

    var parsed = JSON.parse(item);
    var title = parsed.pname;
    var price = parsed.pprice;
    var imageSrc = parsed.pimage;

    var cartRow = document.createElement('tr');
    cartRow.classList.add('cart-row');
    var cartRowContents = `
  <td>
    <div class="cart-info">
      <img src="${imageSrc}" alt="">
      <div>
        <p class="item-title">${title}</p>
        <span class="price">Price: ${price}</span>
        <br />
        <a class="remove_btn courser_pointer" >remove</a>
      </div>
    </div>
  </td>
  <td><input class="quantity" type="number" value="1" min="1" onclick="updateCartTotal()"></td>
  <td class="sub-price">${price}</td>`;
    cartRow.innerHTML = cartRowContents;
    cartTable.append(cartRow);
  }
  updateCartTotal();

  var removeCartItem = document.getElementsByClassName('remove_btn');
  for (var i = 0; i < removeCartItem.length; i++) {
    var button = removeCartItem[i];
    button.addEventListener('click', remove_item);
  }
}

function clearlocalstorage() {
  localStorage.clear();
}
//////////////////////////////cart.html///////////////////////////////////////////////////
// removing item from cart
// var removeCartItem = document.getElementsByClassName('remove_btn');
// for (var i = 0; i < removeCartItem.length; i++) {
//   var button = removeCartItem[i];
//   button.addEventListener('click', remove_item);
// }

function remove_item(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
  updateCartTotal();
}

// updating cart total
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-row');
  var subTotal = 0;
  var tax = 50 * parseInt(cartItemContainer.length);
  for (var i = 0; i < cartItemContainer.length; i++) {
    var cartRow = cartItemContainer[i];
    var PriceElement = cartRow.getElementsByClassName('price')[0];
    var QuantityElement = cartRow.getElementsByClassName('quantity')[0];
    var SubPriceElement = cartRow.getElementsByClassName('sub-price')[0];

    var itemPrice = parseInt(PriceElement.innerHTML.replace('Price: ₹ ', ''));
    var itemQuantity = QuantityElement.value;
    var itemSubPrice = itemPrice * itemQuantity;
    SubPriceElement.innerHTML = "₹ " + itemSubPrice.toString() + "/-";
    subTotal = subTotal + itemSubPrice;
  }
  document.getElementsByClassName('subTotalPrice')[0].innerHTML = "₹ " + subTotal.toString() + "/-";
  document.getElementsByClassName('taxPrice')[0].innerHTML = "₹ " + tax.toString() + "/-";
  var total = subTotal + tax;
  document.getElementsByClassName('totalPrice')[0].innerHTML = "₹ " + total.toString() + "/-";
}

//Proceed To Checkout
function purchaseClicked() {
  alert('Thank you for your purchase')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

////////////////////////// Kids clothing ///////////////////

var slideIndex = 0;
showSlides();

// Next/previous controls
function plusSlides() {
  showSlides();
}

// Thumbnail image controls
function currentSlide() {
  showSlides();
}

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 5000); // Change slides every 4 seconds
}

