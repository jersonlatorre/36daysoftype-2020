class Planet {
	constructor() {
		this.CRUST_DISTANCE = 60
		this.CRUST_HEIGHT = 20
		this.N = 40
	}

	draw() {
		noStroke()
		fill(colors.gray)
		circle(0, 0, Global.PLANET_RADIUS)
		fill('rgba(255, 255, 255, 0.22)')
		circle(0, 0, Global.PLANET_RADIUS * 0.5)

		fill('rgba(255, 255, 255, 0.15)')
		for (let i = 0; i < this.N; i++) {
			let angle = i * 2 * PI / this.N
			let x = 0.5 * (Global.PLANET_RADIUS - this.CRUST_DISTANCE) * cos(angle)
			let y = 0.5 * (Global.PLANET_RADIUS - this.CRUST_DISTANCE) * sin(angle)
			let w = 0.75 * PI * Global.PLANET_RADIUS / this.N
			push()
			translate(x, y)
			rotate(angle)
			rectMode(CENTER)
			rect(0, 0, this.CRUST_HEIGHT, w)
			pop()
		}
	}
}
