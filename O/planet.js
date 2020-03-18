class Planet {
	constructor() {}

	draw() {
		noStroke()
		fill(colors.blue)
		circle(0, 0, Global.PLANET_RADIUS)
		fill('rgba(255, 255, 255, 0.2)')
		circle(0, 0, Global.PLANET_RADIUS * 0.6)
	}
}
