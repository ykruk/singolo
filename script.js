// header

const home = document.querySelector('#home');
const headerHeight = home.offsetHeight;
const menu = document.getElementsByClassName('menu')[0];

menu.addEventListener('click', activateMenuItem);

function activateMenuItem(event) {
  window.removeEventListener('scroll', selectMenuItem);
  event.preventDefault();
  if(event.target.tagName === 'A') {
    event.currentTarget.querySelectorAll('.menu-item').forEach(element => {
      element.classList.remove('active');
    });
    event.target.classList.add('active');

    const offsetBlock = document.querySelector(`#${event.target.href.split("#")[1]}`);
    const offset = offsetBlock.id === 'home' ? 0 : offsetBlock.offsetTop - headerHeight;
    window.scrollTo({top: offset, behavior: "smooth"})
  }
  setTimeout(() => {
    window.addEventListener('scroll', selectMenuItem);
  }, 800);
}

window.addEventListener('scroll', selectMenuItem);

function selectMenuItem(event) {
  const currentOffset = window.pageYOffset + (window.innerHeight) / 2;
  const servicesOffset = document.querySelector('#services').offsetTop;
  const portfolioOffset = document.querySelector('#portfolio').offsetTop;
  const aboutOffset = document.querySelector('#about').offsetTop;
  const contactOffset = document.querySelector('#contact').offsetTop;

  let currentMenuItem = 0;
  if (currentOffset <= servicesOffset) currentMenuItem = 0;
  if (currentOffset > servicesOffset && currentOffset <= portfolioOffset) currentMenuItem = 1;
  if (currentOffset > portfolioOffset && currentOffset <= aboutOffset) currentMenuItem = 2;
  if (currentOffset > aboutOffset && currentOffset <= contactOffset) currentMenuItem = 3;
  if (currentOffset > contactOffset) currentMenuItem = 4;

  const menuItems = menu.querySelectorAll('.menu-item');
  if(!menuItems[currentMenuItem].classList.contains('active')) {
    menuItems.forEach(element => {
      element.classList.remove('active');
    });
    menuItems[currentMenuItem].classList.add('active');
  }
  
}

// slider - slides



// slider - screens

const phoneVertical = document.querySelector('.slider-image-phone.phone-vertical');
const phoneVerticalScreen = document.querySelector('.slider-phone-v-screen');
const phoneHorizontal = document.querySelector('.slider-image-phone.phone-horizontal');
const phoneHorizontalScreen = document.querySelector('.slider-phone-h-screen');

phoneVertical.addEventListener('click', () => {
  phoneVerticalScreen.classList.toggle('screenOff');
});

phoneHorizontal.addEventListener('click', () => {
  phoneHorizontalScreen.classList.toggle('screenOff');
});

// portfolio - tabs

const portfolioPhotos = document.querySelectorAll('.portfolio-photo');

function filterSelection(c) {
  if (c === 'all') c = '';
  for (let i = 0; i < portfolioPhotos.length; i++) {
    portfolioPhotos[i].classList.remove('show');
    if (portfolioPhotos[i].className.indexOf(c) > -1) portfolioPhotos[i].classList.add('show');
  }
}

filterSelection('all');

let filter = document.querySelector('.portfolio-filter');
let filterItems = filter.querySelectorAll('.portfolio-filter-item');

filterItems.forEach(element => {
  element.addEventListener('click', function() {
    let current = document.querySelector('.activeFilter');
    current.classList.remove('activeFilter');
    this.classList.add('activeFilter');

    const portfolioBlock = document.querySelector('.portfolio-photos-block');
    for (let i = portfolioBlock.children.length; i >= 0; i--) {
        portfolioBlock.appendChild(portfolioBlock.children[Math.random() * i | 0]);
    }
  });
});

filter.addEventListener('click', selectFilterItem);

function selectFilterItem(event) {
  if(event.target.classList.contains('portfolio-filter-item')) {
    filterItems.forEach(element => {
      element.classList.remove('activeFilter');
    });
    event.target.classList.add('activeFilter');

    filterSelection(event.target.id);    
  }
}

// portfolio - images

const portfolioPhotosBlock = document.querySelector('.portfolio-photos-block');

portfolioPhotosBlock.addEventListener('click', addBorder);

function addBorder(event) {
  if(event.target.classList.contains('portfolio-photo')) {
    portfolioPhotos.forEach(element => {
      element.classList.remove('border');
    });
    event.target.classList.add('border');  
  }
}


// quote

const contact = document.querySelector('#contact');
const form = document.querySelector('.quote-form');
const formButton = document.querySelector('input[type="submit"]');

formButton.addEventListener('click', saveForm);

function saveForm(event) {
  event.preventDefault();

  if(!form.querySelector('#name').value || !(form.querySelector('#email').value && form.querySelector('#email').value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i)) ) return;

  const currentOffset = window.pageYOffset;
  function noScroll() {
    window.scrollTo(0, currentOffset);
  }
  window.addEventListener('scroll', noScroll);
  
  const modal = document.createElement('div');
  modal.id = 'form-modal';
  let modalDescription;
  if(form.querySelector('#project-description').value === '' || form.querySelector('#project-description').value === 'Describe your project in detail...') {modalDescription = 'Without description'} 
  else {modalDescription = form.querySelector('#project-description').value}

  modal.innerHTML  = `<h3>Message sent.</h3>
  <p>Subject: ${form.querySelector('#subject').value ? form.querySelector('#subject').value : 'Without subject'}</p>
  <p>Description: ${modalDescription}</p>`

  const button = document.createElement('button');
  button.id = 'form-modal-button';
  button.innerHTML = 'OK';

  modal.append(button);
  contact.append(modal);

  const modalBg = document.createElement('div');
  modalBg.id = 'modal-background';
  document.body.append(modalBg);

  button.addEventListener('click', () => {
    modalBg.remove();
    modal.remove();
    window.removeEventListener('scroll', noScroll);
    resetForm();
  })
}

  function resetForm() {
    form.querySelector('#name').value = '';
    form.querySelector('#email').value = '';
    form.querySelector('#subject').value = '';
    form.querySelector('#project-description').value = '';
  }

// saveForm()

