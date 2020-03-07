class Fly {
	constructor() {
		flySound.loop()
	}

	draw() {
		fill(colors.blue)
		circle(mouseX, mouseY, 80)
		strokeWeight(15)
		stroke(colors.gray)
		noFill()
		if (((frameCount / 2) | 0) % 2 == 0) {
			line(mouseX + 40, mouseY, mouseX + 70, mouseY + 12)
			line(mouseX - 40, mouseY, mouseX - 70, mouseY + 12)
		} else {
			line(mouseX + 40, mouseY, mouseX + 70, mouseY - 12)
			line(mouseX - 40, mouseY, mouseX - 70, mouseY - 12)
		}
	}
}
