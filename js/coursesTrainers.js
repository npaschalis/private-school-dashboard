//variables & event listeners
let index = 0

courses[0].trainers.push(trainers[0])
courses[1].trainers.push(trainers[1])
courses[2].trainers.push(trainers[2])
courses[3].trainers.push(trainers[3])

const courseSelectTr = document.getElementById('courseSelect-tr')
courseSelectTr.addEventListener('change', () => {
  index = courseSelectTr.value
  trainersRemainingListRender(index)
})

const trainersRemainingList = document.querySelector('.trainersRemainingList')
const trainersAddedList = document.querySelector('.trainersAddedList')

function courseSelectTrainers() {
  courseSelectTr.innerHTML = ''
  courses.forEach(course => {
    const el = document.createElement('option')
    el.textContent = course.title
    el.value = courses.indexOf(course)
    courseSelectTr.appendChild(el)
  })
}

function trainersRemainingListRender(index) {
  trainersRemainingList.innerHTML = ''
  trainersAddedList.innerHTML = ''
  trainers.forEach(trainer => {
    const el = document.createElement('div')
    el.className = 'list-item'
    el.innerHTML = `
        <div>
        <p class='list-item-name secondary-list'>${trainer.firstName} ${trainer.lastName}</p>
        <p class='subjects'>${trainer.subject}</p>
        </div>
    `
    el.trainerId = trainer.id
    let trainerAlreadyIncluded = courses[index].trainers.find(
      t => t.id === trainer.id
    )
    if (trainerAlreadyIncluded) {
      createTrainerToAddButton(el)
      trainersAddedList.appendChild(el)
    } else {
      createSelectedTrainerButton(el)
      trainersRemainingList.appendChild(el)
    }
  })
}

function moveToAddList() {
  const element = this.parentElement.parentElement.parentElement
  element.parentElement.removeChild(element)
  const newElement = document.createElement('div')
  newElement.className = 'list-item'
  newElement.trainerId = element.trainerId
  newElement.append(element.firstElementChild)
  createTrainerToAddButton(newElement)
  trainersAddedList.appendChild(newElement)
  trainers.forEach(trainer => {
    if (trainer.id === element.trainerId) {
      courses[index].trainers.push(trainer)
    }
  })
}

function removeFromAddList() {
  const element = this.parentElement.parentElement.parentElement
  element.parentElement.removeChild(element)
  const newElement = document.createElement('div')
  newElement.className = 'list-item'
  newElement.trainerId = this.trainerId
  newElement.append(element.firstElementChild)
  createSelectedTrainerButton(newElement)
  trainersRemainingList.appendChild(newElement)
  trainers.forEach(trainer => {
    if (trainer.id === element.trainerId) {
      removeTrainerFromArray(trainer, index)
    }
  })
}

function createTrainerToAddButton(element) {
  element.innerHTML += `
    <div class='list-buttons'>
      <span><i class="fa-solid fa-solid fa-xmark remove-trainer"></i></span>
    </div>
  `
  let removeTrainer = element.querySelector('.remove-trainer')
  removeTrainer.addEventListener('click', removeFromAddList)
}

function createSelectedTrainerButton(element) {
  element.innerHTML += `
    <div class='list-buttons'>
      <span><i class="fa-solid fa-right-to-bracket right-arrow"></i></span>
    </div>
  `
  let rightArrow = element.querySelector('.right-arrow')
  rightArrow.addEventListener('click', moveToAddList)
}

function removeTrainerFromArray(trainer, index) {
  let newArray = []
  courses[index].trainers.forEach(t => {
    if (t.id !== trainer.id) {
      newArray.push(t)
    }
  })
  courses[index].trainers = newArray
}
