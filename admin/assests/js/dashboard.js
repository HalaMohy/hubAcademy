const btnSideBar=document.getElementById('btn-sidebar');
const sidebar=document.getElementById('sidebar')
btnSideBar.addEventListener ('click', (e)=> {
    e.preventDefault();
sidebar.classList.toggle('open')
})
function logout(){
    localStorage.removeItem ('token')
    window.location.href='/home/index.html';
}
const sidebarLink=document.querySelectorAll('.list.sidebar a')
const currentPage=window.location.pathname.split('/').pop();
sidebarLink.forEach(link => {
    const linkPage =link.getAttribute('href').split('/').pop();
    if(currentPage == linkPage){
        link.classList.add('active')
    }else{
        link.classList.remove('active')
    }
});