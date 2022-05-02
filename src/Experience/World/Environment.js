import * as THREE from "three";
import Experience from "../Experience";
import gsap from "gsap";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("light");
    }

    this.setSunLight();
    // this.setEnvironmentMap();
  }
  setSunLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, -2);

    // this.sunLight = new THREE.SpotLight(0xffffff, 5);
    // this.sunLightHelper = new THREE.SpotLightHelper(this.sunLight, 5, 0xffffff);
    // this.sunLight.castShadow = true;
    // this.sunLight.shadow.camera.far = 2;
    // this.sunLight.shadow.mapSize.set(1024, 1024);
    // this.sunLight.shadow.normalBias = 0.05;
    // this.sunLightTarget = new THREE.Object3D(0, 0, 5);
    // this.scene.add(this.sunLightTarget);
    // this.sunLight.target = this.sunLightTarget;
    // this.sunLight.position.set(0, 1.5, -0.3);

    // if (this.debug.active) {
    //   this.debug.ui
    //     .add(this.sunLight.position, "x")
    //     .name("x")
    //     .min(-5)
    //     .max(5)
    //     .step(0.1);

    //   this.debug.ui
    //     .add(this.sunLight.position, "z")
    //     .name("z")
    //     .min(-5)
    //     .max(5)
    //     .step(0.1);

    //   this.debug.ui
    //     .add(this.sunLight.position, "y")
    //     .name("y")
    //     .min(-5)
    //     .max(5)
    //     .step(0.1);
    // }
    // this.scene.add(this.sunLight,this.sunLightHelper);

    this.scene.add(this.ambientLight);
  }

  setAmbientLight(value) {
    this.tl = gsap.timeline();
    this.tl.to(this.ambientLight, {
      intensity: value,
      duration: 4,
      ease: "cubic-bezier(.17,.67,.83,.67)",
    });
  }
}
