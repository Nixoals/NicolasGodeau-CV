import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "./EventEmitter";
import $ from "jquery";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    //options
    this.sources = sources;

    // setup
    this.items = [];
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoader();
    this.startLoading();
  }
  setLoader() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    //draco
    this.dracoloader = new DRACOLoader();
    this.dracoloader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.dracoloader);
    //

    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }
  startLoading() {
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }
  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    //loading Bar
    this.loadingPercentage = (this.loaded / this.toLoad) * 100;

    $(".loading-bar-inside").css("width", `${this.loadingPercentage}%`);
    if (this.toLoad === this.loaded) {
      $(".loading-wrapper").css("visibility", "hidden");
      if (this.loaded === this.toLoad) {
        this.trigger("ready");
      }
    }
  }
}
