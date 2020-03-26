import { ICrystal } from "../interfaces/ICrystal";
import resources from "../resources";
import { turnOnCrystals } from "./crystals";
//import isEqual from "lodash/isEqual";

export class Crystal extends Entity {
    public isOpen: boolean;
    public isHidden: boolean;
    private _crystalState: ICrystal = {
      firstlightblueremoved:false,
      secondyellowremoved:false,
      thirdblueremoved:false,
      fourthredremoved:false,
      firstCrystalPass:true,
      firstbluepasstwo:false,
      secondlightbluepasstwo: false,
      thirdyellowpasstwo:false,
      fourthredpasstwo:false,
      secondCrystalPass:false
    }
  
    // Allow each room to specify a unique look and feel
    constructor(
      model: GLTFShape,
      transform: TranformConstructorArgs,
      matchString: string,
      successCondition: ICrystal,
    ) {
      super();
      engine.addEntity(this);
  
      this.addComponent(model);
      this.addComponent(new Transform(transform));
      this.addComponent(new AudioSource(resources.sounds.unlocksorceress));
      this.addComponent(
        new OnPointerDown(e => {
          this.playAudio()
          
          let success = this.testCrystal(successCondition)
          if(success) {
            log('Matched the Success Condition')
            this.hideCrystal(matchString)
          } else {
            log("Matched the failure condition")
            this.showCrystal(matchString)
          }
        }, {
          button: ActionButton.PRIMARY,
          showFeeback: true,
          hoverText: "Play Chime"
        })
      )
    }
  
    public playAudio() {
        this.getComponent(AudioSource).playOnce();
    }
  
    public hideCrystal(matchString:string):void {

        engine.removeEntity(this)
        let tempState;

        for (const key in this.crystalState) {
          if (key.indexOf(matchString) > -1) { 
            tempState = this.crystalState
            tempState[key] = true;
            this.crystalState = tempState
          }
        }

        log(`crystalState at the end of hideCrystal: ${this.crystalState}`)
    }

    get crystalState() {
      return this._crystalState;
    }

    set crystalState(newState) {
      this._crystalState = newState;
    }

    private testCrystal(successCondition) {
      let status = true

      if (this.crystalState.firstlightblueremoved != successCondition.firstlightblueremoved) { 
        log(`this.crystalState.firstlightblueremoved: ${this.crystalState.firstlightblueremoved}`)
        log(`successCondition.firstlightblueremoved: ${successCondition.firstlightblueremoved}`)
        log(`setting status to false`)
        status = false 
      }
      if (this.crystalState.secondyellowremoved != successCondition.secondyellowremoved) { 
        log(`this.crystalState.secondyellowremoved: ${this.crystalState.secondyellowremoved}`)
        log(`successCondition.secondyellowremoved: ${successCondition.secondyellowremoved}`)
        log(`setting status to false`)
        status = false 
      }
      if (this.crystalState.thirdblueremoved != successCondition.thirdblueremoved) { 
        log(`this.crystalState.thirdblueremoved: ${this.crystalState.thirdblueremoved}`)
        log(`successCondition.thirdblueremoved: ${successCondition.thirdremoved}`)
        log(`setting status to false`) 
        status = false 
      }
      if (this.crystalState.fourthredremoved != successCondition.fourthredremoved) { 
        log(`this.crystalState.fourthredremoved: ${this.crystalState.fourthredremoved}`)
        log(`successCondition.fourthredemoved: ${successCondition.fourthredremoved}`)
        log(`setting status to false`)  
        status = false 
      }
      if (this.crystalState.firstCrystalPass != successCondition.firstCrystalPass) { 
        log(`this.crystalState.firstCrystalPass: ${this.crystalState.firstCrystalPass}`)
        log(`successCondition.firstCrystalPass: ${successCondition.firstCrystalPass}`)
        log(`setting status to false`)  
        status = false 
      }
      if (this.crystalState.firstbluepasstwo != successCondition.firstbluepasstwo) { status = false }
      if (this.crystalState.secondlightbluepasstwo != successCondition.secondlightbluepasstwo) { status = false}
      if (this.crystalState.thirdyellowpasstwo != successCondition.thirdyellowpasstwo) { status = false}
      if (this.crystalState.fourthredpasstwo != successCondition.fourthredpasstwo) { status = false}
      if (this.crystalState.secondCrystalPass != successCondition.secondCrystalPass) { status = false}

      log(`returning the following status: ${status}`)
      return status
    }

    // public testCrystal(crystalState:ICrystal,phaseOneSuccessState:ICrystal, phaseTwoSuccessState:ICrystal) {
    //   if (!crystalState.secondCrystalPass) {
    //     if (crystalState == phaseOneSuccessState) {
    //       this.playAudio
    //       this.hideCrystal
    //     } else {
    //       this.playAudio
    //       this.showCrystal
    //     }
    //   } else {
    //     if (crystalState == phaseTwoSuccessState) {
    //       this.playAudio
    //       this.hideCrystal
    //     } else {
    //       this.playAudio
    //       this.showCrystal
    //     }
    //   }

    // }

    public showCrystal(matchString:string):void {

      //engine.removeEntity(this)
      let tempState;

      for (const key in this.crystalState) {
        if (key.indexOf(matchString) > -1) { 
          tempState = this.crystalState
          tempState[key] = false;
          this.crystalState = tempState
        }
      }

      turnOnCrystals()

      log(this.crystalState)
  }
  
  }