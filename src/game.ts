import { BaseScene } from "./gameObjects/baseScene";
import resources from "./resources";
//import { PeasantDialog } from "./ui/index";
//import { PeasantWalking } from './gameObjects/peasantwalking';
//import utils from "../node_modules/decentraland-ecs-utils/index";
//import { RotatableEntity } from "./gameObjects/rotatableEntity";
//import { MovableEntity } from "./gameObjects/movableEntity";
import { BuilderHUD } from "./modules/BuilderHUD";

let baseScene = new BaseScene();
const gameCanvas = new UICanvas();
//let peasant = new PeasantWalking();
import { AgathaDialog } from "./ui/index";


let redremoved = false;
let yellowremoved = false;
let blueremoved = false;
let lightblueremoved = false;
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

text.visible = false;
instructions.visible = false;

@Component("timeOut")
export class TimeOut {
  timeLeft: number;
  constructor(time: number) {
    this.timeLeft = time;
  }
}

export const paused = engine.getComponentGroup(TimeOut);

const circlebase = new Entity("circlebase");
engine.addEntity(circlebase);
const gltfShape = new GLTFShape("models/CircleBase_01/CircleBase_01.glb");
gltfShape.withCollisions = true;
gltfShape.visible = true;
circlebase.addComponentOrReplace(gltfShape);
const transform2 = new Transform({
  position: new Vector3(13.5, 0, 3),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
});
circlebase.addComponentOrReplace(transform2);
circlebase.addComponent(new AudioSource(resources.sounds.grobb));
circlebase.getComponent(AudioSource).playOnce();


const circlebase2 = new Entity("circlebase2");
engine.addEntity(circlebase2);
circlebase2.addComponentOrReplace(gltfShape);
const transform4 = new Transform({
  position: new Vector3(13.5, 0, 13),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
});
circlebase2.addComponentOrReplace(transform4);

const circlebase3 = new Entity("circlebase3");
engine.addEntity(circlebase3);
circlebase3.addComponentOrReplace(gltfShape);
const transform5 = new Transform({
  position: new Vector3(3, 0, 3),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
});
circlebase3.addComponentOrReplace(transform5);

const circlebase4 = new Entity("circlebase4");
engine.addEntity(circlebase4);
circlebase4.addComponentOrReplace(gltfShape);
const transform6 = new Transform({
  position: new Vector3(3, 0, 13),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
});
circlebase4.addComponentOrReplace(transform6);

const agathasCage = new Entity("agathasCage");
engine.addEntity(agathasCage);
const cageShape = new GLTFShape("models/cage.glb");
agathasCage.addComponentOrReplace(cageShape);
const cageLoc = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
agathasCage.addComponentOrReplace(cageLoc);

const stone_Pedestal_01 = new Entity();
const gltfShape_3 = new GLTFShape(
  "models/Stone_Pedestal_01/Stone_Pedestal_01.glb"
);
stone_Pedestal_01.addComponentOrReplace(gltfShape_3);
const transform_4 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
});
stone_Pedestal_01.addComponentOrReplace(transform_4);
stone_Pedestal_01.addComponent(
  new AudioSource(resources.sounds.missioncomplete)
);
engine.addEntity(stone_Pedestal_01);

const lightbluecrystal = new Entity();
const gltfShape_4 = new GLTFShape("models/Crystal_03/Crystal_03.glb");
engine.addEntity(lightbluecrystal);
lightbluecrystal.addComponentOrReplace(gltfShape_4);
lightbluecrystal.addComponent(new AudioSource(resources.sounds.unlocksorceress));
const transform_8 = new Transform({
  position: new Vector3(13.5, 0, 3),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
});
lightbluecrystal.addComponentOrReplace(transform_8);
lightbluecrystal.addComponent(
  new OnClick((): void => {
    //log("crystal 03 was clicked");
    instructions.value = "Light Blue Crystal was Clicked. Playing Audio.";
    //engine.removeEntity(lightbluecrystal);
    //lightblueremoved = true;
    lightbluecrystal.getComponent(AudioSource).playOnce();
  })
);

const yellowcrystal = new Entity();
const gltfShape_5 = new GLTFShape("models/Crystal_05/Crystal_05.glb");
engine.addEntity(yellowcrystal);
yellowcrystal.addComponentOrReplace(gltfShape_5);
yellowcrystal.addComponent(new AudioSource(resources.sounds.unlocksorceress));
const transform_9 = new Transform({
  position: new Vector3(13.5, 0, 13),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
});
yellowcrystal.addComponentOrReplace(transform_9);
yellowcrystal.addComponent(
  new OnClick((): void => {
    instructions.value =
      "Yellow was clicked. Playing Audio";
    //log("yellow crystal was clicked, remove light blue stone");
    yellowcrystal.getComponent(AudioSource).playOnce();
    //engine.removeEntity(yellowcrystal);
    //yellowremoved = true;
  })
);

const bluecrystal = new Entity();
const blueCrystalShape = new GLTFShape("models/Crystal_01/Crystal_01.glb");
engine.addEntity(bluecrystal);
bluecrystal.addComponentOrReplace(blueCrystalShape);
bluecrystal.addComponent(new AudioSource(resources.sounds.unlocksorceress));
const blueCrystalTransform = new Transform({
  position: new Vector3(3, 0, 3),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
});
bluecrystal.addComponentOrReplace(blueCrystalTransform);
bluecrystal.addComponent(
  new OnClick((): void => {
    instructions.value = "Blue was clicked. Playing Audio.";
    //engine.removeEntity(yellowcrystal);
    //engine.addEntity(lightbluecrystal);
    //engine.removeEntity(bluecrystal);
    //yellowremoved = true;
    //blueremoved = true;
    //lightblueremoved = false;
    bluecrystal.getComponent(AudioSource).playOnce();
  })
);

const redcrystal = new Entity();
const gltfShape_7 = new GLTFShape("models/Crystal_02/Crystal_02.glb");
engine.addEntity(redcrystal);
redcrystal.addComponentOrReplace(gltfShape_7);
const transform_11 = new Transform({
  position: new Vector3(3, 0, 13),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
});
redcrystal.addComponentOrReplace(transform_11);
redcrystal.addComponent(new AudioSource(resources.sounds.unlocksorceress));
redcrystal.addComponent(
  new OnClick((): void => {
    log("red crystal was clicked");
    instructions.value = "Red was clicked. Playing Audio, the peasantunlock sound";
    redcrystal.getComponent(AudioSource).playOnce();
    //engine.removeEntity(lightbluecrystal);
    //engine.removeEntity(redcrystal);
    //lightblueremoved = true;
    //redremoved = true;
  })
);

const purplefloor = new Entity("entity");
engine.addEntity(purplefloor);
const gltfShape8 = new GLTFShape(
  "models/GroundFloorSciFi_04/GroundFloorSciFi_04.glb"
);
gltfShape8.withCollisions = true;
gltfShape8.visible = true;
purplefloor.addComponentOrReplace(gltfShape8);
const transform12 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
});
purplefloor.addComponentOrReplace(transform12);

const dialog = new AgathaDialog(gameCanvas);

let sorceress = new Entity();
sorceress.addComponent(
  new Transform({
    position: new Vector3(8, 0.4, 8)
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

sorceress.addComponent(resources.models.sorceress);

sorceress.addComponent(
  new OnClick((): void => {
    dialog.run();
  })
);


dialog.onSequenceComplete = () => {
  dialog.hide()
}

dialog.onQuestComplete = () => {
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
            engine.addEntity(lightbluecrystal);
            lightblueremoved = false;
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
            engine.addEntity(redcrystal);
            engine.addEntity(bluecrystal);
            engine.addEntity(yellowcrystal);
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
            stone_Pedestal_01.getComponent(AudioSource).playOnce();
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
    if (redremoved && yellowremoved && blueremoved && lightblueremoved) {
      if (!puzzlesolved) {
        sorceress.removeComponent(AudioSource);
        log("can unlock the boss now");
        instructions.value = "Boss is unlocked cause all crystals are removed";
        attackable = true;
        sorceress.addComponent(
          new AudioSource(resources.sounds.unlocksorceress)
        );
        //asyncCall();
        sorceress.getComponent(AudioSource).playOnce();
        sorceress.removeComponent(AudioSource);
        sorceress.addComponent(new AudioSource(resources.sounds.punch));
        //asyncCall();
        spellAttack2.play();
        puzzlesolved = true;
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

const hud: BuilderHUD = new BuilderHUD();
hud.attachToEntity(sorceress)