import {
  CSS3DObject,
  CSS3DRenderer,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

import Experience from "../Experience";

export default class RoomCards {
  constructor(CardsRessources) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;

    this.cardsRessources = CardsRessources;

    this.debug = this.experience.debug;
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Set Card Position");
    }

    //setup
    this.cardRenderer = new CSS3DRenderer();
    this.cardRenderer.setSize(this.sizes.width, this.sizes.height);
    this.cardRenderer.domElement.style.position = "absolute";
    this.cardRenderer.domElement.style.top = "0";
    this.cardContainer = document.querySelector("section.renderer-wrapper");
    this.cardContainer.appendChild(this.cardRenderer.domElement);
    //initiate cards
    this.setfirstLife();
  }

  setfirstLife() {
    for (const source of this.cardsRessources) {
      this.cardElement = document.getElementById(source.id);
      this.cardDiv = new CSS3DObject(this.cardElement);
      // this.cardDiv.position.set(0, 0, 0);
      this.cardDiv.position.set(source.posX, source.posY, source.posZ);
      this.cardDiv.rotation.y = source.rotY;
      // this.cardDiv.rotation.y = 0;
      this.cardDiv.scale.set(0.0025, 0.0025, 0.0025);
      this.cardDiv.name = source.name;
      this.cardDiv.visible = false;
      this.scene.add(this.cardDiv);
    }

    // if (this.debug.active) {
    //   this.debug.ui
    //     .add(this.cardDiv.position, "x")
    //     .name("x")
    //     .min(-4)
    //     .max(3)
    //     .step(0.001);
    //   this.debug.ui
    //     .add(this.cardDiv.position, "z")
    //     .name("z")
    //     .min(-4)
    //     .max(3)
    //     .step(0.001);
    //   this.debug.ui
    //     .add(this.cardDiv.position, "y")
    //     .name("y")
    //     .min(-4)
    //     .max(3)
    //     .step(0.001);
    //   this.debug.ui
    //     .add(this.cardDiv.rotation, "y")
    //     .name("roty")
    //     .min(-4)
    //     .max(3)
    //     .step(0.001);
    // }
  }

  resize() {
    this.cardRenderer.setSize(this.sizes.width, this.sizes.height);
    // this.cardRenderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }
}
