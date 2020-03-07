class Tree {
	leaves = []
	branches = []
	preHullPoints = []
	hullPoints = []

	preBranchesCount = -1
	speed = 3
	pd
	MIN_DISTANCE = 12
	MAX_DISTANCE = 40
	isAnimationFinished = false

	constructor() {
		this.pd = new PoissonDiskSampling({
			shape: [ CANVAS_SIZE, CANVAS_SIZE ],
			minDistance: 12,
			maxDistance: 500,
			tries: 30,
			distanceFunction: function(p) {
				let c = letterImage.get(p[0], p[1])
				let b = brightness(c)
				return b / 255
			}
		})

		this.pd.fill()
		this.generatePoints()
	}

	start(x, y) {
		console.log('START ANIMATION')

		let points = this.pd.getAllPoints()
		points.forEach((p) => {
			this.leaves.push(new Leaf(createVector(p[0], p[1])))
		})

		let rootPosition = createVector(x, y)
		let rootDirection = createVector(0, -this.speed)
		let branch = new Branch(null, rootPosition, rootDirection)
		this.branches.push(branch)
	}

	clear() {
		console.log('CLEAR')
		this.leaves = []
		this.branches = []
		this.isAnimationFinished = false
		this.preBranchesCount = -1
		this.generatePoints()
	}

	generatePoints() {
		let points = this.pd.getAllPoints()
		points.forEach((p) => {
			this.leaves.push(new Leaf(createVector(p[0], p[1])))
		})
	}

	grow() {
		if (this.isAnimationFinished) return

		this.leaves.forEach((leaf, leafIndex) => {
			let minSqrDistance = 9999996
			let minBranchIndex = -1
			this.branches.forEach((branch, branchIndex) => {
				let distance =
					(leaf.position.x - branch.position.x) * (leaf.position.x - branch.position.x) +
					(leaf.position.y - branch.position.y) * (leaf.position.y - branch.position.y)
				if (distance < minSqrDistance) {
					minSqrDistance = distance
					minBranchIndex = branchIndex
				}
			})

			let minBranch = this.branches[minBranchIndex]
			let minDistance = sqrt(minSqrDistance)

			if (minDistance < this.MIN_DISTANCE) {
				// chocó con el branch
				this.leaves.splice(leafIndex, 1)
			} else if (minDistance >= this.MIN_DISTANCE && minDistance <= this.MAX_DISTANCE) {
				// dentro del rango afectable
				let u = p5.Vector.sub(leaf.position, minBranch.position).normalize().mult(this.speed)
				minBranch.direction.add(u)
				minBranch.counter++
			}
		})

		this.preHullPoints = []
		this.hullPoints = []
		this.branches.forEach((branch) => {
			// this.preHullPoints.push([ branch.position.x, branch.position.y ])
			if (branch.counter > 0) {
				let newDirection = branch.direction.mult(1 / branch.counter)
				let newPosition = p5.Vector.add(branch.position, newDirection)
				let newBranch = new Branch(null, newPosition, newDirection)
				branch.child = newBranch
				this.branches.push(newBranch)
				branch.counter = 0
				branch.direction = p5.Vector.random2D()
			}
		})

		if (this.branches.length == this.preBranchesCount) {
			if (this.branches.length > 0) {
				this.isAnimationFinished = true
				console.log('END ANIMATION')

				setTimeout(() => {
					backgroundColor = colors.blue
					this.clear()
				}, 1000)

				setTimeout(() => {
					startFade()
				}, 800)
			}
		}

		this.preBranchesCount = this.branches.length
	}

	draw() {
		this.leaves.forEach((leaf) => {
			leaf.draw()
		})

		this.branches.forEach((branch) => {
			branch.draw()
		})

		noFill()
		fill('red')
		noStroke()
	}
}
