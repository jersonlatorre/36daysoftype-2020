class BigCircle {
	constructor() {
		this.backgroundColor = color(colors.black)
		this.targetBackgroundColor = color(colors.black)
		this.foregroundColor = color(colors.white)
		this.targetForegroundColor = color(colors.white)
	}

	draw() {
		this.backgroundColor = lerpColor(this.backgroundColor, this.targetBackgroundColor, 0.15)
		this.foregroundColor = lerpColor(this.foregroundColor, this.targetForegroundColor, 0.15)

		background(this.backgroundColor)
		fill(this.foregroundColor)
		noStroke()
		circle(CANVAS_SIZE / 2, CANVAS_SIZE / 2, BIG_CIRCLE_RADIUS)
	}

	toBlack() {
		this.targetBackgroundColor = color(colors.white)
		this.targetForegroundColor = color(colors.black)
	}

	toWhite() {
		this.targetBackgroundColor = color(colors.black)
		this.targetForegroundColor = color(colors.white)
	}
}
