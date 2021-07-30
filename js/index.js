// import { gsap } from "gsap";
// import { TextPlugin } from "gsap/TextPlugin";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin, ScrollToPlugin, ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions: "restart none play reverse",
  //markers: true,
});

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

const heightOffset = () => {
  distance = window.pageYOffset;
  return distance;
};

window.addEventListener("scroll", heightOffset);
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

//<-- GSAP Text -->

const sections = document.querySelectorAll("section");
//converts to array
const sectionsArr = Array.from(sections);
//removes first element
sectionsArr.shift();

const homeText = document.querySelector("#home-text");
const textContent = [
  `<p>Visually stunning pieces that marry form and function.</p>
  <p>Scroll to explore more.</p>`,
  `<p>Select a website to explore a past project.</p>`,
  `<p>Art in a variety of styles and mediums.</p>
  <p>Interested in a particular piece or looking to commission?</p>
  <p>Feel free to reach out.</p>`,
  `<p>Interested in an original logo or design?</p>
  <p>After a quick consultation, I can bring your vision to life.</p>
  <p>Feel free to reach out.</p>`,
  `<p>I may be reached for inquiries into my services via email,
  instagram, or the adjacent contact form.</p>`,
];
const elementIds = ["desktop-home", "web", "art", "design", "connect"];
let width;

const windowWidth = () => {
  width = window.innerWidth;
  return width;
};

window.addEventListener("resize", windowWidth);

const textTimeline = (newText) => {
  const tl = gsap.timeline({ defaults: { duration: 0.25 } });
  tl.to("#home-text", {
    opacity: 0,
  });
  tl.to("#home-text", {
    text: newText,
  });
  tl.to("#home-text", {
    opacity: 1,
  });
};

const idUpdate = (item) => {
  let index = sectionsArr.indexOf(item);
  textTimeline(textContent[index]);
};

const textUpdate = (item) => {
  if (width < 768) {
    textTimeline(textContent[0]);
  } else {
    idUpdate(item);
  }
};

sectionsArr.forEach((item) => {
  ScrollTrigger.create({
    trigger: item,
    start: "top 30%",
    end: "center top",
    // markers: true,
    onEnter: () => textUpdate(item),
    // onLeave: myLeaveFunc,
    onEnterBack: () => textUpdate(item),
    // onLeaveBack: myLeaveFunc,
  });
});

//<-- GSAP Home Animations -->
const header = document.querySelector("#header");
const homeContainer = document.querySelectorAll(".container-home");
const homeContent = document.querySelectorAll(".content-home");
// console.log(homeContent);
// gsap.from(header, { y: "-100%", duration: 1, delay: 0.5 });
// // gsap.from(homeContainer, { x: "100%", duration: 1, delay: 0.5 });
// gsap.from(homeContent, { y: "100%", duration: 1, delay: 0.5 });
// sectionsArr.forEach((section) => {
//   gsap.from(section, {
//     scrollTrigger: {
//       trigger: section,
//       start: "top 50%",
//       end: "center top",
//     },
//     duration: 0.75,
//     opacity: 0,
//     x: "25%",
//     stagger: 0.25,
//     ease: "power",
//   });
// });

// Background Video

// const backgroundVideo = document.getElementById("background-video");
// // console.log(backgroundVideo.readyState);
// backgroundVideo.onloadeddata = (e) => {
//   console.log("loaded");
// };

const video = document.querySelector("#background-video");

video.onloadeddata = (event) => {
  // console.log(
  //   "Yay! The readyState just increased to  " +
  //     "HAVE_CURRENT_DATA or greater for the first time."
  // );
  // gsap.to("#load-background", {
  //   opacity: 0,
  //   duration: 1,
  //   delay: 1,
  //   display: "none",
  // });
};

gsap.to("#load-background", {
  opacity: 0,
  duration: 1,
  delay: 1,
  display: "none",
});
