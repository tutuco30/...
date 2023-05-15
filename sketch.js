var trex, trex_running, trex_collided;

var soundsCheckpoint

var soundsCollided

var soundsDie

var soundsPulo                        


var chao

var chaoImg

var chaoINv

var cactos1, cactos2, cactos3, cactos4, cactos5, cactos6

var nuvemImg

var score = 0

var inicio = 1

var fimDejogo = 0

var gameState = inicio

var groupCactos

var trexM

var groupNuvens

var gameOver

var gameOverImg

var restartImg

var restart

function preload() {
  //animação t-rex
  trex_running = loadAnimation("./images/trex1.png", "./images/trex3.png", "./images/trex4.png");

  //adicionar imagem
  chaoImg = loadImage("images/ground2.png");
  nuvemImg = loadImage("images/cloud.png");
  cactos1 = loadImage("images/obstacle1.png");
  cactos2 = loadImage("images/obstacle2.png");
  cactos3 = loadImage("images/obstacle3.png");
  cactos4 = loadImage("images/obstacle4.png");
  cactos5 = loadImage("images/obstacle5.png");
  cactos6 = loadImage("images/obstacle6.png");
  trexM = loadAnimation("images/trex_collided.png");
  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");

//adicionar som
  soundsCheckpoint = loadSound("souds/checkpoint.mp3") ;
  soundsCollided = loadSound("souds/collided.wav") ;
  soundsDie = loadSound("souds/die.mp3") ;
  soundsPulo = loadSound("souds/jump.wav") ;
}





function setup() {
  createCanvas(600, 200)

  //sprite de trex
  trex = createSprite(50, 150, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided", trexM)
  trex.scale = 0.7
  trex.setCollider("circle", 0, 0, 43)
  trex.debug = false
  //sprite chão
  chao = createSprite(300, 180, 600, 20)
  chao.addImage(chaoImg);
  chaoInv = createSprite(200, 190, 600, 15);
  chaoInv.visible = false

  groupCactos = createGroup();
  groupNuvens = createGroup();

  gameOver = createSprite(300, 50)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false

  restart = createSprite(300, 130)
  restart.addImage(restartImg)
  restart.visible = false


}

function draw() {

  background("white")

  if (gameState == inicio) {
    gerarNuvens()
    gerarCactos()
    if (chao.x < 0) {
      chao.x = 300
    }
    if (keyDown("space") && trex.y >= 135.5) {
      trex.velocityY = -12;
      soundsPulo.play()

    } trex.velocityY = trex.velocityY + 0.8;
    chao.velocityX = -(7+5*score/100);
    score = score + Math.round(getFrameRate() / 60);
    if (groupCactos.isTouching(trex)) {
      soundsDie.play()
      gameState = fimDejogo;
    }
  }
  else if (gameState == fimDejogo) {
    chao.velocityX = 0;
    groupNuvens.setLifetimeEach(-1);
    groupCactos.setLifetimeEach(-1);
    restart.visible = true;
    gameOver.visible = true;
    groupNuvens.setVelocityXEach(0);
    groupCactos.setVelocityXEach(0);
    trex.changeAnimation("trex_collided", trexM);
    trex.velocityY = 0
    if (mousePressedOver(restart)){
    reset( ) 
    }

  }
  text("score: " + score, 400, 20);
  console.log(trex.y);
  //text(mouseX + "," + mouseY, mouseX, mouseY);









  trex.collide(chaoInv);

  console.log(frameCount);
  drawSprites();



}

function gerarNuvens() {
  if (frameCount % 60 === 0) {
    var nuvem = createSprite(600, 40, 50, 50);
    nuvem.addImage(nuvemImg);
    nuvem.velocityX = -5

    nuvem.scale = 0.8;
    nuvem.y = Math.round(random(10, 100));

    nuvem.depth = trex.depth - 1;
    nuvem.lifetime = 125;
    groupNuvens.add(nuvem);

  }
}
function gerarCactos() {
  if (frameCount % 60 === 0) {
    var cactos = createSprite(600, 160);
    cactos.velocityX = -(7+5*score/100);
    var obstacleRandom = Math.round(random(1, 6));
    switch (obstacleRandom) {
      case 1: cactos.addImage(cactos1);
        break;
      case 2: cactos.addImage(cactos1);
        break;
      case 3: cactos.addImage(cactos1);
        break;
      case 4: cactos.addImage(cactos1);
        break;
      case 5: cactos.addImage(cactos1);
        break;
      case 6: cactos.addImage(cactos1);
        break;
      default: break;
    }
    cactos.scale = 0.9;
    cactos.lifetime = 125;
    groupCactos.add(cactos);
  }

}
function reset (  ){
  gameState = inicio;
  restart.visible = false;
  gameOver.visible = false;
  groupCactos.destroyEach();
  groupNuvens.destroyEach();
  score = 0;
  trex.changeAnimation("running", trex_running)
  
}