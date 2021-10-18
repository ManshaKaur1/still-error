var PLAY = 1;
var END = 0;
var gameState = PLAY;

var rocket , rocketImg ;
var space , spaceImg ;
var bullet , bulletImg ;
var score=0;
var rocketBurstSound , collidedSound ;
var rock , rockImg ;
var gameOver , restart
var invisibleGround ; 
var obstaclesGroup , stone , stone2 , rock ;


function preload(){
  rocketBurstSound = loadSound("rocketBurst.mp3");
  collidedSound = loadSound("collided.wav");

  spaceImg = loadImage("AnyConv.com_space.jpg");
  rock = loadImage("rock.jpg");
  stone = loadImage("stone.jpg");
  stone2 = loadImage("stone2.jfif");
  
  rocket = loadAnimation("rocket 2.jpg")
  bullet = loadAnimation("bullet.jpg")
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
   rocket = createSprite(300,height-20,40,50);
   rocket.addAnimation("rocket")
   rocket.setCollider('circle',0,0,350)

   var ground = createSprite(10,20,400,400)
   ground.addImage(AnyConv.comSpaceImg);

  // invisibleGround = createSprite(width/2,height-10,width,125);  
  // invisibleGround.shapeColor = "#f4cbaa";

   gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup = new Group();

  score = 0;
}
 function draw() {
//background("spaceImg");
    textSize(20);
    fill("black");
    text("Score: "+ score,30,50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    rocket.velocityY = -(6 + 3*score/100);
}

if (touches.length >0 || keyDown("space")) {
    rocketBurstSound.play()
    bullet.velocityY = 2
    obstaclesGroup.destroyEach();
    touches = [];  
 }

rocket.velocityY = rocket.velocityY + 0.8
rocket.collide(invisibleGround);
if(obstaclesGroup.isTouching(rocket)){
    collidedSound.play()
    gameState = END;
}

else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    rocket.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    if(touches.length>0 || keyDown("SPACE")) {      
        reset();
     touches = []
      }
}
drawSprites();
}

function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,height-95,20,30);
      obstacle.setCollider('circle',0,0,45)
      obstacle.velocityX = -(6 + 3*score/100);
    }

    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(stone);
              break;
      case 2: obstacle.addImage(stone2);
              break;
      default: break;
    }

    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstacle.depth = rocket.depth;
    rocket.depth +=1;

    obstaclesGroup.add(obstacle);
    function reset(){
        gameState = PLAY;
        gameOver.visible = false;
        restart.visible = false;
        
        obstaclesGroup.destroyEach();
        score = 0;
    }
}