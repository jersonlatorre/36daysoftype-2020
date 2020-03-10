class Obstacle {
	constructor(x, y) {
		this.body = Matter.Bodies.rectangle(x, y, CANVAS_SIZE / 12, CANVAS_SIZE / 12, {
			isStatic: true
		})

		Matter.World.add(engine.world, this.body)
	}

	draw() {
		noStroke()
		fill('rgba(225,230,224, 0.4)')
		rect(this.body.position.x, this.body.position.y, CANVAS_SIZE / 12, CANVAS_SIZE / 12)
	}
}
