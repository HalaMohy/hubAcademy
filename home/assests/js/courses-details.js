var relatedCourses;
const token = localStorage.getItem('token');
var inf  = JSON.parse(atob(token.split('.')[1]));;
console.log('inf',inf)
var details;

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    async function getDetails() {
        try {
            const response = await fetch(`https://localhost:7170/api/Courses/${id}`, {
                method: 'GET'
            })
            details = await response.json();
            console.log(details);

            // console.log(details);
            document.querySelector('.details-body h2').innerHTML = details.title;
            document.querySelector('.details-body .category i').textContent = details.categoryName;
            document.querySelector('.details-img img').src = `https://imagedelivery.net/8T78ZpVGfNBEC4Ric8RkRg/7664be06-135e-4427-8625-1f18a7580000/original`;
            document.querySelector('.details-body .description p').innerHTML = details.description;
            document.querySelector('.box-feature .price').innerHTML = `$${details.price}`;
            // courseMaterials = details.courseMaterials;
            document.getElementById('moderator').innerHTML = details.user;
            getCouses();
        } catch (err) {
            console.log(err);
        }
    }
    await getDetails();
    async function getCouses() {
        try {
            const response = await fetch('https://localhost:7170/api/Courses');
            const allCourses = await response.json();
            if (response.ok) {
                relatedCourses = allCourses
                    .filter(course =>
                        course.categoryName === details.categoryName &&
                        course.id !== details.id
                    )
                    .slice(0, 2);
                displayCourse()
                console.log(relatedCourses)
            }
        } catch (err) {
            console.log(err);
        }
    }
    fetchAndDisplayRatings();
    let selectedScore = 0;
    const starRatingContainer = document.getElementById('starRating');

    if (starRatingContainer) {
        starRatingContainer.querySelectorAll('i').forEach(star => {
            star.addEventListener('click', function () {
                selectedScore = parseInt(this.dataset.value);
                starRatingContainer.querySelectorAll('i').forEach(s => {
                    s.classList.remove('fa-solid');
                    s.classList.add('fa-regular');
                });

                for (let i = 0; i < selectedScore; i++) {
                    starRatingContainer.querySelectorAll('i')[i].classList.remove('fa-regular');
                    starRatingContainer.querySelectorAll('i')[i].classList.add('fa-solid');
                }
            });
        });
    }
    const ratingForm = document.getElementById('ratingForm');
    ratingForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (selectedScore === 0) {
            showToast("success", "الرجاء تحديد تقييم (عدد النجوم)");
            return;
        }

        const comment = document.getElementById('comment').value;
        const courseIdForRating = details.id;
        try {
            const response = await fetch('https://localhost:7170/api/Ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    score: selectedScore,
                    comment: comment,
                    courseId: courseIdForRating
                })
            });
            if (response.ok) {
                showToast("success", "تم ارسال التقييم بنجاح");
                selectedScore = 0;
                ratingForm.reset();
                if (starRatingContainer) {
                    starRatingContainer.querySelectorAll('i').forEach(s => {
                        s.classList.remove('fa-solid');
                        s.classList.add('fa-regular');
                    });
                }
                fetchAndDisplayRatings();

            }
        } catch (err) {
            showToast('error', "فشل اضافة التقييم")
        }
    })
});

async function displayCourse() {
    const relationItems = document.getElementById('items');
    console.log(relatedCourses);
    relatedCourses.forEach((r) => {
        let relation = `
     <div class="relation-item">
                                    <div class="relation-item">
                                   <div class="img-relation">


                                        <img src="${r.image}"
                                            alt="">
                                    </div>
                                    <div class="relation-body">
                                        <p>${r.title}

                                        </p>
                                        <span>${r.price}</span>

                                    </div>
                                </div>

                            </div>
    `
        relationItems.innerHTML += relation;
    });
}
async function deleteCommit(id) {
    console.log(id)
    try {
        const response = await fetch(`https://localhost:7170/api/Ratings/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        console.log(response);
        if (response.ok) {
            showToast("success", "تمت عملية حذف التعليق بنجاح")
            await fetchAndDisplayRatings();
        }
    } catch (err) {
        console.log(err)
    }
}

function showToast(icon, title) {
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
        icon: icon,
        title: title
    });
}
async function fetchAndDisplayRatings() {
    const commitsContainer = document.querySelector('.commits');
    const addRatingFormDiv = commitsContainer.querySelector('.addRating');
    document.querySelectorAll('.commit').forEach(el => el.remove());
    try {
        const response = await fetch('https://localhost:7170/api/Ratings', {
            method: 'GET'
        });

        const allRatings = await response.json();
        console.log("allRatings", allRatings);

        const courseRatings = allRatings.filter(rating => rating.courseId === details.id);
        console.log(courseRatings);

        const RatingNumber = document.querySelector('.rating-body .number');
        const RatigStar = document.querySelector('.rating-body .star-rating');
        const titleRating = document.querySelector('.title-details .me-2');

        if (courseRatings.length > 0) {
            const totalScoreSum = courseRatings.reduce((sum, rating) => sum + rating.score, 0);
            const averageScore = totalScoreSum / courseRatings.length;

            if (RatingNumber) RatingNumber.textContent = averageScore.toFixed(1);
            if (RatigStar) RatigStar.innerHTML = generateStarsHTMLForAverage(averageScore);
            if (titleRating) titleRating.innerHTML = `<i class="fa-solid fa-star"></i> 0 ${averageScore.toFixed(1)}`;

        } else {
            if (RatingNumber) RatingNumber.textContent = '0';
            if (RatigStar) RatigStar.innerHTML = generateStarsHTMLForAverage(0);
            if (titleRating) titleRating.innerHTML = `<i class ="fa-solid fa-star"></i> 0`;
        }
        courseRatings.forEach(rating => {
            const commitDiv = document.createElement('div');
            commitDiv.classList.add('commit');
            console.log(rating.userId,"     ", inf.id)
            console.log('Match:',rating.userId === inf.id);

            commitDiv.innerHTML = `
                <div class="d-flex justify-content-between">
                    <div class="d-flex gap-3">
                        <svg fill="#7a7a7a" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" width="40px" height="40px"
                            viewBox="-5 -5 60.00 60.00" xml:space="preserve" stroke="#7a7a7a">
                            <g id="SVGRepo_bgCarrier" stroke-width="0">
                                <rect x="-5" y="-5" width="60.00" height="60.00" rx="30" fill="#ebebeb"
                                    strokewidth="0"></rect>
                            </g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M44.027,36.701c1.111-0.451,1.897-1.537,1.897-2.808V13.115c0-1.671-1.36-3.032-3.032-3.032H7.107 c-1.672,0-3.033,1.361-3.033,3.032v20.778c0,1.271,0.787,2.355,1.898,2.808H0c0,2.554,0.994,3.217,2.215,3.217h45.57 c1.221,0,2.215-0.663,2.215-3.217H44.027z">
                                </path>
                            </g>
                        </svg>
                        <div>
                            <p class="name">${rating.user || 'مستخدم مجهول'}</p>
                            <!-- <span></span> Could add rating.createdAt if API provides it -->
                        </div>
                    </div>
                    <div>
                              ${inf && rating.userId === inf.id ? `
                    <button onclick="deleteCommit(${rating.id})" class="btn btn-sm ">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    ` : ''}
                    </div>                
                </div>
                    
                    <div class="d-flex flex-column gap-3">
                        <div class="star-rating">
                            ${generateStarsHTMLForIndividual(rating.score)}
                        </div>
                        <p>${rating.comment || ''}</p>
                    </div>
                `;
            if (addRatingFormDiv) {
                commitsContainer.insertBefore(commitDiv, addRatingFormDiv);
            } else {
                commitsContainer.appendChild(commitDiv);
            }
        })
    } catch (err) {
        console.error(err);
    }
}

function generateStarsHTMLForAverage(score) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (score >= i) { // Full star
            starsHTML += '<i class="fa-solid fa-star"></i>';
        } else if (score >= (i - 0.5)) { // Half star
            starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else { // Empty star
            starsHTML += '<i class="fa-regular fa-star"></i>';
        }
    }
    return starsHTML;
}
function generateStarsHTMLForIndividual(score, totalStars = 5) {
    let starsHTML = '';
    for (let i = 1; i <= totalStars; i++) {
        if (i <= score) {
            starsHTML += '<i class="fa-solid fa-star"></i>'; //Full
        } else {
            starsHTML += '<i class="fa-regular fa-star"></i>'; // empty
        }
    }
    return starsHTML;
}
async function Subscription() {
    try {
        if (token) {
            const response = await fetch(`https://localhost:7170/api/Subscriptions/${details.id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }
            );
            if (response.ok) {
                // window.location.href='checkout.html'
                showToast('success', 'نجحت عملية الاشتراك')
            }
            console.log(response);
        } else {
            window.location.href = 'login.html'
        }
    } catch (err) {
        console.log(err)
    }
}




