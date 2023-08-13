const mainCard = document.querySelector('.main-card');
const formCard = document.querySelectorAll('.form-card');

function showForm() {
  mainCard.style.display = 'none';
  formCard[0].style.display = 'block';
}

function showForm2(event) {
  event.preventDefault();
  formCard[0].style.display = 'none';
  formCard[1].style.display = 'block';
}

function showForm3(event) {
  event.preventDefault();
  formCard[1].style.display = 'none';
  formCard[0].style.display = 'block';
  mainCard.style.display = 'none';
}