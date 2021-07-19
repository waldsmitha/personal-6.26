// import { gsap } from "gsap";
// import { TextPlugin } from "gsap/TextPlugin";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(TextPlugin, ScrollToPlugin, ScrollTrigger);

const expandIcons = document.querySelectorAll(".expand");
const text = document.querySelectorAll(".text");
const plus = document.querySelectorAll(".plus");

expandIcons.forEach((item, i) => {
  item.addEventListener("click", () => {
    text[i].classList.toggle("reveal");
    plus[i].classList.toggle("rotate");
  });
});

const miniHeader = document.querySelector(".mini-header");
let distance;

const offSet = () => {
  distance = window.pageYOffset;
  //   console.log(window.pageYOffset);
  return distance;
};

window.addEventListener("scroll", offSet);
window.addEventListener("scroll", () => {
  if (distance > 100) {
    miniHeader.classList.add("reveal");
  } else {
    miniHeader.classList.remove("reveal");
  }
});

const burger = document.querySelector("#burger");
const mobileNav = document.querySelector(".mobile-nav");
function toggleNav(e) {
  mobileNav.classList.toggle("nav-active");
}

burger.onclick = toggleNav;
mobileNav.onclick = toggleNav;
