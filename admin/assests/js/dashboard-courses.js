document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('tbody')
    const token = localStorage.getItem('token')

    async function getCourses() {
        try {
            const response = await fetch("https://localhost:7170/api/Courses", {
                method: 'GET',

            })
            const Courses = await response.json();
            console.log(Courses)
            tableBody.innerHTML = '';
            Courses.forEach((c) => {
                const row = `
    
    <tr>
                                        <th scope="row"> ${c.title} </th>
                                        <td> ${c.categoryName} </td>
                                        <td> ${c.user} </td>
                                           <td>
                                            
                                            <a class="btn"href=''>
                            <i class="fa-solid fa-user"></i>                                 
                                       </a>
                                        </td>
                                        <td>
                                            
                                            <a class="btn"href='../../home/courses-details.html?id=${c.id}'>
                                  <i class="fa-solid fa-eye"></i>                                       
                                  </a>
                                        </td>
                                    </tr>
    `
                console.log(tableBody)
                tableBody.innerHTML += row;
            })
        } catch (err) {
            tableBody.innerHTML = `
        <tr><td>فشل التحميل</td></tr> `
            console.log(err)
        }

    }
    getCourses();
})