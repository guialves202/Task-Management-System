const liButtonsList = document.querySelectorAll('.btn');

liButtonsList.forEach((element) => {
  element.addEventListener('click', () => {
    liButtonsList.forEach((element) => {
      element.classList.remove('active');
    });
    element.classList.add('active');
  });
});
