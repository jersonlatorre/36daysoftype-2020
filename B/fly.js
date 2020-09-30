class Fly {
	constructor() {
		flySound.loop()
	}

	draw() {
		fill(colors.blue)
		circle(mouseX, mouseY, CANVAS_SIZE / 15)
		strokeWeight(CANVAS_SIZE / 65)
		stroke(colors.gray)
		noFill()
		if (((frameCount / 2) | 0) % 2 == 0) {
			line(mouseX + CANVAS_SIZE / 22, mouseY, mouseX + CANVAS_SIZE / 13, mouseY + CANVAS_SIZE / 80)
			line(mouseX - CANVAS_SIZE / 22, mouseY, mouseX - CANVAS_SIZE / 13, mouseY + CANVAS_SIZE / 80)
		} else {
			line(mouseX + CANVAS_SIZE / 22, mouseY, mouseX + CANVAS_SIZE / 13, mouseY - CANVAS_SIZE / 80)
			line(mouseX - CANVAS_SIZE / 22, mouseY, mouseX - CANVAS_SIZE / 13, mouseY - CANVAS_SIZE / 80)
		}
	}
}
