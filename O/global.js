class Global {
	/// effects
	static effects = []

	// game
	static game
	static NUMBER_OF_ENEMIES = 8
	static NUMBER_OF_ITEMS = 12
	static MIN_DISTANCE_BETWEEN_ENEMIES = 180
	static MIN_DISTANCE_BETWEEN_ITEMS = 200
	static CAMERA_EASING = 0.05

	// player
	static player
	static PLANET_RADIUS = 1200
	static PLAYER_HEIGHT = 35
	static PLAYER_SPEED = 13 / Global.PLANET_RADIUS
	static PLAYER_JUMP_HEIGHT = 210
	static PLAYER_FRICTION = 0.89
	static JUMP_SPEED = 0.034

	// enemy
	static ENEMY_HEIGHT = 50

	// item
	static ITEM_HEIGHT = 30
}