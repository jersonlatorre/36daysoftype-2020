class Dot {
	constructor(x, y) {
		this.p1 = new p5.Vector(0, 0)
		this.p2 = new p5.Vector(0, 0)
		this.pn = new p5.Vector(0, 0)
		this.timer = random(-100, 100)
		this.dt = 0
		this.x = this.pn.x = this.p1.x = this.p2.x = x
		this.y = this.pn.y = this.p1.y = this.p2.y = y
		this.z = random(-120, -10)
		this.w = map(this.z, -120, -10, 2, 8)
		this.t = 0
		this.c = 'rgb(255, 255, 255)'
	}

	newTarget() {
		let max_intensity = mouseX > width / 2 ? 120 : 20
		let min_intensity = mouseX > width / 2 ? 80 : 10
		let angle = random(0, 2 * PI)
		let r = random(min_intensity, max_intensity)
		let xx = r * sin(angle)
		let yy = r * cos(angle)
		let green = letter.get(int(this.pn.x + xx), int(this.pn.y + yy))[1]

		while (green == 0) {
			angle = random(0, 2 * PI)
			r = random(min_intensity, max_intensity)
			xx = r * sin(angle)
			yy = r * cos(angle)
			green = letter.get(int(this.pn.x + xx), int(this.pn.y + yy))[1]
		}

		if (this.pn.x + xx < 0 || this.pn.x + xx > width) xx *= -1
		if (this.pn.y + yy < 0 || this.pn.y + yy > height) yy *= -1
		this.pn.x += xx
		this.pn.y += yy
	}

	draw() {
		this.dt = mouseX > width / 2 ? 0.8 : 0.4
		this.timer += this.dt

		if (this.timer >= 10) {
			this.p1 = this.pn.copy()
			this.newTarget()
			this.t = 0
			this.timer -= 10
		}

		let pp1 = p5.Vector.lerp(this.p1, this.pn, 3 * this.t * this.t - 2 * this.t * this.t * this.t)
		this.p2 = p5.Vector.add(this.p2, p5.Vector.mult(p5.Vector.sub(pp1, this.p2), 0.2))
		this.t += mouseX > width / 2 ? 0.5 : 0.2

		if (this.t >= 1) {
			this.t = 1
		}

		push()
		translate(0, 20)

		stroke(this.c)
		strokeWeight(this.w)
		line(pp1.x, pp1.y, this.z, this.p2.x, this.p2.y, this.z)

		push()
		fill(this.c)
		translate(pp1.x, pp1.y, this.z)
		circle(0, 0, 1)
		pop()

		push()
		fill(this.c)
		translate(this.p2.x, this.p2.y, this.z)
		circle(0, 0, 1)
		pop()

		pop()
	}
}
