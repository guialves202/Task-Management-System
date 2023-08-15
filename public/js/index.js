class Modal {
  constructor(modal, status) {
    this.id;
    this.title;
    this.description;
    this.status = status;
    this.modal = document.querySelector(modal);
  }

  createEditModal(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.modal.querySelector('#title').value = this.title;
    this.modal.querySelector('#description').textContent = this.description;
    this.modal.querySelector('#task-id').value = this.id;
    this.modal.querySelector('#status').value = this.status;
  }

  createAddModal() {
    this.modal.querySelector('#status').value = this.status;
  }

  showModal() {
    this.modal.style.display = 'flex';
  }

  closeModal() {
    this.modal.style.display = 'none';
  }

  changeFormAction() {
    const form = this.modal.querySelector('#editForm');
    form.action = `/task/edit/${this.id}`;
  }
}

function createEditModal() {
  const title = this.querySelector('.task-title').textContent;
  const description = this.querySelector('.task-description').textContent;
  const id = this.querySelector('.task-id').value;
  let status = this.parentNode.querySelector('.card-type h5').textContent;
  status = status == 'To Do' ? '1' : status == 'Doing' ? '2' : status == 'Done' ? '3' : '1';
  const myModal = new Modal('#modal01', status);
  myModal.createEditModal(id, title, description);
  myModal.changeFormAction();
  myModal.showModal();
}

function createAddModal() {
  let status = this.parentNode.querySelector('.card-type h5').textContent;
  switch (status) {
    case 'To Do':
      status = '1';
      break;
    case 'Doing':
      status = '2';
      break;
    case 'Done':
      status = '3';
      break;
    default:
      return;
  }
  const myModal = new Modal('#modal02', status);
  myModal.createAddModal();
  myModal.showModal();
}

// Button to delete task
const deleteBtn = document.querySelector('#delete-btn');

deleteBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const editForm = document.querySelector('#editForm');
  const taskId = editForm.querySelector('#task-id').value;
  editForm.action = `/task/delete/${taskId}`;
  editForm.submit();
});

// Button to edit task
const editTaskButtons = document.querySelectorAll('.edit-task');

editTaskButtons.forEach((element) => {
  element.addEventListener('click', createEditModal);
});

// Button to add new task
const addTaskButtons = document.querySelectorAll('.add-task');

addTaskButtons.forEach((element) => {
  element.addEventListener('click', createAddModal);
});

// Buttons to close modal
const closeButtons = document.querySelectorAll('.close');

closeButtons.forEach((element) => {
  element.addEventListener('click', () => {
    const modal1 = document.querySelector('#modal01');
    const modal2 = document.querySelector('#modal02');
    modal1.style.display = 'none';
    modal2.style.display = 'none';
  });
});

// Create sidebar animation
const liButtonsList = document.querySelectorAll('.btn');

liButtonsList.forEach((element) => {
  element.addEventListener('click', () => {
    liButtonsList.forEach((element) => {
      element.classList.remove('active');
    });
    element.classList.add('active');
  });
});

// Create dark/light mode toggle button event
const toggleBtn = document.querySelector('#toggle-btn');
const modalColorMode = document.querySelectorAll('.colorMode');

toggleBtn.addEventListener('change', () => {
  const lightMode = document.querySelectorAll('.light-mode');
  const darkMode = document.querySelectorAll('.dark-mode');

  if (lightMode.length > 0) {
    lightMode.forEach((element) => {
      element.classList.remove('light-mode');
      element.classList.add('dark-mode');
      modalColorMode.forEach((element) => {
        element.value = 'dark-mode';
      });
    });
  }
  if (darkMode.length > 0) {
    darkMode.forEach((element) => {
      element.classList.remove('dark-mode');
      element.classList.add('light-mode');
      modalColorMode.forEach((element) => {
        element.value = 'light-mode';
      });
    });
  }
});
