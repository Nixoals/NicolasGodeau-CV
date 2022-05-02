import * as THREE from "three";
import Experience from "./Experience";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText.js";
import $ from "jquery";

gsap.registerPlugin(SplitText);

// const fisrLifeBtn = document.getElementById("first-life-btn");

export default class GsapModernCV {
  constructor(CardsRessources, firstLifeBtn, newLifeBtn, hobbiesBtn) {
    //setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.cardsRessources = CardsRessources;
    this.firstLifeBtn = firstLifeBtn;
    this.newLifeBtn = newLifeBtn;
    this.hobbiesBtn = hobbiesBtn;
    this.tl = new gsap.timeline();
    this.setFirstLife();
    this.setNewLife();
    this.setHobbies();
    this.timelineRunning = false;
    // this.videoToPlay = $("#video-screen-studies");
  }

  setCameraCardPosition(target) {
    if (!this.timelineRunning) {
      this.timelineRunning = true;
      this.scene.traverse((child) => {
        if (
          child.name === "studiesskills" ||
          child.name === "jobgeochemistry" ||
          child.name === "newjob" ||
          child.name === "photography" ||
          child.name === "woodworking"
        ) {
          child.visible = false;
        }
      });
      for (const source of this.cardsRessources) {
        if (target === "flickr") target = "insta";
        if (target === source.blenderName) {
          this.child = [];
          this.scene.traverse((child) => {
            if (child.name === source.name) {
              child.visible = true;
              this.child.push(child);
            }
          });
          this.id = $(`#${this.child[0].element.id}`).children(":first");
          this.splitText = new SplitText(this.id, {
            // this.splitText = new SplitText(`.card-title`, {
            type: "chars",
          });
          if (!this.tl.isActive) {
          }
          this.tl
            .to(this.camera.controls.target, {
              duration: 2,
              x: source.orbPosX,
              y: source.orbPosY,
              z: source.orbPosZ,
              ease: "cubic-bezier(.51,.24,.83,.6)",
              onComplete: () => {
                this.camera.update();
              },
            })
            .to(
              this.camera.instance.position,
              {
                duration: 2,
                x: source.camPosX,
                y: source.camPosY,
                z: source.camPosZ,
                ease: "cubic-bezier(.59,.06,.93,.57)",
                onComplete: () => {
                  this.camera.update();
                },
              },
              "-=2"
            )
            .fromTo(
              this.splitText.chars,
              {
                x: 500,
                y: 0,
              },
              {
                x: 0,
                y: 0,
                duration: 1,
                stagger: 0.05,
                ease: "Bounce.easeOut",
                onComplete: () => {
                  this.timelineRunning = false;
                },
              },
              "-=2"
            );
        }
      }
    } else {
    }
    if (target === "thesis") {
      //Add play video screen studies
      this.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.name === "studiesHor") {
            this.tl
              .to(this.camera.controls.target, {
                duration: 2,
                x: child.position.x,
                y: child.position.y,
                z: child.position.z,
                ease: "cubic-bezier(.51,.24,.83,.6)",
                onComplete: () => {
                  this.camera.update();
                },
              })
              .to(
                this.camera.instance.position,
                {
                  duration: 2,
                  x: child.position.x + 0.5,
                  y: child.position.y + 0.05,
                  z: child.position.z + 0.07,
                  ease: "cubic-bezier(.59,.06,.93,.57)",
                  onComplete: () => {
                    this.camera.update();
                    this.timelineRunning = false;
                    const videoToPlay = $("#video-screen-studies");
                    videoToPlay[0].play();
                  },
                },
                "-=2"
              );
          }
        }
      });
    }

    if (target === this.cardsRessources.blenderName) {
      console.log(target);
    }
  }

  setFirstLife() {
    const FirstLife = () => {
      if (!this.timelineRunning) {
        this.timelineRunning = true;
        this.tl
          .to(this.camera.controls.target, {
            duration: 1.5,
            x: -1.08,
            y: 1.11,
            z: 0.82,
          })
          .to(
            this.camera.instance.position,
            {
              duration: 1.5,
              x: 1.32,
              y: 1.6,
              z: 1.4,
              ease: "cubic-bezier(.59,.06,.93,.57)",
              onComplete: () => {
                this.camera.update();
                this.timelineRunning = false;
              },
            },
            "-=1.5"
          );
      }
    };

    this.firstLifeBtn.addEventListener("click", FirstLife);
  }
  setNewLife() {
    const NewLife = () => {
      if (!this.timelineRunning) {
        this.timelineRunning = true;
        this.tl
          .to(this.camera.controls.target, {
            duration: 1.5,
            x: 0.2,
            y: 1.44,
            z: 0.79,
          })
          .to(
            this.camera.instance.position,
            {
              duration: 1.5,
              x: 0.09,
              y: 1.43,
              z: 2.06,
              ease: "cubic-bezier(.59,.06,.93,.57)",
              onComplete: () => {
                this.camera.update();
                this.timelineRunning = false;
              },
            },
            "-=1.5"
          );
      }
    };

    this.newLifeBtn.addEventListener("click", NewLife);
  }
  setHobbies() {
    const Hobbies = () => {
      if (!this.timelineRunning) {
        this.timelineRunning = true;
        this.tl
          .to(this.camera.controls.target, {
            duration: 1.5,
            x: 1.5,
            y: 1.09,
            z: 1.0,
          })
          .to(
            this.camera.instance.position,
            {
              duration: 1.5,
              x: -0.57,
              y: 1.63,
              z: 2.7,
              ease: "cubic-bezier(.59,.06,.93,.57)",
              onComplete: () => {
                this.camera.update();
                this.timelineRunning = false;
              },
            },
            "-=1.5"
          );
      }
    };

    this.hobbiesBtn.addEventListener("click", Hobbies);
  }
}
