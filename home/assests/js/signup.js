const registerform = document.getElementById("registerform");
registerform.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userName = document.getElementById('userName').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  const confirmPassword = password;
  if (userName.length < 6) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: " يجب ان يتضمن الاسم من 6 احرف على الاقل "
    });
    return;
  }
  if (password.length < 6) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "يجب ان تتكون كلمة المرور من 6 احرف على الاقل  "
    });
    return;
  }
  if (!/[0-9]/.test(password)) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "يجب ان تتكون كلمة المرور من رقم واحد على الاقل  "
    });
    return;
  }
  if (!/[a-z]/.test(password)) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "يجب ان تتكون كلمة المرور من حرف صغير واحد على الاقل  "
    });
    return;

  }
  if (!/[A-Z]/.test(password)) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "يجب ان تتكون كلمة المرور من حرف كبير واحد على الاقل  "
    });
    return;

  }
  if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]\/+=~`؛؟]/.test(password)) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "يجب ان تتكون كلمة المرور من رمز  واحد على الاقل  "
    });
    return;

  }
  try {
    const response = await fetch('https://localhost:7170/api/Account/register', {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        userName,
        password,
        email,
        confirmPassword
      })
    })
    console.log(response)
    if (response.ok) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "تمت عملية انشاء الحساب بنجاح "
      }).then(()=>{
      window.location.href = 'login.html';
      })

    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "لم تنجح عملية انشاء الحساب"
      });
    }
  } catch (err) {
    console.log(err)
  }
})