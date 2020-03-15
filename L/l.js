class L {
	constructor() {
		this.p1 = createVector(320 * FACTOR, 250 * FACTOR)
		this.p2 = createVector(300 * FACTOR, 800 * FACTOR)
		this.p3 = createVector(780 * FACTOR, 780 * FACTOR)
		this.agents = []
		this.timer = 0

		this.obstacle = new Obstacle(mouseX, mouseY)
		this.agents.push(this.obstacle)
		this.isSpawning = false
	}

	draw() {
		noStroke()
		fill(colors.black)
		circle(this.p1.x, this.p1.y, 50 * FACTOR)
		circle(this.p3.x, this.p3.y, 50 * FACTOR)

		this.timer += deltaTime

		if (this.timer > 1500) 
		{
			this.isSpawning = true
		}

		if (this.timer > 100 && this.isSpawning) {
			this.timer = 0
			this.spawnAgent()
		}

		this.agents.forEach((agent) => {
			agent.draw()
		})

		this.agents.forEach((agent, i) => {
			if (agent.isDead) {
				this.agents.splice(i, 1)
			}
		})
	}

	spawnAgent() {
		this.agents.push(new Agent(this))
	}
}
