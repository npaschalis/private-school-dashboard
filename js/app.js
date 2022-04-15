/*********************************
            GENERAL
**********************************/

// variables & event listeners
const coursesPage = document.getElementById('courses-page')
const trainersPage = document.getElementById('trainers-page')
const studentsPage = document.getElementById('students-page')
const assignmentsPage = document.getElementById('assignments-page')
const coursesTrainersPage = document.getElementById('coursesTrainers-page')
const coursesStudentsPage = document.getElementById('coursesStudents-page')
const coursesAssignmentsPage = document.getElementById(
  'coursesAssignments-page'
)
const csaPage = document.getElementById('csa-page')

const sections = [
  coursesPage,
  trainersPage,
  studentsPage,
  assignmentsPage,
  coursesTrainersPage,
  coursesStudentsPage,
  coursesAssignmentsPage,
  csaPage
]

const addCoursesBtn = document.querySelector('.add-courses-btn')
addCoursesBtn.addEventListener('click', () => render(coursesPage))

const addTrainersBtn = document.querySelector('.add-trainers-btn')
addTrainersBtn.addEventListener('click', () => render(trainersPage))

const addStudentsBtn = document.querySelector('.add-students-btn')
addStudentsBtn.addEventListener('click', () => render(studentsPage))

const addAssignmentsBtn = document.querySelector('.add-assignments-btn')
addAssignmentsBtn.addEventListener('click', () => render(assignmentsPage))

const editCoursesTrainersBtn = document.querySelector(
  '.edit-coursesTrainers-btn'
)
editCoursesTrainersBtn.addEventListener('click', () => {
  courseSelectTrainers()
  trainersRemainingListRender(0)
  render(coursesTrainersPage)
})

const editCoursesStudentsBtn = document.querySelector(
  '.edit-coursesStudents-btn'
)
editCoursesStudentsBtn.addEventListener('click', () => {
  courseSelectStudents()
  studentsRemainingListRender(0)
  render(coursesStudentsPage)
})

const editCoursesAssignmentsBtn = document.querySelector(
  '.edit-coursesAssignments-btn'
)
editCoursesAssignmentsBtn.addEventListener('click', () => {
  courseSelectAssignments()
  assignmentsRemainingListRender(0)
  render(coursesAssignmentsPage)
})

const editCSABtn = document.querySelector('.edit-CSA-btn')
editCSABtn.addEventListener('click', () => {
  csaSelectCourses()
  csaSelectAssignments(0)
  csaInitialRender()
  render(csaPage)
})

// functions
function render(section) {
  for (let s of sections) {
    if (s === section) {
      s.style.display = 'block'
    } else {
      s.style.display = 'none'
    }
  }
}

function showError(input, message) {
  const errorElement = input.nextElementSibling
  errorElement.style.visibility = 'visible'
  errorElement.innerText = message
}

function hideErrorMessage(input) {
  const errorElement = input.nextElementSibling
  errorElement.style.visibility = 'hidden'
}
