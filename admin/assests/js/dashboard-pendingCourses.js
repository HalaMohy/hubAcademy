document.addEventListener('DOMContentLoaded', async () => {

   
    const tableBody = document.querySelector('tbody')
    console.log(tableBody)
    const token = localStorage.getItem('token')

    async function getCategore() {
        try {
            const response = await fetch("https://localhost:7170/api/Courses/PendingCourses", {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            const Categorys = await response.json();
            console.log(Categorys);
            tableBody.innerHTML = '';
            console.log(tableBody)
            Categorys.forEach((c) => {
                const row = `
   <tr>
                                        <th scope="row"> ${c.title}</th>
                                        <td>
                                        ${c.description}
                                        </td>
                                        <td>
                                        ${c.price}$
                                        </td>
                                        <td>
                                        ${c.startDate}
                                        </td>
                                        <td>
                                        ${c.endDate}
                                        </td>    
                                        <td>                                   
                                            <button class="btn btn-approved" data-id=${c.id}>
<i class="fa-solid fa-user-check"></i>
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
    function EditEvents() {
        const editButton = document.querySelectorAll('.btn-approved');
        editButton.forEach((b) => {
            b.addEventListener('click', async (e) => {
                selectId = e.currentTarget.dataset.id;
                approvedModerator(selectId);
            })
        })
      
    }

    async function approvedModerator(selectId){
        try{

            const response =await fetch(`https://localhost:7170/api/Courses/ApproveCourse/${selectId}`,{
                 method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
            console.log(response)
            if(response.ok){
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
                    title: " تمت عملية الموافقة بنجاح"
                }).then(()=>{
                    getCategore()
                })
            }
        }catch(err){
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