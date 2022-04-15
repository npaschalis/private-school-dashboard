//variables & event listeners
let trainers = [
  new Trainer('Chelsea', 'Matthews', 'C#, JavaScript'),
  new Trainer('Taylor', 'Cain', 'SQL, HTML/CSS, JavaScript'),
  new Trainer('Raymond', 'Cross', 'Java, Python'),
  new Trainer('Karl', 'Larson', 'JavaScript, React, SQL'),
  new Trainer('Monica', 'Parsons', 'HTML/CSS, JavaScript, Angular')
]

const trainerFirstName = document.getElementById('trainerFirstName')
const trainerLastName = document.getElementById('trainerLastName')
const trainerSubjects = document.getElementById('trainerSubjects')

const trainersSubmitBtn = document.querySelector('.trainersSubmitBtn')
trainersSubmitBtn.addEventListener('click', submitTrainer)
const trainersUpdateBtn = document.querySelector('.trainersUpdateBtn')
trainersUpdateBtn.addEventListener('click', updateTrainer)

const trainersList = document.querySelector('.trainers-list')
renderTrainers()

//functions
function Trainer(firstName, lastName, subject) {
  this.id = Math.random()
  this.firstName = firstName
  this.lastName = lastName
  this.subject = subject
}

function validateTrainerForm() {
  let isOK = true
  if (trainerFirstName.value.trim() === '') {
    showError(trainerFirstName, "First name can't be blank")
    isOK = false
  } else {
    hideErrorMessage(trainerFirstName)
  }

  if (trainerLastName.value.trim() === '') {
    showError(trainerLastName, "Last name can't be blank")
    isOK = false
  } else {
    hideErrorMessage(trainerLastName)
  }

  if (trainerSubjects.value.trim() === '') {
    showError(trainerSubjects, "Stream can't be blank")
    isOK = false
  } else {
    hideErrorMessage(trainerSubjects)
  }

  return isOK
}

function submitTrainer(event) {
  event.preventDefault()
  if (validateTrainerForm()) {
    let trainer = new Trainer(
      trainerFirstName.value,
      trainerLastName.value,
      trainerSubjects.value
    )
    trainers.push(trainer)
    createTrainerItem(trainer)
    renderTrainers()
  }
}

function editTrainer() {
  let trainer = trainers.find(trainer => trainer.id === this.trainerId)
  trainerFirstName.value = trainer.firstName
  trainerLastName.value = trainer.lastName
  trainerSubjects.value = trainer.subject
  trainersSubmitBtn.style.display = 'none'
  trainersUpdateBtn.style.display = 'block'
  trainersUpdateBtn.trainerId = trainer.id
}

function updateTrainer(event) {
  event.preventDefault()
  if (validateTrainerForm()) {
    trainers.forEach(t => {
      if (t.id === this.trainerId) {
        t.firstName = trainerFirstName.value
        t.lastName = trainerLastName.value
        t.subject = trainerSubjects.value
      }
    })
    renderTrainers()
  }
}

function renderTrainers() {
  trainersList.innerHTML = ''
  for (let t of trainers) {
    createTrainerItem(t)
  }
  clearTrainerForm()
}

function clearTrainerForm() {
  trainerFirstName.value = ''
  trainerLastName.value = ''
  trainerSubjects.value = ''
  trainersUpdateBtn.style.display = 'none'
  trainersSubmitBtn.style.display = 'block'
  trainerFirstName.focus()
}

function createTrainerItem(trainer) {
  let trainerElement = document.createElement('div')
  trainerElement.className = 'list-item'
  trainerElement.innerHTML = `
    <p class="list-item-name">${trainer.firstName} ${trainer.lastName}</p>
    <div class="list-buttons">
      <span><i class="fa-solid fa-pen-to-square pencil"></i></span>
      <span><i class="fa-solid fa-xmark trash"></i></span>
    </div>
  `
  let editBtn = trainerElement.querySelector('.pencil')
  editBtn.trainerId = trainer.id
  editBtn.addEventListener('click', editTrainer)

  let deleteBtn = trainerElement.querySelector('.trash')
  deleteBtn.trainerId = trainer.id
  deleteBtn.addEventListener('click', removeTrainer)
  trainersList.append(trainerElement)
}

function removeTrainer() {
  trainers = trainers.filter(trainer => trainer.id !== this.trainerId)
  renderTrainers()
}
