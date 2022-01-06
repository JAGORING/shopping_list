const inputItem = document.querySelector('#inputItem');
const inputPrice = document.querySelector('#inputPrice');
const form = document.querySelector('.input-form');
const itemList = document.querySelector('.list-ul');

const deleteBtns = document.querySelectorAll('.delete');

let checkedPrice = 0;
let uncheckedPrice = 0;
let totalPrice = 0;

// 내용을 입력 받았을 때 실행되는 이벤트 리스너
form.addEventListener('submit', (e) => {
  e.preventDefault();
  getInputItem();
}); 

itemList.addEventListener('click', (e) => {
  if(e.target.classList.contains('item-name') ||
  e.target.classList.contains('item-price')) {
    itemCheck(e.target.parentNode);
  }
  else if(e.target.classList.contains('delete')) {
    onClickItemDelete(e.target);
  }
});

function getInputItem() {
  if(!inputItem.value) {
    inputItem.focus();
    return;
  } else if (!inputPrice.value) {
    inputPrice.value = 0;
  }
  addItem();
}

// 리스트에 정보를 추가하는 함수
function addItem() {
  const li = document.createElement('li');
  li.innerHTML = `
    <div class="item-name">${inputItem.value}</div>
    <div class="item-price">${inputPrice.value} 원</div>
    <span class="delete material-icons">delete</span>
  `;
  li.setAttribute('class', 'list');
  itemList.append(li);
  
  totalPrice += parseInt(inputPrice.value);
  uncheckedPrice += parseInt(inputPrice.value);
  updatePrice();

  inputItem.value = '';
  inputPrice.value = '';
  inputItem.focus();
}

function onClickItemDelete(target) {
  const price = parseInt(target.previousElementSibling.innerText);
  target.parentNode.remove();
  if (target.parentNode.classList.contains('checked')) {
    checkedPrice -= price;
  } else {
    uncheckedPrice -= price;
  }
  totalPrice -= price;
  updatePrice();
}
// 아이템 체크 확인 함수
function itemCheck(node) {
  let price = parseInt(node.querySelector('.item-price').innerText);
  if(node.classList.contains('checked')) {
    node.classList.remove('checked');
    checkedPrice -= price;
    uncheckedPrice += price;
  } else {
    node.classList.add('checked');
    checkedPrice += price;
    uncheckedPrice -= price;
  }
  updatePrice();
}

function updatePrice() {
  const resultChecked = document.querySelector('.checked-price');
  const resultUnchecked = document.querySelector('.unchecked-price');
  const resultTotal = document.querySelector('.total-price');

  resultChecked.textContent = `${checkedPrice} 원`;
  resultUnchecked.textContent = `${uncheckedPrice} 원`;
  resultTotal.textContent = `${totalPrice} 원`;
}