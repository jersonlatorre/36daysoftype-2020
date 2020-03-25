class T {
	constructor() {
		this.p1 = createVector(350 * FACTOR, 350 * FACTOR)
		this.p2 = createVector(730 * FACTOR, 350 * FACTOR)
		this.handler1 = new Handler(this.p1.x, this.p1.y, 50 * FACTOR)
		this.handler2 = new Handler(this.p2.x, this.p2.y, 50 * FACTOR)
		this.m1 = this.p1.copy().add(this.p2).mult(0.5)
		this.spring1 = new Spring(0, 0, 1, 1)
		this.spring2 = new Spring(0, 0, 1, 1)
		this.spring3 = new Spring(0, 0, 1, 1)
		this.WIDTH = 130 * FACTOR
	}

	draw() {
		this.handler1.update()
		this.handler2.update()

		if (this.handler1.state != HandlerState.NONE) {
			let [ a, b ] = this.reach(this.p1, this.p2, this.handler1.position)
			this.p1 = a.copy()
			this.p2 = b.copy()
			this.handler2.EASING_FACTOR = 1
			this.handler2.target = b.copy()
			this.handler2.update()
		} else {
			this.handler2.EASING_FACTOR = 0.15
		}

		if (this.handler2.state != HandlerState.NONE) {
			let [ a, b ] = this.reach(this.p2, this.p1, this.handler2.position)
			this.p2 = a.copy()
			this.p1 = b.copy()
			this.handler1.EASING_FACTOR = 1
			this.handler1.target = b.copy()
			this.handler1.update()
		} else {
			this.handler1.EASING_FACTOR = 0.15
		}

		// chain
		this.m1 = this.p1.copy().add(this.p2).mult(0.5)
		this.spring1.update(this.m1.x, this.m1.y + 140 * FACTOR)
		this.spring2.update(this.spring1.x, this.spring1.y + 140 * FACTOR)
		this.spring3.update(this.spring2.x, this.spring2.y + 140 * FACTOR)

		noFill()
		stroke(255)
		beginShape()
		strokeWeight(this.WIDTH)
		curveVertex(this.m1.x, this.m1.y)
		curveVertex(this.m1.x, this.m1.y)
		curveVertex(this.spring1.x, this.spring1.y)
		curveVertex(this.spring2.x, this.spring2.y)
		curveVertex(this.spring3.x, this.spring3.y)
		curveVertex(this.spring3.x, this.spring3.y)
		endShape()

		let pp1 = this.p1.copy().add(this.p1.copy().sub(this.p2).normalize().mult(this.WIDTH / 2))
		let pp2 = this.p2.copy().add(this.p2.copy().sub(this.p1).normalize().mult(this.WIDTH / 2))
		let angle = atan2(this.p2.y - this.p1.y, this.p2.x - this.p1.x)
		line(pp1.x, pp1.y, pp2.x, pp2.y)

		push()
		translate(pp1.x, pp1.y)
		rotate(angle)
		fill(colors.white)
		noStroke()
		rect(0, 0, 50 * FACTOR, 100 * FACTOR)
		pop()

		push()
		translate(pp2.x, pp2.y)
		rotate(angle)
		fill(colors.white)
		noStroke()
		rect(-50 * FACTOR, 0, 50 * FACTOR, 100 * FACTOR)
		pop()

		let a = atan2(this.spring2.y - this.spring3.y, this.spring2.x - this.spring3.x) + PI / 2
		push()
		translate(this.spring3.x, this.spring3.y)
		rotate(a)
		fill(colors.white)
		noStroke()
		rect(-100 * FACTOR, -50 * FACTOR, 200 * FACTOR, 50 * FACTOR)
		pop()
		this.handler1.draw()
		this.handler2.draw()
	}

	reach(head, tail, tgt) {
		// returns new head and tail in the format of:
		//   [new_head, new_tail]
		// where `new_head` has been moved to `tgt`

		// calculate the current length
		// (in practice, this should be calculated once and saved,
		//  not re-calculated every time `reach` is called)
		var c_dist = head.copy().sub(tail).mag()

		// calculate the stretched length
		var s_dx = tail.x - tgt.x
		var s_dy = tail.y - tgt.y
		var s_dist = tail.copy().sub(tgt).mag()

		// calculate how much to scale the stretched line
		var scale = c_dist / s_dist

		// return the result
		return [
			// copy the target for the new head
			createVector(tgt.x, tgt.y),
			// scale the new tail based on distance from target
			p5.Vector.lerp(tgt, tail, scale)
		]
	}
}
