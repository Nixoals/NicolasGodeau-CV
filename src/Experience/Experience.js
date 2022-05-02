import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import RoomCards from "./World/RoomCards.js";
import GsapModernCV from "./GsapModernCV.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources";
import sources from "./sources";
import CardsRessources from "./CardsRessources.js";
import Debug from "./Utils/Debug.js";
import Stats from "three/examples/jsm/libs/stats.module";

import $ from "jquery";

let instance = null;
let stats = Stats();

export default class Experience {
  constructor(canvas, mobile) {
    if (instance) {
      return instance;
    }
    instance = this;
    window.experience = this;

    //options
    this.canvas = canvas;

    // Setup
    this.stats = stats;
    $(".renderer-wrapper").append(this.stats.dom);

    this.mobile = mobile;
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.roomcards = new RoomCards(CardsRessources);
    this.camera = new Camera(mobile);

    this.resources = new Resources(sources);
    this.world = new World();
    $("#chargement").toggleClass("active");

    this.firstLifeBtn = document.querySelector("#first-life-btn");
    this.newLifeBtn = document.querySelector("#new-life-btn");
    this.hibbiesBtn = document.querySelector("#hobbies-btn");
    this.gsapModernCV = new GsapModernCV(
      CardsRessources,
      this.firstLifeBtn,
      this.newLifeBtn,
      this.hibbiesBtn
    );
    this.renderer = new Renderer(mobile);
    //sizes resize event
    this.sizes.on("resize", () => {
      this.resize();
    });
    //Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.roomcards.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
    this.stats.update();
  }
  // destroy() {
  //   this.sizes.off("resize");
  //   this.time.off("tick");

  //   //traverse the whole scene

  //   this.scene.traverse((child) => {
  //     if (child instanceof THREE.Mesh) {
  //       child.geometry.dispose();
  //       for (const key in child.material) {
  //         const value = child.material[key];
  //         if (value && typeof value.dispose === "function") {
  //           value.dispose();
  //         }
  //       }
  //     }
  //   });
  //   this.camera.controls.dispose();
  //   this.renderer.instance.dispose();
  //   if (this.debug.active) {
  //     this.debug.ui.destroy();
  //   }
  // }
}
