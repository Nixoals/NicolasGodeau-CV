// import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Screen from "../World/Screen";
import Time from "../Utils/Time";
import * as THREE from "three";
import Room from "./room.js";

let time2;
export default class World {
  constructor() {
    this.loaded = false;
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.raycaster = this.experience.raycaster;

    this.resources.on("ready", () => {
      //setup
      this.room = new Room();
      this.screen = new Screen();
      this.environment = new Environment();
      this.time2 = new Time();
      this.raycaster = this.experience.raycaster;
      this.experience.renderer.initRaycasterModel();

      this.loaded = true;
    });
  }
  update() {
    // console.log(time2);
    if (this.loaded) {
      time2 = this.time2.elapsed / 1000;

      this.environment.setAmbientLight(1.6);
      // console.log(time2);
      if (time2 > 2.3 && time2 < 2.4) {
        this.room.setLightAnimation(6);
      }
      if (time2 > 2.5 && time2 < 2.7) {
        this.room.setLightAnimation(5);
      }
      if (time2 > 2.8 && time2 < 4) {
        this.room.setLightAnimation(3);
      }

      if (time2 > 3.2 && time2 < 4) {
        this.room.setLight(0.35);
      }
    }
  }
}
