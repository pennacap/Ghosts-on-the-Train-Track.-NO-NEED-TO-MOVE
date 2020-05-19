var world, position, person, ground, Obstacle1, gamestate, score, AIdot1, AIdot2, AIdot3;
function preload(){
  bg = loadImage("Imported piskel.gif");
  ghost = loadImage("Imported piskel (1).gif");
  person = loadImage("Imported piskel (2).gif");
  shocked = loadImage("Imported piskel (3).gif");
}
function setup(){
  createCanvas(400, 400)
  world = createSprite(200, 0, 1, 1);
world.addAnimation("Train tracks.jpg_1", bg);
position = 1;
person = createSprite(206, 350, 1, 1);
person.scale = 0.3;
ground = createSprite(200, 395.5, 400, 1);
ground.visible = false;
Obstacle1 = Group()
gamestate = 0;
score = 0;
AIdot1 = createSprite(66.6,((400 - 237)/2) + 237, 1, 400 - 200);
AIdot2 = createSprite(206, ((400 - 237)/2) + 237, 1, 400 - 200);
AIdot3 = createSprite(340, ((400 - 237)/2) + 237, 1, 400 - 200);
AIdot1.visible = false;
AIdot2.visible = false;
AIdot3.visible = false;
world.velocityY = 2;
}
function draw() {
  background("white");
  
  //createEdgeSprites();
  if (position == 0) {
    person.x = 66.6;
    if (Obstacle1.overlap(AIdot1)){
      if (Obstacle1.overlap(AIdot2)) {
        if (Obstacle1.overlap(AIdot3)) console.log("Impossible");
        else position = 3
        
      } else if (Obstacle1.overlap(AIdot3)) {
        position = 1
      } else position = 1;
    }
  } else if (position == 1) {
    person.x = 206
    if (Obstacle1.overlap(AIdot2)){
      if (Obstacle1.overlap(AIdot1)) {
        if (Obstacle1.overlap(AIdot3)) console.log("Impossible");
        else position = 2;
      } else if (Obstacle1.overlap(AIdot3)) {
        position = 0;
      }else position = 2;
    }
  } else if (position == 2) {
    person.x = 340
    if (Obstacle1.overlap(AIdot3)){
      if (Obstacle1.overlap(AIdot2)) {
        if (Obstacle1.overlap(AIdot1)) console.log("Impossible");
        else position = 0;
      } else if (Obstacle1.overlap(AIdot1)) {
        position = 1;
      } else position = 0;
    }
  } 
  if (world.y >= 400) world.y = 0;
  if (gamestate == 0) {
    person.collide(ground);
  //person.collide(edges[0]);
  person.addAnimation("kid_21_1_copy_1", person);
  for (var i = 0; i < Obstacle1.size(); i++) {
    
  Obstacle1.get(i).velocityY = world.velocityY
  }
  if (person.overlap(Obstacle1)) {
    gamestate = 1
    
  }
  if (score % 100 == 0) world.velocityY+= 0.2;
  if (frameCount % 4 == 0) score++
   spawnObstacles();

 person.velocityY+=10
 
}    
   
  if (gamestate == 1) {
    score = 0;
     person.collide(ground);
  person.collide(edges[0]);
    Obstacle1.setVelocityEach(0, 0);
    world.setVelocity(0, 0)
    Obstacle1.setLifetimeEach(-1);
    person.addAnimation("kid_21_1", shocked);
    var promptto = prompt("Game Over! Restart [y/n]")
    if (promptto == "y") {
      gamestate = 0;
      Obstacle1.destroyEach();
      world.velocityY = 2;
      person.setAnimation("kid_21_1_copy_1");
    } else {
      remove();
    }
  }
  drawSprites();
  fill("green")
  text("Score:"+score, 330, 92)
}
function spawnObstacles() {
  if (frameCount % 80 == 0) {
    var obstacle = createSprite(1, -73, 1, 1)
    var array = [66.6, 206, 340];
    var RandomNumber = Math.random()
    RandomNumber = RandomNumber * array.length
    obstacle.x = Number(array[Math.floor(RandomNumber)]);
    obstacle.addAnimation("ghost_1", ghost)
    obstacle.velocityY = 2
    obstacle.lifetime = 273;
    Obstacle1.add(obstacle);
  }
}