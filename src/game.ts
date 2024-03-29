import { BaseScene } from "./gameObjects/baseScene";
import resources from "./resources";
import { AgathaDialog } from "./ui/agathaDialog";
//import { StonePedestal } from "./gameObjects/stonePedestalState";
import { Crystals } from "./gameObjects/crystals";
import { CrystalState } from "./gameObjects/crystalState";
import utils from "../node_modules/decentraland-ecs-utils/index";
import { Npc } from "./gameObjects/npc";
import { Player } from "./gameObjects/player";
import { OrcBattle } from "./gameObjects/orcbattle";
import { WaitSystem } from "./gameObjects/waitSystem";
// import { createChannel } from "../node_modules/decentraland-builder-scripts/channel";
// import { createInventory } from "../node_modules/decentraland-builder-scripts/inventory";
// import Script1 from "../ff9257ec-9d62-404f-97c7-cf19c4035761/src/item";
// import Script2 from "../7402ef02-fc7f-4e19-b44a-4613ee2526c5/src/item";
// import Script3 from "../df8d742f-045c-4fe3-8c70-adfb47d22baf/src/item";
// import { getUserData } from "@decentraland/Identity";
// import { BuilderHUD } from "./modules/BuilderHUD";

// Scene Setup

let baseScene = new BaseScene();
let crystals = new Crystals();

// Set Inital Variables

// let HIT_POINTS = 5;
// let PLAYER_HP = 20;
// let agathadead = false;
// let playerdead = false;
// let attackable = false;
// let dialogComplete = false;
// let puzzlesolved = false;
// let firstpasscompleted = false;
// let secondpasscompleted = false;
// let firstcrystalpass = false;
// let secondcrystalpass = false;
// let agathaclicked = false;

const gameCanvas = new UICanvas();
// const dialog = new AgathaDialog(gameCanvas);
// const text = new UIText(gameCanvas);
// const instructions = new UIText(gameCanvas);

const player = new Player(40,gameCanvas)

const rect = new UIContainerRect(gameCanvas)
rect.width = "13.75%"
rect.height = "6.25%"
rect.vAlign = "center"
rect.hAlign = "right"
rect.positionY = 180;
rect.color = Color4.Gray();
rect.opacity = 0.7
//rect.visible = false;

rect.visible = true;
player.showhpbar();


// Setup Debugging Panel. Set visible to false for Production

// text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;
// text.vAlign = "bottom";
// text.positionX = -80;
// text.visible = true;

// instructions.value =
//   "Agatha has defeated you and escaped. Maybe Old Man Rivers can help you figure out what to do next.";
// instructions.fontSize = 16;
// instructions.hAlign = "left";
// instructions.positionX = 200;
// instructions.vAlign = "center";
// instructions.visible = false;

let clicked = false;
const PUNCH_TIME = 2.2;

// const userData = executeTask(async () => {
//       const data = await getUserData();
//       log(data.displayName);
//       return data.displayName;
//     });

    // const gameboard = new Entity("entity");
    // engine.addEntity(gameboard);
    // const gltfShape8 = new GLTFShape("models/altar_final_glb.glb");
    // gltfShape8.withCollisions = true;
    // gltfShape8.visible = true;
    // gameboard.addComponentOrReplace(gltfShape8);
    // const transform12 = new Transform({
    //   position: new Vector3(8, 0, 8),
    //   rotation: new Quaternion(0, 0, 0, 1),
    //   scale: new Vector3(1, 1, 1),
    // });
    // gameboard.addComponentOrReplace(transform12);


// Setup Game Objects

// const box = new Entity();
// box.addComponent(new Transform());
// box.getComponent(Transform).position.set(9, 0, 8);
// box.addComponent(new AudioSource(resources.sounds.spellAttack1));
// engine.addEntity(box);

// const soundbox2 = new Entity();
// soundbox2.addComponent(new Transform());
// soundbox2.getComponent(Transform).position.set(7, 0, 8);
// soundbox2.addComponent(new AudioSource(resources.sounds.evillaugh));
// engine.addEntity(soundbox2);

// const agathasCage = new Entity("agathasCage");
// engine.addEntity(agathasCage);
// //const cageShape = new GLTFShape("models/cage2.glb");
// const cageShape = new GLTFShape("models/ring_final_glb.glb")
// agathasCage.addComponentOrReplace(cageShape);
// const cageLoc = new Transform({
//   position: new Vector3(8, 0, 8),
//   rotation: new Quaternion(0, 0, 0, 1),
//   scale: new Vector3(1, 1, 1)
// });
// agathasCage.addComponentOrReplace(cageLoc);

//const cagePedestal = new StonePedestal(resources.sounds.missioncomplete);

const agatha = new Npc(
  resources.sounds.goblinHit,
  resources.models.agatha,
  20,
  new Vector3(8, 0.4, 8),
  Quaternion.Euler(0,0,0),
  gameCanvas

);
//agatha.addComponent(new TimeOut(HIT_TIM));
// agatha.addComponent(
//   new OnPointerDown(
//     e => {
//       dialog.run();
//     },
//     {
//       button: ActionButton.PRIMARY,
//       showFeeback: true,
//       hoverText: "Speak to Agatha"
//     }
//   )
// );

// let agathaAnimator = new Animator();
// agatha.addComponent(agathaAnimator);
// const walkClip = new AnimationState("walk");
// agathaAnimator.addClip(walkClip);
// const turnRClip = new AnimationState("turnRight");
// turnRClip.looping = false;
// agathaAnimator.addClip(turnRClip);
// const swipeAttack = new AnimationState("swipeAttack");
// agathaAnimator.addClip(swipeAttack);
// const hitInFace = new AnimationState("hitInHead");
// agathaAnimator.addClip(hitInFace);
// const deathFromFront = new AnimationState("deathFromFront");
// agathaAnimator.addClip(deathFromFront);
// const spellAttack1 = new AnimationState("spellAttack1");
// agathaAnimator.addClip(spellAttack1);
// const spellAttack2 = new AnimationState("spellAttack2");
// agathaAnimator.addClip(spellAttack2);

// Configure Player Tracking System

// export class BattleCry {
//   update() {
//     if (!playerdead || !agathadead) {
//       let transform = agatha.getComponent(Transform);
//       //let path = sorceress.getComponent(LerpData);
//       let dist = distance(transform.position, camera.position);
//       if (dist < 40 && !playerdead) {
//         if (!agathadead || !playerdead) {
//           if (spellAttack1.playing == false) {
//             if (dialogComplete) {
//               //log('Casting SpellAttack1')
//               spellAttack1.play();
//               //spellAttack2.play();
//               //hitInFace.play()

//               //box.getComponent(AudioSource).playOnce();

//               //walkClip.playing = false;
//               //turnRClip.playing = false;
//               hitInFace.playing = false;

//               PLAYER_HP--;
//               text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;

//               if (PLAYER_HP == 0) {
//                 //soundbox2.getComponent(AudioSource).playOnce();

//                 text.visible = false;
//                 attackable = false;
//                 instructions.visible = true;

//                 agatha.addComponentOrReplace(
//                   new utils.Delay(2000, () => {
//                     playerdead = true;
//                     engine.removeEntity(agatha);
//                   })
//                 );
//               }
//             }
//           }
//         }
//         let playerPos = new Vector3(camera.position.x, 0, camera.position.z);
//         transform.lookAt(playerPos);
//       } else if (spellAttack1.playing) {
//         spellAttack1.stop();
//         //box.getComponent(AudioSource).playing = false;
//         //transform.lookAt(path.array[path.target]);
//       }
//     }
//   }
// }

// engine.addSystem(new BattleCry());

// dialog.onSequenceComplete = () => {
//   dialog.hide();
// };

// dialog.onQuestComplete = () => {
//   dialogComplete = true;
// };


// Track Completion of the Crystal Puzzle

// export class CrystalCheck {
//   update() {
//     let crystalState = CrystalState.getInstance();

//     if (
//       !crystalState.crystalState.firstlightblueremoved &&
//       !crystalState.crystalState.secondlightbluepasstwo
//     ) {
//       engine.addEntity(crystals.lightbluecrystal);
//     }
//     if (
//       !crystalState.crystalState.secondyellowremoved &&
//       !crystalState.crystalState.thirdyellowpasstwo
//     ) {
//       engine.addEntity(crystals.yellowcrystal);
//     }

//     if (
//       !crystalState.crystalState.thirdblueremoved &&
//       !crystalState.crystalState.firstbluepasstwo
//     ) {
//       engine.addEntity(crystals.bluecrystal);
//     }

//     if (
//       !crystalState.crystalState.fourthredremoved &&
//       !crystalState.crystalState.fourthredpasstwo
//     ) {
//       engine.addEntity(crystals.redcrystal);
//     }

//     if (
//       crystalState.crystalState.fourthredremoved &&
//       crystalState.crystalState.secondyellowremoved &&
//       crystalState.crystalState.thirdblueremoved &&
//       crystalState.crystalState.firstlightblueremoved
//     ) {
//       firstcrystalpass = true;
//     }

//     if (
//       crystalState.crystalState.fourthredpasstwo &&
//       crystalState.crystalState.thirdyellowpasstwo &&
//       crystalState.crystalState.firstbluepasstwo &&
//       crystalState.crystalState.secondlightbluepasstwo
//     ) {
//       secondcrystalpass = true;
//     }

//     if (firstcrystalpass || secondcrystalpass) {
//       if (!puzzlesolved) {
//         log(
//           `firstcrystalpass ${firstcrystalpass} secondcrystalpass ${secondcrystalpass}, so the puzzle is solved`
//         );
//         log("Removing agathas cage");
//         //engine.removeEntity(agathasCage);
//         log("setting attackable to true");
//         attackable = true;

//         // The puzzle is solved, so the quest is complete
//         log("calling quest complete");
//         dialog.onQuestComplete();

//         log("adding Attack on pointer down");
//         agatha.addComponentOrReplace(
//           new OnPointerDown(
//             e => {
//               log(
//                 `in pointerdown. Change agathaclicked from ${agathaclicked} to ${!agathaclicked}`
//               );
//               agathaclicked = !agathaclicked;
//             },
//             {
//               button: ActionButton.PRIMARY,
//               showFeeback: true,
//               hoverText: "Attack",
//               distance: 3
//             }
//           )
//         );
//         agatha.addComponent(
//           new utils.Delay(200, () => {
//             log("After 200 ms delay, setting puzzlessolved to true");
//             puzzlesolved = true;
//           })
//         );
//       } else if (agathaclicked) {
//         attackable = true;
//       }
//     }
//   }
// }
// engine.addSystem(new CrystalCheck());

// export class HpCheck {
//   update() {
//     // if (spellAttack1.playing) {
//     //   PLAYER_HP--;
//     //   text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;
//     // }
    
//     // log(
//     //   `agathaclicked: ${agathaclicked} attackable: ${attackable} agathadead: ${agathadead} playerdead: ${playerdead}`
//     // );
//     if (agathaclicked && attackable && !agathadead && !playerdead) {
//       // log(
//       //   "agathaclicked is true, attackable is true, agatha is not dead, and the player is not dead"
//       // );
//       hitAgatha();
//     }
//   }
// }
// engine.addSystem(new HpCheck());

// const camera = Camera.instance;

// function distance(pos1: Vector3, pos2: Vector3): number {
//   const a = pos1.x - pos2.x;
//   const b = pos1.z - pos2.z;
//   return a * a + b * b;
// }



// function hitAgatha() {
//   attackable = false;
//   log("Hit Agatha");

// //  walkClip.playing = false;
//   //turnRClip.playing = false;
//   deathFromFront.playing = false;
//   log("Playing agatha audio");
//   agatha.getComponent(AudioSource).playOnce();
//   log("Decreassing HP by 1");
//   HIT_POINTS = HIT_POINTS - 1;
//   log("Updating Player Alert Box with new HP values");
//   text.value = `HP: ${PLAYER_HP}    Agatha HP: ${HIT_POINTS}`;

//   if (HIT_POINTS == 4 && !firstpasscompleted) {
//     log("Setting puzzle solved to false");
//     puzzlesolved = false;

//     log("setting crystal passes back to false");
//     firstcrystalpass = false;
//     secondcrystalpass = false;

//     log("Adding light blue crystal");
//     crystals.lightbluecrystal.showCrystal();
//     //engine.addEntity(crystals.lightbluecrystal);
//     log("Adding Agathas Cage");
//     //engine.addEntity(agathasCage);

//     log("Adding pointerdown with new text");
//     agatha.addComponentOrReplace(
//       new OnPointerDown(
//         e => {
//           //soundbox2.getComponent(AudioSource).playOnce();
//           text.value = "Silly mortal";
//         },
//         {
//           button: ActionButton.PRIMARY,
//           showFeeback: true,
//           hoverText: "Solve the puzzle"
//         }
//       )
//     );

//     log("Setting firstpasscompleted to true");
//     firstpasscompleted = true;
//   } else if (HIT_POINTS == 2 && !secondpasscompleted) {
//     log("Setting puzzle solved to false");
//     puzzlesolved = false;

//     log("setting crystal passes back to false");
//     firstcrystalpass = false;
//     secondcrystalpass = false;

//     log("Adding light blue crystal");
//     crystals.lightbluecrystal.showCrystal();
//     //engine.addEntity(crystals.lightbluecrystal);
//     log("Adding Agathas Cage");
//     //engine.addEntity(agathasCage);

//     log("Adding pointerdown with new text");
//     agatha.addComponentOrReplace(
//       new OnPointerDown(
//         e => {
//           //soundbox2.getComponent(AudioSource).playOnce();
//           text.value = "You can never defeat me";
//         },
//         {
//           button: ActionButton.PRIMARY,
//           showFeeback: true,
//           hoverText: "Solve the puzzle"
//         }
//       )
//     );

//     log("Setting secondpasscompleted to true");
//     secondpasscompleted = true;
//   } else if (HIT_POINTS == 0 && firstcrystalpass || secondpasscompleted) {
//     log("play death animation");

//     agathadead = true;
//     //walkClip.stop();
//     //turnRClip.stop();
//     hitInFace.stop();
//     spellAttack1.stop();
//     spellAttack2.stop();
//     deathFromFront.play();
//     deathFromFront.looping = false;
//     //cagePedestal.playAudio();
//     agatha.addComponentOrReplace(
//       new OnPointerDown(
//         e => {
//           //soundbox2.getComponent(AudioSource).playOnce()
//           //text.value = "I have lost?"
//           //spawnLoot();
//         },
//         {
//           button: ActionButton.PRIMARY,
//           showFeeback: true,
//           hoverText: "Loot the corpse"
//         }
//       )
//     );
//   } else {
//     attackable = true;
//   }

//   agathaclicked = false;
// }

engine.addSystem(new WaitSystem());
engine.addSystem(new OrcBattle(gameCanvas,player,agatha, new Vector3(8, 0.4, 8), clicked, PUNCH_TIME))

// const hud: BuilderHUD = new BuilderHUD()
// hud.attachToEntity(crystals.bluecrystal)