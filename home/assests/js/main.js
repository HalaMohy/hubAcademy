var inf
var name;
var role;

function logout(){
    localStorage.removeItem ('token')
    window.location.href='index.html';
}
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('token')) {
        const navbarNav = document.getElementById('navbarNav');
        console.log(navbarNav);
        inf = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))
        console.log(inf)
        //const namekeys=keys
        console.log(inf.username);
        role = inf.role;
        console.log(role);
        //Student , Moderator , Admin
        if (role =='Student') {
            let ulBody = `
     <li class="nav-item"></li>
                        <a class="nav-item nav-link active" href="index.html">الصفحة الرئيسية <span
                                class="sr-only">(current)</span></a>
                        <li class="nav-item"></li>
                        <a class="nav-item nav-link" href="courses.html">الدورات</a>
                       
                        <li class="nav-item">
                            <a class="nav-link" href="student-courses.html">دوراتي </a>
                        </li>


                        <li class="dropdown">
  <a class=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
  <div class='imgNav'>
  
                                  <img src="https://www.gravatar.com/avatar/?d=mp" alt="" class="w-100">

  </div>

  </a>

  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="profile.html">الملف الشخصي</a></li>
    <li><a class="dropdown-item" onClick='logout()'> تسجيل الخروج</a></li>
  </ul>
  </li>
</div>
    
    `
            navbarNav.innerHTML = ulBody;
        } else if(role == 'Moderator'){
            let ulBody = `
            <li class="nav-item"></li>
                               <a class="nav-item nav-link active" href="index.html">الصفحة الرئيسية <span
                                       class="sr-only">(current)</span></a>
                               <li class="nav-item"></li>
                               <a class="nav-item nav-link" href="courses.html">الدورات</a>
                              
                            <li class="nav-item">
                            <a class="nav-link" href="moderator-courses.html">دوراتي </a>
                        </li>
                                                <a class="nav-link" href="add-courses.html">اضافة الدورة</a>

       
       
                               <li class="dropdown">
         <a class=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
         <div class='imgNav'>
         
                                         <img src="https://www.gravatar.com/avatar/?d=mp" alt="" class="w-100">
       
         </div>
       
         </a>
       
         <ul class="dropdown-menu">
           <li><a class="dropdown-item" href="profile.html">الملف الشخصي</a></li>
           <li><a class="dropdown-item" onClick='logout()'> تسجيل الخروج</a></li>
         </ul>
         </li>
       </div>
           
           `
            navbarNav.innerHTML = ulBody;

        }else if(role=='Admin'){
            let ulBody = `
            <li class="nav-item"></li>
                               <a class="nav-item nav-link active" href="index.html">الصفحة الرئيسية <span
                                       class="sr-only">(current)</span></a>
                               <li class="nav-item"></li>
                               <a class="nav-item nav-link" href="courses.html">الدورات</a>
                        
                               <li class="dropdown">
         <a class=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
         <div class='imgNav'>
         
                                         <img src="https://www.gravatar.com/avatar/?d=mp" alt="" class="w-100">
       
         </div>
       
         </a>
       
         <ul class="dropdown-menu">
           <li><a class="dropdown-item" href="../admin/dashboard.html">لوحة التحكم</a></li>
                      <li><a class="dropdown-item" href="profile.html">الملف الشخصي</a></li>

           <li><a class="dropdown-item" onClick='logout()'> تسجيل الخروج</a></li>
         </ul>
         </li>
       </div>
           
           `
            navbarNav.innerHTML = ulBody;
        }
    } else {
        let ulBody = `
        <li class="nav-item"></li>
                           <a class="nav-item nav-link active" href="index.html">الصفحة الرئيسية <span
                                   class="sr-only">(current)</span></a>
                           <li class="nav-item"></li>
                           <a class="nav-item nav-link" href="courses.html">الدورات</a>
                     <li class="nav-item">
                            <a class="nav-item nav-link join" href="signup.html">انضم لنا</a>
                        </li>
       
       `
        navbarNav.innerHTML = ulBody;

    }

})