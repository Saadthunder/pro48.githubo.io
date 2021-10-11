let ground;
let lander;
var lander_img;
var bg_img;


var score = 0;
var rocks = 0;
var PLAY = 1; 
var END = 0;
var WIN = 2;
var gameState= PLAY;
var isBlasting=false;
function preload()
{
  rocketImg = loadImage("rocketImg.png")
  bg_img = loadImage("bg.png")
  redStar=loadImage("redStar.png")
  rockImg=loadImage("Asteroid.png")
  boomImg=loadImage("boom.png")
  yStar=loadImage("star2.png")
  boom_s=loadSound("bulli.mp3")
  jump=loadSound("jump.wav")
  laserImg=loadImage("laser.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(80);

  space=createSprite(width/2,height/2);
  space.addImage(bg_img);
  space.velocityY=2;
  space.scale=1.5;

  rocket = createSprite(width/2,550,30,30);
  rocket.addImage(rocketImg);
  rocket.scale=.8;
 // rocket.debug=true;
  rocket.setCollider("rectangle",0,0,70,100);
  

  starGroup=new Group();
  rockGroup=new Group();
  starsGroup=new Group();
  laserGroup=new Group();
  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
 // image(bg_img,width/400,height/400,windowWidth,windowHeight);

 
  if (gameState===PLAY) {
    
  rocket.x=World.mouseX;

  if (space.y>windowHeight-100) {
    space.y=height/2;
  }
  allStars();
  allRocks();
  allStar2();
if (rocket.isTouching(starGroup)) {
  starGroup.destroyEach();
  score=score+1;
  jump.play();
  jump.setVolume(100);
}
if (rocket.isTouching(starsGroup)) {
  starsGroup.destroyEach();
  score=score+10;
  jump.play();
  jump.setVolume(100);
}

if(keyDown("space")){
shootLaser();

}
console.log(rocks)
if(laserGroup.isTouching(rockGroup)){
rockGroup.destroyEach();
laserGroup.destroyEach();
rocks=rocks+1;
boom_s.play();
score=score+5;

}
 
  if (rocket.isTouching(rockGroup)) {

  gameState=END;

}

if(score>= 50){
  rockGroup.destroyEach();
  starGroup.destroyEach();
  starsGroup.destroyEach();
  space.velocityY=0;
  swal({
    title: `Awesome!!!!!`,
    text: "You collected all the stars",
    imageUrl:
      "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
    imageSize: "100x100",
    confirmButtonText: "Ok"
  },
  function(isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  }
  );
}

}
else if(gameState===END) {
   
  if (!boom_s.isPlaying()&&isBlasting===false) {
    isBlasting=true;
   boom_s.play();
  } 
   rockGroup.destroyEach();
 rocket.addImage(boomImg);
 space.velocityY=0;
 swal(
   {
     title: `Game Over!!!`,
     text: "Thanks for playing!!",
     imageUrl:
     "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
     imageSize: "100x100",
     confirmButtonText: "Play Again"
   },
   function(isConfirm) {
     if (isConfirm) {
       location.reload();
     }
   }
 );
  }
drawSprites();
 push()
 fill(255);
 text("Score: "+score,1000,75);
 pop();

 push()
 fill(255);
 text("Rocks destroyed: "+rocks,200,75);
 pop();

 



}

function allStars(){
 if(frameCount%80===0){ 
 star=createSprite(random(50,windowWidth-50),1);
 star.addImage(redStar); 
 //star.addImage(star2); 
 
 star.scale=.15;
 star.velocityY=5;
 starGroup.add(star);
//star.debug=true;

}}


function allStar2(){
  if(frameCount%460===0){ 
  star2=createSprite(random(50,windowWidth-50),1);
  star2.addImage(yStar); 

  
 
  star2.velocityY=5;
  star2.scale=.35;
  starsGroup.add(star2);
 //star.debug=true;
 
 }}
 
function allRocks(){
  if(frameCount%43===0){ 
  rock=createSprite(random(50,windowWidth-50),1);
  rock.addImage(rockImg); 
  rock.scale=.35;
  rock.velocityY=5;
 // rock.debug=true;
  rock.setCollider("circle",-10,0,110);
  rockGroup.add(rock);
 
 }}




 function shootLaser(){
 laser=createSprite(rocket.x,550,5,5);
 laser.addImage(laserImg);
 laser.scale=.15;
 laser.velocityY=-4;
 laser.lifetime=140;
 //laser.debug=true;
 laser.setCollider("rectangle",0,0,70,100);
 laserGroup.add(laser);

 }