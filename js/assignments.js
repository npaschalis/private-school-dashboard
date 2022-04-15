//variables & event listeners
let assignments = [
  new Assignment(
    '1st Assignment',
    'Create a simple timer. To make it more unique, you can build a countdown timer that stops at a user-specified value.',
    '2022-03-01',
    25,
    100
  ),
  new Assignment(
    '2nd Assignment',
    "Build a simple to-do list application. Using event handlers, you'll instantiate forms for entering every task and display them on submission.",
    '2022-08-15',
    25,
    100
  ),
  new Assignment(
    '3rd Assigment',
    "Build a budgeting application. While writing your code, you'll collect form inputs and subtract expenses from your budget. You can take this further by writing code to set an auto-alert for the user whenever they're about to outshoot their budget.",
    '2022-12-12',
    25,
    100
  )
]

const assignmentTitle = document.getElementById('assignmentTitle')
const assignmentDescription = document.getElementById('assignmentDescription')
const assignmentSubDate = document.getElementById('assignmentSubDate')
const assignmentOralMark = document.getElementById('assignmentOralMark')
const assignmentTotalMark = document.getElementById('assignmentTotalMark')

const assignmentsSubmitBtn = document.querySelector('.assignmentsSubmitBtn')
assignmentsSubmitBtn.addEventListener('click', submitAssignment)
const assignmentsUpdateBtn = document.querySelector('.assignmentsUpdateBtn')
assignmentsUpdateBtn.addEventListener('click', updateAssignment)

const assignmentsList = document.querySelector('.assignments-list')
renderAssignments()

//functions
function Assignment(title, description, subDate, oralMark, totalMark) {
  this.id = Math.random()
  this.title = title
  this.description = description
  this.subDate = subDate
  this.oralMark = oralMark
  this.totalMark = totalMark
}

function validateAssignmentForm() {
  let isOK = true
  if (assignmentTitle.value.trim() === '') {
    showError(assignmentTitle, "Title can't be blank")
    isOK = false
  } else {
    hideErrorMessage(assignmentTitle)
  }

  if (assignmentDescription.value.trim() === '') {
    showError(assignmentDescription, "Last name can't be blank")
    isOK = false
  } else {
    hideErrorMessage(assignmentDescription)
  }

  if (
    assignmentSubDate.value === '' ||
    assignmentSubDate.value < '2020-12-31'
  ) {
    showError(
      assignmentSubDate,
      'You must select a date after 1st January 2021'
    )
    isOK = false
  } else {
    hideErrorMessage(assignmentSubDate)
  }

  let oralMarkNumber = Number(assignmentOralMark.value)
  if (
    isNaN(oralMarkNumber) ||
    !Number.isInteger(oralMarkNumber) ||
    oralMarkNumber <= 0
  ) {
    showError(
      assignmentOralMark,
      'Highest score for ORAL must be a positive integer'
    )
    isOK = false
  } else {
    hideErrorMessage(assignmentOralMark)
  }

  let totalMarkNumber = Number(assignmentTotalMark.value)
  if (
    isNaN(totalMarkNumber) ||
    !Number.isInteger(totalMarkNumber) ||
    totalMarkNumber <= 0 ||
    totalMarkNumber <= oralMarkNumber
  ) {
    showError(
      assignmentTotalMark,
      'Highest score for TOTAL must be a positive integer that is greater than the ORAL score'
    )
    isOK = false
  } else {
    hideErrorMessage(assignmentTotalMark)
  }

  return isOK
}

function submitAssignment(event) {
  event.preventDefault()
  if (validateAssignmentForm()) {
    let assignment = new Assignment(
      assignmentTitle.value,
      assignmentDescription.value,
      assignmentSubDate.value,
      assignmentOralMark.value,
      assignmentTotalMark.value
    )
    assignments.push(assignment)
    createAssignmentItem(assignment)
    renderAssignments()
  }
}

function editAssignment() {
  let assignment = assignments.find(
    assignment => assignment.id === this.assignmentId
  )
  assignmentTitle.value = assignment.title
  assignmentDescription.value = assignment.description
  assignmentSubDate.value = assignment.subDate
  assignmentOralMark.value = assignment.oralMark
  assignmentTotalMark.value = assignment.totalMark
  assignmentsSubmitBtn.style.display = 'none'
  assignmentsUpdateBtn.style.display = 'block'
  assignmentsUpdateBtn.assignmentId = assignment.id
}

function updateAssignment(event) {
  event.preventDefault()
  if (validateAssignmentForm()) {
    assignments.forEach(a => {
      if (a.id === this.assignmentId) {
        a.title = assignmentTitle.value
        a.description = assignmentDescription.value
        a.subDate = assignmentSubDate.value
        a.oralMark = assignmentOralMark.value
        a.totalMark = assignmentTotalMark.value
      }
    })
    renderAssignments()
  }
}

function renderAssignments() {
  assignmentsList.innerHTML = ''
  for (let a of assignments) {
    createAssignmentItem(a)
  }
  clearAssignmentForm()
}

function clearAssignmentForm() {
  assignmentTitle.value = ''
  assignmentDescription.value = ''
  assignmentSubDate.value = ''
  assignmentOralMark.value = ''
  assignmentTotalMark.value = ''
  assignmentsUpdateBtn.style.display = 'none'
  assignmentsSubmitBtn.style.display = 'block'
  assignmentTitle.focus()
}

function createAssignmentItem(assignment) {
  let assignmentElement = document.createElement('div')
  assignmentElement.className = 'list-item'
  assignmentElement.innerHTML = `
    <p class="list-item-name">${assignment.title}</p>
    <div class="list-buttons">
      <span><i class="fa-solid fa-pen-to-square pencil"></i></span>
      <span><i class="fa-solid fa-xmark trash"></i></span>
    </div>
  `
  let editBtn = assignmentElement.querySelector('.pencil')
  editBtn.assignmentId = assignment.id
  editBtn.addEventListener('click', editAssignment)

  let deleteBtn = assignmentElement.querySelector('.trash')
  deleteBtn.assignmentId = assignment.id
  deleteBtn.addEventListener('click', removeAssignment)
  assignmentsList.append(assignmentElement)
}

function removeAssignment() {
  assignments = assignments.filter(
    assignment => assignment.id !== this.assignmentId
  )
  renderAssignments()
}
