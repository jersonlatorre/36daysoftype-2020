class Game {
	constructor() {
		this.planet = new Planet()
		this.player = new Player()
		this.enemies = []
	}

	draw() {
		background(colors.black)
		this.planet.draw()
		this.player.draw()
	}

	keyPressed() {
		this.player.keyPressed()
	}

	keyReleased() {
		this.player.keyReleased()
	}
}
