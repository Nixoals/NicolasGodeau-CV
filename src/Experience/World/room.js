import Experience from "../Experience";
import * as THREE from "three";
import initRaycasterModel from "../Renderer";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    //debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("test");
    }
    //setup
    this.walls = this.resources.items.walls;
    this.model = this.resources.items.model;
    this.emissive = this.resources.items.emissive;
    this.transparent = this.resources.items.transparent;
    this.screenStudies = this.resources.items.screenStudies;
    this.screenCodingHor = this.resources.items.screenCodingHor;
    this.screenCodingVert = this.resources.items.screenCodingVert;
    this.raycaster = this.resources.items.raycasterModel;

    this.setModel();
  }
  setModel() {
    this.model = this.model.scene;
    this.walls = this.walls.scene;
    this.emissive = this.emissive.scene;
    this.transparent = this.transparent.scene;
    this.screenStudies = this.screenStudies.scene;
    this.screenStudies.name = "screenStudies";
    this.screenCodingHor = this.screenCodingHor.scene;
    this.screenCodingVert = this.screenCodingVert.scene;
    this.raycaster = this.raycaster.scene;
    this.raycaster.name = "raycaster";
    this.raycaster.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.transparent = true;
        child.material.opacity = 0;
      }
    });

    this.transparent.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          transparent: true,
          transmission: 0.75,
          opacity: 0.46,
          roughness: 0.5,
          specularIntensity: 0.2,
          color: 0xffffff,
          reflectivity: 0.28,
          clearcoat: 0.6,
          name: "glass",
        });
      }
    });

    this.scene.add(
      this.raycaster,
      this.model,
      this.walls,
      this.emissive,
      this.transparent,
      this.screenStudies,
      this.screenCodingHor,
      this.screenCodingVert
    );
  }
  setLightAnimation(factor) {
    let rdValue = Math.random() / factor;
    // let time = Math.round(this.time.elapsed / 1000);
    // console.log(time);

    this.emissive.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.emissive = { r: 1, g: 0.7, b: 1 };
        child.material.emissiveIntensity = rdValue;
      }
    });
  }
  setLight(value) {
    this.emissive.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.emissive = { r: 1, g: 1, b: 1 };
        child.material.emissiveIntensity = value;
      }
    });
  }
}
