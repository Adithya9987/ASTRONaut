var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var gameState = "end"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  //ghostImg = loadImage("ghost-standing.png");
  //spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  if(gamestate==="play"){

  
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  ghost.velocityY=ghost.velocityY+0.65;
  if(keyDown("left")){
    ghost.velocityX=-3
  }
  if(keyDown("right")){
    ghost.velocityX=3
  }
  
  if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
      ghost.destroy();
      gamestate="end"
    }

  }
  if(gamestate==="end"){
    text("gameover",200,200)
  }

    
    drawSprites();
}

function spawnDoors(){
  if(frameCount % 200===0){
   door = createSprite(200,-50);
   climber = createSprite(200,10);
   invisibleBlock = createSprite(200,15);

   door.addImage("door",doorImg);
   climber.addImage("climber",climberImg);

   climber.velocityY=2;
   door.velocityY=2;
  invisibleBlock.velocityY=2;

   door.x=Math.round(random(120,400))
   climber.x=door.x;
  invisibleBlock.x=door.x;

   invisibleBlock.width=climber.width
   invisibleBlock.height=2;
   

   climber.lifetime=350;
   door.lifetime=350;

   doorsGroup.add(door);
   climbersGroup.add(climber);
   invisibleBlockGroup.add(invisibleBlock);
   invisibleBlock.debug=true;

   ghost.depth=door.depth
   ghost.depth=ghost.depth+1
   
  }
}