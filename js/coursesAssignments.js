//variables & event listeners
let assignmentsCourseIndex = 0

courses[0].assignments.push(assignments[0])
courses[1].assignments.push(assignments[1])
courses[2].assignments.push(assignments[2])

const assignmentsCourseSelectTr = document.getElementById(
  'assignmentsCourseSelect-tr'
)
assignmentsCourseSelectTr.addEventListener('change', () => {
  assignmentsCourseIndex = assignmentsCourseSelectTr.value
  assignmentsRemainingListRender(assignmentsCourseIndex)
})

const assignmentsRemainingList = document.querySelector(
  '.assignmentsRemainingList'
)
const assignmentsAddedList = document.querySelector('.assignmentsAddedList')

function courseSelectAssignments() {
  assignmentsCourseSelectTr.innerHTML = ''
  courses.forEach(course => {
    const el = document.createElement('option')
    el.textContent = course.title
    el.value = courses.indexOf(course)
    assignmentsCourseSelectTr.appendChild(el)
  })
}

function assignmentsRemainingListRender(index) {
  assignmentsRemainingList.innerHTML = ''
  assignmentsAddedList.innerHTML = ''
  assignments.forEach(assignment => {
    const el = document.createElement('div')
    el.className = 'list-item'
    el.innerHTML = `
        <div>
        <p class='list-item-name secondary-list'>${assignment.title}</p>
        <p class='subjects'>deadline: ${assignment.subDate}</p>
        </div>
    `
    el.assignmentId = assignment.id
    let assignmentAlreadyIncluded = courses[index].assignments.find(
      t => t.id === assignment.id
    )
    if (assignmentAlreadyIncluded) {
      createAssignmentToAddButton(el)
      assignmentsAddedList.appendChild(el)
    } else {
      createSelectedAssignmentButton(el)
      assignmentsRemainingList.appendChild(el)
    }
  })
}

function moveAssignmentToAddList() {
  const element = this.parentElement.parentElement.parentElement
  element.parentElement.removeChild(element)
  const newElement = document.createElement('div')
  newElement.className = 'list-item'
  newElement.assignmentId = element.assignmentId
  newElement.append(element.firstElementChild)
  createAssignmentToAddButton(newElement)
  assignmentsAddedList.appendChild(newElement)
  assignments.forEach(assignment => {
    if (assignment.id === element.assignmentId) {
      courses[assignmentsCourseIndex].assignments.push(assignment)
    }
  })
}

function removeAssignmentFromAddList() {
  const element = this.parentElement.parentElement.parentElement
  element.parentElement.removeChild(element)
  const newElement = document.createElement('div')
  newElement.className = 'list-item'
  newElement.assignmentId = this.assignmentId
  newElement.append(element.firstElementChild)
  createSelectedAssignmentButton(newElement)
  assignmentsRemainingList.appendChild(newElement)
  assignments.forEach(assignment => {
    if (assignment.id === element.assignmentId) {
      removeAssignmentFromArray(assignment, assignmentsCourseIndex)
    }
  })
}

function createAssignmentToAddButton(element) {
  element.innerHTML += `
    <div class='list-buttons'>
      <span><i class="fa-solid fa-solid fa-xmark remove-assignment"></i></span>
    </div>
  `
  let removeAssignment = element.querySelector('.remove-assignment')
  removeAssignment.addEventListener('click', removeAssignmentFromAddList)
}

function createSelectedAssignmentButton(element) {
  element.innerHTML += `
    <div class='list-buttons'>
      <span><i class="fa-solid fa-right-to-bracket right-arrow"></i></span>
    </div>
  `
  let rightArrow = element.querySelector('.right-arrow')
  rightArrow.addEventListener('click', moveAssignmentToAddList)
}

function removeAssignmentFromArray(assignment, index) {
  let newArray = []
  courses[index].assignments.forEach(t => {
    if (t.id !== assignment.id) {
      newArray.push(t)
    }
  })
  courses[index].assignments = newArray
}
