'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');
// tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// creating, inserting and deleting elements.
//selecting the entire webpage
// document.documentElement();
//selecting head and body
const header = document.querySelector('.header');
// document.body();

//here we are creating a div element
// const message = document.createElement('div');
// //performing operations on the DOM div element
// message.classList.add('cookie-message');
// //adding text to the element. we can use .textcontent or .innerHTML
// message.innerHTML =
//   'We use this information for improved functionality and analytics and thus provide better user experince. <button class="btn btn--close-cookie">Got it!</button>';
// // now we need to insert it into the DOM
// // header.prepend(message);
// header.append(message);
// //deleting elements. REmove cookie msg when btn is clicked
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// implementing smooth scrolling. First we start by selecting the element and where we want to scroll to

// firt we add an eventlistener
btnScrollTo.addEventListener('click', function (e) {
  // we select the section or part we want to scrollto and use the scrollintoview method with the behaviour parameter set to smooth
  sectionOne.scrollIntoView({ behaviour: 'smooth' });
});
// Implementing smooth scrolling for  the navigation links
// const navigationLinks = document.querySelectorAll('.nav__link');
// navigationLinks.forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = document.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behaviour: 'smooth' });
//   });
// });
// Page delegation
//1. Add event listener to a common parent element
//2. determine what element originated the event
const navigation = document.querySelector('.nav__links');
navigation.addEventListener('click', function (e) {
  e.preventDefault();
  // matching strategy. We want that we click link elements, then we an scroll the sections into view.Hence clicking on the navigation should do nothing
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behaviour: 'smooth' });
  }
});
// tabbed component
// const tabs = document.querySelectorAll('.operations__tab');
// const tabContainer = document.querySelector('.operations__tab-container');
// const tabContent = document.querySelectorAll('.operations__content');

// first  we need to add event listeners to all and our tabs. From the previous lesson, we cannot add one for each class as it is not efficient. Therefore we are going to use event propagation.  ADD AN EVENT LISTENER TO THE COMMON PARENT CLASS ELEMENT
tabContainer.addEventListener('click', function (e) {
  // e.preventDefault();
  // const clicked = e.target.parentElement;// this only selects the tab element  when the button is clicked but not the number, except we want both hence we use the .closest method to give us the closest parent element of the span class
  // here we develop our matching strategy.
  const clicked = e.target.closest('.operations__tab');

  // When we click outside the buttons and inside the tabs container, we receive an error, however we want nothing to happen
  if (!clicked) return; //guard clause
  // We want that when a tab is selected it should move up and then add the active class to the clicked tab.
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //activate content area that matches selected tab and hide the other tabs. HEnce, we first remove the active class form all content areas then add it.
  tabContent.forEach(function (tab) {
    tab.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active'); //dataset property
});
//MENU FADE ANIMATION ---- when we hover over a link, we want the rest to fade out .So we select the entire navigation bar.
// nav.addEventListener('mouseover', function (e) {
//   // the class we are targeting
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target; // variable of elements we are working with
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // selecting the other links, so we go to the parent class and select the siblings(Search for  a parent that matches a certain query)
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       // comparison to check if current element is not link itself
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });
// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target; // variable of elements we are working with
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // selecting the other links, so we go to the parent class and select the siblings(Search for  a parent that matches a certain query)
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       // comparison to check if current element is not link itself
//       if (el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

//refactoring the code above for menu fading
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target; // variable of elements we are working with
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // selecting the other links, so we go to the parent class and select the siblings(Search for  a parent that matches a certain query)
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      // comparison to check if current element is not link itself
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//passing 'arguments' into a handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// const header = document.querySelector('.header');
// implementing the sticky navigation using the Intersection Observer API. 1. we create a new intersection observer and call the observe method on the target element.  2.
const navHeight = nav.getBoundingClientRect().height;
const obsCallback = function (entries) {
  const [entry] = entries; // to get the first element out of entries
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
// entries is an array of threshold entries.
const obsOptions = {
  root: null, // the element the target is intersecting. We can have an element or null(intersecting entire viewport)
  threshold: [0, 0.2], // % of intersection at which the observer callback will be executed/ which is visible in our viewport We can have multiple thresholds
  rootMargin: `-${navHeight}px`, // box of pixels that will be applied outside our target element. e.g Height of navigation
};
const allSections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);
// revealing sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const options = {
  root: null,
  threshold: 0.15,
  // rootMargin:
};
const sectionObserver = new IntersectionObserver(revealSection, options);
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy loading images using the intersection observer API
const loadImg = function (entries, observer) {
  const [entry] = entries;
  //guard clause that allows us to load images(replacing the src attribute with the data-src attribute). We have the load event which is fired when a file has been succesfully read, and only then should the lazy-img class be removed

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
// to observe all images, We need to select the items first
const targetImages = document.querySelectorAll('.lazy-img');
targetImages.forEach(function (img) {
  imgObserver.observe(img);
});
const sliders = function () {
  // slider implementation
  const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-1200px)';
  // slider.style.overflow = 'visible';
  // select arrows
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  const slides = document.querySelectorAll('.slide');
  const dotContainer = document.querySelector('.dots');

  // slides.forEach(
  //   (slide, i) => (slide.style.transform = `translateX(${100 * i}%)`)
  // );
  // the first slide should be at 0%, then 100%, 200% ...
  let curSlide = 0;
  const maxSlide = slides.length - 1; // the maximum number of slides available
  //going to next slide. If the current slide === the maximum number of slides available then go back to beginning, else increment slides
  // btnRight.addEventListener('click', function () {
  //   if (curSlide === maxSlide) {
  //     curSlide = 0;
  //   } else curSlide++;
  //   slides.forEach(
  //     (slide, i) =>
  //       (slide.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  //   );
  // });
  // btnLeft.addEventListener('click', function () {
  //   if (curSlide === 0) {
  //     curSlide = maxSlide;
  //   } else curSlide--;
  //   slides.forEach(
  //     (slide, i) =>
  //       (slide.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  //   );
  // });
  const createDots = function () {
    slides.forEach(function (_, i) {
      //creating HTML elements
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot " data-slide="${i}"></button>
    `
      );
    });
  };

  const activateDot = function (slide) {
    // deactivate all of them first
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    // now to select the current slide
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // refactoring code
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event Listeners
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  //keyboard events
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
sliders();
