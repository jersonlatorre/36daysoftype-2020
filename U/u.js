class U {
	constructor() {
		this.WIDTH = 480 * FACTOR
		this.BAR_HEIGHT = 350 * FACTOR
		this.MIDDLE_HEIGHT = 60 * FACTOR
		this.N_BARS = 3
		this.GAP = 10 * FACTOR
		this.TOP_HEIGHT = 10 * FACTOR
		this.CENTER = createVector(540 * FACTOR, 625 * FACTOR)

		this.spectrum = []
		this.spectrumTops1 = []
		this.spectrumTops2 = []
		this.spectrumTops3 = []

		for (let i = 0; i < 1024; i++) {
			this.spectrumTops1[i] = 0
			this.spectrumTops2[i] = 0
			this.spectrumTops3[i] = 0
		}

		this.currentSong = -1
	}

	draw() {
		this.spectrum = fft.analyze()
		let i

		let w = 0.5 * this.WIDTH / this.N_BARS
		// draw arcs
		for (i = 0; i < this.N_BARS; i++) {
			let r = w / 2 + w * i
			noFill()
			strokeWeight(w - this.GAP)
			if (
				this.isMouseOverArc(i) ||
				this.isMouseOverBar(this.N_BARS - i - 1, 100 * FACTOR) ||
				this.isMouseOverBar(i + this.N_BARS, 100 * FACTOR)
			) {
				stroke('rgb(65, 65, 65)')
			} else {
				stroke(colors.black)
			}

			strokeCap(SQUARE)
			arc(this.CENTER.x, this.CENTER.y, 2 * r, 2 * r, 0, PI)
		}

		// draw little arc
		for (i = 0; i < this.N_BARS; i++) {
			if (this.currentSong == this.N_BARS - i - 1) {
				let r = w / 2 + w * i
				stroke(colors.darkgray)
				strokeCap(ROUND)
				strokeWeight(w / 4)
				let a = amplitude.getLevel() * PI
				if (a > 0 && a < PI) {
					arc(
						this.CENTER.x,
						this.CENTER.y,
						2 * r,
						2 * r,
						PI / 2 - a * 0.7 - PI / 8,
						PI / 2 + a * 0.7 + PI / 8
					)
				}
			}
		}

		// draw bars
		rectMode(CENTER)
		for (i = 0; i < this.N_BARS * 2; i++) {
			let n = map(i, 0, this.N_BARS * 2 - 1, 0, this.spectrum.length / 4) | 0

			let x, y, v, h
			// bars
			v = this.spectrum[n] / 255
			h = this.MIDDLE_HEIGHT + this.BAR_HEIGHT * v
			x = this.CENTER.x - this.WIDTH / 2 + i * w + w / 2
			y = this.CENTER.y - h / 2

			// if mouse touch a line
			if (
				this.isMouseOverBar(i, h) ||
				this.isMouseOverBar(this.N_BARS * 2 - i - 1, h) ||
				this.isMouseOverArc(ceil(this.N_BARS / 2) - i) ||
				this.isMouseOverArc(-ceil(this.N_BARS / 2) + i - 1)
			) {
				fill('rgb(65, 65, 65)')
			} else {
				fill(colors.black)
			}
			noStroke()
			rect(x, y, w - this.GAP, h)

			// tops 1
			this.spectrumTops1[n] += 0.1 * (this.spectrum[n] - this.spectrumTops1[n])
			if (this.spectrumTops1[n] < this.spectrum[n]) {
				this.spectrumTops1[n] = this.spectrum[n]
			}

			v = this.spectrumTops1[n] / 255
			h = this.MIDDLE_HEIGHT + this.BAR_HEIGHT * v
			x = this.CENTER.x - this.WIDTH / 2 + i * w + w / 2
			y = this.CENTER.y - h
			fill(colors.blue)
			noStroke()
			rect(x, y - this.TOP_HEIGHT / 2, w - this.GAP, 15)

			// tops 2
			this.spectrumTops2[n] += 0.1 * (this.spectrumTops1[n] - this.spectrumTops2[n])
			if (this.spectrumTops2[n] < this.spectrumTops1[n]) {
				this.spectrumTops2[n] = this.spectrumTops1[n]
			}

			v = this.spectrumTops2[n] / 255
			h = this.MIDDLE_HEIGHT + this.BAR_HEIGHT * v
			x = this.CENTER.x - this.WIDTH / 2 + i * w + w / 2
			y = this.CENTER.y - h
			fill(colors.red)
			noStroke()
			rect(x, y - 2 * this.TOP_HEIGHT, w - this.GAP, 15)

			// tops 3
			this.spectrumTops3[n] += 0.02 * (this.spectrumTops2[n] - this.spectrumTops3[n])
			if (this.spectrumTops3[n] < this.spectrumTops2[n]) {
				this.spectrumTops3[n] = this.spectrumTops2[n]
			}

			v = this.spectrumTops3[n] / 255
			h = this.MIDDLE_HEIGHT + this.BAR_HEIGHT * v
			x = this.CENTER.x - this.WIDTH / 2 + i * w + w / 2
			y = this.CENTER.y - h
			fill(colors.black)
			noStroke()
			rect(x, y - 3.5 * this.TOP_HEIGHT, w - this.GAP, 15)
		}
	}

	isMouseOverArc(n) {
		let w = 0.5 * this.WIDTH / this.N_BARS
		let r1 = w * n
		let r2 = w * (n + 1)
		let d = dist(mouseX, mouseY, this.CENTER.x, this.CENTER.y)
		if (mouseY >= this.CENTER.y && d <= r2 && d >= r1) return true
	}

	isMouseOverBar(n, h) {
		let w = 0.5 * this.WIDTH / this.N_BARS
		let x = this.CENTER.x - this.WIDTH / 2 + n * w + w / 2
		let y = this.CENTER.y - h / 2

		if (mouseX >= x - w / 2 && mouseX <= x + w / 2 && mouseY >= y - h / 2 && mouseY <= y + h / 2) {
			return true
		}
	}

	click() {
		if (this.isMouseOverArc(0)) {
			bgm1.stop()
			bgm2.stop()
			bgm3.stop()
			setTimeout(() => {
				bgm3.play()
			}, 100)
			this.currentSong = 2
		}

		if (this.isMouseOverArc(1)) {
			bgm1.stop()
			bgm2.stop()
			bgm3.stop()
			setTimeout(() => {
				bgm2.play()
			}, 100)
			this.currentSong = 1
		}

		if (this.isMouseOverArc(2)) {
			bgm1.stop()
			bgm2.stop()
			bgm3.stop()
			setTimeout(() => {
				bgm1.play()
			}, 100)
			this.currentSong = 0
		}
	}
}
