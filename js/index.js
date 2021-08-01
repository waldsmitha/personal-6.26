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
  `<div><p>Visually stunning pieces that marry form and function.</p>
  <p>Scroll to explore more.</p></div>`,
  `<p>Select a website to explore a past project.</p>`,
  `<div><p>Art in a variety of styles and mediums.</p>
  <p>Interested in a particular piece or looking to commission?</p>
  <p>Feel free to reach out.</p></div>`,
  `<div><p>Interested in an original logo or design?</p>
  <p>After a quick consultation, I can bring your vision to life.</p>
  <p>Feel free to reach out.</p></div>`,
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

const titlesUpdater = () => {
  const colors = ["#3565df", "#6529b0", "#dc0e89", "#000000da"];
  const titleTl = gsap.timeline({ defaults: { duration: 1 } });
  titleTl
    .to("#titles", {
      background: colors[0],
      duration: 0,
    })
    .to("#titles", {
      delay: 2.5,
      background: colors[0],
      text: { value: "Designer", delimiter: " " },
    })

    .to("#titles", {
      background: colors[1],
      text: { value: "Developer", delimiter: " " },
    })
    .to("#titles", {
      background: colors[2],
      text: { value: "Artist", delimiter: " " },
    })
    .to("#titles", {
      background: colors[3],
      duration: 0,
      delay: 0.25,
      text: {
        value: "<h1>Austin Waldsmith</h1><p>Designer | Developer | Artist</p>",
        delimiter: " ",
      },
    });
};

// IMAGE VIEWER
const artViewer = document.querySelector(".art-viewer");
const galleryImages = document.querySelectorAll(".img-viewer");
const artViewerToggle = (e) => {
  console.log(e.target);
  artViewer.classList.contains("reveal")
    ? artViewer.classList.remove("reveal")
    : artViewer.classList.add("reveal");

  artViewer.innerHTML = `
      <div class="art-viewer-background">
      <img src=${e.target.src} alt="" />
      <h2>"${e.target.alt}"</h2>
      <p>Click anywhere to exit.</p>
      </div>
    `;
};

galleryImages.forEach((img) => {
  img.addEventListener("click", artViewerToggle);
});
artViewer.addEventListener("click", artViewerToggle);

//HORIZONTAL SCROLL
// const bodyHeight = document.body.clientHeight;
const bodyHeight = () => {
  const body = document.body;
  const html = document.documentElement;
  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  return height;
};

window.addEventListener("resize", bodyHeight);
window.addEventListener("scroll", bodyHeight);

gsap.to("#horizontal-scroll", {
  scrollTrigger: {
    trigger: "body",
    start: "0%",
    end: `+=${bodyHeight()}`,
    markers: true,
    scrub: 0.5,
  },
  width: "100%",
});

//Functions to run on start
// Background Video
const video = document.querySelector("#background-video");

video.onloadeddata = (event) => {
  gsap.to("#load-background", {
    opacity: 0,
    duration: 1,
    delay: 1.5,
    display: "none",
  });
  titlesUpdater();
};

// gsap.to("#load-background", {
//   opacity: 0,
//   duration: 1.5,
//   delay: 2,
//   display: "none",
// });
// titlesUpdater();
