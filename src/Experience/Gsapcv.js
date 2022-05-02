import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin.js";
import $ from "jquery";

gsap.registerPlugin(ScrambleTextPlugin);

export default class Gsapcv {
  constructor() {
    this.setTextModifier();
  }

  setGsapCV(str, element) {
    const tl = gsap.timeline();
    tl.to(element, {
      duration: 3,
      scrambleText: {
        text: str,
        chars: "01",
        revealDelay: 1,
        newClass: "active",
        // tweenLength: false,
      },
      onComplete: () => {},
    });
  }
  setTextModifier() {
    const elementToConvert = [
      //job
      {
        str: "Web Developer",
        element: $(".job"),
      },
      //about me
      {
        str: "Since I nedded Python for a professionnal project for data processing during my PhD\
        , I never stopped coding and realized the endless possibilities of programming.\
         Express my creativity, increase my knoweledges, satisfy my curiosity,\
          all of them together push me to dive deeper into the this new digital era to become a fullstack web developer for my second life...",
        element: $(".about-me-text"),
      },
      //skills
      {
        str: "Python: Pandas, numpy, streamlit",
        element: $(".skills-1"),
      },
      {
        str: "javascript: Jquery, nodeJS, gsap, webpack",
        element: $(".skills-2"),
      },
      {
        str: "ThreeJS, 3D modeling, ",
        element: $(".skills-3"),
      },
      {
        str: "Photoshop, illustrator, adobeXD",
        element: $(".skills-4"),
      },
      // education
      {
        str: "Still a Ph.D. : I know how to learn",
        element: $(".education-1"),
      },
      {
        str: "Self taught Web developer",
        element: $(".education-2"),
      },
      // work experience
      {
        str: "Don't have that much experience, but looking for great opportunities in web development!",
        element: $(".work-experience-1"),
      },
    ];

    for (const element of elementToConvert) {
      this.setGsapCV(element.str, element.element);
    }

    $(".work-experience-2").toggleClass("to-remove");
  }
}
