import { DerpData } from "./lerpData";
import { SecondaryTimeOut } from "../components/secondaryTimeOut"
import { SoundBox } from "../components/soundbox";
import resources from "../resources";
import { Player } from "./player";
import { Npc } from "./npc";
import { HpCounter } from "./hpCounter";
import { TimeOut } from "../components/timeOut";

//const soundbox2 = new SoundBox(new Transform({position: new Vector3(7,0,8)}), resources.sounds.evillaugh)
const soundbox3 = new SoundBox(new Transform({position: new Vector3(7, 0, 8) }), resources.sounds.playerHit2)
const soundbox4 = new SoundBox(new Transform({position: new Vector3(7,0,8)}), resources.sounds.playerHit)


export class OrcBattle {
    private _player: Player;
    private _npc: Npc;
    private _startPos: Vector3;
    //private _turntime: number;
    private _walk: AnimationState;
    private _turn: AnimationState;
    private _fight: AnimationState;
    private _kick: AnimationState;
    private _hit: AnimationState;
    private _idle: AnimationState;
    private _hit2: AnimationState;
    private _hit3: AnimationState;
    private _death: AnimationState;
    private _death2: AnimationState;
    private _clicked = false;
    private _battlepause: number;
    private dead = false;
    private _startfight: boolean = false;
    //private _dialog: PeasantDialog;
    private _punchpause: number = 2
    private _pacified: boolean = false;
    private _orcGruntHpBar: HpCounter;

    public endFight: () => void;

    constructor(canvas, player: Player, npc: Npc, startPos:Vector3,  clicked:boolean, battlepause:number ) {
        this._player = player;
        this._npc = npc;
        this._startPos = startPos;
        this._walk = this._npc.walk;
        this._fight = this._npc.punch;
        this._kick = this._npc.kick;
        this._idle = this._npc.idle1
        this._hit = this._npc.hitInHead;
        this._hit2 = this._npc.hitAndFall
        this._hit3 = this._npc.hit;
        this._death = this._npc.death
        this._clicked = clicked;
        this._battlepause = battlepause;
        //this._dialog = dialog
        this._orcGruntHpBar = new HpCounter(canvas,resources.textures.valkyrieHpBar,'npc')
        this._npc.resethealthbar(canvas)

        this._npc.addComponentOrReplace(
            new OnPointerDown(
               e => {
                 this._npc.getComponent(OnPointerDown).showFeedback = false;
                 if(!this._npc.hasComponent(SecondaryTimeOut)) {
                   this._clicked = true;
                   //log('this._clicked ', this._clicked)
                 }
               },{
                 button: ActionButton.PRIMARY,
                 showFeedback: true,
                 hoverText: "Punch" 
               }
           )
         )
    }

    update(dt: number) {
      let transform = this._npc.getComponent(Transform);
      //let path = this._npc.getComponent(DerpData); 
      let dist = distance(transform.position, camera.position);
      if (dist < 8) {
        let playerPos = new Vector3(camera.position.x, 0, camera.position.z);
        transform.lookAt(playerPos);
        //if(this._npc.battle){
          
          if (!this.dead && !this._clicked) {
            //log('in the block not dead and not clicked')
            if(!this._npc.hasComponent(SecondaryTimeOut) && this._npc.getComponent(OnPointerDown).showFeedback === false) {
              this._npc.getComponent(OnPointerDown).showFeedback = true;
            }
            if (!this._npc.hasComponent(TimeOut)) {
              //log('in the block not dead, not clicked, and no Timeout')
              this._walk.playing = false;
              this._hit.playing = false;
              this._hit2.playing = false;
              this._hit3.playing = false;
              this._idle.playing = false;
              
              if(Math.round(Math.random() * 1)){
                this._fight.play()
              } else {
                this._kick.play()
              }
              //this._fight.play()
              soundbox3.play()
              this._player.damage(1)
              //log('player hp ', this._player.hp)
              if(this._player.hp == 0) {
                //soundbox2.play()
                this._fight.stop()
                this._kick.stop()
                this.dead = true;
                this._npc.battle = false;
                //this._dialog.npcWon()
              }
              this._npc.addComponentOrReplace(new TimeOut(this._battlepause)); 
            } 
          } else if (!this.dead && this._clicked) {
            //log('in the block not dead and clicked')
            if(!this._npc.hasComponent(SecondaryTimeOut)) {
             // log('in the block not dead, clicked, no secondary timeout ')
              this._walk.playing = false;
              this._fight.playing = false;
              this._kick.playing = false;
              this._idle.playing = false;

              if(Math.round(Math.random() * 1)){
                this._hit.play()
              } else {
                if(Math.round(Math.random() * 1)) {
                  this._hit2.play()
                } else {
                  this._hit3.play()
                }
              }

              soundbox4.play()
              this._npc.takedamage(1)
              this._clicked = false;

              if(this._npc.hp == 0) {
                this.dead = true;
                this._npc.battle = false;
                this._fight.stop()
                this._kick.stop()
                this._hit.stop()
                this._hit2.stop()
                this._hit3.stop()

                this._death.play()
                this._death.looping = false;

                // if(Math.round(Math.random() * 1)){
                //   this._death.play()
                //   this._death.looping = false;
                // } else {
                //   this._death2.play()
                //   this._death2.looping = false;
                // }

                this._orcGruntHpBar.hide()
                this._npc.hidehpbar()
                //this._dialog.playerWon()
              }
              this._npc.addComponentOrReplace(new SecondaryTimeOut(this._punchpause));
            }
          }  
       
      } else if (dist < 20 && dist > 8) {
        
        //log('less than 20, more than 8')
        if(!this.dead) {
            this._orcGruntHpBar.show()
            this._npc.showhpbar()
            
            let playerPos = new Vector3(camera.position.x, 0, camera.position.z);
            this._npc.addComponentOrReplace(new DerpData([this._startPos,playerPos]))
    
            let transform = this._npc.getComponent(Transform);
            transform.lookAt(playerPos);
    
            let path = this._npc.getComponent(DerpData);
    
            this._walk.playing = true;
            this._fight.playing = false;
            this._kick.playing = false;
            this._hit.playing = false;
            this._hit2.playing = false;
            this._hit3.playing = false;
            this._idle.playing = false;

            // transform.position = Vector3.Lerp(
            //   this._startPos,
            //   playerPos,
            //   .2
            // )
    
            if (path.fraction < 1) {
              // let separator = 0
              // separator = separator + 0.2
              // log('separator ', separator)
            //   log('path.fraction is less than 1 ', path.fraction)
            //   log('dt ', dt)
            //   log('dt/12 ', dt/12)
               //path.fraction += dt / 12
              //  path.fraction += 0.2
              //  log('path.fraction after addition ', path.fraction)
            //log('path array origin ', path.array[path.origin])
            //log('path array target ', path.array[path.target])
    
              transform.position = Vector3.Lerp(
                path.array[path.origin],
                path.array[path.target],
                //path.fraction
                0.5
              );
            }
        }

        
        
      } else {
          if(!this.dead) {
            this._orcGruntHpBar.hide()
            this._npc.hidehpbar()

            this._fight.stop()
            this._hit.stop()
            this._hit2.stop()
            this._hit3.stop()
            this._walk.stop()
            this._npc.addComponentOrReplace(
              new Transform({
                position: this._startPos,
                rotation: Quaternion.Euler(0, -90, 0)
              })
            );
            this._idle.play()
          }
      }
    }
  }

  function distance(pos1: Vector3, pos2: Vector3): number {
    const a = pos1.x - pos2.x;
    const b = pos1.z - pos2.z;
    return a * a + b * b;
  }

  const camera = Camera.instance;