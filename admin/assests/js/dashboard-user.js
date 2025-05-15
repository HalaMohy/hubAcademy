document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('tbody')
    const token = localStorage.getItem('token')
    const editModel = new bootstrap.Modal(document.getElementById('exampleModal'))
    const editRole = document.getElementById('editRole')
    async function getUsers() {
        try {
            const response = await fetch("https://localhost:7170/api/Uesers/UserWithRole", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const users = await response.json();

            tableBody.innerHTML = '';
            users.forEach((user) => {
                const row = `
    
    <tr>
                                        <th scope="row"> ${user.userName}</th>
                                        <td>${user.email} </td>
                                        <td> ${user.roles[0]}</td>
                                        <td>
                                            <button href ="" class="btn">
                                             </a>
                                            
                                            <button class="btn btn-edit" data-bs-toggle="modal" data-id=${user.id} data-bs-target="#exampleModal">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </td>
                                    </tr>
    `
                console.log(tableBody)
                tableBody.innerHTML += row;
            })
          EditEvents()
        } catch (err) {
            tableBody.innerHTML = `
        <tr><td>فشل التحميل</td></tr> `
            console.log(err)
        }

    }
    await getUsers()
    let userId;
    function EditEvents() {
        const editButton = document.querySelectorAll('.btn-edit');

        editButton.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                userId = e.currentTarget.dataset.id;

                //handleEdit(userId)
                editModel.show();
            })
        })

    }
    editRole.addEventListener('click', async () => {
        console.log(userId);
        const roleName = document.getElementById('role').value;
        try {
            const response = await fetch(`https://localhost:7170/api/Uesers/${userId}?roleName=${roleName}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response)
            if (response.ok) {
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
                    title: " تم تعديل الصلاحية بنجاح"
                }).then(async () => {
                    editModel.hide();
                    await getUsers();
                })

            } else {
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
                    title: "  لم تنجح عملية التعديل"
                }).then(() => {
                    return;
            })

            }
        } catch (err) {
            console.log(err)
        }
    })
      

    }
);