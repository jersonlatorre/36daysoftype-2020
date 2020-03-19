class ItemState {
	static IDLE = 0
}

class Item {
	constructor(angle) {
		this.MAX_OSCILLATION_AMPLITUDE = 20
		this.angle = angle
		this.type = random([ 'soap', 'water' ])
		if (this.type == 'soap') this.color = '#ffbf0c55'
		if (this.type == 'water') this.color = '#69bdff55'
		this.restart()
	}

	restart() {
		this.state = ItemState.IDLE
		this.isDead = false
		let x = 0.5 * (Global.PLANET_RADIUS + Global.ITEM_HEIGHT) * cos(this.angle)
		let y = 0.5 * (Global.PLANET_RADIUS + Global.ITEM_HEIGHT) * sin(this.angle)
		this.position = createVector(x, y)
		this.oscillationAmplitude = 0
		this.oscillationTime = random(0, 10)
	}

	draw() {
		switch (this.state) {
			case ItemState.IDLE: {
				this.oscillationTime += deltaTime * 0.0008
				this.oscillationAmplitude = this.MAX_OSCILLATION_AMPLITUDE * sin(this.oscillationTime * 2 * PI)

				this.position.x =
					0.5 *
					(Global.PLAYER_HEIGHT * 6.5 +
						Global.PLANET_RADIUS +
						Global.ITEM_HEIGHT +
						this.oscillationAmplitude) *
					cos(this.angle)
				this.position.y =
					0.5 *
					(Global.PLAYER_HEIGHT * 6.5 +
						Global.PLANET_RADIUS +
						Global.ITEM_HEIGHT +
						this.oscillationAmplitude) *
					sin(this.angle)

				noStroke()
				push()
				let rotation = atan2(this.position.y, this.position.x)
				translate(this.position.x, this.position.y)
				rotate(PI / 2 + rotation)

				// check collision
				if (
					dist(Global.player.position.x, Global.player.position.y, this.position.x, this.position.y) <
					Global.ITEM_HEIGHT * 1.5
				) {
					Global.effects.push(new Explosion(this.position.x, this.position.y, this.color))
					itemSound.play()
					this.isDead = true
				}

				// draw
				imageMode(CENTER)
				if (this.type == 'soap') {
					image(soapImage, 0, 0)
				}
				if (this.type == 'water') {
					image(waterImage, 0, 0)
				}
				pop()
				break
			}
		}
	}
}
