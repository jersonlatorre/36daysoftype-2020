class Eye {
	constructor(x, y) {
		this.position = createVector(x, y)
		this.mouseTarget = createVector(0, 0)
		this.MAX_ANGLE = PI / 2.8
		this.LERP_FACTOR = random([ 0.05, 0.2, 0.3 ])
		this.RADIUS = 33 * FACTOR
		this.seed = random() * 100
	}

	draw() {
		if (lightsOn) {
			this.mouseTarget.add(p5.Vector.sub(createVector(mouseX, mouseY), this.mouseTarget).mult(this.LERP_FACTOR))
			let d = p5.Vector.sub(this.mouseTarget, this.position)
			let angleX = map(d.x, 0, CANVAS_SIZE, -this.MAX_ANGLE, this.MAX_ANGLE)
			let angleY = map(d.y, 0, CANVAS_SIZE, -this.MAX_ANGLE, this.MAX_ANGLE)

			push()
			translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2)
			noStroke()
			fill(colors.white)
			let R = 10
			let F = 1500
			let x = this.position.x + R * simplex.noise2D(millis() / F, this.seed)
			let y = this.position.y + R * simplex.noise2D(millis() / F, this.seed + 1)
			translate(x, y, -50 * FACTOR)
			rotateY(angleX)
			rotateX(-angleY + PI / 2)
			sphere(this.RADIUS, 40)

			fill(colors.black)
			translate(0, this.RADIUS, 0)
			rotateX(PI / 2)
			circle(0, 0, this.RADIUS * 0.6)
			translate(0, 0, 1)
			fill(colors.blue)
			circle(0, 0, this.RADIUS - 2)
			pop()
		} else {
			this.mouseTarget.add(p5.Vector.sub(createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 2), this.mouseTarget).mult(this.LERP_FACTOR))
			let d = p5.Vector.sub(this.mouseTarget, this.position)
			let angleX = map(d.x, 0, CANVAS_SIZE, -this.MAX_ANGLE, this.MAX_ANGLE)
			let angleY = map(d.y, 0, CANVAS_SIZE, -this.MAX_ANGLE, this.MAX_ANGLE)

			push()
			translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2)
			noStroke()
			fill(colors.white)
			let R = 10
			let F = 1500
			let x = this.position.x + R * simplex.noise2D(millis() / F, this.seed)
			let y = this.position.y + R * simplex.noise2D(millis() / F, this.seed + 1)
			translate(x, y, -50 * FACTOR)
			rotateY(angleX)
			rotateX(-angleY + PI / 2)
			sphere(this.RADIUS, 40)

			fill(colors.black)
			translate(0, this.RADIUS, 0)
			rotateX(PI / 2)
			circle(0, 0, this.RADIUS * 0.6)
			translate(0, 0, 1)
			fill(colors.blue)
			circle(0, 0, this.RADIUS - 2)
			pop()
		}
	}
}
