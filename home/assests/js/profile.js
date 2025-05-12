document.addEventListener("DOMContentLoaded",async()=>{
    inf = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    console.log('inf token',inf)
    console.log(inf.username)
    var userName=document.getElementById('userName');
    userName.value=inf.username;
    var email=document.getElementById('email');
    email.value=inf.email;
    var role=document.getElementById('role');
    role.value=inf.role;
})