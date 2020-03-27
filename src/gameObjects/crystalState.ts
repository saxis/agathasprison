import { ICrystal } from "../interfaces/ICrystal";

export class CrystalState {

  private static instance: CrystalState;
  private _crystalState: ICrystal;

  static getInstance() {
    if(!CrystalState.instance) {
      CrystalState.instance = new CrystalState();
      CrystalState.instance._crystalState = {
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
    }
    return CrystalState.instance;
  }

  private constructor() {}

  get crystalState() {
    return this._crystalState;
  }

  set crystalState(newState) {
    this._crystalState = newState
  }
  
}
