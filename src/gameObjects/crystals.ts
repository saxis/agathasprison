import resources from "../resources";
import { Crystal } from "./crystal";

export class Crystals {
  constructor() {}

  lightbluecrystal = new Crystal(
    resources.models.lightbluecrystal,
    new Transform({
      position: new Vector3(13.5, 0, 3),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1)
    }),
    "firstlightblue",
    "secondlightblue"
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
    },{
      firstlightblueremoved: false,
      secondyellowremoved: false,
      thirdblueremoved: false,
      fourthredremoved: false,
      firstCrystalPass: false,
      firstbluepasstwo: true,
      secondlightbluepasstwo: false,
      thirdyellowpasstwo: false,
      fourthredpasstwo: false,
      secondCrystalPass: true
    }
  );

  yellowcrystal = new Crystal(
    resources.models.yellowcrystal,
    new Transform({
      position: new Vector3(13.5, 0, 13),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1)
    }),
    "secondyellow",
    "thirdyellow",
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
    },{
      firstlightblueremoved: false,
      secondyellowremoved: false,
      thirdblueremoved: false,
      fourthredremoved: false,
      firstCrystalPass: false,
      firstbluepasstwo: true,
      secondlightbluepasstwo: true,
      thirdyellowpasstwo: false,
      fourthredpasstwo: false,
      secondCrystalPass: true 
    }
  );

  bluecrystal = new Crystal(
    resources.models.bluecrystal,
    new Transform({
      position: new Vector3(3, 0, 3),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1)
    }),
    "thirdblue",
    "firstblue",
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
    },{
      firstlightblueremoved: false,
      secondyellowremoved: false,
      thirdblueremoved: false,
      fourthredremoved: false,
      firstCrystalPass: false,
      firstbluepasstwo: false,
      secondlightbluepasstwo: false,
      thirdyellowpasstwo: false,
      fourthredpasstwo: false,
      secondCrystalPass: true 
    }
  );
  
  redcrystal = new Crystal(
    resources.models.redcrystal,
    new Transform({
      position: new Vector3(3, 0, 13),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1)
    }),
    "fourthred",
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
    },{
      firstlightblueremoved: false,
      secondyellowremoved: false,
      thirdblueremoved: false,
      fourthredremoved: false,
      firstCrystalPass: false,
      firstbluepasstwo: true,
      secondlightbluepasstwo: true,
      thirdyellowpasstwo: true,
      fourthredpasstwo: false,
      secondCrystalPass: true 
    }
  );

  public turnOnCrystals() {
    engine.addEntity(this.lightbluecrystal)
    engine.addEntity(this.yellowcrystal)
    engine.addEntity(this.bluecrystal)
    engine.addEntity(this.redcrystal)
  
  }


}


