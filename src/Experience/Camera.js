import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor(mobile) {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.mobile = mobile;
    this.roomcards = this.experience.roomcards;
    this.setInstance();
    this.setControls();
  }

  setInstance() {
    let fov = 50;
    let speedRotation = 0.2;
    if (this.mobile) {
      fov = 50;
      speedRotation = 1;
    } else {
    }
    this.instance = new THREE.PerspectiveCamera(
      fov,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(0, 2.5, 6);
    this.scene.add(this.instance);
  }

  setControls() {
    let speedRotation = 0.2;
    if (this.mobile) {
      speedRotation = 1;
    } else {
    }
    this.controls = new OrbitControls(
      this.instance,
      this.roomcards.cardRenderer.domElement
    );
    this.controls.target.set(0, 0, -2);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.02;
    this.controls.rotateSpeed = speedRotation;
    this.controls.zoomSpeed = 0.25;

    //controls rotation for starting scene
    // this.controls.enablePan = false;
    // this.controls.maxAzimuthAngle = 0.42;
    // this.controls.minAzimuthAngle = -0.42;
    // this.controls.maxPolarAngle = 1.3;
    // this.controls.minPolarAngle = 0.2;
    // this.controls.maxDistance = 8;
    this.controls.minDistance = 0.2;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
