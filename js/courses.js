//variables & event listeners
let courses = [
  new Course(
    'JavaScript full-time bootcamp',
    'JavaScript',
    'full-time bootcamp',
    '2022-03-01',
    '2022-06-01'
  ),
  new Course(
    'Java part-time bootcamp',
    'Java',
    'part-time bootcamp',
    '2022-03-01',
    '2022-09-01'
  ),
  new Course(
    'C# part-time bootcamp',
    'C#',
    'part-time bootcamp',
    '2022-03-01',
    '2022-09-01'
  ),
  new Course(
    'Python full-time bootcamp',
    'Python',
    'full-time bootcamp',
    '2022-03-01',
    '2022-06-01'
  )
]

const courseTitle = document.getElementById('courseTitle')
const stream = document.getElementById('stream')
const type = document.getElementById('type')
const startDate = document.getElementById('startDate')
const endDate = document.getElementById('endDate')

const submitBtn = document.querySelector('.submitBtn')
submitBtn.addEventListener('click', submitCourse)
const updateBtn = document.querySelector('.updateBtn')
updateBtn.addEventListener('click', updateCourse)

const coursesList = document.querySelector('.courses-list')
renderCourses()

//functions
function Course(title, stream, type, startDate, endDate) {
  this.id = Math.random()
  this.title = title
  this.stream = stream
  this.type = type
  this.startDate = startDate
  this.endDate = endDate
  this.trainers = []
  this.students = []
  this.assignments = []
}

function validateCourseForm() {
  let isOK = true
  if (courseTitle.value.trim() === '') {
    showError(courseTitle, "Title can't be blank")
    isOK = false
  } else {
    hideErrorMessage(courseTitle)
  }

  if (stream.value.trim() === '') {
    showError(stream, "Stream can't be blank")
    isOK = false
  } else {
    hideErrorMessage(stream)
  }

  if (type.value.trim() === '') {
    showError(type, "Type can't be blank")
    isOK = false
  } else {
    hideErrorMessage(type)
  }

  if (startDate.value === '' || startDate.value < '2020-12-31') {
    showError(startDate, 'You must select a date after 1st January 2021')
    isOK = false
  } else {
    hideErrorMessage(startDate)
  }

  if (
    endDate.value === '' ||
    endDate.value < '2020-12-31' ||
    Date.parse(endDate.value) < Date.parse(startDate.value)
  ) {
    showError(
      endDate,
      'You must select a date after 1st January 2021. End date must be greater than the start date'
    )
    isOK = false
  } else {
    hideErrorMessage(endDate)
  }

  return isOK
}

function submitCourse(event) {
  event.preventDefault()
  if (validateCourseForm()) {
    let course = new Course(
      courseTitle.value,
      stream.value,
      type.value,
      startDate.value,
      endDate.value
    )
    courses.push(course)
    createCourseItem(course)
    renderCourses()
  }
}

function editCourse() {
  let course = courses.find(course => course.id === this.courseId)
  courseTitle.value = course.title
  stream.value = course.stream
  type.value = course.type
  startDate.value = course.startDate
  endDate.value = course.endDate
  submitBtn.style.display = 'none'
  updateBtn.style.display = 'block'
  updateBtn.courseId = course.id
}

function updateCourse(event) {
  event.preventDefault()
  if (validateCourseForm()) {
    courses.forEach(c => {
      if (c.id === this.courseId) {
        c.title = courseTitle.value
        c.stream = stream.value
        c.type = type.value
        c.startDate = startDate.value
        c.endDate = endDate.value
      }
    })
    renderCourses()
  }
}

function renderCourses() {
  coursesList.innerHTML = ''
  for (let c of courses) {
    createCourseItem(c)
  }
  clearCourseForm()
}

function clearCourseForm() {
  courseTitle.value = ''
  stream.value = ''
  type.value = ''
  startDate.value = ''
  endDate.value = ''
  updateBtn.style.display = 'none'
  submitBtn.style.display = 'block'
  courseTitle.focus()
}

function createCourseItem(course) {
  let courseElement = document.createElement('div')
  courseElement.className = 'list-item'
  courseElement.innerHTML = `
    <p class="list-item-name">${course.title}</p>
    <div class="list-buttons">
      <span><i class="fa-solid fa-pen-to-square pencil"></i></span>
      <span><i class="fa-solid fa-xmark trash"></i></span>
    </div>
  `
  let editBtn = courseElement.querySelector('.pencil')
  editBtn.courseId = course.id
  editBtn.addEventListener('click', editCourse)

  let deleteBtn = courseElement.querySelector('.trash')
  deleteBtn.courseId = course.id
  deleteBtn.addEventListener('click', removeCourse)
  coursesList.append(courseElement)
}

function removeCourse() {
  courses = courses.filter(course => course.id !== this.courseId)
  renderCourses()
}
