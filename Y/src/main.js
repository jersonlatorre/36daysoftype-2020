let shape1
let shape2
let agents = []
let agentsPositions = []
let repulsorsPositions1 = []
let repulsorsPositions2 = []
let repulsors1 = []
let repulsors2 = []

let button
let factor

let state = 0

function preload() {
  shape1 = loadImage('assets/shape.svg')
  shape2 = loadImage('assets/shape2.svg')
}

function setup() {
  createCanvas(800, 800)
  shape1.resize(800, 800)
  shape2.resize(800, 800)

  let button = createButton('')
  button.position(windowWidth / 2, windowHeight / 2, 'fixed')
  button.id('button')
  button.addClass('red')
  
  button.mousePressed(() => {
    state = 1 - state
    if (state == 0) {
      button.removeClass('blue')
      button.addClass('red')
    } else {
      button.removeClass('red')
      button.addClass('blue')
    }
  })

  calculateRepulsorsPositions()
  calculateAgentsPositions()
  createAgents()
  createRepulsors()
}

function createAgents() {
  agentsPositions.forEach((r) => {
    let agent = new Agent(r[0], r[1])
    agents.push(agent)
  })
}

function createRepulsors() {
  repulsorsPositions1.forEach((r) => {
    let repulsor = new Repulsor(r[0], r[1])
    repulsors1.push(repulsor)
  })

  repulsorsPositions2.forEach((r) => {
    let repulsor = new Repulsor(r[0], r[1])
    repulsors2.push(repulsor)
  })
}

function calculateAgentsPositions() {
  let p = new PoissonDiskSampling({
    shape: [ width, height ],
    minDistance: 25,
    maxDistance: 25,
    tries: 30
  })

  agentsPositions = p.fill()
}

function calculateRepulsorsPositions() {
  let p = new PoissonDiskSampling({
    shape: [ width, height ],
    minDistance: 16,
    maxDistance: 16,
    tries: 30
  })

  repulsorsPositions1 = p.fill().filter((r) => {
    let c = brightness(shape1.get(r[0], r[1]))
    return c == 0
  })

  repulsorsPositions2 = p.fill().filter((r) => {
    let c = brightness(shape2.get(r[0], r[1]))
    return c == 0
  })
}

function draw() {
  background(colors.black)

  agents.forEach((agent, i) => {
    agent.draw()
  })

  // repulsors1.forEach((repulsor, i) => {
  //   repulsor.draw()
  // })

  // repulsors2.forEach((repulsor, i) => {
  //   repulsor.draw()
  // })
}

class Agent {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.velocity = createVector(0, 0)
    this.maxSpeed = 0.8
    this.maxSteer = 0.6
  }

  draw() {
    let gap = 50
    let desiredInsideRectangle = SteeringBehaviours.insideRectangle(
      this,
      gap,
      gap,
      width - 2 * gap,
      height - 2 * gap
    ).mult(2)

    let desiredWander = SteeringBehaviours.wander(this, 1, 0).mult(2)
    let desiredSeparateFromAgents = SteeringBehaviours.separate(this, agents, 30).mult(4)

    let desiredSeparateFromRepulsors
    if (state == 1) desiredSeparateFromRepulsors = SteeringBehaviours.separate(this, repulsors1, 60).mult(0.5)
    else desiredSeparateFromRepulsors = SteeringBehaviours.separate(this, repulsors2, 50).mult(1)

    let desired = desiredSeparateFromAgents
      .add(desiredSeparateFromRepulsors)
      .add(desiredWander)
      .add(desiredInsideRectangle)
    let steer = p5.Vector.sub(desired, this.velocity).limit(this.maxSteer)

    this.velocity.add(steer)
    this.position.add(this.velocity)

    push()
    translate(this.position.x, this.position.y)
    rectMode(CENTER)
    rotate(this.velocity.heading())
    stroke(colors.gray)
    noFill()
    strokeWeight(6)
    line(-5, 0, 5, 0)
    noStroke()
    fill(30)
    circle(5, 0, 4)
    pop()
  }
}

class Repulsor {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.velocity = createVector(0, 0)
  }

  draw() {
    fill('#222')
    circle(this.position.x, this.position.y, 5)
  }

  calculateDesired() {
    return createVector(0, 0)
  }
}
