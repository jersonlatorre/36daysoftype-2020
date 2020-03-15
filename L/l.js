class L {
	constructor() {
		this.p1 = createVector(320, 250)
		this.p2 = createVector(320, 780)
		this.p3 = createVector(780, 780)
		this.agents = []
		this.timer = 0
	}

	draw() {
		noStroke()
		fill(colors.black)
		circle(this.p1.x, this.p1.y, 30)
		circle(this.p3.x, this.p3.y, 50)
		// fill('rgba(0, 0, 0, 0.1)')
		// circle(this.p2.x, this.p2.y, 20)
		this.timer += deltaTime
		if (this.timer > 100) {
			this.timer = 0
			this.spawnAgent()
		}

		this.agents.forEach((agent, i) => {
			agent.draw()
			if (agent.isDead) {
				this.agents.splice(i, 1)
			}
		})
	}

	spawnAgent() {
		this.agents.push(new Agent(this))
	}
}
