export class Crystal extends Entity {
    public isOpen: boolean;
    public isHidden: boolean;
  
    // Allow each room to specify a unique look and feel
    constructor(
      model: GLTFShape,
      transform: TranformConstructorArgs,
      sound: AudioClip
    ) {
      super();
      engine.addEntity(this);
  
      this.addComponent(model);
      this.addComponent(new Transform(transform));
  
      this.addComponent(new AudioSource(sound));
    }
  
    private playAudio(object) {
        object.getComponent(AudioSource).playOnce();
    }
  
    public hideCrystal(): void {
      if (!this.isHidden) {
        this.isHidden = true;

        async() => {
            await this.playAudio(this)
        }

        engine.removeEntity(this)
      }
    }

    public showCrysstal(): void {
        if (this.isHidden) {
            engine.addEntity(this)
        }
        async() => {
            await this.playAudio(this)
        } 
    }
  
  }