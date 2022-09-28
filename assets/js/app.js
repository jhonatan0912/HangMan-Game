const btnModal = document.getElementById('btn-modal')
const modal = document.querySelector('.modal')
const closeModal = document.getElementById('close-modal')
const btnDarkLight = document.getElementById('dark-light-container')
const iconDarkLight = document.getElementById('icon-dark-light')




btnModal.addEventListener('click', () => {
  modal.classList.remove('hide')
  modal.classList.add('show')
})

closeModal.addEventListener('click', () => {
  modal.classList.remove('show')
  modal.classList.add('hide')
})

btnDarkLight.addEventListener('click', () => {
  document.body.classList.toggle('light-mode')
  if (document.body.classList.contains('light-mode')) {
    iconDarkLight.src = "./../../img/moon.svg";
  } else {
    iconDarkLight.src = "./../../img/sun.svg";
  }
})