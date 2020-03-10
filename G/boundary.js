class Boundary {
	constructor(x, y, w, h) {
		this.body = Matter.Bodies.rectangle(x, y, w, h, {
			isStatic: true
		})
		this.w = w
		this.h = h
		
		Matter.World.add(engine.world, this.body)
	}
}
