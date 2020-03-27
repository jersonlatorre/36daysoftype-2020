class WState {
	static NONE = 0
	static DRAWING = 1
}

class W {
	constructor() {
		this.pivot = createVector(200 * FACTOR, 400 * FACTOR)
		this.pencil = createVector(840 * FACTOR, 400 * FACTOR)
		this.join = createVector(540 * FACTOR, 850 * FACTOR)
		this.factor = 0.3
		this.mainDraw = []
		this.tmpMainDraw = []
		this.scaledDraw = []
		this.tmpScaledDraw = []
		this.state = WState.NONE
	}

	draw() {
		// ik dynamics
		let [ a, b ] = this.reach(this.pencil, this.join, createVector(mouseX, mouseY))
		this.pencil = a.copy()
		let [ c, d ] = this.reach(this.join, this.pivot, b)
		this.join = c.copy()
		this.pivot = d.copy()
		let [ e, f ] = this.reach(this.pivot, this.join, createVector(200 * FACTOR, 400 * FACTOR))
		this.pivot = e.copy()
		let [ g, h ] = this.reach(this.join, this.pencil, f)
		this.join = g.copy()
		this.pencil = h.copy()

		let m1 = this.join.copy().add(this.pencil.copy().sub(this.join).mult(this.factor))
		let m2 = this.pivot.copy().add(this.join.copy().sub(this.pivot).mult(this.factor))
		let p = this.pivot.copy().add(this.pencil.copy().sub(this.pivot).mult(this.factor))

		switch (this.state) {
			case WState.NONE: {
				if (mouseIsPressed) {
					this.tmpMainDraw = []
					this.tmpScaledDraw = []
					this.state = WState.DRAWING
				}
				break
			}

			case WState.DRAWING: {
				if (!mouseIsPressed) {
					this.state = WState.NONE
					this.mainDraw.push(this.tmpMainDraw)
					this.scaledDraw.push(this.tmpScaledDraw)
				}

				this.tmpMainDraw.push({ position: this.pencil.copy(), weight: dist(mouseX, mouseY, pmouseX, pmouseY) })
				this.tmpScaledDraw.push({
					position: p.copy(),
					weight: dist(mouseX, mouseY, pmouseX, pmouseY) * this.factor
				})
				break
			}
		}

		// main draw
		noFill()
		stroke(colors.red)
		this.mainDraw.forEach((draw) => {
			for (let i = 0; i < draw.length - 1; i++) {
				let w = constrain(0.2 * (draw[i].weight + draw[i + 1].weight), 0, 20 * FACTOR)
				strokeWeight(map(w, 0, 20 * FACTOR, 3 * FACTOR, 12 * FACTOR))
				line(draw[i].position.x, draw[i].position.y, draw[i + 1].position.x, draw[i + 1].position.y)
			}
		})

		for (let i = 0; i < this.tmpMainDraw.length - 1; i++) {
			let w = constrain(0.2 * (this.tmpMainDraw[i].weight + this.tmpMainDraw[i + 1].weight), 0, 20 * FACTOR)
			strokeWeight(map(w, 0, 20 * FACTOR, 3 * FACTOR, 12 * FACTOR))
			line(
				this.tmpMainDraw[i].position.x,
				this.tmpMainDraw[i].position.y,
				this.tmpMainDraw[i + 1].position.x,
				this.tmpMainDraw[i + 1].position.y
			)
		}

		// scaled draw
		noFill()
		stroke(colors.blue)
		this.scaledDraw.forEach((draw) => {
			for (let i = 0; i < draw.length - 1; i++) {
				let w = constrain(0.2 * (draw[i].weight + draw[i + 1].weight), 0, 20 * FACTOR)
				strokeWeight(map(w, 0, 20 * FACTOR, 1 * FACTOR, 6 * FACTOR))
				line(draw[i].position.x, draw[i].position.y, draw[i + 1].position.x, draw[i + 1].position.y)
			}
		})

		for (let i = 0; i < this.tmpScaledDraw.length - 1; i++) {
			let w = constrain(0.2 * (this.tmpScaledDraw[i].weight + this.tmpScaledDraw[i + 1].weight), 0, 20 * FACTOR)
			strokeWeight(map(w, 0, 20 * FACTOR, 1 * FACTOR, 6 * FACTOR))
			line(
				this.tmpScaledDraw[i].position.x,
				this.tmpScaledDraw[i].position.y,
				this.tmpScaledDraw[i + 1].position.x,
				this.tmpScaledDraw[i + 1].position.y
			)
		}

		// transparent lines
		stroke('rgba(0,0,0,0.05)')
		strokeWeight(15 * FACTOR)
		line(m2.x, m2.y, this.join.x, this.join.y)
		line(m1.x, m1.y, this.join.x, this.join.y)

		// letter W
		stroke('rgba(0,0,0,0.2)')
		strokeWeight(50 * FACTOR)
		line(this.pivot.x, this.pivot.y, m2.x, m2.y)
		line(m2.x, m2.y, p.x, p.y)
		line(p.x, p.y, m1.x, m1.y)
		line(m1.x, m1.y, this.pencil.x, this.pencil.y)

		// dots
		noStroke()
		fill('rgba(0,0,0,1)')
		circle(m1.x, m1.y, 20 * FACTOR)
		circle(m2.x, m2.y, 20 * FACTOR)

		fill(colors.blue)
		circle(p.x, p.y, 25 * FACTOR)
		fill(colors.red)
		circle(this.pencil.x, this.pencil.y, 25 * FACTOR)
		fill(colors.black)
		circle(this.pivot.x, this.pivot.y, 20 * FACTOR)
	}

	reach(head, tail, tgt) {
		var c_dist = head.copy().sub(tail).mag()
		var s_dist = tail.copy().sub(tgt).mag()
		var scale = c_dist / s_dist
		return [ createVector(tgt.x, tgt.y), p5.Vector.lerp(tgt, tail, scale) ]
	}

	reset() {
		this.mainDraw = []
		this.tmpMainDraw = []
		this.scaledDraw = []
		this.tmpScaledDraw = []
	}
}
