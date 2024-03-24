var tableCart = document.getElementById('CupCakeTable').getElementsByTagName('tbody')[0];




//Vòng lặp thêm sản phẩm vào giỏ hàng   
var productHTMLCount = sessionStorage.getItem('productHTMLCount');
for (var i = 1; i <= productHTMLCount; ++i){  
    var newRow = tableCart.insertRow();  
    newRow.innerHTML =  sessionStorage.getItem(`CupcakeHTML${i}`);
}



// Kiểm tra sản phẩm giống nhau
for (var i = 1; i <= sessionStorage.getItem('ProductCount'); ++i){   
    var CupcakeName = document.getElementsByClassName(`CupcakekID${i}`);
    if (CupcakeName.length > 1) {
        var AddNumberFrist = parseInt(CupcakeName[0].classList[2].slice(-1));
        var QuatityFristCupcakeE = document.getElementsByClassName(`CupcakeQuality${AddNumberFrist}`)[0];
        var QuatityFristCupcake = parseInt(QuatityFristCupcakeE.textContent);
        
        for (var j = CupcakeName.length; j > 1; j--){  
            // Tính số lượng
            var IDCupcakej = parseInt(CupcakeName[j-1].classList[2].slice(-1));
            var QuatityCupcakejE = document.getElementsByClassName(`CupcakeQuality${IDCupcakej}`)[j-1];
            var QuatityCupcakej = parseInt(QuatityCupcakejE.textContent);
            QuatityFristCupcake += QuatityCupcakej;
            // Cập nhật giá trị vào session
            var FristProductHTMLCount = parseInt(QuatityFristCupcakeE.parentNode.querySelector('th').className.slice(-1))
            var parser = new DOMParser();
            const html = parser.parseFromString(sessionStorage.getItem(`CupcakeHTML${FristProductHTMLCount}`), 'text/html');
            var QuatitySessionE = html.querySelectorAll('strong')[1];
            var QuatitySessionj = parseInt(html.querySelectorAll('strong')[1].textContent);
            QuatitySessionj = QuatityFristCupcake;
            QuatitySessionE.textContent = QuatitySessionj;
            var UpdatedSession = html.body.innerHTML;
            var FristCupcakeInSession = 'CupcakeHTML' + FristProductHTMLCount;
            sessionStorage.setItem(FristCupcakeInSession, UpdatedSession)
            // Xóa sản phẩm
            var trTabj = QuatityCupcakejE.parentElement.parentElement.removeChild(QuatityCupcakejE.parentElement);
            // Xóa trong session
            var productCount = parseInt(trTabj.childNodes[1].classList[0].slice(-1));
            sessionStorage.removeItem(`CupcakeHTML${productCount}`);
            
        }
        QuatityFristCupcakeE.firstChild.textContent = QuatityFristCupcake;
       
    }
    
}
// Tính tiền khi sản phẩm đã được thêm vào
TotalPrice();
// Xóa sản phẩm
function removeProduct(button, ProductHTMLCount){
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    sessionStorage.removeItem(`CupcakeHTML${ProductHTMLCount}`);
    TotalPrice();
}

//Tính tiền
function TotalPrice(){ //Chưa nhân số lượng
    var subtotal = document.getElementById('Subtotal');
    var productPrice = [];
    var ProductPrice = document.querySelectorAll('.productPrice strong')
    var PreviousQuality = document.querySelectorAll('.productPrice');
    
    // Số lượng * Giá
    for (var i = 0; i < ProductPrice.length; i++) {
        var Price = parseFloat(ProductPrice[i].textContent.slice(1));
        var Quality = parseInt(PreviousQuality[i].nextElementSibling.querySelector('strong').textContent)
        var FinalPrice = Price * Quality;
        productPrice.push(FinalPrice);
    }
    
    function sumArray(arr){
        var sum = 0
        arr.forEach(element => {
            sum += element;
        });
        return sum;
    }
    subtotal.textContent = "$" + sumArray(productPrice);
    // console.log(productPrice)
    subtotal = sumArray(productPrice);
    var totalE = document.getElementById('Total');
    var shipE = document.querySelector('#Ship');
    if(sumArray(productPrice) == 0){
        shipE.textContent = '$0'
    }else{
        shipE.textContent = '$10'
    }
    var tax = parseFloat(document.querySelector('#Tax').textContent.slice(1)) ;
    var ship = parseFloat(document.querySelector('#Ship').textContent.slice(1)) ;
    
    var total = subtotal + tax + ship;
    totalE.textContent = "$" + total.toFixed(2);
}

// Dùng để xóa giỏ hàng khi thanh toán
function clearProduct(){
    for (var i = 0; i <= sessionStorage.getItem('productHTMLCount'); i++) {
        sessionStorage.removeItem(`CupcakeHTML${i}`);
    }
    location.reload();
}
function clearEmptytr(){
    var gioHangData = document.querySelectorAll('#CupCakeTable tr');
    Array.from(gioHangData).forEach(element => {
        if(element.childNodes.length == 0){
            element.remove();
        }
    });
}

clearEmptytr();
//Gửi mail
function sendingEmail(){
    var date = new Date();
    var today = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();  
    date.setDate(date.getDate() + 3)
    var fureDate = date.getDate() +'-'+(date.getMonth()+1)+'-'+date.getFullYear();
    var UserEmail = sessionStorage.getItem('GGemail');
    if(UserEmail != null){
        var gioHangData = document.querySelectorAll('#CupCakeTable tbody tr');
        var KhoAnh = ['Combo cupcake.png', 'Cupcake (1).png', 'Cupcake (2).png', 'Cupcake (3).png', 'Cupcake (4).png', 'Cupcake (5).png', 'Cupcake (6).png', 'Cupcake (7).png', 'Cupcake (8).png']
        var LinkAnh = ["bit.ly/cupcakeCombo", "bit.ly/cupcake1TT", "bit.ly/cupcake2TT", "bit.ly/cupcake3TT", "bit.ly/cupcake4TT", "bit.ly/cupcake5TT", "bit.ly/cupcake6TT", "bit.ly/cupcake7TT", "bit.ly/cupcake8TT"];
        var Thankyou = "<img src='https://firebasestorage.googleapis.com/v0/b/ggsneaker-js.appspot.com/o/thankyou.png?alt=media&token=76c7ecd4-434a-4952-b5f8-3a5d1ae69967' width='500' height='500'>"
        var HeaderEmail = `<p> Xin chào ${UserEmail},</p>\n` +
                         "<p>Cám ơn bạn đã đặt hàng tại Toronto CupCake</p>\n" +
                         `<p>Ngày đặt hàng: ${today} </p>\n` +
                         `<p>Ngày nhận dự kiến: ${fureDate} </p>\n` +
                         "<p>Dưới đây là thông tin đơn hàng của bạn:</p>";
        var tableHtml = "<table style='border-collapse: collapse; width: 100%; border: 1px solid #ddd;'>" +
                        "<tr>" +
                            "<th style='border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f2f2f2;'>Hình Ảnh</th>" +
                            "<th style='border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f2f2f2;'>Tên sản phẩm</th>" +
                            "<th style='border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f2f2f2;'>Đơn giá</th>" +
                            "<th style='border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f2f2f2;'>Số lượng</th>" +
                            "<th style='border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f2f2f2;'>Thành tiền</th>" +
                        "</tr>";
    
                        
    for (var i = 0; i < gioHangData.length; i++) {
        var productName = gioHangData[i].querySelector('h5').textContent;
        var productPrice = gioHangData[i].querySelector('.productPrice').textContent;
        var productQuantity = gioHangData[i].querySelector('.productPrice').nextElementSibling.textContent; 
        var totalProduct = parseFloat(productPrice.slice(1)) * parseInt(productQuantity);
        var thisIMG = gioHangData[i].querySelector('.img-fluid').src.slice(-17).replace("%20", " ");
        tableHtml += "<tr>";
        tableHtml += "<td style='border: 1px solid #ddd; padding: 8px; text-align: center;'><img src='" + LinkAnh[KhoAnh.indexOf(thisIMG)] + "' width='100' height='100'></td>";
        tableHtml += "<td style='border: 1px solid #ddd; padding: 8px; text-align: center;'>" + `${productName}` + "</td>";
        tableHtml += "<td style='border: 1px solid #ddd; padding: 8px; text-align: center;'>" + `${productPrice}` + "</td>";
        tableHtml += "<td style='border: 1px solid #ddd; padding: 8px; text-align: center;'>" + `${productQuantity}` + "</td>";
        tableHtml += "<td style='border: 1px solid #ddd; padding: 8px; text-align: center;'>$" + `${totalProduct}` + "</td>";
        tableHtml += "</tr>";
    }
       
        var TotalBill = document.getElementById('Total').textContent;
        tableHtml += "<tr><td style='text-align: center;'><h4 style='margin-top: 20px;'>Tổng hóa đơn thanh toán: " + TotalBill + "$</h4></td></tr>";
        tableHtml += "</table>";
        alertModal("Processing..")
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "phantruc438@gmail.com",
            Password: "BB2961AD3C5B25ECA5247BCCDDA73941978A",
            To: `${UserEmail}`,
            From: "bestsneakervn@gmail.com",
            Subject: "Hóa đơn Toronto Cupcake",
            Body: HeaderEmail + tableHtml + Thankyou
        }).then(
            message => {
                alertModal(message);
                if(message == "OK"){
                    alertModal("Check your gmail!");
                }else{
                    alertModal("Oder Failed!")
                }
                console.log(message);
            }
        );
    } else
        if (UserEmail == null) {
            alertModal("You are not logged in!");
        } 
        
    if(UserEmail != null){
        var modalBtn = document.querySelector('.btn-modal');
        modalBtn.addEventListener('click', function(){
             clearProduct();
        })
    }
       
    
 
}
function alertModal(Details){
    var modal_container = document.querySelector('.modal-container');
    var details = document.querySelector('.modal-details');
    modal_container.classList.remove('close-modal');
    modal_container.classList.add('open-modal');
    details.textContent = Details;
}


