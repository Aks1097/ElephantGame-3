

var elephant, elephant_running, elephant_collided;



var obstacleImg;
var backgroundImg, background;
var jumpSound, collidedSound;
var heart1, heart2, heart3;

function preload(){
  
  jumpSound = loadSound("assets/sounds/jump.wav");
  collidedSound = loadSound("assets/sounds/collided.wav");

  backImg = loadImage("assets/Forest_bg.jpg");
  
  elephant_running = loadAnimation("assets/Elephant_1.png","assets/Elephant_2.png","assets/Elephant_3.png");
  elephant_collided = loadAnimation("assets/Elephant_4.png");
  
  obstacleImg = loadImage("assets/Obstacle.png");

  gameOverImg= loadImage("assets/gameOver.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  backgr=createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  backgr.addImage(backImg);
  backgr.scale=3;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  elephant = createSprite(displayWidth-1150, displayHeight-200, 50, 50);
  
  
  elephant.addAnimation("running", elephant_running);
  elephant.addAnimation("collided", elephant_collided);
  elephant.setCollider('circle',0,0,20)
  //elephant.scale = 0.08
   //elephant.debug=true
  // background=createSprite(200,200,windowWidth,windowHeight);
  // background.addImage(backgroundImg);
  // background.scale=2.5;
  // invisibleGround.visible =false
  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
   heart1.addImage("heart1",heart1Img)
   heart1.scale = 0.4

   heart2 = createSprite(displayWidth-100,40,20,20)
   heart2.visible = false
   heart2.addImage("heart2",heart2Img)
   heart2.scale = 0.4

   heart3 = createSprite(displayWidth-150,40,20,20)
   heart3.addImage("heart3",heart3Img)
   heart3.scale = 0.4

   ground=createSprite(width/2,height-10, width, 125);
   ground.visible=false;

   obstaclesGroup=new Group();

   gameOver = createSprite(width/2,height/2- 50);
   gameOver.addImage(gameOverImg);
   gameOver.scale = 0.5;

   gameOver.visible=false;
}

function draw() {
  //elephant.debug = true;
  background(255);
  
  if(backgr.x<displayWidth/3){
    backgr.x=backgr.width;
  }

  if(keyDown("UP_ARROW")){
    elephant.velocityY= -12;
  }

  if(obstaclesGroup.isTouching(elephant)){
    gameOver.visible = true;
    collidedSound.play()
    ground.velocityX = 0;
    elephant.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    //change the trex animation
    elephant.changeAnimation("collided",elephant_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
}


  elephant.velocityY=elephant.velocityY+1;
  obstacles();
  elephant.collide(ground);
  drawSprites();

}

function obstacles(){
  if(frameCount% 120===0){
    obstacle=createSprite(600, 700, 20, 30);
    obstacle.setCollider('circle',0,0,45);

    obstacle.velocityX= -6;

    obstacle.addImage(obstacleImg);
    obstacle.scale=0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
    elephant.depth +=1;
    obstacle.depth=elephant.depth;
  }
}
