class Key {
	constructor(type) {
		let offset = (WHITE_KEY_WIDTH - BLACK_KEY_WIDTH) / 2
		this.type = type
		this.isPressed = false
		this.coat = 0
		this.frequencies = {}
		this.frequencies['C'] = 523.25
		this.frequencies['C#'] = 554.37
		this.frequencies['D'] = 587.33
		this.frequencies['D#'] = 622.25
		this.frequencies['E'] = 659.26

		switch (type) {
			case 'C':
				this.width = WHITE_KEY_WIDTH
				this.height = WHITE_KEY_HEIGHT
				this.position = createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 2 - WHITE_KEY_HEIGHT)
				this.color = 255
				break
			case 'C#':
				this.width = BLACK_KEY_WIDTH
				this.height = BLACK_KEY_HEIGHT
				this.position = createVector(CANVAS_SIZE / 2 + offset, CANVAS_SIZE / 2 - WHITE_KEY_HEIGHT / 2)
				this.color = 60
				break
			case 'D':
				this.width = WHITE_KEY_WIDTH
				this.height = WHITE_KEY_HEIGHT
				this.position = createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 2)
				this.color = 255
				break
			case 'D#':
				this.width = BLACK_KEY_WIDTH
				this.height = BLACK_KEY_HEIGHT
				this.position = createVector(CANVAS_SIZE / 2 + offset, CANVAS_SIZE / 2 + WHITE_KEY_HEIGHT / 2)
				this.color = 60
				break
			case 'E':
				this.width = WHITE_KEY_WIDTH
				this.height = WHITE_KEY_HEIGHT
				this.position = createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 2 + WHITE_KEY_HEIGHT)
				this.color = 255
				break
		}
	}

	draw() {
		this.coat -= 8
		if (this.coat < 0) this.coat = 0

		if (this.isPressed) {
			if (this.color == 255) {
				stroke(colors.black)
			} else {
				noStroke()
			}
			strokeWeight(CANVAS_SIZE / 90)
			fill(this.color)
			rect(this.position.x + 4, this.position.y, this.width - 8, this.height)

			fill(255 - this.color, this.coat)
			noStroke()
			rect(this.position.x + 4, this.position.y, this.width - 8, this.height)
		} else {
			if (this.color == 255) {
				stroke(colors.black)
			} else {
				noStroke()
			}
			strokeWeight(CANVAS_SIZE / 90)
			fill(this.color)
			rect(this.position.x, this.position.y, this.width, this.height)

			fill(255 - this.color, this.coat)
			noStroke()
			rect(this.position.x, this.position.y, this.width, this.height)
		}
	}

	play() {
		this.isPressed = true
		this.coat = 130
		synth.note(this.frequencies[this.type])

		switch (this.type) {
			case 'C':
				effects.push(new EffectC())
				break
			case 'C#':
				effects.push(new EffectCSharp())
				break
			case 'D':
				effects.push(new EffectD())
				break
			case 'D#':
				effects.push(new EffectDSharp())
				break
			case 'E':
				effects.push(new EffectE())
				break
		}
	}

	release() {
		this.isPressed = false
	}
}
