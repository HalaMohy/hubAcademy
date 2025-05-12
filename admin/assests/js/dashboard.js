const btnSideBar=document.getElementById('btn-sidebar');
const sidebar=document.getElementById('sidebar')
btnSideBar.addEventListener ('click', (e)=> {
    e.preventDefault();
sidebar.classList.toggle('open')
})
const sidebarLinks=document.querySelectorAll('.list.sidebar a')
const currentPage=window.location.pathname.split('/').pop();
sideparLink.array.forEach(link => {
    const linkPage =link.getAttribute('href').split('/').pop();
    if(currentPage == linkPage){
        link.classList.add('active')
    }else{
        link.classList.remove('active')
    }
});