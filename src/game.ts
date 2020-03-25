import { BaseScene } from "./gameObjects/baseScene";
import resources from "./resources";
//import { PeasantDialog } from "./ui/index";
//import { PeasantWalking } from './gameObjects/peasantwalking';
//import utils from "../node_modules/decentraland-ecs-utils/index";
//import { RotatableEntity } from "./gameObjects/rotatableEntity";
//import { MovableEntity } from "./gameObjects/movableEntity";
import { BuilderHUD } from "./modules/BuilderHUD";
import { Crystal } from './gameObjects/crystalState';

let baseScene = new BaseScene();
const gameCanvas = new UICanvas();
// //let peasant = new PeasantWalking();
import { AgathaDialog } from "./ui/index";
import { StonePedestal } from "./gameObjects/stonePedestalState";


let firstlightblueremoved = false;
let secondyellowremoved = false;
let thirdblueremoved = false;
let fourthredremoved = false;
let firstCrystalPass = true;

let firstbluepasstwo = false;
let secondlightbluepasstwo = false;
let thirdyellowpasstwo = false;
let fourthredpasstwo = false;
let secondCrystalPass = false;

let puzzlesolved = false;
let firstpasscompleted = false;
let secondpasscompleted = false;

const TURN_TIME = 0.9;
const HIT_TIME = 1.0;
let HIT_POINTS = 5;
let PLAYER_HP = 10;
let dead = false;
let attackable = false;
let dialogComplete = false;

const dialog = new AgathaDialog(gameCanvas);

const text = new UIText(gameCanvas);
text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;
// text.value = 'Close UI'
// text.fontSize = 15
// text.width = 120
// text.height = 30
text.vAlign = "bottom";
text.positionX = -80;
const instructions = new UIText(gameCanvas);
instructions.value = "";
instructions.positionX = 80;
instructions.vAlign = "bottom";

text.visible = true;
instructions.visible = true;

@Component("timeOut")
export class TimeOut {
  timeLeft: number;
  constructor(time: number) {
    this.timeLeft = time;
  }
}

export const paused = engine.getComponentGroup(TimeOut);



const agathasCage = new Entity("agathasCage");
engine.addEntity(agathasCage);
const cageShape = new GLTFShape("models/cage2.glb");
agathasCage.addComponentOrReplace(cageShape);
const cageLoc = new Transform({
  position: new Vector3(8, 0.4, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
agathasCage.addComponentOrReplace(cageLoc);

const cagePedestal = new StonePedestal(resources.sounds.missioncomplete)

let sorceress = new Entity();
sorceress.addComponent(
  new Transform({
    position: new Vector3(8, 0.4, 8)
  })
);
sorceress.addComponent(resources.models.sorceress);

sorceress.addComponent(
  new OnClick((): void => {
    dialog.run();
  })
);

// // // //sorceress.addComponent(new AudioSource(resources.sounds.goblinHit));
// // // sorceress.addComponent(new AudioSource(resources.sounds.doorIsLocked));

export class BattleCry {
  update() {
    let transform = sorceress.getComponent(Transform);
    //let path = sorceress.getComponent(LerpData);
    let dist = distance(transform.position, camera.position);
    if (dist < 16) {
      if (!dead) {
        if (spellAttack1.playing == false) {
          //swipeAttack.reset();
          //swipeAttack.playing = true;
          if (dialogComplete) {
            spellAttack1.play();

            walkClip.playing = false;
            turnRClip.playing = false;
            hitInFace.playing = false;
            PLAYER_HP--;
            text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;
            //log("PLAYER HP is now: ", PLAYER_HP);
            if (PLAYER_HP == 0) {
              //log("play dead music.. Kick player out of the scene");
              text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;
            }
          }
          
          
        }
      }
      let playerPos = new Vector3(camera.position.x, 0, camera.position.z);
      transform.lookAt(playerPos);
    } else if (spellAttack1.playing) {
      spellAttack1.stop();
      //transform.lookAt(path.array[path.target]);
    }
  }
}

engine.addSystem(new BattleCry());




dialog.onSequenceComplete = () => {
  dialog.hide()
}

dialog.onQuestComplete = () => {
  instructions.value = "In dialog.onQuestComplete()"
  dialogComplete = true;
  
  sorceress.addComponent(
    new OnClick((): void => {
      if (!dead) {
        if (attackable) {
          log("sorceress was clicked");
          sorceress.addComponent(new TimeOut(HIT_TIME));
          walkClip.playing = false;
          //swipeAttack.playing = false;
          turnRClip.playing = false;
          deathFromFront.playing = false;
          //hitInFace.play()
          //hitInFace.looping = false

          sorceress.getComponent(AudioSource).playOnce();

          HIT_POINTS = HIT_POINTS - 1;
          //log("hit points is now: ", HIT_POINTS);
          text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;

          if (HIT_POINTS == 3 && !firstpasscompleted) {
            //engine.addEntity(lightbluecrystal);
            firstlightblueremoved = false;
            puzzlesolved = false;
            attackable = false;
            sorceress.removeComponent(AudioSource);
            sorceress.addComponent(
              new AudioSource(resources.sounds.unlocksorceress)
            );
            //asyncCall();
            sorceress.getComponent(AudioSource).playOnce();
            sorceress.removeComponent(AudioSource);
            //asyncCall();
            sorceress.addComponent(
              new AudioSource(resources.sounds.doorIsLocked)
            );
            firstpasscompleted = true;
          }

          if (HIT_POINTS == 2 && !secondpasscompleted) {
            //text.value = 'HP: 33%'
            text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;
            // engine.addEntity(redcrystal);
            // engine.addEntity(bluecrystal);
            // engine.addEntity(yellowcrystal);
          }

          if (HIT_POINTS == 0) {
            log("play death animation");
            //text.value = 'HP: 0%'
            text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;
            dead = true;
            walkClip.stop();
            turnRClip.stop();
            hitInFace.stop();
            spellAttack1.stop();
            spellAttack2.stop();
            deathFromFront.play();
            //deathFromFront.playing = true;
            deathFromFront.looping = false;
            cagePedestal.playAudio()
          }

          // if (dead == false && hitInFace.playing == false) {
          //   log("play hit in face looping false");
          //   hitInFace.reset();
          //   //hitInFace.playing = true;
          //   hitInFace.play();
          //   hitInFace.looping = false;
          // }
        } else {
          sorceress.getComponent(AudioSource).playOnce();
        }
      } else {
        log("grab the key from the corpse");
      }
    })
  );

 
};

let sorceressAnimator = new Animator();
sorceress.addComponent(sorceressAnimator);

// //Add walk animation
const walkClip = new AnimationState("walk");
// //const walkClip = new AnimationState("walkingInPlace");
sorceressAnimator.addClip(walkClip);
const turnRClip = new AnimationState("turnRight");
turnRClip.looping = false;
sorceressAnimator.addClip(turnRClip);
const swipeAttack = new AnimationState("swipeAttack");
sorceressAnimator.addClip(swipeAttack);
const hitInFace = new AnimationState("hitInHead");
sorceressAnimator.addClip(hitInFace);
const deathFromFront = new AnimationState("deathFromFront");
sorceressAnimator.addClip(deathFromFront);
const spellAttack1 = new AnimationState("spellAttack1");
sorceressAnimator.addClip(spellAttack1);
const spellAttack2 = new AnimationState("spellAttack2");
sorceressAnimator.addClip(spellAttack2);

engine.addEntity(sorceress);
walkClip.play();

//sorceress.addComponent(new LerpData());

// engine.addEntity(sorceress);
// walkClip.play();

export class WaitSystem {
  update(dt: number) {
    for (let ent of paused.entities) {
      let time = ent.getComponentOrNull(TimeOut);
      if (time) {
        if (time.timeLeft > 0) {
          time.timeLeft -= dt;
        } else {
          ent.removeComponent(TimeOut);
        }
      }
    }
  }
}

engine.addSystem(new WaitSystem());

export class CrystalCheck {
  update() {
    if (fourthredremoved && secondyellowremoved && thirdblueremoved && firstlightblueremoved) {
      if (!puzzlesolved) {
        sorceress.removeComponent(AudioSource);
        instructions.value = "Boss is unlocked, removing cage and running dialog.onQuestComplete()"

        engine.removeEntity(agathasCage);
        
        attackable = true;
        
        sorceress.addComponent(new AudioSource(resources.sounds.unlocksorceress))
        //asyncCall();
        sorceress.getComponent(AudioSource).playOnce();
        sorceress.removeComponent(AudioSource);
        instructions.value = "Added Punch Sound to the sorceress"
        sorceress.addComponent(new AudioSource(resources.sounds.punch));
        //asyncCall();
        spellAttack2.play();
        puzzlesolved = true;

        dialog.onQuestComplete();
      }
    }
  }
}
engine.addSystem(new CrystalCheck());

const camera = Camera.instance;

function distance(pos1: Vector3, pos2: Vector3): number {
  const a = pos1.x - pos2.x;
  const b = pos1.z - pos2.z;
  return a * a + b * b;
}

//const hud: BuilderHUD = new BuilderHUD();
//hud.attachToEntity(sorceress)