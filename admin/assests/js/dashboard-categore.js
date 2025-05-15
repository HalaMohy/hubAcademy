document.addEventListener('DOMContentLoaded', async () => {
    const categoreBtn = document.querySelector('.btn-categore');
    const addModal = new bootstrap.Modal(document.getElementById('addModal'));

    categoreBtn.addEventListener('click', () => {
        addModal.show();
    })
    const addCategore = document.getElementById('addCategore');
    addCategore.addEventListener('click', async () => {
        try {
            const name = document.getElementById('name').value;
            console.log(name)
            const token = localStorage.getItem('token')
            const response = await fetch('https://localhost:7170/api/Categorys', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization ": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name
                })
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
                    title: " تمت عملية الاضافة بنجاح"
                }).then(async () => {
                    addModal.hide();
                    await getCategore();
                })
            }
            name = "";
        } catch (err) {
           console.log(err)
        }
    })
    const tableBody = document.querySelector('tbody')
    const token = localStorage.getItem('token')

    async function getCategore() {
        try {
            const response = await fetch("https://localhost:7170/api/Categorys", {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            const Categorys = await response.json();

            tableBody.innerHTML = '';
            Categorys.forEach((c) => {
                const row = `
    
   <tr>
                                        <th scope="row"> ${c.name}</th>
                                        
                                        <td>
                                        <button class ="btn btn-delete btn-sm"data-id="${c.id}">
                                        <i class="fa-solid fa-trash"></i>
                                        </button>
                                           
                                            <button class="btn btn-edit" data-bs-toggle="modal" data-bs-target="#editModal" data-id="${c.id}" data-name="${c.name}">
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
    getCategore();
    var selectId;
    var nameInput;
    const editModal = new bootstrap.Modal(document.getElementById('editModal'))
    function EditEvents() {
        const editButton = documentq.querySelectorAll('.btn-edit');
        editButton.forEach((b) => {
            b.addEventListener('click', async (e) => {
                selectId = e.currentTarget.dataset.id;
                nameInput = e.currentTarget.dataset.name;
                editModal.show();

            })
        })
        const deleteButton = document.querySelectorAll('btn-delete');
        deleteButton.forEach((b) => {
            b.addEventListener('click', async (e) => {
                selectId = e.currentTarget.dataset.id;
                deleteCategore(selectId)

            })
        })
    }
    async function deleteCategore(id) {
        try {
            Swal.fire({
                title: "هل انت متاكد من الحذف ؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم! احذف هذا"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await fetch(`https://localhost:7170/api/Categorys/${id}`, {
                        method: 'DELETE',
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        }
                    })
                    console.log(response);
                    if (response.ok){
                           Swal.fire({
                        title: "حذف",
                        text: "تم الحذف بنجاح",
                        icon: "success"
                    });
                    await getCategore();
                    }
                  
                }
            });
           
        } catch (err) {
            console.log(err)

        }
    }
    const EditCategore = document.getElementById('EditCategore');
    EditCategore.addEventListener('click', async () => {

        try {
            const editname = document.getElementById('editname')
            console.log('editname', editname.value);
            // editname .value=nameInput;
            console.log(selectId)
            const response = await fetch(`https://localhost:7170/api/Categorys/${selectId}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    name: editname.value

                })
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
                    title: " تمت عملية التعديل بنجاح"
                }).then(async () => {
                    editModal.hide();
                    await getCategore();
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
})