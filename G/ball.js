class Ball {
	constructor(x, y) {
		this.r = CANVAS_SIZE / 35
		this.NONE = 0
		this.DRAWING_LINE = 1
		this.state = this.NONE

		this.body = Matter.Bodies.circle(x, y, this.r, {
			restitution: 0.9,
			friction: 0.5,
			frictionAir: 0.02
		})

		Matter.World.add(engine.world, this.body)
	}

	draw() {
		fill(colors.blue)
		noStroke()
		circle(this.body.position.x, this.body.position.y, this.r * 2)

		let d = dist(mouseX, mouseY, this.body.position.x, this.body.position.y)

		switch (this.state) {
			case this.NONE:
				break
			case this.DRAWING_LINE:
				let dd = constrain(d, 0, CANVAS_SIZE / 4)
				strokeWeight(map(dd, 0, CANVAS_SIZE / 4, CANVAS_SIZE / 50, CANVAS_SIZE / 100))
				stroke(colors.black)
				line(this.body.position.x, this.body.position.y, mouseX, mouseY)

				fill(colors.black)
				noStroke()
				circle(mouseX, mouseY, CANVAS_SIZE / 50)
				circle(this.body.position.x, this.body.position.y, CANVAS_SIZE / 50)
				break
		}

		if (d < this.r || this.state == this.DRAWING_LINE) {
			fill(255, 30)
			noStroke()
			circle(this.body.position.x, this.body.position.y, 2 * this.r)
		}
	}

	onTouchStarted() {
		if (dist(mouseX, mouseY, this.body.position.x, this.body.position.y) < this.r) {
			switch (this.state) {
				case this.NONE:
					this.state = this.DRAWING_LINE
					break
				case this.DRAWING_LINE:
					break
			}
		}
	}

	onTouchEnded() {
		switch (this.state) {
			case this.NONE:
				break
			case this.DRAWING_LINE:
				this.state = this.NONE
				let m = createVector(mouseX, mouseY)
				let p = createVector(this.body.position.x, this.body.position.y)
				let magnitude = p5.Vector.sub(p, m).mag()
				magnitude = constrain(magnitude, 0, CANVAS_SIZE / 8)
				magnitude = map(magnitude, 0, CANVAS_SIZE / 8, 0, 0.1)
				let force = p5.Vector.sub(p, m).normalize().mult(magnitude)
				Matter.Body.applyForce(this.body, this.body.position, Matter.Vector.create(force.x, force.y))
				break
		}
	}
}
