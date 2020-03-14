class SteeringBehaviours {
	static seek(agent, targetPosition) {
		let desired = p5.Vector.sub(targetPosition, agent.position).normalize().mult(agent.maxForce)
		return p5.Vector.sub(desired, agent.velocity).limit(agent.maxSteer)
	}

	static arrive(agent, targetPosition, range) {
		let difference = p5.Vector.sub(targetPosition, agent.position)
		let distance = difference.mag()
		let desired = difference.normalize().mult(agent.maxForce)
		if (distance < range) desired.mult(distance / range)
		return p5.Vector.sub(desired, agent.velocity).limit(agent.maxSteer)
	}
}
