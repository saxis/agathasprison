import resources from "../resources";
import { UniDialog } from "../modules/uniDialog";

function selectRandom(options: string[]): string {
  return options[Math.floor(Math.random() * (options.length - 1))];
}

export class AgathaDialog extends UniDialog {
  private dialogTree: UniDialog.DialogTree;
  //public onCorrectAnswer: (questionId: number) => void;
  public onSequenceComplete: () => void;
  public onQuestComplete: () => void;
  private _playerName: string;

  constructor(gameCanvas: UICanvas, playerName: string) {
    // Create a new SimpleDialog to manage the dialog tree
    super({
      canvas: gameCanvas,
      dialogText: {
        width: "50%",
        height: "25%",
        vAlign: "top",
        positionX: "10%",
        positionY: "-45%",
        textSpeed: 10,
        textIdleTime: 2,
        textConfig: { 
          fontSize: 18, 
          //paddingLeft: 10, 
          //paddingRight: 10, 
          positionX: "8%" 
        },
        background: resources.textures.textContainer,
        backgroundConfig: { sourceWidth: 200, sourceHeight: 70 }
        
      },
      optionsContainer: {
        stackOrientation: UIStackOrientation.VERTICAL,
        spacing: 2,
        width: "50%",
        height: "25%",
        vAlign: "top",
        positionX: "10%",
        positionY: "-65%",
        background: resources.textures.optionsContainer,
        backgroundConfig: { sourceWidth: 200, sourceHeight: 70 },
        optionsTextConfig: {
          fontSize: 18,
          paddingLeft: 55,
          // paddingRight: 25,
          // paddingTop: 25,
          //positionX: "30%", //was 50%
          positionY: -50 //was -50
        }
      }
    });

    this._playerName = playerName

    // Variables used in the dialog tree
    let firstTimeDialog = true;

    // Dialog text colors
    const npcColor = Color4.White();
    const playerColor = Color4.Black();


    this.dialogTree = new UniDialog.DialogTree()
    .if(() => firstTimeDialog)
        .call(() => (firstTimeDialog = false))
        .say(() => `Agatha says, "Hail ${playerName}. Perhaps you can help me? I seem to be [trapped]. "`,{ color: npcColor }) 
        .beginOptionsGroup()
           .option(() => "-> What circle?")
               .say(() => "You say, \"What do you mean by circle?\"", { color : playerColor })
               .say(() => 'Agatha says, "Yes, the circle of stone beneath my feet. I am unable to move. Some [enchantment] holds me."', { color: npcColor })
               .beginOptionsGroup()
                    .option(() => "-> What sort of enchantment?")
                        .say(() => "You say, \"What sort of enchantment? I might be able to help.\"", { color: playerColor })
                        .say(() => "Agatha says, \"I am not certain of the origin. I woke up here one day.\"", {color: npcColor})
                    .endOption()
                    .option(() => "-> Why would I care enough to help?")
                        .say(() => "You say, \"Why should I help you?\"", { color: playerColor })
                        .say(() => "Agatha says, \"I will be sure to make it worth your while adventurer.\"", { color: npcColor})
                    .endOption()
               .endOptionsGroup()
           .endOption()
        .endOptionsGroup()
        .say(() => "Agatha says, \"If you are willing to aid me there may be a man who can provide some answers\"", {color: npcColor})
        .say(() => "Agatha says, \"Search to the west. There is a man called river or rivers. Something like that. \"", { color: npcColor })
        .say(() => "Agatha says, \"He may be able to [help].\"", {color: npcColor}) 
        .beginOptionsGroup()
            .option(() => "-> I will find him and ask him to help!")
                .say(() => "You say, \"I will try to find him and then come back and help you\"",  { color: playerColor })
                .say(() => "Agatha says, \"Peace be upon you traveler. Travel quickly! \"",{ color: npcColor })
                .call(() => this.onSequenceComplete())
            .endOption()
            .option(() => "-> Maybe some other time...")
                .say(() => "You say, \"Maybe some other time, something does not seem right here\"", {color: playerColor})
                .say(() => "Agatha says, \"I see. You are no hero then. So be it.\"", { color: npcColor})
                .say(() => "Agatha says, \"Someone bold will come along eventually.\"", { color: npcColor})
                // .call(() => {
                //     firstTimeDialog = false
                // })
            .endOption()
            .option(() => "-> I cannot find anyone named Rivers.")
                .say(() => "You say, \"I cannot find him, I need another hint\"", {color: playerColor})
                .say(() => "Agatha says, \"I see. You are no hero then. So be it. Someone bold will come along eventually\"", { color: npcColor})
                // .call(() => {
                //     firstTimeDialog = false
                // })
            .endOption()
        .endOptionsGroup()
    .else()
        .if(() => !this.onSequenceComplete)
          .say(() => 'Agatha says, "Have you changed your mind then?\"') 
        .else()
          .say(() => 'Agatha says, "Did you find the old man?"')
          .beginOptionsGroup()
            .option(() => "-> Oh I found him alright")
                .say(() => 'You say, "I spoke to the Old Man."', { color: playerColor })
                .say(() => 'Agatha says, "Excellent! Release me, I am growing impatient."', {color: npcColor})
                // .call(() => this.onQuestComplete())
                // .call(async () => {
                //     log("In the first async block");
                //     //unlockDoor = true;
                //     //await bottomFloorDoor.removeComponent(AudioSource);
                // })
                // .call(async () => {
                //     log("in the second async call block");
                //     // await bottomFloorDoor.addComponent(
                //     //   new AudioSource(resources.sounds.grobb)
                //     // );
                // })
            .endOption()
            .option(() => "-> Not just yet...")
                .say(() => "You say, \"Not just yet\"", {color: playerColor})
                .say(() => 'Agatha says, "Please. I beg you! Find him"', {color: npcColor})
            .endOption()
            .option(() => "-> I have not started looking")
                .say(() => "You say, \"I will find him, be patient please.\"", {color: playerColor})
                .say(() => 'Agatha says, "He is out there! Please find him"', {color: npcColor})
            .endOption()
          .endOptionsGroup()
        .endif()
    .endif();
  }

  public run(): void {
    if (!this.isDialogTreeRunning()) {
      this.runDialogTree(this.dialogTree);
    }
  }
}
