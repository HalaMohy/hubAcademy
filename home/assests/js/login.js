const loginForm = document.getElementById("loginForm");
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const rememberMe = true;

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
        const response = await fetch('https://localhost:7170/api/Account/login', {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
                password,
                email,
                rememberMe
            })
        })
        console.log(response)
        const data = await response.json();
        console.log(data)
        if (response.ok) {
            localStorage.setItem('token',data.token);
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
                icon: "success",
                title: "تمت عملية تسجيل الدخول بنجاح "
            }).then(() => {
                window.location.href = 'index.html';
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
                title: "لم تنجح عملية تسجيل الدخول"
            });
        }
    } catch (err) {
        console.log(err)
    }
})