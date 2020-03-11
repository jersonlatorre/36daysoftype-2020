class H {
	constructor(x, y, size) {
		this.x = x
		this.y = y
		this.size = size
		this.targetColor = color(colors.black)
		this.targetT = 1
		this.targetZ = 0
		this.color = this.targetColor
		this.z = 0
		this.t = 0
		this.LERP_FACTOR = 0.2
	}

	draw() {
		let a = alpha(reference.get(this.x - mouseX + CANVAS_SIZE / 2, this.y - mouseY + CANVAS_SIZE / 2))
		let b = brightness(reference.get(this.x - mouseX + CANVAS_SIZE / 2, this.y - mouseY + CANVAS_SIZE / 2))
		let n = simplex.noise3D(this.x / 300, this.y / 300, millis() / 1500)

		blendMode(DIFFERENCE)

		if (b == 0 && a == 255) {
			// es letra
			this.targetColor = color(colors.red)
			this.targetZ = 20 * n - 100 + 250
			this.targetT = 1
		} else {
			// no es letra
			this.targetColor = color('rgba(255, 255, 255, 0.1)')
			this.targetZ = 200 * this.t - 100
			this.targetT = n
			this.targetT = map(this.targetT, -1, 1, 0.1, 1)
		}

		
		this.t = lerp(this.t, this.targetT, this.LERP_FACTOR)
		this.z = lerp(this.z, this.targetZ, this.LERP_FACTOR)
		this.color = lerpColor(this.color, this.targetColor, this.LERP_FACTOR * 2)

		push()
		translate(this.x, this.y, this.z)
		fill(this.color)
		noStroke()
		rectMode(CORNER)
		rect(0, 0, this.size * this.t / 2, this.size)
		rect(this.size - this.size * this.t / 2, 0, this.size * this.t / 2, this.size)
		rectMode(CENTER)
		rect(this.size / 2, this.size / 2, this.size * (1 - this.t), this.size * this.t / 2)
		pop()
	}
}
