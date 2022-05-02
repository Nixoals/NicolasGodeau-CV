import * as THREE from "three";
import Experience from "../Experience";

export default class Screen {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;
    this.resources = this.experience.resources;

    this.pathVideoCoding = "videoTexture/videoCoding.mp4";
    this.pathVideoCoding2 = "videoTexture/videoCoding2.mp4";
    this.pathVideoStudies = "videoTexture/videoStudies.mp4";
    this.setVideo();
  }
  setVideo() {
    // Element
    this.videoCoding = {};
    this.videoCoding.element = document.getElementById("video-screen-studies");
    this.videoCoding.element.muted = true;
    this.videoCoding.element.loop = true;
    this.videoCoding.element.controls = true;
    this.videoCoding.element.playsInline = true;
    this.videoCoding.element.autoplay = true;
    this.videoCoding.element.src = this.pathVideoCoding;
    // this.videoCoding.element.play();

    this.videoCoding2 = {};
    this.videoCoding2.element = document.getElementById("coding-vertical");
    this.videoCoding2.element.className = "videoTest";
    this.videoCoding2.element.muted = true;
    this.videoCoding2.element.loop = true;
    this.videoCoding2.element.controls = true;
    this.videoCoding2.element.playsInline = true;
    this.videoCoding2.element.autoplay = true;
    this.videoCoding2.element.src = this.pathVideoCoding2;
    this.videoCoding2.element.play();

    // this.videoStudies = {};
    // this.videoStudies.element = document.createElement("video");
    // this.videoStudies.element.muted = true;
    // this.videoStudies.element.loop = true;
    // this.videoStudies.element.controls = true;
    // this.videoStudies.element.playsInline = true;
    // this.videoStudies.element.autoplay = true;
    // this.videoStudies.element.src = this.pathVideoStudies;

    // Texture
    this.videoCoding.texture = new THREE.VideoTexture(this.videoCoding.element);
    this.videoCoding.texture.flipY = false;
    // this.videoCoding.textureEncoding = THREE.sRGBEncoding;

    this.videoCoding.material = new THREE.MeshBasicMaterial({
      map: this.videoCoding.texture,
      side: THREE.FrontSide,
    });

    this.videoCoding2.texture = new THREE.VideoTexture(
      this.videoCoding2.element
    );
    this.videoCoding2.texture.flipY = false;
    this.videoCoding2.textureEncoding = THREE.sRGBEncoding;

    this.videoCoding2.material = new THREE.MeshBasicMaterial({
      map: this.videoCoding2.texture,
      side: THREE.FrontSide,
    });
    // Mesh
    // this.videoCoding.mesh = this.mesh;
    // this.videoCoding.mesh.position.set(0, 3, 2);
    // this.scene.add(this.videoCoding.mesh);

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.name === "codingVer") {
          child.material = this.videoCoding2.material;
        } else if (child.name === "studiesHor") {
          child.material = this.videoCoding.material;
        }
      }
    });
  }
}
