//variables & event listeners
let studentsCourseIndex = 0

courses[0].students.push({ student: students[0] })
courses[0].students.push({ student: students[1] })
courses[1].students.push({ student: students[1] })
courses[2].students.push({ student: students[2] })

const studentsCourseSelectTr = document.getElementById(
  'studentsCourseSelect-tr'
)
studentsCourseSelectTr.addEventListener('change', () => {
  studentsCourseIndex = studentsCourseSelectTr.value
  studentsRemainingListRender(studentsCourseIndex)
})

const studentsRemainingList = document.querySelector('.studentsRemainingList')
const studentsAddedList = document.querySelector('.studentsAddedList')

function courseSelectStudents() {
  studentsCourseSelectTr.innerHTML = ''
  courses.forEach(course => {
    const el = document.createElement('option')
    el.textContent = course.title
    el.value = courses.indexOf(course)
    studentsCourseSelectTr.appendChild(el)
  })
}

function studentsRemainingListRender(index) {
  studentsRemainingList.innerHTML = ''
  studentsAddedList.innerHTML = ''
  students.forEach(stu => {
    const el = document.createElement('div')
    el.className = 'list-item'
    let dateOfBirth = new Date(stu.dateOfBirth)
    el.innerHTML = `
        <div>
        <p class='list-item-name secondary-list'>${stu.firstName} ${
      stu.lastName
    }</p>
        <p class='subjects'>year of birth: ${dateOfBirth.getFullYear()}</p>
        </div>
    `
    el.studentId = stu.id
    let studentAlreadyIncluded = courses[index].students.find(
      st => st.student.id === stu.id
    )
    if (studentAlreadyIncluded) {
      createStudentToAddButton(el)
      studentsAddedList.appendChild(el)
    } else {
      createSelectedStudentButton(el)
      studentsRemainingList.appendChild(el)
    }
  })
}

function moveStudentToAddList() {
  const element = this.parentElement.parentElement.parentElement
  element.parentElement.removeChild(element)
  const newElement = document.createElement('div')
  newElement.className = 'list-item'
  newElement.studentId = element.studentId
  newElement.append(element.firstElementChild)
  createStudentToAddButton(newElement)
  studentsAddedList.appendChild(newElement)
  students.forEach(student => {
    if (student.id === element.studentId) {
      courses[studentsCourseIndex].students.push({ student })
    }
  })
}

function removeStudentFromAddList() {
  const element = this.parentElement.parentElement.parentElement
  element.parentElement.removeChild(element)
  const newElement = document.createElement('div')
  newElement.className = 'list-item'
  newElement.studentId = this.studentId
  newElement.append(element.firstElementChild)
  createSelectedStudentButton(newElement)
  studentsRemainingList.appendChild(newElement)
  students.forEach(student => {
    if (student.id === element.studentId) {
      removeStudentFromArray(student, studentsCourseIndex)
    }
  })
}

function createStudentToAddButton(element) {
  element.innerHTML += `
    <div class='list-buttons'>
      <span><i class="fa-solid fa-solid fa-xmark remove-student"></i></span>
    </div>
  `
  let removeStudent = element.querySelector('.remove-student')
  removeStudent.addEventListener('click', removeStudentFromAddList)
}

function createSelectedStudentButton(element) {
  element.innerHTML += `
    <div class='list-buttons'>
      <span><i class="fa-solid fa-right-to-bracket right-arrow"></i></span>
    </div>
  `
  let rightArrow = element.querySelector('.right-arrow')
  rightArrow.addEventListener('click', moveStudentToAddList)
}

function removeStudentFromArray(st, index) {
  let newArray = []
  courses[index].students.forEach(s => {
    if (s.student.id !== st.id) {
      newArray.push({ student: s })
    }
  })
  courses[index].students = newArray
}
