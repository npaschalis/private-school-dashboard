//variables & event listeners
let csaCourseIndex = 0
let csaAssignmentIndex = 0

courses[0].students[0].assignments = [
  {
    assignment: courses[0].assignments[0],
    oralMark: 25,
    totalMark: 100
  }
]

courses[0].students[1].assignments = [
  {
    assignment: courses[0].assignments[0],
    oralMark: 15,
    totalMark: 70
  }
]

const csaStudentsList = document.querySelector('.csaStudents-list')

const coursesCSASelectTr = document.getElementById('coursesCSASelect-tr')
coursesCSASelectTr.addEventListener('change', () => {
  csaCourseIndex = coursesCSASelectTr.value
  csaSelectAssignments(csaCourseIndex)
})

const assignmentsCSASelectTr = document.getElementById(
  'assignmentsCSASelect-tr'
)
assignmentsCSASelectTr.addEventListener('change', () => {
  csaAssignmentIndex = assignmentsCSASelectTr.value
  csaRenderStudentsList(csaCourseIndex, csaAssignmentIndex)
})

// functions
function csaSelectCourses() {
  coursesCSASelectTr.innerHTML = ''
  courses.forEach(course => {
    const el = document.createElement('option')
    el.textContent = course.title
    el.value = courses.indexOf(course)
    coursesCSASelectTr.appendChild(el)
  })
}

function csaSelectAssignments(courseIndex) {
  assignmentsCSASelectTr.innerHTML = ''
  courses[courseIndex].assignments.forEach((assignment, index) => {
    const el = document.createElement('option')
    el.textContent = assignment.title
    el.value = index
    assignmentsCSASelectTr.appendChild(el)
  })
  csaRenderStudentsList(courseIndex, csaAssignmentIndex)
}

function csaRenderStudentsList(courseIndex, assignmentIndex) {
  csaStudentsList.innerHTML = ''
  for (let i = 0; i < courses[courseIndex].students.length; i++) {
    csaCreateStudentItem(i, courseIndex, assignmentIndex)
  }
}

function csaCreateStudentItem(index, courseIndex, assignmentIndex) {
  let st = courses[courseIndex].students[index]
  let studentEl = document.createElement('div')
  studentEl.className = 'list-item'
  studentEl.innerHTML = `
    <div>
      <span class="list-item-name first-column">${st.student.firstName} ${st.student.lastName}</span>
      <input type='number' class="second-column oralMark" />
      <input type='number' class="third-column totalMark"/>
      <span class="submitMessage">
    </div>
    <div class="list-buttons">
      <span><i class="fa-solid fa-floppy-disk disk"></i></span>
    </div>
  `
  let oralMarkField = studentEl.querySelector('.oralMark')
  let totalMarkField = studentEl.querySelector('.totalMark')
  let saveCSABtn = studentEl.querySelector('.disk')
  let message = studentEl.querySelector('.submitMessage')
  message.studentIndex = index
  saveCSABtn.studentIndex = index

  if (checkMarks(index, courseIndex, assignmentIndex)) {
    oralMarkField.value = checkMarks(index, courseIndex, assignmentIndex)[0]
    totalMarkField.value = checkMarks(index, courseIndex, assignmentIndex)[1]
  }
  saveCSABtn.addEventListener('click', () => {
    saveMarks(
      oralMarkField.value,
      totalMarkField.value,
      index,
      courseIndex,
      assignmentIndex
    )
  })

  csaStudentsList.appendChild(studentEl)
}

function checkMarks(studentIdx, courseIndex, assignmentIndex) {
  let s = courses[courseIndex].students[studentIdx]
  if ('assignments' in s) {
    let assignmentToCheck = s.assignments.find(
      a => a.assignment.id === assignments[assignmentIndex].id
    )
    return [assignmentToCheck.oralMark, assignmentToCheck.totalMark]
  }
}

function saveMarks(
  oralMark,
  totalMark,
  studentIdx,
  courseIndex,
  assignmentIndex
) {
  if (validateMarks(oralMark, totalMark, assignmentIndex)) {
    returnMessage(
      'fail',
      validateMarks(oralMark, totalMark, assignmentIndex),
      studentIdx
    )
  } else {
    let alreadySubmitted = false
    let student = courses[courseIndex].students[studentIdx]
    if (!('assigments' in student)) {
      student.assignments = []
    }

    student.assignments.forEach(assignment => {
      if (assignment.id === assignments[assignmentIndex].id) {
        alreadySubmitted = true
        assignment.oralMark = oralMark
        assignment.totalMark = totalMark
      }
    })

    if (alreadySubmitted === false) {
      student.assignments.push({
        assignment: assignments[assignmentIndex],
        oralMark,
        totalMark
      })
    }
    returnMessage('success', 'Submitted!', studentIdx)
  }
}

function validateMarks(oralMark, totalMark, assignmentIndex) {
  let text = ''
  let oralMarkNumber = Number(oralMark)
  let totalMarkNumber = Number(totalMark)
  let bestOralMark = Number(assignments[assignmentIndex].oralMark)
  let bestTotalMark = Number(assignments[assignmentIndex].totalMark)
  if (
    isNaN(oralMarkNumber) ||
    !Number.isInteger(oralMarkNumber) ||
    oralMarkNumber <= 0 ||
    oralMark > bestOralMark
  ) {
    text = `Oral Mark: integer between 1 - ${bestOralMark}`
  } else if (
    isNaN(totalMarkNumber) ||
    !Number.isInteger(totalMarkNumber) ||
    totalMarkNumber <= 0 ||
    totalMarkNumber > bestTotalMark
  ) {
    text = `Total Mark: integer between 1 - ${bestTotalMark}`
  } else if (oralMarkNumber > totalMarkNumber) {
    text = `Oral Mark can't be bigger than the Total Mark`
  }
  return text
}

function returnMessage(type, text, index) {
  let messageElements = csaStudentsList.querySelectorAll('.submitMessage')
  let messageColor
  if (type === 'success') {
    messageColor = 'green'
  } else {
    messageColor = '#e74c3c'
  }
  messageElements.forEach(el => {
    if (el.studentIndex === index) {
      el.style.color = messageColor
      el.textContent = text
    }
  })
}

function csaInitialRender() {
  csaStudentsList.innerHTML = ''
  for (let i = 0; i < courses[0].students.length; i++) {
    csaCreateStudentItem(i, 0, 0)
  }
}
