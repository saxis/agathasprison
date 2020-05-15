import resources from "../resources";

export class BaseScene extends Entity {
  constructor() {
    super();
    engine.addEntity(this);

    const grassblades = new Entity("grassblades");
    const grassBladesShape = resources.models.grassblades;
    const grassBladesLoc = new Transform({
      position: new Vector3(16, 0, 0),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1),
    });
    grassblades.addComponentOrReplace(grassBladesLoc);
    grassblades.addComponentOrReplace(grassBladesShape);
    engine.addEntity(grassblades);

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

    const gameboard = new Entity("entity");
    engine.addEntity(gameboard);
    const gltfShape8 = new GLTFShape("models/altar_final_glb.glb");
    gltfShape8.withCollisions = true;
    gltfShape8.visible = true;
    gameboard.addComponentOrReplace(gltfShape8);
    const transform12 = new Transform({
      position: new Vector3(8, 0, 8),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1),
    });
    gameboard.addComponentOrReplace(transform12);

    const box = new Entity();
    box.addComponent(new Transform());
    box.getComponent(Transform).position.set(9, 0, 8);
    box.addComponent(new AudioSource(resources.sounds.spellAttack1));
    engine.addEntity(box);

    const soundbox2 = new Entity();
    soundbox2.addComponent(new Transform());
    soundbox2.getComponent(Transform).position.set(7, 0, 8);
    soundbox2.addComponent(new AudioSource(resources.sounds.evillaugh));
    engine.addEntity(soundbox2);

    // const agathasCage = new Entity("agathasCage");
    // engine.addEntity(agathasCage);
    // //const cageShape = new GLTFShape("models/cage2.glb");
    // const cageShape = new GLTFShape("models/ring_final_glb.glb");
    // agathasCage.addComponentOrReplace(cageShape);
    // const cageLoc = new Transform({
    //   position: new Vector3(8, 0, 8),
    //   rotation: new Quaternion(0, 0, 0, 1),
    //   scale: new Vector3(1, 1, 1),
    // });
    // agathasCage.addComponentOrReplace(cageLoc);
  }
}
