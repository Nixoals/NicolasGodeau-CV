import * as THREE from "three";
import $ from "jquery";
import Experience from "./Experience.js";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";

export default class Renderer {
  constructor(mobile) {
    this.experience = new Experience();
    //setup
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.roomcards = this.experience.roomcards;
    this.pointer = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.gsapModernCV = this.experience.gsapModernCV;

    //check Mobile
    this.mobile = mobile;
    if (this.mobile) {
      this.pointerAction = "touchend";
    } else {
      this.pointerAction = "pointerdown";
    }

    //debug
    this.debug = this.experience.debug;
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Section Position");
    }

    //init
    this.enablePostPRocess = true;
    this.raycasterModel = [];
    this.selectedObject = [];
    this.setInstance();
    this.setPostProcessing();

    //init Raycaster

    this.onPointermove = (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", this.onPointermove);

    this.setCardAnimation = () => {
      this.raycaster.setFromCamera(this.pointer, this.camera.instance);
      const intersects = this.raycaster.intersectObjects(this.raycasterModel);
      if (intersects.length > 0) {
        this.gsapModernCV.setCameraCardPosition(intersects[0].object.name);
      }
    };
    window.addEventListener(this.pointerAction, this.setCardAnimation);
  }

  initRaycasterModel() {
    this.raycasterModel = [];
    this.scene.traverse((child) => {
      if (child instanceof THREE.Group) {
        if (child.name === "raycaster") {
          for (const Mesh of child.children) {
            this.raycasterModel.push(Mesh);
          }
        }
      }
    });
  }

  setRaycasterModel(name) {
    this.selectedObject = [];
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.name === name) {
          this.selectedObject.push(child);
        }
      }
    });

    return this.selectedObject;
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.toneMapping = THREE.NoToneMapping;
    this.instance.toneMappingExposure = 2;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#000000");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.postProcess.composer.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    this.effectFXAA.uniforms["resolution"].value.set(
      1 / this.sizes.width,
      1 / this.sizes.height
    );
  }

  setPostProcessing() {
    this.postProcess = {};
    this.postProcess.composer = new EffectComposer(this.instance);
    this.postProcess.renderPass = new RenderPass(
      this.scene,
      this.camera.instance
    );
    this.postProcess.composer.addPass(this.postProcess.renderPass);

    this.outlinePass = new OutlinePass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      this.scene,
      this.camera.instance
    );
    this.pulsePeriod = 0;
    this.outlinePass.pulsePeriod = this.pulsePeriod;
    this.outlinePass.edgeGlow = 1;
    this.outlinePass.edgeStrength = 8;
    this.colorNonSelected = "#ff5e0d";
    this.outlinePass.visibleEdgeColor.set(this.colorNonSelected);
    this.postProcess.composer.addPass(this.outlinePass);

    this.effectFXAA = new ShaderPass(FXAAShader);
    this.effectFXAA.uniforms["resolution"].value.set(
      1 / this.sizes.width,
      1 / this.sizes.height
    );
    this.postProcess.composer.addPass(this.effectFXAA);
    this.gammaPass = new ShaderPass(GammaCorrectionShader);
    this.postProcess.composer.addPass(this.gammaPass);
    this.postProcess.composer.antialias = true;
  }

  setIntersectionHandler() {
    this.raycaster.setFromCamera(this.pointer, this.camera.instance);
    const intersects = this.raycaster.intersectObjects(this.raycasterModel);

    if (intersects.length > 0) {
      $("html,body").css("cursor", "pointer");
      this.setRaycasterModel(intersects[0].object.name);
      this.outlinePass.selectedObjects = this.selectedObject;
      this.selectedColor = "#0db3ff";
      this.outlinePass.pulsePeriod = 2;
      this.outlinePass.visibleEdgeColor.set(this.selectedColor);
    } else {
      $("html,body").css("cursor", "default");
      this.outlinePass.visibleEdgeColor.set(this.colorNonSelected);
      this.outlinePass.pulsePeriod = this.pulsePeriod;
    }
  }

  update() {
    this.roomcards.cardRenderer.render(this.scene, this.camera.instance);
    if (this.enablePostPRocess) {
      this.postProcess.composer.render();
      this.outlinePass.selectedObjects = this.raycasterModel;
    } else {
      this.instance.render(this.scene, this.camera.instance);
    }

    this.setIntersectionHandler();
  }
}
