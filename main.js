// 장바구니 열고 닫기 //
let cartIcon = document.querySelector('#cart-icon');
let cartArea = document.querySelector('.cart-area');
let closeCart = document.querySelector('#close-cart');
// 장바구니 열기 //
cartIcon.onclick = () => {
  cartArea.classList.add('active')
}

// 장바구니 닫기 //
closeCart.onclick = () => {
  cartArea.classList.remove('active')
}


// 장바구니 js //
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready();
}

// 메인 홈페이지 이미지
let vedioArea = document.getElementById('videoArea');
// 상단 메뉴 Tab 했을 때 발생되는 클릭 함수

// 베스트 메뉴
let bestTab = document.getElementById('bestTap');
bestTab.onclick = () =>{
  // active2 클래스 추가.
  bestMenuArea.classList.add('active2');
  bestMenuArea.classList.remove('active'); 
  coffeeMenuArea.classList.remove('active');
  vedioArea.classList.add('active');
  if(teaTab.onclick===true){
    bestMenuArea.classList.add('active2');
  }
  teaMenuArea.classList.remove('active3')
}
let bestMenuArea = document.getElementById('best-menu-area');
let coffeeTab = document.getElementById('coffeeTab');
let coffeeMenuArea = document.getElementById('coffee-menu-area');
coffeeTab.onclick = () =>{
  vedioArea.classList.add('active');
  // 커피 메뉴 클래스 active(보이게) 추가
  coffeeMenuArea.classList.add('active');
  // 베스트 메뉴 클래스 active(안보이게)
  bestMenuArea.classList.add('active');
  // 베스트 메뉴 클래스 active(보이게)
  bestMenuArea.classList.remove('active2');
  // bestMenuArea.classList.remove('active');
  teaMenuArea.classList.remove('active3');
}
let teaMenuArea = document.getElementById('tea-menu-area');
let teaTab = document.getElementById('teaTab');
teaTab.onclick = () =>{
  vedioArea.classList.add('active');
  // 티 메뉴 클래스 보이게 
  teaMenuArea.classList.add('active3');
  // 커피 메뉴 클래스 active(보이게) 추가
  coffeeMenuArea.classList.remove('active');
  // 베스트 메뉴 클래스 active(안보이게)
  bestMenuArea.classList.add('active');
  // 베스트 메뉴 클래스 active(보이게)
  bestMenuArea.classList.remove('active2');
  // bestMenuArea.classList.remove('active');
}
// 함수 

function ready() {
  // 주문내역 제거
  let removeCartButtons = document.getElementsByClassName('cart-remove');
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem)
  }
  // 수량 변경
  let quantityInputs = document.getElementsByClassName('cart-quantity');
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }
}
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}
// 수량 변경 함수
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

// Update Total
function updatetotal() {
  let cartContent = document.getElementsByClassName('cart-content');
  let cartBoxes = document.getElementsByClassName('cart-box');
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName('cart-price')[0];
    let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    let price = parseInt(priceElement.innerText.replace(/[^0-9]/g, ""), 10);
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementsByClassName('total-price')[0].innerText = (total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) + ' 원';

}
// 메뉴의 + 아이콘 가져오기 //

let addCart = document.getElementsByClassName("add-cart");
for (let i = 0; i < addCart.length; i++) {
  let button = addCart[i];
  button.addEventListener("click", addCartClicked);
}

function addCartClicked(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  let price = shopProducts.getElementsByClassName('product-price')[0].innerText;
  let img = shopProducts.getElementsByClassName('best-menu-img')[0].src;
  addProductToCart(title, price, img);
  updatetotal();
  // console.log(title, price, img);
}

function addProductToCart(title, price, img) {
  let cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  let cartItems = document.getElementsByClassName('cart-content')[0];
  let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert('이미 장바구니에 추가 된 상품입니다.')
      return;
    }

  }

  let cartBoxContent = `
  <img src="${img}" alt="" class="cart-img">
 <div class="detail-box">
   <div class="cart-product-title">${title}</div>
   <div class="cart-price">${price}
   </div>
   <input type="number" value="1" class="cart-quantity">
 </div>
 <!-- remove cart -->
 <i class='bx bxs-x-circle cart-remove'></i>
`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
  cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

}