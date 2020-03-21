import { Npc } from "./gameObjects/npc";

// import resources from "./resources";
// import { PeasantDialog } from "./ui/index";
// import { BuilderHUD } from "./modules/BuilderHUD";

// const gameCanvas = new UICanvas();

class Peasant {
    peasant: Npc;

    constructor() {
        this.peasant = new Npc(500);
    }

}

// //model stuff
// //const point1 = new Vector3(46, 0, 45);
// const point1 = new Vector3(0, 0, 0);
// //const point2 = new Vector3(46, 0, 3);
// const point2 = new Vector3(0, 0, 2);
// //const point3 = new Vector3(40, 0, 1);
// const point3 = new Vector3(2, 0, 0)
// //const point4 = new Vector3(3, 0, 1);
// const point4 = new Vector3(0, 2, 0)
// //const point5 = new Vector3(3, 0, 45);
// const point5 = new Vector3(3, 0, 1)

// const path: Vector3[] = [point1, point2, point3, point4, point5];
// const TURN_TIME = 0.9;
// let dead = false;
// let pause = true;

// @Component("timeOut")
// export class TimeOut {
//   timeLeft: number;
//   constructor(time: number) {
//     this.timeLeft = time;
//   }
// }

// export const paused = engine.getComponentGroup(TimeOut);

// // LerpData component
// @Component("lerpData")
// export class LerpData {
//   array: Vector3[] = path;
//   origin: number = 0;
//   target: number = 1;
//   fraction: number = 0;
// }

// let peasantGirl = new Entity();
// peasantGirl.addComponent(
//   new Transform({
//     position: new Vector3(0, 0, 0)
//   })
// );

// peasantGirl.addComponent(resources.models.peasant);

// let peasantGirlAnimator = new Animator();
// peasantGirl.addComponent(peasantGirlAnimator);

// //Add walk animation
// const walkClip = new AnimationState("walk");
// peasantGirlAnimator.addClip(walkClip);
// const turnRClip = new AnimationState("turnLeft");
// turnRClip.looping = false;
// peasantGirlAnimator.addClip(turnRClip);
// const raiseDeadClip = new AnimationState("talking");
// peasantGirlAnimator.addClip(raiseDeadClip);
// peasantGirl.addComponent(new AudioSource(resources.sounds.peasantunlock));
// const unlockSpell = new AnimationState("unlockSpell");
// peasantGirlAnimator.addClip(unlockSpell);
// const salute = new AnimationState("salute");
// peasantGirlAnimator.addClip(salute);

// peasantGirl.addComponent(new LerpData());

// const dialog = new PeasantDialog(gameCanvas);

// peasantGirl.addComponent(
//   new OnClick((): void => {
//     dialog.run();
//   })
// );

// dialog.onSequenceComplete = () => {
//   walkClip.pause()
//   log("in onSequenceCompleted")
//   log("trying to play unlock Spell animation")
//   unlockSpell.play()
//   unlockSpell.looping = false;
//   log("trying to play salute animation")
//   salute.play();
//   salute.looping = false;
// };

// engine.addEntity(peasantGirl);
// walkClip.play();

// // Walk System
// export class GnarkWalk {
//   update(dt: number) {
//     if (!peasantGirl.hasComponent(TimeOut) && !raiseDeadClip.playing) {
//       let transform = peasantGirl.getComponent(Transform);
//       let path = peasantGirl.getComponent(LerpData);
//       walkClip.playing = true;
//       turnRClip.playing = false;
//       if (path.fraction < 1) {
//         path.fraction += dt / 12;
//         transform.position = Vector3.Lerp(
//           path.array[path.origin],
//           path.array[path.target],
//           path.fraction
//         );
//       } else {
//         path.origin = path.target;
//         path.target += 1;
//         if (path.target >= path.array.length) {
//           path.target = 0;
//         }
//         path.fraction = 0;
//         transform.lookAt(path.array[path.target]);
//         walkClip.pause();
//         turnRClip.play();
//         turnRClip.looping = false;
//         peasantGirl.addComponent(new TimeOut(TURN_TIME));
//       }
//     }
//   }
// }

// engine.addSystem(new GnarkWalk());

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

// export class BattleCry {
//   update() {
//     let transform = peasantGirl.getComponent(Transform);
//     let path = peasantGirl.getComponent(LerpData);
//     let dist = distance(transform.position, camera.position);
//     if (dist < 16) {
//       if (raiseDeadClip.playing == false) {
//         raiseDeadClip.reset();
//         raiseDeadClip.playing = true;
//         walkClip.playing = false;
//         turnRClip.playing = false;
//       }
//       let playerPos = new Vector3(camera.position.x, 0, camera.position.z);
//       transform.lookAt(playerPos);
//     } else if (raiseDeadClip.playing) {
//       raiseDeadClip.stop();
//       transform.lookAt(path.array[path.target]);
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

// const hud: BuilderHUD = new BuilderHUD();
// hud.attachToEntity(peasantGirl)
