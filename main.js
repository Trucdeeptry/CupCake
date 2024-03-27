function product_up(plusID) {
  var number = plusID.slice(-1);
  var quality = document.getElementById(`quality_product${number}`);
  var currentNumber = parseInt(quality.value);
  currentNumber += 1;
  quality.value = currentNumber;
}
function product_down(minusID) {
  var number = minusID.slice(-1);
  var quality = document.getElementById(`quality_product${number}`);
  var currentNumber = parseInt(quality.value);
  if (currentNumber - 1 > 0) {
    currentNumber -= 1;
  }
  quality.value = currentNumber;

}
// Ngăn người dùng nhập số âm || 0
var inputQuatity = document.getElementsByClassName('quality__number');
Array.from(inputQuatity).forEach(element => {
  element.addEventListener('input', function (event) {
    if (event.target.value < 0) {
      event.target.value = 1;
      alertModal("Can't negative")
    }
  })
});
var ProductCount = document.getElementsByClassName('menu__product').length + 1;
sessionStorage.setItem('ProductCount', ProductCount);
var ProductHTMLCount = sessionStorage.getItem('productHTMLCount');
function ProductHTML(AddID) {
  ProductHTMLCount++;
  var Addnumber = AddID.slice(-1);
  var CupcakeImg = document.getElementById(`CupcakeImg${Addnumber}`).src;
  var CupcakeName = document.getElementById(`Cupcake${Addnumber}`).textContent;
  var CupcakePrice = parseFloat((document.getElementById(`price${Addnumber}`).textContent).slice(1));
  var quality = document.getElementById(`quality_product${Addnumber}`).value;
  var Category = 'Cupcake';

  var htmlProduct = `
    <table>
      <tr>
      <th scope="row" class = "Product${ProductHTMLCount}">
      <div class="p-2">
        <img src="${CupcakeImg}" alt="" width="70" class="img-fluid rounded shadow-sm">
        <div class="ml-3 d-inline-block align-middle">
          <h5 class="mb-0"> <a href="#"  class="text-dark d-inline-block CupcakekID${Addnumber}">${CupcakeName}</a></h5><span class="text-muted font-weight-normal font-italic">Category: ${Category}</span>
        </div>
      </div>  
      </th>
      <td class="align-middle productPrice"><strong>$${CupcakePrice}</strong></td>
      <td class="align-middle CupcakeQuality${Addnumber}"><strong>${quality}</strong></td>
      <td class="align-middle"><a onclick="removeProduct(this, ${ProductHTMLCount})" href="#" class="text-dark"><i class="fa fa-trash"></i></a></td>
    </tr>
    </table>


    `;

  sessionStorage.setItem(`CupcakeHTML${ProductHTMLCount}`, htmlProduct)
  sessionStorage.setItem(`productHTMLCount`, ProductHTMLCount)

  alertModal('Cart added successfuly!');
  console.log(sessionStorage.length)
}

// Choose Product

function ChooseProduct() {
  var Products = document.getElementsByClassName('menu__product');

  Array.from(Products).forEach(function (element) {
    element.addEventListener('click', function () {
      Array.from(Products).forEach(function (prod) {
        prod.classList.remove('product_choose');
      })

      this.classList.add('product_choose');
    })
  });

}
ChooseProduct();

// Avatar Usser
if (sessionStorage.getItem('GGimg') != null) {
  var userAVT = document.getElementById('user-avt');
  userAVT.src = sessionStorage.getItem('GGimg');
  var userIcon = document.querySelector('.link-icon');
  userIcon.style.display = 'none';
}

function alertInfoGG() {
  var GGName = sessionStorage.getItem('GGgetName')
  var GGId = sessionStorage.getItem('GGid')
  var GGEmail = sessionStorage.getItem('GGemail')

  alertModal(
    `Thông tin của User:
    <br>Tên: ${GGName}
    <br>ID: ${GGId}
    <br>Email: ${GGEmail}
    `
  )
}

function alertModal(Details) {
  var modal_container = document.querySelector('.modal-container');
  var details = document.querySelector('.modal-details');
  modal_container.classList.remove('close-modal');
  modal_container.classList.add('open-modal');
  details.innerHTML = Details;
}

// slider event
var clickNumer = 1;
var displayProduct = 4;
function SliderEvent() {
  var event_container = document.querySelectorAll('.grid__column-slider');
  var event_width = event_container[0].offsetWidth;
  var event_quatity = event_container.length;
  var arrow = document.querySelectorAll('.event__arrow');

  if (clickNumer + displayProduct -1 < event_quatity) {
    for (var i = 0; i < event_container.length; i++) {
      event_container[i].style.transform = `translateX(-${event_width * clickNumer}px)`
    }
    clickNumer++

  }

  if (clickNumer + displayProduct -1 === event_quatity) {
    arrow[0].style.display = 'none';
    arrow[1].style.display = 'inherit';
  }
  arrow[1].addEventListener('click', function(){
    for (var i = 0; i < event_container.length; i++) {
      event_container[i].style.transform = `translateX(${event_width * (clickNumer-1)}px)`
    }
    clickNumer = 1;
    arrow[0].style.display = 'inherit';
    arrow[1].style.display = 'none';
  })

}





