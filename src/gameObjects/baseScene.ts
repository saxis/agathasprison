import resources from "../resources";

export class BaseScene extends Entity {
  constructor() {
    super();
    engine.addEntity(this)

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
    purplefloor.setParent(this)

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
    circlebase.setParent(this)

    const circlebase2 = new Entity("circlebase2");
    engine.addEntity(circlebase2);
    circlebase2.addComponentOrReplace(gltfShape);
    const transform4 = new Transform({
      position: new Vector3(13.5, 0, 13),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1)
    });
    circlebase2.addComponentOrReplace(transform4);
    circlebase2.setParent(this)

    const circlebase3 = new Entity("circlebase3");
    engine.addEntity(circlebase3);
    circlebase3.addComponentOrReplace(gltfShape);
    const transform5 = new Transform({
      position: new Vector3(3, 0, 3),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1)
    });
    circlebase3.addComponentOrReplace(transform5);
    circlebase3.setParent(this)

    const circlebase4 = new Entity("circlebase4");
    engine.addEntity(circlebase4);
    circlebase4.addComponentOrReplace(gltfShape);
    const transform6 = new Transform({
      position: new Vector3(3, 0, 13),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1)
    });
    circlebase4.addComponentOrReplace(transform6);
    circlebase4.setParent(this)
  }

  public despawnCircles() {
    log('in despawnCircles')
    //engine.removeEntity(this.components.circlebase)
    //engine.removeEntity(this.getComponent(this.components.circlebase))
   // engine.removeEntity(this.components.circlebase2)
   // engine.removeEntity(this.components.circlebase3)
    //engine.removeEntity(this.components.circlebase4)
  }
}
