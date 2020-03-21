let CANVAS_SIZE = 700
let FACTOR = CANVAS_SIZE / 1080
let pointer
let p1, p2
let c, r
let N_DOTS = 25
let DOTTED_CIRCLE_RADIUS_FACTOR = 0.65
let intersections = []
let MIN_STROKE = 10 * FACTOR
let MAX_STROKE = 38 * FACTOR
let DOT_STROKE = 18 * FACTOR
let DOT_RADIUS = 45 * FACTOR
let INSIDE_LINE_WIDTH = 7 * FACTOR

let maxStroke = MIN_STROKE
let maxStrokeTarget = MAX_STROKE

let bgm
let fft
let spectrum

function preload() {
	pointer = loadImage('assets/hand.svg')
	bgm = loadSound('assets/bgm.mp3')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	pointer.resize(CANVAS_SIZE / 25, 0)
	noCursor()

	p1 = new Dot(320 * FACTOR, 200 * FACTOR, 65 * FACTOR)
	p2 = new Dot(320 * FACTOR, 920 * FACTOR, 65 * FACTOR)
	c = createVector(600 * FACTOR, 480 * FACTOR)
	r = 400 * FACTOR

	fft = new p5.FFT()
}

function draw() {
	background(colors.blue)
	p1.update()
	p2.update()

	spectrum = fft.analyze()
	maxStroke += 0.08 * (maxStrokeTarget - maxStroke)

	stroke(colors.black)
	noFill()
	stroke(0, 255)
	strokeWeight(MIN_STROKE)

	// draw circle
	circle(c.x, c.y, r)

	// draw line
	line(p1.position.x, p1.position.y, p2.position.x, p2.position.y)

	if (getIntersections().length == 0) {
		maxStrokeTarget = MIN_STROKE
	}

	// draw 'tangent
	if (intersectionLineCircle(p1.position, p2.position, c, r / 2).length == 0) {
		drawWhenNoIntersects()
	} else {
		drawWhenIntersects()
	}

	// draw middle circle
	fill(colors.black)
	noStroke()
	if (bgm.isLooping()) {
		circle(c.x, c.y, spectrum[0] * 0.7 * FACTOR)
	} else {
		circle(c.x, c.y, 120 * FACTOR)
	}

	// draw
	p1.draw()
	p2.draw()
	image(pointer, mouseX - 18 * FACTOR, mouseY)

	fill(0)
	textSize(52 * FACTOR)
}

function getNearestIntersectionPoint() {
	let min = 9999999
	let minI
	for (let i = 0; i < intersections.length; i++) {
		let d = p5.Vector.sub(intersections[i], p2.position).mag()
		if (d < min) {
			min = d
			minI = i
		}
	}
	return intersections[minI]
}

function getFarestIntersectionPoint() {
	let max = -9999999
	let maxI
	for (let i = 0; i < intersections.length; i++) {
		let d = p5.Vector.sub(intersections[i], p2.position).mag()
		if (d > max) {
			max = d
			maxI = i
		}
	}
	return intersections[maxI]
}

function drawWhenNoIntersects() {
	let a = p5.Vector.sub(c, p1.position)
	let b = p5.Vector.sub(p2.position, p1.position)
	let projectionMagnitude = a.copy().dot(b) / b.mag()
	let projection = p1.position.copy().add(p2.position.copy().sub(p1.position).normalize().mult(projectionMagnitude))
	let circleIntersection = c.copy().add(projection.copy().sub(c).normalize().mult(r / 2))

	let v1 = circleIntersection.copy().sub(p2.position)
	let v2 = p1.position.copy().sub(p2.position)
	let cross = v1.copy().cross(v2)

	if (cross.z < 0) {
		if (isBetween(projection, p1.position, p2.position)) {
			maxStrokeTarget = MAX_STROKE

			// bold circle
			stroke(colors.black)
			strokeWeight(maxStroke)
			noFill()
			line(p2.position.x, p2.position.y, projection.x, projection.y)
			line(projection.x, projection.y, circleIntersection.x, circleIntersection.y)
			circle(c.x, c.y, r)

			// dotted arc
			let dAngle = 2 * PI / (N_DOTS - 1)
			for (let angle = 0; angle <= 2 * PI; angle += dAngle) {
				let i = map(angle, 0, PI / 2, 0, spectrum.length / 80) | 0
				let value = spectrum[i]
				let x = c.x + DOTTED_CIRCLE_RADIUS_FACTOR * r * cos(angle - PI)
				let y = c.y + DOTTED_CIRCLE_RADIUS_FACTOR * r * sin(angle - PI)
				push()
				translate(x, y)
				rotate(angle + PI / 2)
				noStroke()
				fill(colors.black)
				if (bgm.isLooping()) {
					circle(0, 0, maxStroke / MAX_STROKE * -value * FACTOR / 10)
				} else {
					circle(0, 0, 15 * FACTOR)
				}
				pop()
			}

			// little white circles
			fill(colors.white)
			stroke(colors.black)
			strokeWeight(maxStroke * 0.5)
			circle(projection.x, projection.y, maxStroke * 1.3)
			circle(circleIntersection.x, circleIntersection.y, maxStroke * 1.3)

			// little black circle
			let u = p1.position.copy().sub(p2.position).normalize()
			let nu = u.copy().rotate(-PI / 2)
			let lc = p2.position.copy().add(u.mult(100 * FACTOR)).add(nu.mult(80 * FACTOR))
			fill(colors.black)
			noStroke()
			circle(lc.x, lc.y, maxStroke * 1.5)
		} else {
			maxStrokeTarget = MIN_STROKE
		}
	}
}

function drawWhenIntersects() {
	intersections = getIntersections()
	if (intersections.length > 0) {
		maxStrokeTarget = MAX_STROKE
		stroke(colors.black)
		strokeWeight(maxStroke)
		let nearest = getNearestIntersectionPoint()
		let farest = getFarestIntersectionPoint()
		line(p2.position.x, p2.position.y, nearest.x, nearest.y)

		// draw arc
		let angleF = atan2(nearest.y - c.y, nearest.x - c.x)
		let angleI = atan2(farest.y - c.y, farest.x - c.x)
		stroke(colors.black)
		strokeWeight(maxStroke)
		arc(c.x, c.y, r, r, angleI, angleF)

		// dotted arc
		noStroke()
		fill(colors.black)
		if (angleI > angleF) angleF += 2 * PI
		for (let angle = angleI; angle <= angleF + 0.02; angle += (angleF - angleI) / (N_DOTS - 1)) {
			let i = map(angle, angleI, angleF, 0, spectrum.length / 80) | 0
			let value = spectrum[i]
			let x = c.x + DOTTED_CIRCLE_RADIUS_FACTOR * r * cos(angle)
			let y = c.y + DOTTED_CIRCLE_RADIUS_FACTOR * r * sin(angle)
			push()
			translate(x, y)
			rotate(angle - PI / 2)
			noStroke()
			fill(colors.black)
			if (bgm.isLooping()) {
				circle(0, 0, maxStroke / MAX_STROKE * (-value / 10) * FACTOR)
			} else {
				circle(0, 0, 15 * FACTOR)
			}
			pop()
		}

		// little black circle
		let u = p1.position.copy().sub(p2.position).normalize()
		let nu = u.copy().rotate(-PI / 2)
		let lc = p2.position.copy().add(u.mult(100 * FACTOR)).add(nu.mult(80 * FACTOR))
		fill(colors.black)
		noStroke()
		circle(lc.x, lc.y, maxStroke * 1.5)

		intersections.forEach((intersection, i) => {
			fill(colors.white)
			stroke(colors.black)
			strokeWeight(maxStroke * 0.5)
			circle(intersection.x, intersection.y, maxStroke * 1.3)
		})
	} else {
		maxStrokeTarget = MIN_STROKE
	}
}

function getIntersections() {
	let intersections = intersectionLineCircle(p1.position, p2.position, c, r / 2)

	for (let i = 0; i < intersections.length; i++) {
		let intersection = intersections[i]
		if (!isBetween(intersection, p1.position, p2.position)) {
			return []
		}
	}

	return intersections
}

function isBetween(p, a, b) {
	let d = p5.Vector.sub(b, a).mag()
	let da = p5.Vector.sub(p, a).mag()
	let db = p5.Vector.sub(p, b).mag()
	return da / d < 1 && db / d < 1
}

function intersectionLineCircle(p1, p2, cpt, r) {
	let sign = function(x) {
		return x < 0.0 ? -1 : 1
	}

	let x1 = p1.copy().sub(cpt)
	let x2 = p2.copy().sub(cpt)

	let dv = x2.copy().sub(x1)
	let dr = dv.mag()
	let D = x1.x * x2.y - x2.x * x1.y

	// evaluate if there is an intersection
	let di = r * r * dr * dr - D * D
	if (di < 0.0) return []

	let t = sqrt(di)

	ip = []
	ip.push(new p5.Vector(D * dv.y + sign(dv.y) * dv.x * t, -D * dv.x + abs(dv.y) * t).div(dr * dr).add(cpt))
	if (di > 0.0) {
		ip.push(new p5.Vector(D * dv.y - sign(dv.y) * dv.x * t, -D * dv.x - abs(dv.y) * t).div(dr * dr).add(cpt))
	}

	return ip
}

function mousePressed() {
	if (!bgm.isLooping()) bgm.loop()
}
