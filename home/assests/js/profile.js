document.addEventListener("DOMContentLoaded",async()=>{
const token=localStorage.getItem('token')
    const payload = JSON.parse(atob(token.split('.')[1]));
console.log(payload)
// الوصول إلى القيم:

const roles = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    var userName=document.getElementById('userName');
    userName.value=payload["username"];
    var email=document.getElementById('email');
    email.value=payload["email"];
    var role=document.getElementById('role');
    role.value=roles;
})