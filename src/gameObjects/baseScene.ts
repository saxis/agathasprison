import resources from "../resources";

export class BaseScene extends Entity {
  constructor() {
    super();
    engine.addEntity(this);

    const grassBase = new Entity("grass");
    const grassShape = new GLTFShape(
      "models/FloorBaseGrass_01/FloorBaseGrass_01.glb"
    );
    grassBase.addComponentOrReplace(grassShape);
    const grassLoc = new Transform({
      position: new Vector3(8, 0, 8),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1),
    });
    grassBase.addComponentOrReplace(grassLoc);
    engine.addEntity(grassBase);
    grassBase.addComponent(new AudioSource(resources.sounds.grobb));
    grassBase.getComponent(AudioSource).playOnce();
  }
}
