class Goal {
	constructor() {
		this.body = Matter.Bodies.rectangle(5.25 * CANVAS_SIZE / 12, 6 * CANVAS_SIZE / 12, CANVAS_SIZE / 24, CANVAS_SIZE / 6, {
			isStatic: true,
			isSensor: true,
			label: 'goal'
		})

		Matter.World.add(engine.world, this.body)
	}
}