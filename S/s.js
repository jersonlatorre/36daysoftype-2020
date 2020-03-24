class S {
	constructor() {
		this.RESOLUTION = 50
		this.DOTS_RESOLUTION = 0
		this.DOTS_OFFSET = 25 * FACTOR
		this.DOTS_RADIUS = 12 * FACTOR
		this.handler1 = new Handler(680 * FACTOR, 380 * FACTOR, 60 * FACTOR)
		this.handler2 = new Handler(380 * FACTOR, 680 * FACTOR, 60 * FACTOR)
		this.angle1 = 0
		this.angle2 = 0
		this.radius1 = 0
		this.radius2 = 0
		this.FILL_COLOR = colors.black
	}

	draw() {
		this.handler1.update()
		this.handler2.update()

		this.drawSemicircles()
		this.drawFill()

		this.handler1.draw()
		this.handler2.draw()
	}

	drawFill() {
		let points = []
		let p1, p2, c1, c2, u
		/**
		 * CURVE 1
		 */
		// point 1
		p1 = this.handler1.position
		u = createVector(1, 0).rotate(this.angle2)
		// point 2
		p2 = this.handler2.position.copy().add(u.mult(this.radius2))
		// controller 1
		u = createVector(1, 0).rotate(this.angle1 - PI / 2)
		c1 = this.handler1.position.copy().add(u.mult(this.radius1 / 2))
		// controller 2
		u = createVector(1, 0).rotate(this.angle2 - PI / 2)
		c2 = p2.copy().add(u.mult(this.radius2))

		for (let i = 0; i <= this.RESOLUTION; i++) {
			let t = i / this.RESOLUTION
			let x = p1.x * pow(1 - t, 3) + 3 * c1.x * t * pow(1 - t, 2) + 3 * c2.x * t * t * (1 - t) + p2.x * t * t * t
			let y = p1.y * pow(1 - t, 3) + 3 * c1.y * t * pow(1 - t, 2) + 3 * c2.y * t * t * (1 - t) + p2.y * t * t * t
			points.push(createVector(x, y))
		}

		/**
		 * DOTS 1
		 */
		// point 1
		u = createVector(1, 0).rotate(this.angle1)

		p1 = this.handler1.position.copy().add(u.mult(-this.DOTS_OFFSET))
		u = createVector(1, 0).rotate(this.angle2)
		// point 2
		p2 = this.handler2.position.copy().add(u.mult(this.radius2 + this.DOTS_OFFSET))
		// controller 1
		u = createVector(1, 0).rotate(this.angle1 - PI / 2)
		c1 = this.handler1.position.copy().add(u.mult(this.radius1 / 2))
		// controller 2
		u = createVector(1, 0).rotate(this.angle2 - PI / 2)
		c2 = p2.copy().add(u.mult(this.radius2))

		for (let i = 0; i <= this.DOTS_RESOLUTION; i++) {
			let t = i / this.DOTS_RESOLUTION
			let x = p1.x * pow(1 - t, 3) + 3 * c1.x * t * pow(1 - t, 2) + 3 * c2.x * t * t * (1 - t) + p2.x * t * t * t
			let y = p1.y * pow(1 - t, 3) + 3 * c1.y * t * pow(1 - t, 2) + 3 * c2.y * t * t * (1 - t) + p2.y * t * t * t
			circle(x, y, this.DOTS_RADIUS)
		}

		/**
		 * CURVE 2
		 */
		// point 1
		p1 = this.handler2.position
		u = createVector(1, 0).rotate(this.angle1)
		// point 2
		p2 = this.handler1.position.copy().add(u.mult(this.radius1))
		// controller 1
		u = createVector(1, 0).rotate(this.angle2 - PI / 2)
		c1 = this.handler2.position.copy().add(u.mult(this.radius2 / 2))
		// controller 2
		u = createVector(1, 0).rotate(this.angle1 - PI / 2)
		c2 = p2.copy().add(u.mult(this.radius1))

		for (let i = 0; i <= this.RESOLUTION; i++) {
			let t = i / this.RESOLUTION
			let x = p1.x * pow(1 - t, 3) + 3 * c1.x * t * pow(1 - t, 2) + 3 * c2.x * t * t * (1 - t) + p2.x * t * t * t
			let y = p1.y * pow(1 - t, 3) + 3 * c1.y * t * pow(1 - t, 2) + 3 * c2.y * t * t * (1 - t) + p2.y * t * t * t
			points.push(createVector(x, y))
		}

		/**
		 * DOTS 2
		 */
		// point 1
		u = createVector(1, 0).rotate(this.angle2)

		p1 = this.handler2.position.copy().add(u.mult(-this.DOTS_OFFSET))
		u = createVector(1, 0).rotate(this.angle1)
		// point 2
		p2 = this.handler1.position.copy().add(u.mult(this.radius1 + this.DOTS_OFFSET))
		// controller 1
		u = createVector(1, 0).rotate(this.angle2 - PI / 2)
		c1 = this.handler2.position.copy().add(u.mult(this.radius2 / 2))
		// controller 2
		u = createVector(1, 0).rotate(this.angle1 - PI / 2)
		c2 = p2.copy().add(u.mult(this.radius1))

		for (let i = 0; i <= this.DOTS_RESOLUTION; i++) {
			let t = i / this.DOTS_RESOLUTION
			let x = p1.x * pow(1 - t, 3) + 3 * c1.x * t * pow(1 - t, 2) + 3 * c2.x * t * t * (1 - t) + p2.x * t * t * t
			let y = p1.y * pow(1 - t, 3) + 3 * c1.y * t * pow(1 - t, 2) + 3 * c2.y * t * t * (1 - t) + p2.y * t * t * t
			noStroke()
			circle(x, y, this.DOTS_RADIUS)
		}

		// draw the complete shape
		fill(this.FILL_COLOR)
		stroke(this.FILL_COLOR)
		strokeWeight(1)
		beginShape()
		points.forEach((p) => {
			vertex(p.x, p.y)
		})
		endShape(CLOSE)
	}

	drawSemicircles() {
		let distance, r, rotation
		// semicircle 1
		distance = dist(this.handler1.position.x, this.handler1.position.y, 540 * FACTOR, 540 * FACTOR)
		distance = constrain(distance, 0, width / 2)
		this.radius1 = map(distance, 0, width / 2, 45 * FACTOR, 450 * FACTOR)
		this.angle1 = atan2(this.handler1.position.y - 540 * FACTOR, this.handler1.position.x - 540 * FACTOR) - PI / 2

		strokeWeight(1)
		stroke(this.FILL_COLOR)
		fill(this.FILL_COLOR)
		beginShape()
		for (let i = 0; i <= this.RESOLUTION; i++) {
			let angle = PI * i / this.RESOLUTION + this.angle1
			let x = this.handler1.position.x + this.radius1 * cos(angle)
			let y = this.handler1.position.y + this.radius1 * sin(angle)
			vertex(x, y)
		}
		endShape(CLOSE)

		for (let i = 0; i <= this.DOTS_RESOLUTION; i++) {
			let angle = PI * i / this.DOTS_RESOLUTION + this.angle1
			let x = this.handler1.position.x + this.radius1 * cos(angle)
			let y = this.handler1.position.y + this.radius1 * sin(angle)
			x = this.handler1.position.x + (this.radius1 + this.DOTS_OFFSET) * cos(angle)
			y = this.handler1.position.y + (this.radius1 + this.DOTS_OFFSET) * sin(angle)
			noStroke()
			circle(x, y, this.DOTS_RADIUS)
		}

		// semicircle 2
		distance = dist(this.handler2.position.x, this.handler2.position.y, 540 * FACTOR, 540 * FACTOR)
		distance = constrain(distance, 0, width / 2)
		this.radius2 = map(distance, 0, width / 2, 45 * FACTOR, 450 * FACTOR)
		this.angle2 = atan2(this.handler2.position.y - 540 * FACTOR, this.handler2.position.x - 540 * FACTOR) - PI / 2

		strokeWeight(1)
		stroke(this.FILL_COLOR)
		fill(this.FILL_COLOR)
		beginShape()
		for (let i = 0; i <= this.RESOLUTION; i++) {
			let angle = PI * i / this.RESOLUTION + this.angle2
			let x = this.handler2.position.x + this.radius2 * cos(angle)
			let y = this.handler2.position.y + this.radius2 * sin(angle)
			vertex(x, y)
		}
		endShape(CLOSE)

		for (let i = 0; i <= this.DOTS_RESOLUTION; i++) {
			let angle = PI * i / this.DOTS_RESOLUTION + this.angle2
			let x = this.handler2.position.x + this.radius2 * cos(angle)
			let y = this.handler2.position.y + this.radius2 * sin(angle)
			x = this.handler2.position.x + (this.radius2 + this.DOTS_OFFSET) * cos(angle)
			y = this.handler2.position.y + (this.radius2 + this.DOTS_OFFSET) * sin(angle)
			circle(x, y, this.DOTS_RADIUS)
		}
	}
}
