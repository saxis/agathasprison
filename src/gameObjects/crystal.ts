import { ICrystal } from "../interfaces/ICrystal";
import resources from "../resources";
import { CrystalState } from "./crystalState";
import { Crystals } from "./crystals";

export class Crystal extends Entity {
    public isOpen: boolean;
    public isHidden: boolean;
    crystalState = CrystalState.getInstance();
  
    // Allow each room to specify a unique look and feel
    constructor(
      model: GLTFShape,
      transform: TranformConstructorArgs,
      matchString: string,
      matchString2: string,
      successCondition: ICrystal,
      successCondition2: ICrystal
    ) {
      super();
      engine.addEntity(this);
      
      this.addComponent(model);
      this.addComponent(new Transform(transform));
      this.addComponent(new AudioSource(resources.sounds.unlocksorceress));
      this.addComponent(
        new OnPointerDown(e => {
          this.playAudio()
          // log(`Current matchString: ${matchString}`)
          
          let success = {}
          if (this.crystalState.crystalState.secondCrystalPass) {
            success = this.testCrystal(successCondition2)
            if(success) {
                // log('Matched the Success2 Condition')
                this.hideCrystal(matchString2)
              } else {
                // log("Matched the failure2 condition")
                this.showCrystal()
              }
          } else {
            success = this.testCrystal(successCondition)
            if(success) {
                // log('Matched the Success Condition')
                this.hideCrystal(matchString)
              } else {
                // log("Matched the failure condition")
                this.showCrystal()
              }
          }
          
          
        }, {
          button: ActionButton.PRIMARY,
          showFeeback: true,
          hoverText: "Investigate Crystal",
          distance: 3
        })
      )
    }
  
    public playAudio() {
        this.getComponent(AudioSource).playOnce();
    }
  
    public hideCrystal(matchString:string):void {
        //let tempState;

        for (const key in this.crystalState.crystalState) {
          if (key.indexOf(matchString) > -1) { 
            // log(`${key} match`)
            //this.crystalState.crystalState[key] = true;
            let tempState = this.crystalState.crystalState
            // log('tempState: ', tempState)
            tempState[key] = true;
            this.crystalState.crystalState = tempState
            // log('crystalState after truth ', this.crystalState.crystalState)
            engine.removeEntity(this)
          }
        }

        //log('crystalState at the end of hideCrystal: ', this.crystalState)
        // log('crystalState at the end of hideCrystal: ', this.crystalState.crystalState)
    }

    
    private testCrystal(successCondition) {
      let status = true

      if (this.crystalState.crystalState.firstlightblueremoved != successCondition.firstlightblueremoved) { 
        // log(`this.crystalState.firstlightblueremoved: ${this.crystalState.crystalState.firstlightblueremoved}`)
        // log(`successCondition.firstlightblueremoved: ${successCondition.firstlightblueremoved}`)
        // log(`setting status to false`)
        status = false 
      }
      if (this.crystalState.crystalState.secondyellowremoved != successCondition.secondyellowremoved) { 
        // log(`this.crystalState.secondyellowremoved: ${this.crystalState.crystalState.secondyellowremoved}`)
        // log(`successCondition.secondyellowremoved: ${successCondition.secondyellowremoved}`)
        // log(`setting status to false`)
        status = false 
      }
      if (this.crystalState.crystalState.thirdblueremoved != successCondition.thirdblueremoved) { 
        // log(`this.crystalState.thirdblueremoved: ${this.crystalState.crystalState.thirdblueremoved}`)
        // log(`successCondition.thirdblueremoved: ${successCondition.thirdremoved}`)
        // log(`setting status to false`) 
        status = false 
      }
      if (this.crystalState.crystalState.fourthredremoved != successCondition.fourthredremoved) { 
        // log(`this.crystalState.fourthredremoved: ${this.crystalState.crystalState.fourthredremoved}`)
        // log(`successCondition.fourthredemoved: ${successCondition.fourthredremoved}`)
        // log(`setting status to false`)  
        status = false 
      }
      if (this.crystalState.crystalState.firstCrystalPass != successCondition.firstCrystalPass) { 
        // log(`this.crystalState.firstCrystalPass: ${this.crystalState.crystalState.firstCrystalPass}`)
        // log(`successCondition.firstCrystalPass: ${successCondition.firstCrystalPass}`)
        // log(`setting status to false`)  
        status = false 
      }
      if (this.crystalState.crystalState.firstbluepasstwo != successCondition.firstbluepasstwo) { status = false }
      if (this.crystalState.crystalState.secondlightbluepasstwo != successCondition.secondlightbluepasstwo) { status = false}
      if (this.crystalState.crystalState.thirdyellowpasstwo != successCondition.thirdyellowpasstwo) { status = false}
      if (this.crystalState.crystalState.fourthredpasstwo != successCondition.fourthredpasstwo) { status = false}
      if (this.crystalState.crystalState.secondCrystalPass != successCondition.secondCrystalPass) { status = false}

      // log(`returning the following status: ${status}`)
      return status
    }


   
    public showCrystal():void {
        let first = true;
        let second = false;

        if (this.crystalState.crystalState.firstCrystalPass) {
            first = false
            second = true
        } 

      this.crystalState.crystalState = {
        firstlightblueremoved: false,
        secondyellowremoved: false,
        thirdblueremoved: false,
        fourthredremoved: false,
        firstCrystalPass: first,
        firstbluepasstwo: false,
        secondlightbluepasstwo: false,
        thirdyellowpasstwo: false,
        fourthredpasstwo: false,
        secondCrystalPass: second
      }


      log(this.crystalState.crystalState)
  }
  
  }