// 장바구니 열고 닫기
let cartIcon = document.querySelector('#cart-icon');
let cartArea = document.querySelector('.cart-area');
let closeCart = document.querySelector('#close-cart');
// 장바구니 열기
cartIcon.onclick = () => {
  cartArea.classList.add('active')
}
// 장바구니 닫기
closeCart.onclick = () => {
  cartArea.classList.remove('active')
}
// 장바구니 js
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready();
}
// 상단 메뉴 클릭 시 js //
let vedioArea = document.getElementById('videoArea'); // 비디오 영역 가져오기
let eventArea = document.getElementById('event-area'); // 이벤트 영역 가져오기
let bestTab = document.getElementById('bestTap'); // 케이크 메뉴 탭 가져오기
let coffeeTab = document.getElementById('coffeeTab'); // 커피 메뉴 탭 가져오기
let teaTab = document.getElementById('teaTab'); // 티 메뉴 탭 가져오기
let bestMenuArea = document.getElementById('best-menu-area'); // 케이크 메뉴 영역 가져오기
let coffeeMenuArea = document.getElementById('coffee-menu-area'); // 커피 메뉴 영역 가져오기
let teaMenuArea = document.getElementById('tea-menu-area'); // 티 메뉴 영역 가져오기

// 케이크 메뉴 클릭 시 
bestTab.onclick = () =>{
  vedioArea.classList.add('active'); // 비디오
  eventArea.classList.add('active'); // 이벤트
  bestMenuArea.classList.add('active2'); // 케이크 메뉴
  bestMenuArea.classList.remove('active'); // 케이크 메뉴
  coffeeMenuArea.classList.remove('active'); // 커피 메뉴
  if(teaTab.onclick===true){
    bestMenuArea.classList.add('active2');
  }
  teaMenuArea.classList.remove('active3')
}
// 커피 메뉴 클릭 시 
coffeeTab.onclick = () =>{
  vedioArea.classList.add('active');
  eventArea.classList.add('active');
  bestMenuArea.classList.add('active');
  bestMenuArea.classList.remove('active2');
  coffeeMenuArea.classList.add('active');
  teaMenuArea.classList.remove('active3');
}
// 티 메뉴 클릭 시 
teaTab.onclick = () =>{
  vedioArea.classList.add('active');
  eventArea.classList.add('active');
  bestMenuArea.classList.add('active');
  bestMenuArea.classList.remove('active2');
  coffeeMenuArea.classList.remove('active');
  teaMenuArea.classList.add('active3');
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
// 수량 변경
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}
// 토탈 업데이트
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
let addCart = document.getElementsByClassName("add-cart"); // 메뉴의 + 아이콘 가져오기 //
for (let i = 0; i < addCart.length; i++) {
  let button = addCart[i];
  button.addEventListener("click", addCartClicked);
}
// 메뉴 카드의 + 추가 클릭 js
function addCartClicked(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  let price = shopProducts.getElementsByClassName('product-price')[0].innerText;
  let img = shopProducts.getElementsByClassName('best-menu-img')[0].src;
  addProductToCart(title, price, img);
  updatetotal();
}
// 선택한 메뉴를 주문내역에 추가 js
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
  // 선택한 메뉴의 데이터를 백틱 리터롤로 innerHTML
  let cartBoxContent = `
  <img src="${img}" alt="" class="cart-img">
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
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