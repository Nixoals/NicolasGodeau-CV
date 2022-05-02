import "./style.css";
import Experience from "./Experience/Experience";
import Gsapcv from "./Experience/Gsapcv";
import gsap from "gsap";
import $ from "jquery";

const theseLink = document.getElementById("theseLink");
const gitLink = document.getElementById("this-git");
const flickrLink = document.getElementById("flickr-link");
const instaLink = document.getElementById("insta-link");
const airDuBoisLink = document.getElementById("air-du-bois");

const button = document.getElementById("modern-cv");
const revealButton = document.getElementById("new-life");

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
// if (isMobile) {
//   if (window.matchMedia("(orientation: portrait)").matches) {
//     console.log("portrait");
//   }
// }
if (!isMobile) {
  theseLink.addEventListener("pointerdown", () => {
    window.open("https://www.theses.fr/234882050", "_blank");
    // window.focus();
  });
  gitLink.addEventListener("pointerdown", () => {
    window.open("https://github.com/Nixoals/ModernCV", "_blank");
  });
  flickrLink.addEventListener("pointerdown", () => {
    window.open("https://www.flickr.com/photos/184802489@N08/", "_blank");
  });
  instaLink.addEventListener("pointerdown", () => {
    window.open("https://www.instagram.com/nicolasgodeau_/?hl=fr", "_blank");
  });
  airDuBoisLink.addEventListener("pointerdown", () => {
    window.open("https://www.lairdubois.fr/@nixoals", "_blank");
  });
}
revealButton.addEventListener("click", () => {
  const GsapCv = new Gsapcv();
});

// const experience = new Experience(
//   document.querySelector("section canvas.webgl"),
//   isMobile
// );

button.addEventListener("click", () => {
  const experience = new Experience(
    document.querySelector("section canvas.webgl"),
    isMobile
  );
  const tl = gsap.timeline();
  tl.to($(".renderer-wrapper"), {
    onStart: () => {
      $("#modern-cv").toggleClass("to-remove");
    },
    opacity: 1,
    duration: 1,
    ease: "cubic-bezier(.03,.74,.55,1.04)",
  });
  tl.to($(".cv-wrapper"), {
    opacity: 0,
    duration: 1,
    ease: "cubic-bezier(.03,.74,.55,1.04)",
    onComplete: () => {
      $(".card-container").css("visibility", "visible");
      $(".canvas-button-container").css("visibility", "visible");
    },
  }),
    "-=1";
});
