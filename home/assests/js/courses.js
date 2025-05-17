document.addEventListener('DOMContentLoaded', async () => {
    var query;
    var Courses;
    const categore = JSON.parse(localStorage.getItem("category"));
    const categoryy = document.getElementById('categore')
    categore.forEach((c) => {
        let selectCategory = `
                            <option value="${c.id}">${c.name}</option>

    `
        categoryy.innerHTML += selectCategory;
    })

    async function getCourses() {
        try {
            if (query) {
                const response = await fetch(`https://localhost:7170/api/Courses?query=${query}`, {
                    method: `GET`
                })
                Courses = await response.json();
                displayCourses()
            } else {
                const response = await fetch(`https://localhost:7170/api/Courses`, {
                    method: `GET`
                })
                Courses = await response.json();
            }

        } catch (err) {
            console.log(err)
        }
    }
    getCourses();
    async function displayCourses() {
        const coursesBody = document.querySelector('.cources-body');
        coursesBody.innerHTML='';
        console.log(Courses)
        Courses.forEach((c) => {
            let coursebody = `
            <div class="col-lg-4 col-sm-6 mb-3">
                    <div class="course-card">
                        <div class="card-img">
                            <img src="${c.image}"
                                alt="" class="w-100">
                        </div>
                        <div>
                            <div class="card-body">
                                <h4> ${c.title}</h4>
                                <p class="card-p">${c.description}</p>
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex gap-2 align-items-center">
                                        <svg fill="#7a7a7a" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px"
                                            viewBox="-5 -5 60.00 60.00" xml:space="preserve" stroke="#7a7a7a">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0">
                                                <rect x="-5" y="-5" width="60.00" height="60.00" rx="30" fill="#ebebeb"
                                                    strokewidth="0"></rect>
                                            </g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                stroke-linejoin="round">
                                            </g>
                                            <g id="SVGRepo_iconCarrier">
                                                <g>
                                                    <path
                                                        d="M44.027,36.701c1.111-0.451,1.897-1.537,1.897-2.808V13.115c0-1.671-1.36-3.032-3.032-3.032H7.107 c-1.672,0-3.033,1.361-3.033,3.032v20.778c0,1.271,0.787,2.355,1.898,2.808H0c0,2.554,0.994,3.217,2.215,3.217h45.57 c1.221,0,2.215-0.663,2.215-3.217H44.027z M29.621,38.492h-9.238v-1.566h9.238V38.492z M34.8,32.509c-2.802,0-5.602,0-8.401,0 l-1.16-2.317l0.787-0.78l-0.319-0.785h-1.41l-0.319,0.785l0.787,0.78l-1.16,2.317c-2.801,0-5.601,0-8.402,0v-0.985 c0.26-0.246,0.569-0.44,0.901-0.621c0.563-0.299,1.12-0.609,1.694-0.883c0.559-0.267,1.135-0.496,1.705-0.735 c0.536-0.228,1.078-0.438,1.611-0.669c0.091-0.041,0.185-0.141,0.223-0.231c0.118-0.299,0.221-0.606,0.313-0.913 c0.07-0.232,0.118-0.465,0.417-0.527c0.076-0.014,0.169-0.145,0.182-0.232c0.059-0.445,0.104-0.896,0.138-1.352 c0.007-0.094-0.042-0.215-0.107-0.29c-0.396-0.442-0.613-0.953-0.705-1.539c-0.045-0.292-0.209-0.565-0.294-0.854 c-0.111-0.388-0.207-0.779-0.293-1.174c-0.034-0.141-0.016-0.295-0.04-0.44c-0.035-0.211-0.025-0.375,0.229-0.457 c0.07-0.023,0.128-0.191,0.131-0.294c0.012-0.628,0.007-1.258,0.01-1.887c0.002-0.387-0.002-0.774,0.025-1.158 c0.055-0.739,0.486-1.258,1.03-1.705c0.793-0.653,1.742-0.958,2.718-1.19c0.512-0.12,1.035-0.191,1.553-0.275 c0.14-0.025,0.282-0.005,0.428-0.005c0.022,0.036,0.045,0.071,0.07,0.108c-0.108,0.076-0.229,0.145-0.324,0.236 c-0.213,0.211-0.192,0.36,0.033,0.553c0.473,0.398,0.941,0.799,1.4,1.209c0.4,0.361,0.559,0.837,0.559,1.368 c0.002,0.915,0.002,1.83,0.002,2.746c-0.002,0.188-0.017,0.374,0.219,0.458c0.049,0.018,0.103,0.12,0.098,0.179 c-0.039,0.47-0.091,0.934-0.141,1.403c0,0.021-0.006,0.041-0.016,0.054c-0.419,0.616-0.474,1.368-0.775,2.029 c-0.012,0.024-0.02,0.056-0.035,0.075c-0.561,0.657-0.385,1.449-0.396,2.204c-0.002,0.076,0.055,0.196,0.115,0.224 c0.229,0.101,0.284,0.295,0.35,0.502c0.1,0.326,0.194,0.652,0.336,0.963c0.053,0.115,0.205,0.214,0.332,0.262 c1.721,0.659,3.416,1.357,5.058,2.197c0.328,0.168,0.61,0.373,0.851,0.621v1.026H34.8z">
                                                    </path>
                                                </g>
                                            </g>
                                        </svg>
                                        <p class="m-0">Hala</p>
                                    </div>
                                    <p class="price">${c.price}</p>
                                </div>
                            </div>
                            <div class="p-2 border-top">
                                <a href="cources-details.html?id=${c.id}" class="btn-cources btn w-100">عرض التفاصيل</a>
                            </div>
                        </div>

                    </div>
                </div>


            `
            coursesBody.innerHTML+=coursebody
        })
    }
    categoryy.addEventListener('change', async (e) => {
        const id = e.target.value;
        if (id == '') {
            const response = await fetch(`https://localhost:7170/api/Courses?query=${query}`, {
                method: `GET`
            })
            Courses = await response.json();
            displayCourses()

        } else {
            const response = await fetch(`https://localhost:7170/api/Categorys/${id}`, {
                method: 'GET'

            })
            const categorrreee = await response.json();
            console.log(categorrreee)
            Courses = categorrreee.courses || [];
            console.log(Courses);
            await displayCourses();
        }
    })
    const text=document.getElementById('text');
    text.addEventListener('input',()=>{
        console.log(text.value)
        query=text.value;
        getCourses();
    })
})
