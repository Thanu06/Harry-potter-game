var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,playerImg;
var score = 0;
var spellImg,villanImg;
var bgImg;
var hogwats;
var villansGroup,spellsGroup;
var lives=3;
var life1,life2,life3,lifeImg;
var restart,restartImg;
var sand_timer;
var endImg;

function preload() {
  
  spellImg=loadImage("sparks.png");
  bgImg = loadImage("BG3.jpg");
  villanImg=loadImage("villan.png");
  lifeImg=loadImage("life.png");
  
  playerImg=loadImage("harry.png");
  restartImg=loadImage("restart1.png");
  sand_timer=loadImage("image.png");
  endImg=loadImage("end.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  life1=createSprite(40,50,10,10);
  life1.addImage("life1Img",lifeImg);
  life1.scale=0.3;

  life2=createSprite(120,50,10,10);
  life2.addImage("life2Img",lifeImg);
  life2.scale=0.3;

  life3=createSprite(200,50,10,10);
  life3.addImage("life3Img",lifeImg);
  life3.scale=0.3;

  restart=createSprite(windowWidth/2,windowHeight/2+200);
  restart.addImage(restartImg);
  restart.scale=0.5;
  
  restart.visible = false;

  player = createSprite(125, 200, 20, 50);
  player.addImage("HP",playerImg);
  player.scale=0.5;

  end=createSprite(windowWidth/2,windowHeight/2);
  end.addImage(endImg);
  end.visible=false;

  villansGroup = new Group();
  spellsGroup = new Group();
  
}

function draw() {
  background(bgImg);

  edges = createEdgeSprites();

  if (gameState == PLAY) 
  {
    
    end.visible=false;
    spawnVillans();
      player.collide(edges[2]);
      player.collide(edges[3]);

    if (keyDown(UP_ARROW)) 
      {
        player.y = player.y - 20;
      }

    if (keyDown(DOWN_ARROW)) 
      {
        player.y = player.y + 20;
      }

    if (keyWentDown("space")) 
      {
        createSpells();
      }

    if (spellsGroup.isTouching(villansGroup)) 
      {
        score = score + 5;
        spellsGroup.destroyEach();
        villansGroup.destroyEach();
      
      }

    if (villansGroup.isTouching(player))
     {
      villansGroup.destroyEach();
      lives=lives-1;
    }

    if (lives==2) 
      {
        life3.visible=false;
      }
    
   if (lives==1) 
    {
        life3.visible=false;
        life2.visible=false;
      }

    if (lives==0) 
      {
        life3.visible=false;
        life2.visible=false;
        life1.visible=false;
        gameState=END;
      }


} 
  
  else if (gameState === END) {
    

    end.visible=true;
    player.visible=false;
    restart.visible = true;
    
  
    spellsGroup.setVelocityXEach(0);
    villansGroup.setVelocityXEach(0);
    
    spellsGroup.setLifetimeEach(-1);
    villansGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      console.log("inside mouse pressed over function");
      reset();
      
    }
    
  }
  
  drawSprites();
  
  textSize(50);
  text("Score: " + score, windowWidth-300, 50);
  
} 




function reset()
{
  console.log("Reset Called");
  gameState = PLAY;
  restart.visible=false;
  score=0;
  lives=3;
  spellsGroup.destroyEach();
  villansGroup.destroyEach();
  player.visible="true";
  life3.visible=true;
  life2.visible=true;
  life1.visible=true;
  
}


function spawnVillans() {
  if (frameCount % 80 == 0) {
    var villan = createSprite(1700, 450, 20, 20);
    villan.addImage("demantors",villanImg);
    villan.scale=0.5;
    villan.setCollider("circle",0,0,150);
    villan.velocityX = -20;
    villan.y = random(150, 700);
    
    villansGroup.add(villan);
  }
}

function createSpells() {
  var spell = createSprite(30, 100, 60, 10);
  spell.velocityX = 20;
  spell.x = player.x;
  spell.y = player.y;
  spell.addImage("Spell",spellImg);
  spell.setCollider("circle",0,0,20);

  spellsGroup.add(spell);
}

