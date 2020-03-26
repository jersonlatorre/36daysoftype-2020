class I {
	constructor() {
		this.p1 = createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 2.3)
		this.p2 = createVector(CANVAS_SIZE / 2, 1.7 * CANVAS_SIZE / 2.4)
		this.mouseTarget = createVector(mouseX, mouseY)
		this.slider = this.p1.copy()
		this.projection = this.p1.copy()
		this.mousePosition = createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 3.2)
		this.MOUSE_DRAG = 0
		this.MOUSE_NONE = 1
		this.mouseState = this.MOUSE_NONE
	}

	draw() {
		switch (this.mouseState) {
			case this.MOUSE_DRAG: {
				this.mousePosition.x = mouseX
				this.mousePosition.y = mouseY
				this.mouseTarget = createVector(
					this.mousePosition.x,
					this.mouseTarget.y + 0.12 * (mouseY - this.mouseTarget.y)
				)
				let u = p5.Vector.sub(this.p2, this.p1).normalize()

				this.projection = p5.Vector.add(
					this.p1,
					p5.Vector.mult(u, p5.Vector.dot(p5.Vector.sub(this.mouseTarget, this.p1), u))
				)
				let P1P2 = p5.Vector.sub(this.p2, this.p1)
				let P2P1 = p5.Vector.sub(this.p1, this.p2)
				let P1M = p5.Vector.sub(this.mouseTarget, this.p1)
				let P2M = p5.Vector.sub(this.mouseTarget, this.p2)

				let angle1 = acos(P1P2.dot(P1M) / (P1P2.mag() * P1M.mag()))
				let angle2 = acos(P2P1.dot(P2M) / (P1P2.mag() * P2M.mag()))

				strokeWeight(100 * FACTOR)
				stroke(colors.black)
				line(this.p1.x, this.p1.y, this.p2.x, this.p2.y)

				strokeWeight(50 * FACTOR)
				stroke('rgba(255, 255, 255, 0.1)')
				line(this.p1.x, this.p1.y, this.p2.x, this.p2.y)

				fill(colors.red)
				stroke(colors.black)
				strokeWeight(20 * FACTOR)
				circle(this.slider.x, this.slider.y, 100 * FACTOR)

				fill(colors.black)
				circle(this.slider.x, this.slider.y, 20 * FACTOR)
				this.drawLine()

				if (angle1 < PI / 2 && angle2 < PI / 2) {
					this.slider = this.projection.copy()
				} else {
					if (angle1 >= PI / 2) {
						this.slider = this.p1.copy()
					} else {
						this.slider = this.p2.copy()
					}
				}

				strokeWeight(20 * FACTOR)
				fill(colors.white)
				circle(this.mousePosition.x, this.mousePosition.y, 80 * FACTOR)

				if (!mouseIsPressed) {
					this.mouseState = this.MOUSE_NONE
				}

				image(hand, mouseX, mouseY)
				break
			}

			case this.MOUSE_NONE: {
				strokeWeight(100 * FACTOR)
				stroke(colors.black)
				line(this.p1.x, this.p1.y, this.p2.x, this.p2.y)

				strokeWeight(50 * FACTOR)
				stroke('rgba(255, 255, 255, 0.1)')
				line(this.p1.x, this.p1.y, this.p2.x, this.p2.y)

				fill(colors.red)
				stroke(colors.black)
				strokeWeight(20 * FACTOR)
				circle(this.slider.x, this.slider.y, 100 * FACTOR)

				fill(colors.black)
				circle(this.slider.x, this.slider.y, 20 * FACTOR)
				this.drawLine()

				strokeWeight(20 * FACTOR)
				fill(colors.white)
				circle(this.mousePosition.x, this.mousePosition.y, 80 * FACTOR)

				if (dist(mouseX, mouseY, this.mousePosition.x, this.mousePosition.y) < 50 * FACTOR) {
					image(hand, mouseX, mouseY)
					if (mouseIsPressed) {
						this.mouseState = this.MOUSE_DRAG
					}
				} else {
					image(pointer, mouseX, mouseY)
				}
				break
			}
		}
	}

	drawLine() {
		let dx = this.mousePosition.x - this.slider.x
		let dy = this.mousePosition.y - this.slider.y
		let n = createVector(-dy, dx).normalize()
		let RESOLUTION = 50

		stroke(colors.black)
		strokeJoin(ROUND)
		noFill()
		let strength = this.strength()
		strokeWeight(map(strength, 0, 1, 20, 15) * FACTOR)
		beginShape()
		let amp = map(strength, 0, 1, 8, 15) * FACTOR
		let frequency = map(strength, 0, 1, 40, 10)
		let m = createVector(this.mousePosition.x, this.mousePosition.y)
		for (let i = 0; i <= RESOLUTION; i++) {
			let p = p5.Vector.lerp(this.slider, m, i / RESOLUTION)
			let v = amp * sin(i * RESOLUTION * 1.5 + millis() / frequency)
			// let v = -amp / 2 + amp * noise(millis() / frequency, i)
			p.add(p5.Vector.mult(n, v))
			if (i == 0) p = this.slider.copy()
			if (i == RESOLUTION) p = m.copy()
			vertex(p.x, p.y)
		}
		endShape()
	}

	value() {
		let d = dist(this.p1.x, this.p1.y, this.p2.x, this.p2.y)
		let d1 = dist(this.p1.x, this.p1.y, this.slider.x, this.slider.y)
		return d1 / d
	}

	strength() {
		let d = dist(this.slider.x, this.slider.y, this.mousePosition.x, this.mousePosition.y)
		d = constrain(d, 0, CANVAS_SIZE / 2)
		d = map(d, 0, CANVAS_SIZE / 2, 0, 1)
		return d
	}
}
