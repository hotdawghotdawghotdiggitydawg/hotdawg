var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload:preload, create:create, update:update });
var score = 0;
var lives = 3;

function preload(){
	game.load.image('sky','assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.image('firstaid', 'assets/firstaid.png');
	game.load.image('diamond', 'assets/diamond.png');
	game.load.spritesheet('dude', 'assets/dude.png',32,48);
	game.load.spritesheet('baddie', 'assets/baddie.png',32,32);
}

function create(){
	//turn on physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//create sky
	game.add.sprite(0,0,'sky');
	//create a group of platforms
	platforms = game.add.physicsGroup();
	platforms.enableBody = true;
	//create ground
	var ground = platforms.create(0,550, 'ground');
	ground.scale.setTo(2,2);
	ground.body.immovable = true;
	//create ledges
	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-100, 250, 'ground');
	ledge.body.immovable = true;

	//setup text
	var style = {font: "bold 32px Arial", fill: "#fff"};

	//create and position score
	scorelabel = game.add.text(300,560, "Score: ", style);
	scoretext = game.add.text(420,560, score, style);

	lifelabel = game.add.text(10,5, "Lives: ", style);
	lifetext = game.add.text(120,5, lives, style);

	//Lesson 8

	player = game.add.sprite(32, 400, 'dude')
		player.animations.add('left', [0,1,2,3],10,true);
		player.animations.add('right', [5,6,7,8],10,true);
		game.physics.arcade.enable(player);
		player.body.gravity.y = 280;
		player.body.bounce.y = 0.4;
		player.body.collideWorldBounds = true;

		//create enemy

	baddie = game.add.sprite(30, 30, 'baddie')
		baddie.animations.add('left', [0,1],10,true);
		baddie.animations.add('right', [2,3],10,true);
		game.physics.arcade.enable(baddie);
		baddie.body.gravity.y = 600;
		baddie.body.bounce.y = 0.4;
		baddie.body.collideWorldBounds = true;

		//create stars
	stars = game.add.physicsGroup();
	stars.enableBody = true;
	for (var i = 0; i < 12; i++){
		var star = stars.create(i * 70,0, 'star' );
		star.body.gravity.y = 100;
		star.body.bounce.y = 0.1 + Math.random()* 0.8;
	}

	diamond = game.add.physicsGroup();
	diamond.enableBody = true;
	for (var i = 0; i < 12; i++){
		var diamond = diamond.create(i * 70,0, 'diamond' );
		diamond.body.gravity.y = 100;
		diamond.body.bounce.y = 0.1 + Math.random()* 0.8;
	}


	firstaid = game.add.physicsGroup();
	firstaid.enableBody = true;
	for (var i = 0; i < 12; i++){
		var firstaid = firstaid.create(i * 70,0, 'firstaid' );
		firstaid.body.gravity.y = 100;
		firstaid.body.bounce.y = 0.1 + Math.random()* 0.8;
	}

	//create keyboard entries
	cursors = game.input.keyboard.createCursorKeys();

	wKey = game.input.keyboard.addKey
		(Phaser.Keyboard.W);
	aKey = game.input.keyboard.addKey
		(Phaser.Keyboard.A);
	dKey = game.input.keyboard.addKey
		(Phaser.Keyboard.D);


}

function update(){
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(baddie, platforms);
	game.physics.arcade.collide(firstaid, platforms);
	game.physics.arcade.collide(diamond, platforms);

	//set player velocity to 0 if now events
	player.body.velocity.x = 0;

	if(cursors.left.isDown || aKey.isDown){
		player.animations.play('left');
		player.body.velocity.x = -150;

	} else if(cursors.right.isDown || dKey.isDown){
		player.animations.play('right');
		player.body.velocity.x = 150;
	} else {
		player.animations.stop();
		player.frame = 4;
	}


	if((cursors.up.isDown || wKey.isDown) && player.body.touching.down){
		player.body.velocity.y = -300
	}


	//lesson 9
	game.physics.arcade.overlap(player, stars, collectStar);
	game.physics.arcade.overlap(player, diamond, collectDiamond);
	game.physics.arcade.overlap(player, baddie, loseLife);
	game.physics.arcade.overlap(player, firstaid, addLife);

	//call function move Enemy
	moveEnemy();

	if(lives == 0){
		endGame()
	}


}

function endGame(){
	player.kill();
	scorelabel.text = "YOU DIED! You scored " + score;
	scoretext.visible = false;
	lifelabel.visible = false;
	lifetext.visible = false;
}

function moveEnemy(){
	if(baddie.x > 759){
		baddie.animations.play('left');
		baddie.body.velocity.x = -120;
	}else if(baddie.x < 405){
		baddie.animations.play('right');
		baddie.body.velocity.x = 120;
	}

}

function loseLife(player, baddie){
	lives = lives - 1; 
	lifetext.setText(lives);

	baddie.kill();
	baddie.reset(20,20);	
}

function addLife(player, firstaid){
	lives = lives + 1; 
	lifetext.setText(lives);

	firstaid.kill();
	firstaid.reset(Math.random()* 759, 0);	
}

function collectStar(player, star){
	score += 1;
	scoretext.setText(score);

	star.kill();
	star.reset(Math.random()* 759, 0);
}

function collectDiamond(player, diamond){
	score += 10;
	scoretext.setText(score);

	diamond.kill();
	diamond.reset(Math.random()* 759, 0);
}


