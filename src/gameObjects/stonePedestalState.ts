export class StonePedestal extends Entity {
  
    // Allow each room to specify a unique look and feel
    constructor(
      sound: AudioClip
    ) {
      super();
      engine.addEntity(this);
  
      this.addComponent(new GLTFShape(
        "models/Stone_Pedestal_01/Stone_Pedestal_01.glb"
      ))
      this.addComponent(new Transform({
        position: new Vector3(8, 0, 8),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(1, 1, 1)
      }))
  
      this.addComponent(new AudioSource(sound));
    }
  
    public playAudio() {
        this.getComponent(AudioSource).playOnce();
    }
  
   
  }