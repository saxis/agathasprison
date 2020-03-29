import { BaseScene } from "./gameObjects/baseScene";
import resources from "./resources";
import { AgathaDialog } from "./ui/index";
import { StonePedestal } from "./gameObjects/stonePedestalState";
import { Crystals } from "./gameObjects/crystals";
import { CrystalState } from "./gameObjects/crystalState";
import utils from "../node_modules/decentraland-ecs-utils/index";
import { Npc } from "./gameObjects/npc";

// Scene Setup

let baseScene = new BaseScene();
let crystals = new Crystals();


// Set Inital Variables

let HIT_POINTS = 5;
let PLAYER_HP = 5;
let agathadead = false;
let playerdead = false;
let attackable = false;
let dialogComplete = false;
let puzzlesolved = false;
let firstpasscompleted = false;
let secondpasscompleted = false;
let firstcrystalpass = false;
let secondcrystalpass = false;

const gameCanvas = new UICanvas();
const dialog = new AgathaDialog(gameCanvas);
const text = new UIText(gameCanvas);
const instructions = new UIText(gameCanvas);
//const TURN_TIME = 0.9;
//const HIT_TIME = 1.0;

// Setup Debugging Panel. Set visible to false for Production

text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;
text.vAlign = "bottom";
text.positionX = -80;
text.visible = true;

instructions.value =  "Agatha beat your ass and took off. Maybe the old man can help you figure out what to do next.";
instructions.fontSize = 30;
//instructions.positionX = 20;
instructions.hAlign = "left"
instructions.positionX = 200;
//instructions.positionY = 50;
instructions.vAlign = "center";
instructions.visible = false;

// Define Helper Classes

@Component("timeOut")
export class TimeOut {
  timeLeft: number;
  constructor(time: number) {
    this.timeLeft = time;
  }
}

export const paused = engine.getComponentGroup(TimeOut);

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

// Setup Game Objects

const box = new Entity()
box.addComponent(new Transform())
box.getComponent(Transform).position.set(9, 0, 8)
box.addComponent(new AudioSource(resources.sounds.spellAttack1));
engine.addEntity(box)

const soundbox2 = new Entity()
soundbox2.addComponent(new Transform())
soundbox2.getComponent(Transform).position.set(7, 0, 8)
soundbox2.addComponent(new AudioSource(resources.sounds.evillaugh));
engine.addEntity(soundbox2)


const agathasCage = new Entity("agathasCage");
engine.addEntity(agathasCage);
const cageShape = new GLTFShape("models/cage2.glb");
agathasCage.addComponentOrReplace(cageShape);
const cageLoc = new Transform({
  position: new Vector3(8, 0.4, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
});
agathasCage.addComponentOrReplace(cageLoc);

const cagePedestal = new StonePedestal(resources.sounds.missioncomplete);

const agatha = new Npc(
  resources.sounds.goblinHit,
  resources.models.sorceress,
  5
);
//agatha.addComponent(new TimeOut(HIT_TIME));
agatha.addComponent(
  new OnPointerDown(
    e => {
      dialog.run();
    },
    {
      button: ActionButton.PRIMARY,
      showFeeback: true,
      hoverText: "Speak to Agatha"
    }
  )
);

let agathaAnimator = new Animator();
agatha.addComponent(agathaAnimator);
const walkClip = new AnimationState("walk");
agathaAnimator.addClip(walkClip);
const turnRClip = new AnimationState("turnRight");
turnRClip.looping = false;
agathaAnimator.addClip(turnRClip);
const swipeAttack = new AnimationState("swipeAttack");
agathaAnimator.addClip(swipeAttack);
const hitInFace = new AnimationState("hitInHead");
agathaAnimator.addClip(hitInFace);
const deathFromFront = new AnimationState("deathFromFront");
agathaAnimator.addClip(deathFromFront);
const spellAttack1 = new AnimationState("spellAttack1");
agathaAnimator.addClip(spellAttack1);
const spellAttack2 = new AnimationState("spellAttack2");
agathaAnimator.addClip(spellAttack2);


// Configure Player Tracking System

export class BattleCry {
  update() {
    if (!playerdead) {
      let transform = agatha.getComponent(Transform);
      //let path = sorceress.getComponent(LerpData);
      let dist = distance(transform.position, camera.position);
      if (dist < 16) {
        if (!agathadead || !playerdead) {
          if (spellAttack1.playing == false) {
            if (dialogComplete) {
              spellAttack1.play();
              //spellAttack2.play();
              //hitInFace.play()
              
              box.getComponent(AudioSource).playOnce();

              walkClip.playing = false;
              turnRClip.playing = false;
              hitInFace.playing = false;
              PLAYER_HP--;
              text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;

              if (PLAYER_HP == 0) {
                soundbox2.getComponent(AudioSource).playOnce();

                text.visible = false;
                attackable = false;
                instructions.visible = true;
                
                agatha.addComponent(
                  new utils.Delay(2000, () => {
                    playerdead = true;
                    engine.removeEntity(agatha)
                  })
                );

              }
            }
          }
        }
        let playerPos = new Vector3(camera.position.x, 0, camera.position.z);
        transform.lookAt(playerPos);
      } 
      else if (spellAttack1.playing) {
        spellAttack1.stop();
        box.getComponent(AudioSource).playing = false;
        //transform.lookAt(path.array[path.target]);
      }
    }
  }
}

engine.addSystem(new BattleCry());

dialog.onSequenceComplete = () => {
  dialog.hide();
};

dialog.onQuestComplete = () => {
  dialogComplete = true;
};

//engine.addEntity(sorceress);
//walkClip.play();
//sorceress.addComponent(new LerpData());
// engine.addEntity(sorceress);
// walkClip.play();

// Track Completion of the Crystal Puzzle

export class CrystalCheck {
  update() {
    let crystalState = CrystalState.getInstance();

    if (
      !crystalState.crystalState.firstlightblueremoved &&
      !crystalState.crystalState.secondlightbluepasstwo
    ) {
      engine.addEntity(crystals.lightbluecrystal);
    }
    if (
      !crystalState.crystalState.secondyellowremoved &&
      !crystalState.crystalState.thirdyellowpasstwo
    ) {
      engine.addEntity(crystals.yellowcrystal);
    }

    if (
      !crystalState.crystalState.thirdblueremoved &&
      !crystalState.crystalState.firstbluepasstwo
    ) {
      engine.addEntity(crystals.bluecrystal);
    }

    if (
      !crystalState.crystalState.fourthredremoved &&
      !crystalState.crystalState.fourthredpasstwo
    ) {
      engine.addEntity(crystals.redcrystal);
    }

    if (
      crystalState.crystalState.fourthredremoved &&
      crystalState.crystalState.secondyellowremoved &&
      crystalState.crystalState.thirdblueremoved &&
      crystalState.crystalState.firstlightblueremoved
    ) { firstcrystalpass = true }

    if (
      crystalState.crystalState.fourthredpasstwo &&
      crystalState.crystalState.thirdyellowpasstwo &&
      crystalState.crystalState.firstbluepasstwo &&
      crystalState.crystalState.secondlightbluepasstwo
    ) { secondcrystalpass = true }

    if (
      firstcrystalpass || secondcrystalpass
    ) {
      if (!puzzlesolved) {
        // If the puzzle is being solved for the first time, set up the next stage
        engine.removeEntity(agathasCage);
        attackable = true;
        // The puzzle is solved, so the quest is complete
        dialog.onQuestComplete();

        agatha.addComponentOrReplace(
          new OnPointerDown(
            e => {
              if (!agathadead || !playerdead && attackable) {
                if (attackable) {
                  walkClip.playing = false;
                  turnRClip.playing = false;
                  deathFromFront.playing = false;
                  agatha.getComponent(AudioSource).playOnce();
                  HIT_POINTS = HIT_POINTS - 1;
                  text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;

                  if (HIT_POINTS == 3 && !firstpasscompleted) {
                    engine.addEntity(crystals.lightbluecrystal);
                    engine.addEntity(agathasCage);
                    puzzlesolved = false;
                    attackable = false;
                    firstpasscompleted = true;
                  }

                  if (HIT_POINTS == 2 && !secondpasscompleted) {
                    //text.value = 'HP: 33%'
                    attackable = false

                    text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;
                    engine.addEntity(crystals.lightbluecrystal);
                    engine.addEntity(crystals.redcrystal);
                    engine.addEntity(crystals.bluecrystal);
                    engine.addEntity(crystals.yellowcrystal);
                    engine.addEntity(agathasCage);
                  }

                  if (HIT_POINTS == 0) {
                    log("play death animation");
                    //text.value = 'HP: 0%'
                    text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;
                    agathadead = true;
                    walkClip.stop();
                    turnRClip.stop();
                    hitInFace.stop();
                    spellAttack1.stop();
                    spellAttack2.stop();
                    deathFromFront.play();
                    //deathFromFront.playing = true;
                    deathFromFront.looping = false;
                    cagePedestal.playAudio();
                  }
                } else {
                  log("grab the key from the corpse");
                }
              }
              //puzzlesolved = true;
            },
            {
              button: ActionButton.PRIMARY,
              showFeeback: true,
              hoverText: "Attack"
            }
          )
        );
        agatha.addComponent(
          new utils.Delay(5000, () => {
            puzzlesolved = true;
          })
        );
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
