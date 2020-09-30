class Eye {
	constructor(x, y) {
		this.CENTER_X = x
		this.CENTER_Y = y
		this.x = x
		this.y = y
		this.targetX = x
		this.targetY = y
		this.ex = x - CANVAS_SIZE / 10
		this.ey = y - CANVAS_SIZE / 10
		this.radius = CANVAS_SIZE / 3.85
		this.timer = 0
		this.blink = false
	}

	draw() {
		stroke(colors.black)
		strokeWeight(CANVAS_SIZE / 85)
		fill(colors.white)
		circle(this.CENTER_X, this.CENTER_Y, this.radius)

		if (mouseX > CANVAS_SIZE / 2 - 100) {
			this.ex += 0.1 * (CANVAS_SIZE / 2 - CANVAS_SIZE / 6 - this.ex)
			this.targetX += 0.15 * (mouseX - this.targetX)
			this.targetY += 0.15 * (mouseY - this.targetY)

			let targetTruncated = new p5.Vector(this.targetX - this.CENTER_X, this.targetY - this.CENTER_Y)
				.normalize()
				.mult(this.radius / 6)
				.add(new p5.Vector(this.CENTER_X, this.CENTER_Y))
			this.x += 0.1 * (targetTruncated.x - this.x)
			this.y += 0.1 * (targetTruncated.y - this.y)

			noStroke()
			fill(colors.red)
			circle(this.x, this.y, this.radius / 1.9)
			fill(colors.black)
			circle(this.x, this.y, this.radius / 2.6)
			this.timer = 0
		} else {
			this.timer += 0.011
			if (this.timer >= 1) {
				this.timer = 0
				this.blink = true
				setTimeout(() => {
					this.blink = false
				}, 100)
			}
			this.ex += 0.1 * (CANVAS_SIZE / 2 - CANVAS_SIZE / 10 - this.ex)
			this.x += 0.1 * (this.CENTER_X - this.x)
			this.y += 0.1 * (this.CENTER_Y - this.y)

			if (!this.blink) {
				push()
				translate(this.x, this.y)
				noStroke()
				fill(colors.red)
				circle(0, 0, this.radius / 1.9)
				fill(colors.black)
				circle(0, 0, this.radius / 2.6)
				pop()
			} else {
				push()
				translate(this.x, this.y)
				stroke(colors.black)
				line(0, -this.radius / 4, 0, this.radius / 4)
				pop()
			}
		}

		fill(colors.black)
		noStroke()
		rect(this.ex, this.CENTER_Y, CANVAS_SIZE / 11, CANVAS_SIZE / 4.5)
		rect(this.ex, CANVAS_SIZE / 2 - CANVAS_SIZE / 70, CANVAS_SIZE / 11, CANVAS_SIZE / 55)
		rect(this.ex, CANVAS_SIZE / 2 + CANVAS_SIZE / 70, CANVAS_SIZE / 11, CANVAS_SIZE / 55)
	}
}
