class V {
	constructor() {
		this.a = new Handler(425, 330, 40)
		this.b = new Handler(735, 570, 40)
		this.c = new Handler(330, 600, 40)
	}

	draw() {
		this.a.update()
		this.b.update()
		this.c.update()

		// calculate points
		let aa = this.c.position.copy().add(this.b.position.copy().sub(this.c.position).rotate(PI / 3))
		let bb = this.a.position.copy().add(this.c.position.copy().sub(this.a.position).rotate(PI / 3))
		let cc = this.b.position.copy().add(this.a.position.copy().sub(this.b.position).rotate(PI / 3))

		let aaa = this.c.position.copy().add(this.b.position.copy().sub(this.c.position).rotate(PI / 6).mult(0.5773))
		let bbb = this.a.position.copy().add(this.c.position.copy().sub(this.a.position).rotate(PI / 6).mult(0.5773))
		let ccc = this.b.position.copy().add(this.a.position.copy().sub(this.b.position).rotate(PI / 6).mult(0.5773))

		// main triangle
		fill('rgba(255, 255, 255, 0.15)')
		noStroke()
		beginShape()
		vertex(this.a.position.x, this.a.position.y)
		vertex(this.b.position.x, this.b.position.y)
		vertex(this.c.position.x, this.c.position.y)
		endShape(CLOSE)

		// equilateral triangles
		stroke('rgba(255, 255, 255, 0.1)')
		strokeWeight(4)
		noFill()
		beginShape()
		vertex(this.a.position.x, this.a.position.y)
		vertex(cc.x, cc.y)
		vertex(this.b.position.x, this.b.position.y)
		vertex(aa.x, aa.y)
		vertex(this.c.position.x, this.c.position.y)
		vertex(bb.x, bb.y)
		vertex(this.a.position.x, this.a.position.y)
		endShape()

		noStroke()
		fill(colors.white)
		circle(aa.x, aa.y, 8)
		circle(bb.x, bb.y, 8)
		circle(cc.x, cc.y, 8)

		// center triangle
		// noStroke()
		// fill(colors.gray)
		// beginShape()
		// vertex(aaa.x, aaa.y)
		// vertex(bbb.x, bbb.y)
		// vertex(ccc.x, ccc.y)
		// endShape(CLOSE)

		// letter V
		fill(colors.white)
		// noStroke()
		stroke(colors.white)
		strokeWeight(30)
		strokeJoin(ROUND)
		let o = this.a.position.copy().add(this.b.position).add(this.c.position).mult(0.33333)
		let v1 = bbb.copy().add(ccc.copy().sub(bbb).mult(0.33333))
		let v2 = bbb.copy().add(ccc.copy().sub(bbb).mult(0.66666))

		beginShape()
		vertex(bbb.x, bbb.y)
		vertex(v1.x, v1.y)
		vertex(o.x, o.y)
		vertex(v2.x, v2.y)
		vertex(ccc.x, ccc.y)
		vertex(aaa.x, aaa.y)
		endShape(CLOSE)

		

		let resolution = 4
		this.noiseLine(bbb, v1, resolution)
		this.noiseLine(v1, o, resolution)
		this.noiseLine(o, v2, resolution)
		this.noiseLine(v2, ccc, resolution)
		this.noiseLine(ccc, aaa, resolution * 3)
		this.noiseLine(aaa, bbb, resolution * 3)

		fill('rgba(0, 0, 0, 0.5)')
		noStroke()
		circle(aaa.x, aaa.y, 11)
		circle(bbb.x, bbb.y, 11)
		circle(ccc.x, ccc.y, 11)
		// circle(v1.x, v1.y, 10)
		// circle(v2.x, v2.y, 10)
		// circle(o.x, o.y, 10)

		this.a.draw()
		this.b.draw()
		this.c.draw()
	}

	noiseLine(p1, p2, n) {
		noFill()
		stroke('rgba(220,230,220, 0.4)')
		strokeWeight(5)
		beginShape()
		for (let i = 0; i <= n; i++) {
			let p = p5.Vector.lerp(p1, p2, i / n)
			if (i == 0 || i == n) {
				curveVertex(p.x, p.y)
				curveVertex(p.x, p.y)
			} else {
				let x = p.x + 4 * simplex.noise2D(i, millis() / 200)
				let y = p.y + 4 * simplex.noise2D(i, millis() / 200 + 1)
				curveVertex(x, y)
			}
		}
		endShape()
	}
}
