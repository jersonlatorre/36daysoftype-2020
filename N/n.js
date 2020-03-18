class N {
	constructor() {
		this.t = 0
		this.p1 = new Dot(CANVAS_SIZE / 2 - 280 * FACTOR, CANVAS_SIZE - 250 * FACTOR, 40 * FACTOR, colors.gray, true)
		this.p2 = new Dot(CANVAS_SIZE / 2 + 280 * FACTOR, CANVAS_SIZE - 250 * FACTOR, 40 * FACTOR, colors.gray, true)
		this.c1 = new Dot(CANVAS_SIZE / 2 - 280 * FACTOR, CANVAS_SIZE / 2 - 100 * FACTOR, 40 * FACTOR, colors.gray, false)
		this.c2 = new Dot(CANVAS_SIZE / 2 + 280 * FACTOR, CANVAS_SIZE / 2 - 280 * FACTOR, 40 * FACTOR, colors.gray, false)

		this.state = 0 // line, 1 = curve
		this.history = []
	}

	draw() {
		this.c1.update()
		this.c2.update()

		// draw curve
		noFill()
		stroke(colors.white)
		strokeWeight(70 * FACTOR)
		beginShape()
		strokeJoin(ROUND)
		let N = 50
		for (let i = 0; i <= N; i++) {
			let pos = this.positionAt(i / N)
			vertex(pos.x, pos.y)
		}
		endShape()

		// draw line handler
		noFill()
		stroke(colors.white)
		strokeWeight(70 * FACTOR)
		line(this.p1.position.x, this.p1.position.y, this.c1.position.x, this.c1.position.y)

		// draw moving dot
		let q
		if (this.state == 0) {
			q = p5.Vector.lerp(this.c1.position, this.p1.position, this.t)
			this.history.push(q)
			if (this.history.length == 10) {
				this.history.splice(0, 1)
			}
			this.t += 0.02
			if (this.t > 1) {
				this.t = 0
				this.state = 1
			}
		} else {
			q = this.positionAt(this.t)
			this.history.push(q)
			if (this.history.length == 10) {
				this.history.splice(0, 1)
			}
			this.t += 0.01
			if (this.t > 1) {
				this.t = 0
				this.state = 0
				this.history = []
			}
		}

		noFill()
		stroke(120)
		strokeWeight(20 * FACTOR)
		beginShape()
		this.history.forEach((p, i) => {
			curveVertex(p.x, p.y)
		})
		endShape()

		noStroke()
		fill(colors.red)
		circle(q.x, q.y, 55 * FACTOR)
		fill(colors.white)
		circle(q.x, q.y, 15 * FACTOR)

		// draw handlers
		this.c1.draw()
		this.c2.draw()
	}

	positionAt(t) {
		return this.p1.position
			.copy()
			.mult(pow(1 - t, 3))
			.add(this.c1.position.copy().mult(3 * t * pow(1 - t, 2)))
			.add(this.c2.position.copy().mult(3 * t * t * (1 - t)))
			.add(this.p2.position.copy().mult(t * t * t))
	}
}
