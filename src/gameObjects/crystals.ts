import resources from "../resources";
import { Crystal } from "./crystalState";

const lightbluecrystal = new Crystal(
  resources.models.lightbluecrystal,
  new Transform({
    position: new Vector3(13.5, 0, 3),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  }),
  "firstlightblue",
  {
    firstlightblueremoved: false,
    secondyellowremoved: false,
    thirdblueremoved: false,
    fourthredremoved: false,
    firstCrystalPass: true,
    firstbluepasstwo: false,
    secondlightbluepasstwo: false,
    thirdyellowpasstwo: false,
    fourthredpasstwo: false,
    secondCrystalPass: false
  }
);

const yellowcrystal = new Crystal(
  resources.models.yellowcrystal,
  new Transform({
    position: new Vector3(13.5, 0, 13),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  }),
  "secondyellow",
  {
    firstlightblueremoved: true,
    secondyellowremoved: false,
    thirdblueremoved: false,
    fourthredremoved: false,
    firstCrystalPass: true,
    firstbluepasstwo: false,
    secondlightbluepasstwo: false,
    thirdyellowpasstwo: false,
    fourthredpasstwo: false,
    secondCrystalPass: false
  }
);

const bluecrystal = new Crystal(
  resources.models.bluecrystal,
  new Transform({
    position: new Vector3(3, 0, 3),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  }),
  "thirdblue",
  {
    firstlightblueremoved: true,
    secondyellowremoved: true,
    thirdblueremoved: false,
    fourthredremoved: false,
    firstCrystalPass: true,
    firstbluepasstwo: false,
    secondlightbluepasstwo: false,
    thirdyellowpasstwo: false,
    fourthredpasstwo: false,
    secondCrystalPass: false
  }
);

const redcrystal = new Crystal(
  resources.models.redcrystal,
  new Transform({
    position: new Vector3(3, 0, 13),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  }),
  "fourthred",
  {
    firstlightblueremoved: true,
    secondyellowremoved: true,
    thirdblueremoved: true,
    fourthredremoved: false,
    firstCrystalPass: true,
    firstbluepasstwo: false,
    secondlightbluepasstwo: false,
    thirdyellowpasstwo: false,
    fourthredpasstwo: false,
    secondCrystalPass: false
  }
);

export function turnOnCrystals() {
  engine.addEntity(lightbluecrystal)
  engine.addEntity(yellowcrystal)
  engine.addEntity(bluecrystal)
  engine.addEntity(redcrystal)

}
