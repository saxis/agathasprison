import resources from "../resources";

let firstlightblueremoved = false;
let secondyellowremoved = false;
let thirdblueremoved = false;
let fourthredremoved = false;
let firstCrystalPass = true;

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
  new OnPointerDown(
    e => {
      yellowcrystal.getComponent(AudioSource).playOnce();
      //log("myEntity clicked", e)
      if(firstlightblueremoved && !secondyellowremoved && !fourthredremoved && !thirdblueremoved) {
        //instructions.value =
        //"Yellow was clicked. Playing Audio, removing yelloww";
        secondyellowremoved = true;
        engine.removeEntity(yellowcrystal)

      } else {
        //instructions.value =
        //"Yellow was clicked. Adding Lightblue, red, blue";
        firstlightblueremoved = false;
        engine.addEntity(lightbluecrystal)
        fourthredremoved = false;
        engine.addEntity(redcrystal)
        thirdblueremoved = false;
        engine.addEntity(bluecrystal)
      }
    },
    {
      button: ActionButton.PRIMARY,
      showFeeback: true,
      hoverText: "Play Chime"
    }
  )
)

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
    lightbluecrystal.getComponent(AudioSource).playOnce();
    if (!firstlightblueremoved && !secondyellowremoved && !fourthredremoved && !thirdblueremoved) {
      //instructions.value = "Light Blue Crystal was Clicked. Playing Audio. Removing lightblue";
      firstlightblueremoved = true;
      engine.removeEntity(lightbluecrystal);
    } else {
      //instructions.value = "Light Blue Crystal was Clicked. Playing Audio. Adding yellow, red, blue";
      secondyellowremoved = false;
      engine.addEntity(yellowcrystal);
      fourthredremoved = false;
      engine.addEntity(redcrystal);
      thirdblueremoved = false;
      engine.addEntity(bluecrystal);
    }
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
    bluecrystal.getComponent(AudioSource).playOnce();
    if (firstlightblueremoved && secondyellowremoved && !thirdblueremoved && !fourthredremoved) {
      //instructions.value = "Blue was clicked. Playing Audio. Removing Blue";
      thirdblueremoved = true;
      engine.removeEntity(bluecrystal)
    } else {
      //instructions.value = "Blue was clicked. Adding yellow and lightblue and red"
      secondyellowremoved = false;
      engine.addEntity(yellowcrystal)
      firstlightblueremoved = false;
      engine.addEntity(lightbluecrystal)
      fourthredremoved = false;
      engine.addEntity(redcrystal)
    }
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
    
    redcrystal.getComponent(AudioSource).playOnce();
    if (firstlightblueremoved && secondyellowremoved && thirdblueremoved && !fourthredremoved) {
      //instructions.value = "Red was clicked. Playing Audio, the peasantunlock sound, removing red crystal";
      fourthredremoved = true;
      engine.removeEntity(redcrystal)
    } else {
      //instructions.value = "Red was clicked. Playing Audio, the peasantunlock sound, adding blue, lightblue and yellow crystal";
      thirdblueremoved = false;
      secondyellowremoved = false;
      engine.addEntity(bluecrystal)
      engine.addEntity(yellowcrystal)
      firstlightblueremoved = false;
      engine.addEntity(lightbluecrystal)
    }
  })
);