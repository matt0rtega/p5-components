/* eslint-disable no-undef, no-unused-vars */

// Looking to create my first p5 library

class Entity {
  constructor() {
    this.components = [];
    this.pos = createVector(0, 0, 0);
  }

  update() {
    for (let i = 0; i < this.components.length; i++) {
      let c = this.components[i];

      c.update();
    }
  }

  addComponent(component) {
    component.entity = this;
    this.components.push(component);
  }

  debug() {
    strokeWeight(10);
    point(this.pos.x, this.pos.y);
  }
}

class Component {
  constructor() {
    this.entity = new Entity();
  }
  update() {}
}

class Oscillator extends Component {
  constructor() {
    super();

    this.diameter = random(0, 25);
    this.theta = createVector(0, 0);
    this.inc = createVector(TWO_PI / 60, TWO_PI / 60);
    this.freq = createVector(1, 1);
  }

  update() {
    this.entity.pos.x = this.entity.pos.x + sin(this.theta.x) * this.diameter;
    this.entity.pos.y = this.entity.pos.y + cos(this.theta.y) * this.diameter;

    this.theta.x += this.inc.x * this.freq.x;
    this.theta.y += this.inc.y * this.freq.y;
  }
}

class Jumper extends Component {
  update() {
    if (frameCount % 25 === 0) {
      this.entity.pos.x = random(0, width);
      this.entity.pos.y = random(0, height);
    }
  }
}

class Wobble extends Component {
  update() {
    this.entity.pos.x = this.entity.pos.x + sin(frameCount * 0.2) * 100;
    // this.entity.pos.x = this.entity.pos.x + 10;
  }
}

let e;
let e2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Put setup code here
  frameRate(60);

  e = new Entity();
  e.addComponent(new Wobble());
  e.addComponent(new Jumper());
  e.addComponent(new Oscillator());

  e2 = new Entity();

  let osc = new Oscillator();
  // osc.diameter.x = 5;

  e2.addComponent(osc);
  e2.addComponent(new Jumper());
}

function draw() {
  e2.debug();
  // e2.pos.x = mouseX;
  // e2.pos.y = mouseY;
  e2.update();

  // rect(0, 0, 100, 100);
}

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
