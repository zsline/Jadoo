"use strict";

const btnVideos = document.querySelectorAll('[data-link="video"]');
const modal = document.querySelector('.modal-video');

if(btnVideos){
    btnVideos.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            let href = e.target.getAttribute('href');
            modal.classList.add('open');
            modal.lastElementChild.lastElementChild.setAttribute('src', href);
        })
    });
}
if(modal){
    modal.addEventListener('click', e => {
        if(!e.target.classList.contains('content') && !e.target.parentElement.classList.contains('content')){
            modal.classList.remove('open');
        }
    })
}

 // Testimonial Slider

 const slides = document.querySelectorAll('.testimonial-slide');
 const bulletsInner = document.querySelector('.slider-bullets');
 const prevBtn = document.querySelector('.slider-arrows__prev');
 const nextBtn = document.querySelector('.slider-arrows__next');
 let countSlides = slides.length;
 
 function disablesBtns() {
     prevBtn.removeAttribute('disabled');
     nextBtn.removeAttribute('disabled');
     if(document.querySelector('.active-slide').dataset.slide == 0){
         prevBtn.setAttribute('disabled', '');
     }
     if(document.querySelector('.active-slide').dataset.slide == slides.length - 1){
         nextBtn.setAttribute('disabled', '');
     }
 }

 function CreateBulls(slider){
     if(slider){
         let bulls = '';
         for(let i = 0; i < slider.length; i++){
             bulls += `<span data-bull="${i}" ${slider[i].classList.contains('active-slide') ? 'style="background-color: #39425D;"' : ''}></span>`;
         }
         bulletsInner.innerHTML = bulls;
 
         // Навешиваем обработчики заново
         const bullets = bulletsInner.querySelectorAll('span');
         bullets.forEach((el) => {
             el.addEventListener('click', (e) => {
                 bullets.forEach((bullet) => {
                     bullet.style.backgroundColor = '#E5E5E5';
                 });
                 e.target.style.backgroundColor = '#39425D';
 
                 let num = parseInt(e.target.getAttribute('data-bull'));
                 restartSlider(slides, num);
                 CreateBulls(slides); // обновим буллеты после смены слайда
             });
         });
     }
 }

 function createSubSlide() {
     let nextSlide = document.querySelector('.active-slide').nextElementSibling;
         if(nextSlide){
             nextSlide.removeAttribute('hidden');
             nextSlide.classList.add('sub-slide');
             nextSlide.style.display = 'flex';     
         } else {
             return;
         }
 }

 function openSlider (slides) {
     for(let i = 0; i < slides.length; i++ ){
         slides[i].setAttribute('hidden', '');
         slides[i].classList.remove('sub-slide');
         slides[i].setAttribute('data-slide', i);
         if(slides[i].classList.contains('active-slide')){
             slides[i].removeAttribute('hidden');
             slides[i].style.display = 'flex';
         }
     }
         createSubSlide();
         disablesBtns();
 }

 function restartSlider(slides, num) {
     for(let i = 0; i < slides.length; i++ ){
         slides[i].style.display = 'none';
         slides[i].classList.remove('active-slide');
         slides[i].setAttribute('hidden', '');
         slides[i].classList.remove('sub-slide');
         if(slides[num].hasAttribute('hidden')){
             slides[num].removeAttribute('hidden', '');
         }
         slides[num].classList.add('active-slide');
         slides[num].style.display = 'flex';
     }
     createSubSlide();
     disablesBtns();
 }
 openSlider(slides);
 CreateBulls(slides); 
 prevBtn.addEventListener('click', () =>{
     let activeSlide = document.querySelector('.active-slide');
         let num = parseInt(activeSlide.dataset.slide);
         restartSlider(slides, num - 1);
         CreateBulls(slides);
 })
 nextBtn.addEventListener('click', () =>{
     let activeSlide = document.querySelector('.active-slide');
     if(true){
         let num = parseInt(activeSlide.dataset.slide);
         restartSlider(slides, num + 1);
         CreateBulls(slides);
     }
 });


  window.onload = () => {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    }
    function startSvg(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
              const anim = entry.target;
              if(anim.classList.contains('anim-scroll')){
                anim.classList.add('animate');
              }
              if (anim.querySelector('animate')){
                anim.querySelector('animate').beginElement();
                if(anim.classList.contains('once')){
                    observer.unobserve(anim);
                }
            } 
          }
      })
    }
    const observer = new IntersectionObserver(startSvg, options);
    const arr = document.querySelectorAll('svg')
    arr.forEach(i => {
        observer.observe(i)
        if(i.querySelector('animate')){
            observer.observe(i)
        }
    })
 
  
}

  

