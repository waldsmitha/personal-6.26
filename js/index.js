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

//<-- GSAP Text -->
const sections = document.querySelectorAll("section");
//converts to array
const sectionsArr = Array.from(sections);
//removes first element
sectionsArr.shift();
console.log(sectionsArr);

const homeText = document.querySelector("#home-text");
const textContent = [
  `<p>I create visually stunning pieces that marry form and function.</p>
  <p>Scroll to explore more.</p>`,
  `<p>Select a website to explore what I have created.</p>`,
  `<p>Art in a variety of styles and mediums.</p>
  <p>Interested in a particular piece or looking to commission?</p> 
  <p>Feel free to reach out.</p>`,
  `<p>Interested in an original logo or design?</p>
  <p>After a quick consultation, I can bring your vision to life.</p>
  <p>Feel free to reach out.</p>`,
  `<p>I may be reached for inquiries into my services via email, 
  instagram, or the adjacent contact form.</p>`,
];

console.log(homeText);

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

const textUpdate = (item) => {
  console.log(item.id);
  let newText;
  if (item.id == "desktop-home") {
    newText = textContent[0];
    textTimeline(newText);
  } else if (item.id == "web") {
    newText = textContent[1];
    textTimeline(newText);
  } else if (item.id == "art") {
    newText = textContent[2];
    textTimeline(newText);
  } else if (item.id == "design") {
    newText = textContent[3];
    textTimeline(newText);
  } else if (item.id == "connect") {
    newText = textContent[4];
    textTimeline(newText);
  }
};

sectionsArr.forEach((item) => {
  ScrollTrigger.create({
    trigger: item,
    start: "top 30%",
    end: "center top",
    markers: true,
    onEnter: () => textUpdate(item),
    // onLeave: myLeaveFunc,
    onEnterBack: () => textUpdate(item),
    // onLeaveBack: myLeaveFunc,
  });
});
