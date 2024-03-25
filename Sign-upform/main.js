var icon = document.querySelector('.password-blind');
var passlabel = document.getElementById('password');
var isPasswordVisible = false; // Trạng thái hiện tại

icon.addEventListener('click', function () {
    // Đảo ngược trạng thái
    isPasswordVisible = !isPasswordVisible;

    // Thay đổi type của passlabel tùy thuộc vào trạng thái
    passlabel.type = isPasswordVisible ? 'text' : 'password';

    // Thay đổi opacity của icon tùy thuộc vào trạng thái
    icon.classList.toggle('opacity_5', isPasswordVisible);
    icon.classList.toggle('opacity_1', !isPasswordVisible);
});

var googleButton = document.getElementById('google-button');
var container = document.getElementsByClassName('container')[0];
var img = document.getElementsByClassName('img')[0];
var getName = document.getElementsByClassName('name')[0];
var id = document.getElementsByClassName('id')[0];
var email = document.getElementsByClassName('email')[0];

function SetSession(){
    if(isLoggedIn){
        sessionStorage.setItem('GGimg',img.src)
        sessionStorage.setItem('GGgetName',getName.textContent)
        sessionStorage.setItem('GGid',id.textContent)
        sessionStorage.setItem('GGemail',email.textContent)
}
}

 
// function to get response
var isLoggedIn = false;
function handleCredentialResponse(response) {
    const responsePayload = decodeJwtResponse(response.credential);
    img.src = responsePayload.picture;
    getName.innerHTML = responsePayload.name;
    id.innerHTML = responsePayload.sub;
    email.innerHTML = responsePayload.email;
    container.style.display = 'inline-block';
    googleButton.style.display = 'none'
    isLoggedIn = true;
    SetSession();
    window.location.href = "/index.html"
}

window.onload = function () {
    google.accounts.id.initialize({
        // replace your client id below
        client_id: "343843909589-d7re2d6muq945af426ahrfla5p9bhdfe.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        auto_select: true,
        auto: true
    });
    google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "filled_blue", size: "medium", width: '200' }  // customization attributes
    );
    // also display the One Tap dialog on right side
    // important for auto login
    google.accounts.id.prompt();
}

// function to decode the response.credential
function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function signOut() {
    google.accounts.id.disableAutoSelect();
    // do anything on logout
    location.reload();
}



