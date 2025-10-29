const students = [];

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('active');
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.remove('error');
    errorElement.classList.remove('active');
}

function clearAllErrors() {
    const fields = ['fullName', 'email', 'phone', 'dateOfBirth', 'department', 'semester', 'rollNumber'];
    fields.forEach(clearError);
}

function validateForm() {
    clearAllErrors();
    let isValid = true;

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const department = document.getElementById('department').value;
    const semester = document.getElementById('semester').value;
    const rollNumber = document.getElementById('rollNumber').value.trim();

    if (!fullName) {
        showError('fullName', 'Full name is required');
        isValid = false;
    } else if (fullName.length < 3) {
        showError('fullName', 'Name must be at least 3 characters');
        isValid = false;
    }

    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Invalid email format');
        isValid = false;
    }

    if (!phone) {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (!validatePhone(phone)) {
        showError('phone', 'Phone must be 10-15 digits');
        isValid = false;
    }

    if (!dateOfBirth) {
        showError('dateOfBirth', 'Date of birth is required');
        isValid = false;
    }

    if (!department) {
        showError('department', 'Department is required');
        isValid = false;
    }

    if (!semester) {
        showError('semester', 'Semester is required');
        isValid = false;
    }

    if (!rollNumber) {
        showError('rollNumber', 'Roll number is required');
        isValid = false;
    }

    return isValid;
}

function displayStudents() {
    const container = document.getElementById('studentsContainer');
    const studentsList = document.getElementById('studentsList');
    const studentCount = document.getElementById('studentCount');

    if (students.length === 0) {
        studentsList.classList.add('hidden');
        return;
    }

    studentsList.classList.remove('hidden');
    studentCount.textContent = students.length;

    container.innerHTML = students.map(student => `
        <div class="student-card">
            <div class="student-info">
                <p><strong>Name:</strong> ${student.fullName}</p>
                <p><strong>Roll No:</strong> ${student.rollNumber}</p>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Phone:</strong> ${student.phone}</p>
                <p><strong>Department:</strong> ${student.department}</p>
                <p><strong>Semester:</strong> ${student.semester}</p>
            </div>
        </div>
    `).join('');
}

function resetForm() {
    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('dateOfBirth').value = '';
    document.getElementById('department').value = '';
    document.getElementById('semester').value = '';
    document.getElementById('rollNumber').value = '';
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('hidden');
    
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 3000);
}

document.getElementById('submitBtn').addEventListener('click', function() {
    if (validateForm()) {
        const student = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            dateOfBirth: document.getElementById('dateOfBirth').value,
            department: document.getElementById('department').value,
            semester: document.getElementById('semester').value,
            rollNumber: document.getElementById('rollNumber').value.trim(),
            id: Date.now()
        };

        students.push(student);
        showSuccessMessage();
        displayStudents();
        resetForm();
    }
});

const inputs = document.querySelectorAll('input, select');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        clearError(this.id);
    });
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateEmail, validatePhone };
}