const toggleBtn = document.querySelector('#toggle-btn');
const lightMode = document.querySelectorAll('.light-mode');

toggleBtn.addEventListener('change', () => {
  lightMode.forEach((element) => {
    if (element.classList.contains('light-mode')) {
      element.classList.remove('light-mode');
      element.classList.add('dark-mode');
    } else {
      element.classList.remove('dark-mode');
      element.classList.add('light-mode');
    }
  });
});
