const courseForm = document.getElementById('courseForm');
const addContent = document.getElementById('add-contant');
const contentContainer = document.getElementById('contant');
const token = localStorage.getItem('token')
const categories = JSON.parse(localStorage.getItem('category'));
console.log(categories)
var CourseId;

const selectcategory = document.getElementById('selectcategory')
console.log(selectcategory)
categories.forEach((c) => {
    const option = `
         <option value="${c.id}">${c.name}</option>

    `
    selectcategory.innerHTML += option;
})

document.addEventListener('DOMContentLoaded', async () => {

    addContent.addEventListener('click', (e) => {
        e.preventDefault()
        addMaterial()
    })

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-material') || e.target.parentElement.classList.contains('remove-material')) {
            const material = e.target.closest(".course-material-container");
            if (material) {
                material.remove();

            }
        }
    })


    courseForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        validationData();
        await createCourse();
        if (CourseId) {
            await uploadMaterial();
        }
    })
    async function addMaterial() {

        const materialCont = document.createElement('div');
        materialCont.className = 'course-material-container content-cource';

        materialCont.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <h4 class="mb-0">مادة تعليمية <span class="material-number"></span></h4>
                                            <button type="button" class="btn btn-sm btn-danger remove-material">
                                                <i class="fas fa-times"></i> حذف
                                            </button>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-md-7">
                                                <label>رفع الملف </label>
                                                <input type="file" class="form-control FileUrl" name="FileUrl"
                                                    accept="video/*,application/pdf">
                                                <input type="hidden" name="Materials[].CourseId" id="currentCourseId">
                                            </div>

                                        </div>
        `
        contentContainer.appendChild(materialCont);

    }
    addMaterial();
    async function validationData() {
        const title = document.getElementById('title').value;
        const category = selectcategory.value;
        const descripation = document.getElementById('descripation').value;
        const image = document.getElementById('image').files[0];
        const price = document.getElementById('price').value;
        const EndDate=document.getElementById('EndDate');
        const StartDate=document.getElementById('StartDate')
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

        if (!title) {
            Toast.fire({
                icon: "error",
                title: "يرجى إدخال عنوان الدورة"
            });
            return;
        } else if (!category) {
            Toast.fire({
                icon: "error",
                title: "يرجى تحديد تصنيف الدورة"
            });
            return;

        } else if (!descripation) {
            Toast.fire({
                icon: "error",
                title: "يرجى إدخال وصف الدورة"
            });
            return;

        } else if (!image) {
            Toast.fire({
                icon: "error",
                title: "يرجى رفع صورة الدورة"
            });
            return;

        } else if (!price || isNaN(price) || Number(price) < 0) {
            Toast.fire({
                icon: "error",
                title: "يرجى إدخال سعر صالح للدورة"
            });
            return;

        }
        else if (!StartDate) {
            Toast.fire({
                icon: "error",
                title: "يرجى ادخال تاريخ البداية  الدورة"
            });
            return;
        }
        else if (!EndDate) {
            Toast.fire({
                icon: "error",
                title: "يرجى ادخال تاريخ نهاية الدورة"
            });
            return;
        }
        const materialFiles = document.querySelectorAll('.FileUrl');
        const file = Array.from(materialFiles).some(i =>
            i.files.length > 0
        )
        console.log(file)
        if (!file) {
            Toast.fire({
                icon: "error",
                title: "يرجى رفع ملف واحد على الاقل للمادة  "
            });
            return;
        }
    }
    async function createCourse() {
        try {
            const formData = new FormData();
            formData.append('Title', document.getElementById('title').value)
            formData.append('Description', document.getElementById('descripation').value)
            formData.append('Image', document.getElementById('image').files[0])
            formData.append('Price', document.getElementById('price').value)
            formData.append('CategoryId', category = selectcategory.value)
           const startDateInput = document.getElementById('StartDate').value;
            const endDateInput = document.getElementById('EndDate').value;

            // تحويل من datetime-local إلى ISO string
            const startDate = new Date(startDateInput);
            const endDate = new Date(endDateInput);
console.log(startDate)
console.log(endDate)
            formData.append('StartDate', startDate.toISOString());
formData.append('EndDate', endDate.toISOString());

            const response = await fetch('https://localhost:7170/api/Courses', {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            const data = await response.json();
            CourseId = data.id;
            // if (response.ok) {
            //     const Toast = Swal.mixin({
            //         toast: true,
            //         position: "top-end",
            //         showConfirmButton: false,
            //         timer: 3000,
            //         timerProgressBar: true,
            //         didOpen: (toast) => {
            //             toast.onmouseenter = Swal.stopTimer;
            //             toast.onmouseleave = Swal.resumeTimer;
            //         }
            //     });
            //     Toast.fire({
            //         icon: "success",
            //         title: "تمت عملية الاضافة بنجاح"
            //     });
            // }
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }
    async function uploadMaterial() {
    try {
        const fileInputs = document.querySelectorAll('.FileUrl');
        const zoomLink = document.getElementById('zoomLink')?.value.trim();
        const liveStartTime = document.getElementById('liveStartTime')?.value;
        
        const hasFiles = Array.from(fileInputs).some(input => input.files.length > 0);
        const hasZoomLink = zoomLink && zoomLink !== '';
        
        if (!hasFiles && !hasZoomLink) {
            console.log('لا توجد ملفات أو رابط زوم للرفع');
            Swal.fire({
                icon: "warning",
                title: "تنبيه",
                text: "يجب رفع ملف واحد على الأقل أو إدخال رابط Zoom"
            });
            return;
        }

        // جمع الملفات وأنواعها
        const files = [];
        const fileTypes = [];

        fileInputs.forEach((input) => {
            if (input.files.length > 0) {
                const file = input.files[0];
                files.push(file);
                
                const fileName = file.name.toLowerCase();
                if (fileName.endsWith('.pdf')) {
                    fileTypes.push('PDF');
                } else if (fileName.endsWith('.mp4') || fileName.endsWith('.avi') || fileName.endsWith('.mov') || fileName.endsWith('.wmv')) {
                    fileTypes.push('Video');
                } else if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png') || fileName.endsWith('.gif')) {
                    fileTypes.push('Image');
                } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
                    fileTypes.push('Document');
                } else {
                    fileTypes.push('Other');
                }
            }
        });

        // إضافة رابط Zoom كنوع ملف إذا كان موجوداً
        if (hasZoomLink) {
            // إنشاء ملف نصي يحتوي على رابط Zoom
            const zoomFile = new File([zoomLink], 'zoom_link.txt', { type: 'text/plain' });
            files.push(zoomFile);
            fileTypes.push('ZoomLink');
        }

        console.log('CourseId:', CourseId);
        console.log('Files:', files);
        console.log('FileTypes:', fileTypes);
        console.log('ZoomLink:', zoomLink);
        console.log('LiveStartTime:', liveStartTime);

        const formData = new FormData();
        
        // إضافة CourseId
        formData.append('CourseId', CourseId);
        
        // إضافة الملفات
        files.forEach((file) => {
            formData.append('Files', file);
        });
        
        // إضافة أنواع الملفات
        fileTypes.forEach((type) => {
            formData.append('FileTypes', type);
        });

        // إضافة LiveStartTime فقط إذا كان هناك رابط زوم ووقت محدد
        if (hasZoomLink && liveStartTime) {
            formData.append('LiveStartTime', liveStartTime);
        }

        const response = await fetch('https://localhost:7170/api/CourseMaterials', {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        const data = await response.json();
        console.log('Response:', data);

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
                title: "تمت عملية الاضافة بنجاح"
            }).then(() => {
                window.location.pathname = 'Home/index.html';
            });
        } else {
            console.error('خطأ في الاستجابة:', data);
            Swal.fire({
                icon: "error",
                title: "خطأ",
                text: data.message || "حدث خطأ أثناء رفع الملفات"
            });
        }
    } catch (err) {
        console.error('خطأ في uploadMaterial:', err);
        Swal.fire({
            icon: "error",
            title: "خطأ",
            text: "حدث خطأ أثناء رفع الملفات"
        });
    }
}
})