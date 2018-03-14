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

	baddie1 = game.add.sprite(Math.random()*759, 30, 'baddie')
		baddie1.animations.add('left', [0,1],10,true);
		baddie1.animations.add('right', [2,3],10,true);
		game.physics.arcade.enable(baddie1);
		baddie1.body.gravity.y = 600;
		baddie1.body.bounce.y = 0.4;
		baddie1.body.collideWorldBounds = true;

	baddie2= game.add.sprite(Math.random()*759, 30, 'baddie')
		baddie2.animations.add('left', [0,1],10,true);
		baddie2.animations.add('right', [2,3],10,true);
		game.physics.arcade.enable(baddie2);
		baddie2.body.gravity.y = 600;
		baddie2.body.bounce.y = 0.4;
		baddie2.body.collideWorldBounds = true;

	baddie3 = game.add.sprite(Math.random()*759, 30, 'baddie')
		baddie3.animations.add('left', [0,1],10,true);
		baddie3.animations.add('right', [2,3],10,true);
		game.physics.arcade.enable(baddie3);
		baddie3.body.gravity.y = 600;
		baddie3.body.bounce.y = 0.4;
		baddie3.body.collideWorldBounds = true;

	baddie4 = game.add.sprite(Math.random()*759, 30, 'baddie')
		baddie4.animations.add('left', [0,1],10,true);
		baddie4.animations.add('right', [2,3],10,true);
		game.physics.arcade.enable(baddie4);
		baddie4.body.gravity.y = 600;
		baddie4.body.bounce.y = 0.4;
		baddie4.body.collideWorldBounds = true;

	baddie5 = game.add.sprite(Math.random()*759, 30, 'baddie')
		baddie5.animations.add('left', [0,1],10,true);
		baddie5.animations.add('right', [2,3],10,true);
		game.physics.arcade.enable(baddie5);
		baddie5.body.gravity.y = 600;
		baddie5.body.bounce.y = 0.4;
		baddie5.body.collideWorldBounds = true;

		//create stars
	stars = game.add.physicsGroup();
	stars.enableBody = true;
	for (var i = 0; i < 12; i++){
		var star = stars.create(i * 70,0, 'star' );
		star.body.gravity.y = 100;
		star.body.bounce.y = 0.1 + Math.random()* 0.8;
	}

	diamonds = game.add.physicsGroup();
	diamonds.enableBody = true;
	for (var i = 0; i < 1; i++){
		var diamond = diamonds.create(Math.random()*750,0, 'diamond' );
		diamond.body.gravity.y = 100;
		diamond.body.bounce.y = 0.1 + Math.random()* 0.8;
	}


	firstaids = game.add.physicsGroup();
	firstaids.enableBody = true;
	for (var i = 0; i < 1; i++){
		var firstaid = firstaids.create(Math.random()*750,0, 'firstaid' );
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
	game.physics.arcade.collide(firstaids, platforms);
	game.physics.arcade.collide(diamonds, platforms);

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
	game.physics.arcade.overlap(player, diamonds, collectDiamonds);
	game.physics.arcade.overlap(player, baddie, loseLife);
	game.physics.arcade.overlap(player, firstaids, addLife);

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

function moveEnemy1(){
	if(baddie1.x > 759){
		baddie1.animations.play('left');
		baddie1.body.velocity.x = -120;
	}else if(baddie1.x < 405){
		baddie1.animations.play('right');
		baddie1.body.velocity.x = 120;
	}
}

	function moveEnemy2(){
	if(baddie2.x > 759){
		baddie2.animations.play('left');
		baddie2.body.velocity.x = -120;
	}else if(baddie2.x < 405){
		baddie2.animations.play('right');
		baddie2.body.velocity.x = 120;
	}
}

	function moveEnemy3(){
	if(baddie3.x > 759){
		baddie3.animations.play('left');
		baddie3.body.velocity.x = -120;
	}else if(baddie3.x < 405){
		baddie3.animations.play('right');
		baddie3.body.velocity.x = 120;
	}
}

	function moveEnemy4(){
	if(baddie4.x > 759){
		baddie4.animations.play('left');
		baddie4.body.velocity.x = -120;
	}else if(baddie4.x < 405){
		baddie4.animations.play('right');
		baddie4.body.velocity.x = 120;
	}
}
	function moveEnemy5(){
	if(baddie5.x > 759){
		baddie5.animations.play('left');
		baddie5.body.velocity.x = -120;
	}else if(baddie5.x < 405){
		baddie5.animations.play('right');
		baddie5.body.velocity.x = 120;
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

function collectDiamonds(player, diamond){
	score += 10;
	scoretext.setText(score);

	diamond.kill();
	diamond.reset(Math.random()* 759, 0);
}


