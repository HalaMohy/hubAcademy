const courseForm = document.getElementById('courseForm');
const addContent = document.getElementById('add-contant');
const contentContainer = document.getElementById('contant');
const selectcategory = document.getElementById('selectcategory');

const token = localStorage.getItem('token');
const categories = JSON.parse(localStorage.getItem('category'));
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let CourseId;
let material = [];
let data;


document.addEventListener('DOMContentLoaded', async () => {
    populateCategories();
    await getData();
    displayM();


    addContent.addEventListener('click', async (e) => {
        e.preventDefault();
        await uploadMaterial();
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-material') || e.target.parentElement.classList.contains('remove-material')) {
            const material = e.target.closest(".course-material-container");
            if (material) {
                material.remove();
            }
        }
    });

    courseForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateData()) return;
        await updateCourse();

        const materialFiles = document.querySelectorAll('.FileUrl');
        const file = Array.from(materialFiles).some(i => i.files.length > 0);

        if (CourseId && file) {
            await uploadMaterial();
        }
    });
});



function populateCategories() {
    categories.forEach((c) => {
        const option = `<option value="${c.id}">${c.name}</option>`;
        selectcategory.innerHTML += option;
    });
}


async function getData() {
    const response = await fetch(`https://localhost:7170/api/Courses/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    data = await response.json();
    console.log(data)
    document.getElementById('title').value = data.title;
    document.getElementById('descripation').value = data.description;
    document.getElementById('selectcategory').value = data.id.toString();
    document.getElementById('price').value = data.price;
    CourseId = data.id;

    if (data.courseMaterials && data.courseMaterials.length > 0) {
        material = data.courseMaterials;
        console.log(material);
    }
}

function displayM() {
    contentContainer.innerHTML = '';
    if (!material || material.length === 0) return;

    const materialCont = document.createElement('div');
    materialCont.className = 'course-material-container content-cource';
    console.log(material[0])
    material.map((m) => {
        m?.files?.forEach((c) => {

            let materialHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="mb-0">مادة تعليمية <span class="material-number"></span></h4>
            <button onclick="deleteM(${material[0].id})" class="btn btn-sm btn-danger remove-material">
                <i class="fas fa-times"></i> حذف
            </button>
        </div>
         <p>
            ${c.fileName}
        </p>
        <div></div>
        `;
            materialCont.innerHTML += materialHTML;
        });
    })


    contentContainer.appendChild(materialCont);
}

async function deleteM(id) {
    try {
        const response = await fetch(`https://localhost:7170/api/CourseMaterials/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            await getData();
            displayM();
        }
    } catch (err) {
        console.error("Error deleting material:", err);
    }
}

function addForm() {
    const materialCont = document.createElement('div');
    materialCont.className = 'course-material-container content-cource';

    materialCont.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="mb-0">مادة تعليمية <span class="material-number"></span></h4>
        <button class="btn btn-sm btn-danger remove-material">
            <i class="fas fa-times"></i> حذف
        </button>
    </div>
    <div></div>
    `;

    contentContainer.appendChild(materialCont);
}

function validateData() {
    const title = document.getElementById('title').value;
    const category = selectcategory.value;
    const descripation = document.getElementById('descripation').value;
    const price = document.getElementById('price').value;

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
        return false;
    }

    if (!category) {
        Toast.fire({
            icon: "error",
            title: "يرجى تحديد تصنيف الدورة"
        });
        return false;
    }

    if (!descripation) {
        Toast.fire({
            icon: "error",
            title: "يرجى إدخال وصف الدورة"
        });
        return false;
    }

    if (!price || isNaN(price) || Number(price) < 0) {
        Toast.fire({
            icon: "error",
            title: "يرجى إدخال سعر صالح للدورة"
        });
        return false;
    }

    return true;
}

async function updateCourse() {
    try {
        const formData = new FormData();
        formData.append('Title', document.getElementById('title').value);
        formData.append('Description', document.getElementById('descripation').value);
        formData.append('Price', document.getElementById('price').value);
        formData.append('CategoryId', selectcategory.value);

        if (document.getElementById('image').files[0]) {
            formData.append('Image', document.getElementById('image').files[0]);
        }

        const response = await fetch(`https://localhost:7170/api/Courses/${id}`, {
            method: "PUT",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            showToast("success", "تم تحديث الدورة بنجاح");
        } else {
            showToast("error", "حدث خطأ أثناء تحديث الدورة");
        }

        return response.ok;
    } catch (err) {
        console.error("Error updating course:", err);
        showToast("error", "حدث خطأ أثناء تحديث الدورة");
        return false;
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

                // تحديد نوع الملف بناءً على extension
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
        if (response.ok) {
            // showToast("success", "تمت عملية الاضافة بنجاح");
            await getData();
            displayM();
            return true;
        } else {
            showToast("error", "حدث خطأ أثناء إضافة المادة");
            return false;
        }
    } catch (err) {
        console.error("Error uploading material:", err);
        showToast("error", "حدث خطأ أثناء إضافة المادة");
        return false;
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