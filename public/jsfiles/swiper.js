import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const swiper = new Swiper('.swiper', {
loop:true,
autoplay:{
    delay:2000,
    disableOnInteraction:true
},
pagination:{
   // el: ".swiper-pagination",
    clickable:true,
},
navigation:{
    prevEl:".swiper-button-prev",
    nextEl:".swiper-button-next",
},
effect: "slide",
})