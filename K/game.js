class Game {
	static npcs = []
	static effects = []
	static isShaking = false
	static waypoints = [
		new p5.Vector(100, 100),
		new p5.Vector(100, 200),
		new p5.Vector(100, 300),
		new p5.Vector(100, 400),
		new p5.Vector(200, 200),
		new p5.Vector(300, 200),
		new p5.Vector(400, 100),
		new p5.Vector(400, 300),
		new p5.Vector(400, 400)
	]

	constructor() {
		this.towerPositions = [ new p5.Vector(220, 100), new p5.Vector(180, 320), new p5.Vector(400, 200) ]
		this.paths = [ [ 4, 1, 0 ], [ 4, 1, 2, 3 ], [ 4, 5, 6 ], [ 4, 5, 7, 8 ] ]
		this.towers = []
		this.timer = 0
		this.allowSpawning = false
		this.DELAY_TO_START = 1

		this.towerPositions.forEach((p) => {
			let tower = new Tower(p.x, p.y)
			this.towers.push(tower)
		})
	}

	draw() {
		clear()
		background(colors.white)

		push()

		if (Game.isShaking) {
			translate(
				-Global.shakeAmplitude / 2 + Global.shakeAmplitude * noise(millis() / Global.shakeFrequency),
				-Global.shakeAmplitude / 2 + Global.shakeAmplitude * noise(millis() / Global.shakeFrequency + 10)
			)
		}

		this.drawPaths()
		this.drawPoints()
		this.drawTowers()
		this.drawNpcs()
		this.drawEffects()

		this.timer += deltaTime / 1000

		if (this.timer >= this.DELAY_TO_START) {
			this.allowSpawning = true
		}

		if (this.timer >= 1 && this.allowSpawning) {
			this.timer = 0
			this.spawnNpc()
		}

		pop()
	}

	drawEffects() {
		Game.effects.forEach((effect, i) => {
			effect.draw()
			if (effect.isDead) {
				Game.effects.splice(i, 1)
			}
		})
	}

	drawPoints() {
		Game.waypoints.forEach((p, i) => {
			noStroke()
			fill('rgba(0, 0, 0, 0.1)')
			circle(p.x, p.y, 6)
		})

		fill(colors.gray)
		circle(200, 200, 60)

		fill('rgba(0, 0, 0, 0.07)')
		circle(200, 200, 40)
	}

	drawPaths() {
		this.paths.forEach((path) => {
			for (let i = 0; i < path.length; i++) {
				if (i == path.length - 1) {
					let p = Game.waypoints[path[i]]
					noStroke()
					fill(colors.gray)
					circle(p.x, p.y, 55)

					strokeWeight(2)
					stroke(colors.blue)
					fill(colors.blue)
					circle(p.x, p.y, 30)
				} else {
					let p1 = Game.waypoints[path[i]]
					let p2 = Game.waypoints[path[i + 1]]
					stroke(colors.gray)
					strokeWeight(38)
					line(p1.x, p1.y, p2.x, p2.y)
				}
			}
		})
	}

	drawNpcs() {
		Game.npcs.forEach((npc, i) => {
			npc.draw()
			if (npc.isDead) {
				Game.npcs.splice(i, 1)
			}
		})
	}

	spawnNpc() {
		let npc = new Npc(this.paths[parseInt(random(0, this.paths.length))])
		Game.npcs.push(npc)
	}

	drawTowers() {
		this.towers.forEach((tower) => {
			tower.draw()
		})
	}
}
