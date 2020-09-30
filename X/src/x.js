class X {
	constructor() {
		this.leftHeart = new LeftHeart(485, 540)
		this.rightHeart = new RightHeart(595, 540)
	}

	draw() {
		this.leftHeart.draw()
		this.rightHeart.draw()

		stroke(colors.black)
		let d = dist(this.leftHeart.position.x, this.leftHeart.position.y, this.rightHeart.position.x, this.rightHeart.position.y)
		d = constrain(d, 0, 200)
		strokeWeight(map(d, 0, 200, 25, 8))
		line(this.leftHeart.position.x, this.leftHeart.position.y, this.rightHeart.position.x, this.rightHeart.position.y)

		noStroke()
		fill(colors.black)
		circle(this.leftHeart.position.x, this.leftHeart.position.y, 25)
		circle(this.rightHeart.position.x, this.rightHeart.position.y, 25)
	}
}