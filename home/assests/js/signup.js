const registerform = document.getElementById("registerform");
const userTypeSelect = document.getElementById('UserType');
const moderatorFieldsDiv = document.getElementById('moderatorFields');

userTypeSelect.addEventListener('change', function () {
  if (this.value === 'Moderator') {
    moderatorFieldsDiv.classList.remove('d-none');
  } else {
    moderatorFieldsDiv.classList.add('d-none');

  }
});
registerform.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userName = document.getElementById('userName').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
   const userTypeValue = document.getElementById('UserType').value;
  const bio = document.getElementById('bio').value;
  const specialty = document.getElementById('specialty').value;
  const certificateFilesInput = document.getElementById('certificateFiles');

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
    const formData = new FormData();
    formData.append('UserName', userName);
    formData.append('Email', email);
    formData.append('Password', password);
    formData.append('ConfirmPassword', password);
    formData.append('UserType', userTypeValue);

    if (userTypeValue === 'Moderator') {
      formData.append('Bio', bio);
      formData.append('Specialty', specialty);
      formData.append('CertificateFiles', certificateFilesInput.files[0]);
    }
    const response = await fetch('https://localhost:7170/api/Account/register', {
      method: "POST",
      body:formData
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