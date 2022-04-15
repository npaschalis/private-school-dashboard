//variables & event listeners
let students = [
  new Student('Joey', 'Hanson', '1998-03-01', 2500),
  new Student('Clinton', 'Roberts', '1996-08-15', 2500),
  new Student('Adrienne', 'George', '1999-12-12', 2000),
  new Student('Dora', 'Morris', '1997-11-20', 2250),
  new Student('Tracy', 'Gomez', '1998-01-04', 2500)
]

const studentFirstName = document.getElementById('studentFirstName')
const studentLastName = document.getElementById('studentLastName')
const studentDateOfBirth = document.getElementById('studentDateOfBirth')
const studentTuitionFees = document.getElementById('studentTuitionFees')

const studentsSubmitBtn = document.querySelector('.studentsSubmitBtn')
studentsSubmitBtn.addEventListener('click', submitStudent)
const studentsUpdateBtn = document.querySelector('.studentsUpdateBtn')
studentsUpdateBtn.addEventListener('click', updateStudent)

const studentsList = document.querySelector('.students-list')
renderStudents()

//functions
function Student(firstName, lastName, dateOfBirth, tuitionFees) {
  this.id = Math.random()
  this.firstName = firstName
  this.lastName = lastName
  this.dateOfBirth = dateOfBirth
  this.tuitionFees = tuitionFees
}

function validateStudentForm() {
  let isOK = true
  if (studentFirstName.value.trim() === '') {
    showError(studentFirstName, "First name can't be blank")
    isOK = false
  } else {
    hideErrorMessage(studentFirstName)
  }

  if (studentLastName.value.trim() === '') {
    showError(studentLastName, "Last name can't be blank")
    isOK = false
  } else {
    hideErrorMessage(studentLastName)
  }

  const dateOfBirthLimit = new Date().getFullYear() - 18
  const studentDOB = new Date(studentDateOfBirth.value)
  if (
    studentDateOfBirth.value === '' ||
    studentDOB.getFullYear() > dateOfBirthLimit
  ) {
    errorMessage = `Students should be born before 1st January ${
      dateOfBirthLimit + 1
    }`
    showError(studentDateOfBirth, errorMessage)
    isOK = false
  } else {
    hideErrorMessage(studentDateOfBirth)
  }

  let feesNumber = Number(studentTuitionFees.value)
  if (isNaN(feesNumber) || !Number.isInteger(feesNumber) || feesNumber <= 0) {
    showError(studentTuitionFees, 'Tuition fees must be a positive integer')
    isOK = false
  } else {
    hideErrorMessage(studentTuitionFees)
  }

  return isOK
}

function submitStudent(event) {
  event.preventDefault()
  if (validateStudentForm()) {
    let student = new Student(
      studentFirstName.value,
      studentLastName.value,
      studentDateOfBirth.value,
      studentTuitionFees.value
    )
    students.push(student)
    createStudentItem(student)
    renderStudents()
  }
}

function editStudent() {
  let student = students.find(student => student.id === this.studentId)
  studentFirstName.value = student.firstName
  studentLastName.value = student.lastName
  studentDateOfBirth.value = student.dateOfBirth
  studentTuitionFees.value = student.tuitionFees
  studentsSubmitBtn.style.display = 'none'
  studentsUpdateBtn.style.display = 'block'
  studentsUpdateBtn.studentId = student.id
}

function updateStudent(event) {
  event.preventDefault()
  if (validateStudentForm()) {
    students.forEach(s => {
      if (s.id === this.studentId) {
        s.firstName = studentFirstName.value
        s.lastName = studentLastName.value
        s.dateOfBirth = studentDateOfBirth.value
        s.tuitionFees = studentTuitionFees.value
      }
    })
    renderStudents()
  }
}

function renderStudents() {
  studentsList.innerHTML = ''
  for (let s of students) {
    createStudentItem(s)
  }
  clearStudentForm()
}

function clearStudentForm() {
  studentFirstName.value = ''
  studentLastName.value = ''
  studentDateOfBirth.value = ''
  studentTuitionFees.value = ''
  studentsUpdateBtn.style.display = 'none'
  studentsSubmitBtn.style.display = 'block'
  studentFirstName.focus()
}

function createStudentItem(student) {
  let studentElement = document.createElement('div')
  studentElement.className = 'list-item'
  studentElement.innerHTML = `
    <p class="list-item-name">${student.firstName} ${student.lastName}</p>
    <div class="list-buttons">
      <span><i class="fa-solid fa-pen-to-square pencil"></i></span>
      <span><i class="fa-solid fa-xmark trash"></i></span>
    </div>
  `
  let editBtn = studentElement.querySelector('.pencil')
  editBtn.studentId = student.id
  editBtn.addEventListener('click', editStudent)

  let deleteBtn = studentElement.querySelector('.trash')
  deleteBtn.studentId = student.id
  deleteBtn.addEventListener('click', removeStudent)
  studentsList.append(studentElement)
}

function removeStudent() {
  students = students.filter(student => student.id !== this.studentId)
  renderStudents()
}
