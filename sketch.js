var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg, restartImg
var jumpSound, checkPointSound, dieSound


function preload() {

  bg_img = loadImage("background.jpg");

  groundImage = loadImage("ground.jpg");

  cloudImage = loadImage("cloud.png");

  flappybird = loadImage("newbird2.png");
  flappybirdup = loadImage("flappybirdup.jpg");

  obstaclebirds = loadImage("birds.png");
  obstacletree1 = loadImage("newtree.png");
  obstacletree2 = loadImage("newtree2.png");
  obstacletree3 = loadImage("newtree3.png");
  obstacletree4 = loadImage("newtree4.png");
  falling = loadImage("falling.jpg");
  end = loadImage("end.jpg");

  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")

  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(700, 600);

  flappybirdsprite = createSprite(50, 10, 20, 50);
  flappybirdsprite.addImage("flying", flappybird)
  flappybirdsprite.addAnimation("collided", end);
  flappybirdsprite.scale = 0.1;

  //ground = createSprite(200, window.height - 10, 400, 100);
 // ground.addImage("ground", groundImage);
  //ground.x = ground.width / 2;

  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300, 140);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  invisibleGround = createSprite(200, window.height - 15, 400, 10);
  invisibleGround.visible = false;



  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();



  flappybirdsprite.setCollider("circle", 0, 0, 40);
  flappybirdsprite.debug = true

  score = 0;

}

function draw() {

  background(180);
  image(bg_img, 0, 0, width, height);
  //displaying score
  textSize(20);
  fill("yellow")
  text("Score: " + score, 500, 100);
   score.scale = 20;
   
  //console.log("this is ",gameState)


  if (gameState === PLAY) {
    gameOver.visible = false
    restart.visible = false
    //move the ground
    //ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount / 60);

   // if (ground.x < 0) {
    //  console.log("this is ground's x" + ground.x);
     // ground.x = ground.width / 2;
     // console.log("this is ground's width " + ground.width);
   // }

    //jump when the space key is pressed
    if (keyDown("space") && flappybirdsprite.y >= 100) {
      flappybirdsprite.velocityY = -12;
    }

    //add gravity
    flappybirdsprite.velocityY = flappybirdsprite.velocityY + 0.8

    //spawn the clouds
    spawnClouds();

    //spawn obstacles on the ground
    spawnObstacles();

    if (obstaclesGroup.isTouching(flappybirdsprite)) {
      gameState = END;
    }
  }
  else if (gameState === END) {
    console.log("hey")
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    flappybirdsprite.velocityY = 0

    //change the flappybirdsprite animation
    flappybirdsprite.changeAnimation("collided", flappybirdsprite_collided);

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  }


  //stop flappybirdsprite from falling down
  flappybirdsprite.collide(invisibleGround);



  drawSprites();
}

function spawnObstacles() {
  var randY= Math.round(random(340,400))
  var randS=(random(0.02,0.05))
  if (frameCount % 120 === 0) {
    var obstacle = createSprite(400, randY, 10, 40);
    obstacle.velocityX = -6;
console.log("obstacles")
    //generate random obstacles
    var rand = Math.round(random(1, 5));
    switch (rand) {
      case 1: obstacle.addImage(obstaclebirds);
        break;
      case 2: obstacle.addImage(obstacletree1);
        break;
      case 3: obstacle.addImage(obstacletree2);
        break;
      case 4: obstacle.addImage(obstacletree3);
        break;
      case 5: obstacle.addImage(obstacletree4);
        break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = randS;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.y = Math.round(random(10, 60));
    cloud.addImage(cloudImage);
    cloud.scale = 1;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 134;

    //adjust the depth
    cloud.depth = flappybirdsprite.depth;
    flappybirdsprite.depth = flappybirdsprite.depth + 1;

    //adding cloud to the group
    cloudsGroup.add(cloud);
  }
}

