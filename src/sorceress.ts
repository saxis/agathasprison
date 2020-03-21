// import utils from "../node_modules/decentraland-ecs-utils/index";
// import { MovableEntity } from "./gameObjects/movableEntity";
// import resources from "./resources";
// import { RotatableEntity } from "./gameObjects/rotatableEntity";
// //import { BuilderHUD } from "./modules/BuilderHUD";

// let redremoved = false;
// let yellowremoved = false;
// let blueremoved = false;
// let lightblueremoved = false;
// let puzzlesolved = false;
// let firstpasscompleted = false;
// let secondpasscompleted = false;

// const TURN_TIME = 0.9;
// const HIT_TIME = 1.0;
// let HIT_POINTS = 5;
// let PLAYER_HP = 10;
// let dead = false;
// let attackable = false;

// function resolveAfterHalfSecond() {

//   log('in respolve after half second')
//   // return new Promise(resolve => {
//   //   setTimeout(() => {
//   //     resolve("resolved");
//   //   }, 500);
//   // });
// }

// async function asyncCall() {
//   log("calling");
//   var result = await resolveAfterHalfSecond();
//   log(result);
// }

// @Component("timeOut")
// export class TimeOut {
//   timeLeft: number;
//   constructor(time: number) {
//     this.timeLeft = time;
//   }
// }

// export const paused = engine.getComponentGroup(TimeOut);


// const stone_Pedestal_01 = new Entity();
//   const gltfShape_3 = new GLTFShape(
//     "models/floor3/Stone_Pedestal_01/Stone_Pedestal_01.glb"
//   );
//   stone_Pedestal_01.addComponentOrReplace(gltfShape_3);
//   const transform_4 = new Transform({
//     position: new Vector3(18, 9.6, 12),
//     rotation: new Quaternion(0, 0, 0, 1),
//     scale: new Vector3(1, 1, 1)
//   });
//   stone_Pedestal_01.addComponentOrReplace(transform_4);
//   stone_Pedestal_01.addComponent(new AudioSource(resources.sounds.missioncomplete))
//   engine.addEntity(stone_Pedestal_01);

// const lantern_lit3 = new MovableEntity(
//   resources.models.lanternLit,
//   { position: new Vector3(16, 5.6, 4.3) },
//   resources.sounds.moveObject1,
//   new Vector3(0.5, 0, 0)
// );

// const lightbluecrystal = new Entity();
// const gltfShape_4 = new GLTFShape("models/floor3/Crystal_03/Crystal_03.glb");
// engine.addEntity(lightbluecrystal);
// lightbluecrystal.addComponentOrReplace(gltfShape_4);
// lightbluecrystal.addComponent(new AudioSource(resources.sounds.peasantunlock))
// const transform_8 = new Transform({
//   position: new Vector3(23.5, 9.6, 7),
//   rotation: new Quaternion(0, 0, 0, 1),
//   scale: new Vector3(1, 1, 1)
// });
// lightbluecrystal.addComponentOrReplace(transform_8);
// lightbluecrystal.addComponent(
//   new OnClick((): void => {
//     log("crystal 03 was clicked");
//     engine.removeEntity(lightbluecrystal);
//     lightblueremoved = true;
//     lightbluecrystal.getComponent(AudioSource).playOnce()
//   })
// );

// const yellowcrystal = new Entity();
// const gltfShape_5 = new GLTFShape("models/floor3/Crystal_05/Crystal_05.glb");
// engine.addEntity(yellowcrystal);
// yellowcrystal.addComponentOrReplace(gltfShape_5);
// yellowcrystal.addComponent(new AudioSource(resources.sounds.unlocksorceress))
// const transform_9 = new Transform({
//   position: new Vector3(23.5, 9.6, 17),
//   rotation: new Quaternion(0, 0, 0, 1),
//   scale: new Vector3(1, 1, 1)
// });
// yellowcrystal.addComponentOrReplace(transform_9);
// yellowcrystal.addComponent(
//   new OnClick((): void => {
//     log("yellow crystal was clicked, remove light blue stone");
//     yellowcrystal.getComponent(AudioSource).playOnce()
//     //engine.removeEntity(yellowcrystal);
//     yellowremoved = true;
    
//   })
// );

// const bluecrystal = new Entity();
// const gltfShape_6 = new GLTFShape("models/floor3/Crystal_01/Crystal_01.glb");
// engine.addEntity(bluecrystal);
// bluecrystal.addComponentOrReplace(gltfShape_6);
// bluecrystal.addComponent(new AudioSource(resources.sounds.peasantunlock))
// const transform_10 = new Transform({
//   position: new Vector3(13, 9.6, 7),
//   rotation: new Quaternion(0, 0, 0, 1),
//   scale: new Vector3(1, 1, 1)
// });
// bluecrystal.addComponentOrReplace(transform_10);
// bluecrystal.addComponent(
//   new OnClick((): void => {
//     log("blue crystal was clicked");
//     //engine.removeEntity(yellowcrystal);
//     engine.addEntity(lightbluecrystal);
//     //engine.removeEntity(bluecrystal);
//     yellowremoved = true;
//     blueremoved = true;
//     lightblueremoved = false;
//     bluecrystal.getComponent(AudioSource).playOnce()
//   })
// );

// const redcrystal = new Entity();
// const gltfShape_7 = new GLTFShape("models/floor3/Crystal_02/Crystal_02.glb");
// engine.addEntity(redcrystal);
// redcrystal.addComponentOrReplace(gltfShape_7);
// const transform_11 = new Transform({
//   position: new Vector3(13, 9.6, 17),
//   rotation: new Quaternion(0, 0, 0, 1),
//   scale: new Vector3(1, 1, 1)
// });
// redcrystal.addComponentOrReplace(transform_11);
// redcrystal.addComponent(new AudioSource(resources.sounds.peasantunlock))
// redcrystal.addComponent(
//   new OnClick((): void => {
//     log("red crystal was clicked");
//     redcrystal.getComponent(AudioSource).playOnce()
//     //engine.removeEntity(lightbluecrystal);
//     //engine.removeEntity(redcrystal);
//     lightblueremoved = true;
//     redremoved = true;
//   })
// );


// let sorceress = new Entity();
// sorceress.addComponent(
//   new Transform({
//     position: new Vector3(18.5, 9.8, 12)
//   })
// );

// //sorceress.addComponent(new AudioSource(resources.sounds.goblinHit));
// sorceress.addComponent(new AudioSource(resources.sounds.doorIsLocked));

// sorceress.addComponent(resources.models.sorceress);

// let sorceressAnimator = new Animator();
// sorceress.addComponent(sorceressAnimator);

// //Add walk animation
// const walkClip = new AnimationState("walk");
// //const walkClip = new AnimationState("walkingInPlace");
// sorceressAnimator.addClip(walkClip);
// const turnRClip = new AnimationState("turnRight");
// turnRClip.looping = false;
// sorceressAnimator.addClip(turnRClip);
// //const swipeAttack = new AnimationState("swipeAttack");
// //sorceressAnimator.addClip(swipeAttack);
// const hitInFace = new AnimationState("hitInHead");
// sorceressAnimator.addClip(hitInFace);
// const deathFromFront = new AnimationState("deathFromFront");
// sorceressAnimator.addClip(deathFromFront);
// const spellAttack1 = new AnimationState("spellAttack1");
// sorceressAnimator.addClip(spellAttack1);
// const spellAttack2 = new AnimationState("spellAttack2");
// sorceressAnimator.addClip(spellAttack2);

// //sorceress.addComponent(new LerpData());

// sorceress.addComponent(
//   new OnClick((): void => {
//     if (!dead) {
//       if (attackable) {
//         log("sorceress was clicked");
//         sorceress.addComponent(new TimeOut(HIT_TIME));
//         walkClip.playing = false;
//         //swipeAttack.playing = false;
//         turnRClip.playing = false;
//         deathFromFront.playing = false;
//         //hitInFace.play()
//         //hitInFace.looping = false

//         sorceress.getComponent(AudioSource).playOnce();

//         HIT_POINTS = HIT_POINTS - 1;
//         log("hit points is now: ", HIT_POINTS);

//         if (HIT_POINTS == 3 && !firstpasscompleted) {
//           engine.addEntity(lightbluecrystal);
//           lightblueremoved = false;
//           puzzlesolved = false;
//           attackable = false;
//           sorceress.removeComponent(AudioSource)
//           sorceress.addComponent(
//             new AudioSource(resources.sounds.unlocksorceress)
//           );
//           asyncCall();
//           sorceress.getComponent(AudioSource).playOnce();
//           sorceress.removeComponent(AudioSource)
//           asyncCall();
//           sorceress.addComponent(new AudioSource(resources.sounds.doorIsLocked))
//           firstpasscompleted = true;
//         }

//         if(HIT_POINTS == 2 && !secondpasscompleted) {
//           engine.addEntity(redcrystal);
//           engine.addEntity(bluecrystal);
//           engine.addEntity(yellowcrystal);
//         }

//         if (HIT_POINTS == 0) {
//           log("play death animation");
//           dead = true;
//           walkClip.stop()
//           turnRClip.stop()
//           hitInFace.stop()
//           spellAttack1.stop()
//           spellAttack2.stop()
//           deathFromFront.play()
//           //deathFromFront.playing = true;
//           deathFromFront.looping = false;
//           stone_Pedestal_01.getComponent(AudioSource).playOnce()
//           //lantern_lit3.getComponent(utils.ToggleComponent).toggle();
//         }

//         // if (dead == false && hitInFace.playing == false) {
//         //   log("play hit in face looping false");
//         //   hitInFace.reset();
//         //   //hitInFace.playing = true;
//         //   hitInFace.play();
//         //   hitInFace.looping = false;
//         // }
//       } else {
//         sorceress.getComponent(AudioSource).playOnce();
//       }
//     } else {
//       log("grab the key from the corpse");
//     }
//   })
// );

// engine.addEntity(sorceress);
// walkClip.play();

// // Walk System
// // export class GnarkWalk {
// //   update(dt: number) {
// //     if (!sorceress.hasComponent(TimeOut) && !spellAttack1.playing && !spellAttack2.playing && !dead) {
// //       let transform = sorceress.getComponent(Transform);
// //       let path = sorceress.getComponent(LerpData);
// //       walkClip.playing = true;
// //       turnRClip.playing = false;
// //       if (path.fraction < 1) {
// //         path.fraction += dt / 12;
// //         transform.position = Vector3.Lerp(
// //           path.array[path.origin],
// //           path.array[path.target],
// //           path.fraction
// //         );
// //       } else {
// //         path.origin = path.target;
// //         path.target += 1;
// //         if (path.target >= path.array.length) {
// //           path.target = 0;
// //         }
// //         path.fraction = 0;
// //         transform.lookAt(path.array[path.target]);
// //         walkClip.pause();
// //         turnRClip.play();
// //         turnRClip.looping = false;
// //         sorceress.addComponent(new TimeOut(TURN_TIME));
// //       }
// //     }
// //   }
// // }

// // engine.addSystem(new GnarkWalk());

// export class WaitSystem {
//   update(dt: number) {
//     for (let ent of paused.entities) {
//       let time = ent.getComponentOrNull(TimeOut);
//       if (time) {
//         if (time.timeLeft > 0) {
//           time.timeLeft -= dt;
//         } else {
//           ent.removeComponent(TimeOut);
//         }
//       }
//     }
//   }
// }

// engine.addSystem(new WaitSystem());

// export class CrystalCheck {
//   update() {
//     if (redremoved && yellowremoved && blueremoved && lightblueremoved) {
//       if (!puzzlesolved) {
//         sorceress.removeComponent(AudioSource);
//         log("can unlock the boss now");
//         attackable = true;
//         sorceress.addComponent(
//           new AudioSource(resources.sounds.unlocksorceress)
//         );
//         asyncCall();
//         sorceress.getComponent(AudioSource).playOnce();
//         sorceress.removeComponent(AudioSource);
//         sorceress.addComponent(new AudioSource(resources.sounds.punch));
//         asyncCall();
//         spellAttack2.play();
//         puzzlesolved = true;
//       }
//     }
//   }
// }
// engine.addSystem(new CrystalCheck());

// export class BattleCry {
//   update() {
//     let transform = sorceress.getComponent(Transform);
//     //let path = sorceress.getComponent(LerpData);
//     let dist = distance(transform.position, camera.position);
//     if (dist < 16) {
//       if (!dead) {
//         if (spellAttack1.playing == false) {
//           //swipeAttack.reset();
//           //swipeAttack.playing = true;
//           spellAttack1.play();
//           walkClip.playing = false;
//           turnRClip.playing = false;
//           hitInFace.playing = false;
//           PLAYER_HP--;
//           log("PLAYER HP is now: ", PLAYER_HP);
//           if (PLAYER_HP == 0) {
//             log("play dead music.. Kick player out of the scene");
//           }
//         }
//       }
//       let playerPos = new Vector3(camera.position.x, 9.6, camera.position.z);
//       transform.lookAt(playerPos);
//     } else if (spellAttack1.playing) {
//       spellAttack1.stop();
//       //transform.lookAt(path.array[path.target]);
//     }
//   }
// }

// engine.addSystem(new BattleCry());

// const camera = Camera.instance;

// function distance(pos1: Vector3, pos2: Vector3): number {
//   const a = pos1.x - pos2.x;
//   const b = pos1.z - pos2.z;
//   return a * a + b * b;
// }


// //const hud: BuilderHUD = new BuilderHUD();
// //hud.attachToEntity(chest_Base_Iron_01)