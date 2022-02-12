class SteeringBehaviours {}

SteeringBehaviours.seek = function(agent, targetPosition, seekRange) {
  let sqrDist = SteeringBehaviours.squaredDistance(targetPosition, agent.position)
  let desiredSeek = createVector()

  if (sqrDist < seekRange * seekRange) {
    desiredSeek = targetPosition.copy().sub(agent.position).normalize().mult(agent.maxSpeed)
  }

  return desiredSeek
}

SteeringBehaviours.arrive = function(agent, targetPosition, arriveDistance, arriveRange) {
  let sqrDist = SteeringBehaviours.squaredDistance(targetPosition, agent.position)
  let desiredArrive = createVector()

  if (sqrDist < arriveRange * arriveRange) {
    if (sqrDist > arriveDistance * arriveDistance) {
      desiredArrive = SteeringBehaviours.seek(agent, targetPosition, 9999999)
    } else {
      let speed = map(sqrDist, 0, arriveDistance * arriveDistance, 0, agent.maxSpeed)
      desiredArrive = targetPosition.copy().sub(agent.position).normalize().mult(speed)
    }
  }

  return desiredArrive
}

SteeringBehaviours.flee = function(agent, targetPosition, fleeRange) {
  let sqrDist = SteeringBehaviours.squaredDistance(targetPosition, agent.position)
  let desiredFlee = createVector()

  if (sqrDist < fleeRange * fleeRange) {
    desiredFlee = agent.position.copy().sub(targetPosition).normalize().mult(agent.maxSpeed)
  }

  return desiredFlee
}

SteeringBehaviours.wander = function(agent, wanderDistance, wanderRadius) {
  let center = agent.position.copy().add(agent.velocity.copy().normalize().mult(wanderDistance))
  let direction = p5.Vector.random2D()
  let target = center.add(direction.mult(wanderRadius))
  let desired = target.sub(agent.position).normalize().mult(agent.maxSpeed)
  return desired
}

SteeringBehaviours.insideRectangle = function(agent, x, y, width, height) {
  if (agent.position.x > x && agent.position.x < x + width && agent.position.y > y && agent.position.y < y + height) {
    return createVector(0, 0)
  } else {
    let center = createVector(x + width / 2, y + height / 2)
    return center.sub(agent.position).normalize().mult(agent.maxSpeed)
  }
}

SteeringBehaviours.alignment = function(agent, neighbors, range) {
  let sqAlignmentDistance
  if (!range) {
    sqAlignmentDistance = 9999999
  } else {
    sqAlignmentDistance = range * range
  }

  let alignmentTotal = createVector()
  let alignmentCounter = 0

  for (let i = 0; i < neighbors.length; i++) {
    let neighbor = neighbors[i]
    let sqDistance = SteeringBehaviours.squaredDistance(
      agent.position.x,
      agent.position.y,
      neighbor.position.x,
      neighbor.position.y
    )

    if (sqDistance < sqAlignmentDistance) {
      alignmentTotal.add(neighbor.velocity)
      alignmentCounter++
    }
  }

  return alignmentCounter > 0 ? alignmentTotal.mult(1 / alignmentCounter) : createVector()
}

SteeringBehaviours.cohesion = function(agent, neighbors, range) {
  let sqCohesionDistance
  if (!range) {
    sqCohesionDistance = 9999999
  } else {
    sqCohesionDistance = range * range
  }

  let cohesionTotal = createVector()
  let cohesionCounter = 0

  for (let i = 0; i < neighbors.length; i++) {
    let neighbor = neighbors[i]
    let sqDistance = SteeringBehaviours.squaredDistance(agent.position.x, agent.position.y, neighbor.position.x, neighbor.position.y)

    if (sqDistance < sqCohesionDistance) {
      cohesionTotal.add(neighbor.position)
      cohesionCounter++
    }
  }

  return cohesionCounter > 0
    ? cohesionTotal.mult(1 / cohesionCounter).sub(agent.position).normalize().mult(agent.maxSpeed)
    : createVector()
}

SteeringBehaviours.separate = function(agent, neighbors, separateRange) {
  let desiredSeparate = createVector()
  let squaredSeparatedRange = separateRange * separateRange

  neighbors.forEach((neighbor) => {
    if (
      abs(agent.position.x - neighbor.position.x) < separateRange &&
      abs(agent.position.y - neighbor.position.y) < separateRange
    ) {
      let sqrDist = SteeringBehaviours.squaredDistance(agent.position, neighbor.position)
      if (sqrDist < squaredSeparatedRange) {
        let speed = map(sqrDist, 0, squaredSeparatedRange, agent.maxSpeed, 0)
        let flee = agent.position.copy().sub(neighbor.position).normalize().mult(speed)
        desiredSeparate.add(flee)
      }
    }
  })

  return desiredSeparate
}

SteeringBehaviours.squaredDistance = function(p1, p2) {
  return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
}
