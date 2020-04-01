import resources from "../resources";
import { UniDialog } from "../modules/uniDialog";


function selectRandom(options: string[]): string {
  return options[Math.floor(Math.random() * (options.length - 1))];
}

export class AgathaDialog extends UniDialog {
  private dialogTree: UniDialog.DialogTree;
  public onSequenceComplete: () => void;
  public onQuestComplete: () => void;
  private playerName: string = "Adventurer";

  constructor(gameCanvas: UICanvas) {
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
        textConfig: { fontSize: 16, paddingLeft: 25, paddingRight: 25 },
        // textConfig: {
        //   fontSize: 18,
        //   positionX: "8%"
        // },
        background: resources.textures.blueContainer,
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
        background: resources.textures.blueContainer,
        backgroundConfig: { sourceWidth: 200, sourceHeight: 70 },
        optionsTextConfig: { fontSize: 20, paddingLeft: 20, positionY: "-35%" }
        // optionsTextConfig: {
        //   fontSize: 18,
        //   paddingLeft: 55,
        //   positionY: -50 //was -50
        // }
      }
    });

    // Variables used in the dialog tree
    let firstTimeDialog = true;

    // Dialog text colors
    const npcColor = Color4.White();
    const playerColor = Color4.Black();


    this.dialogTree = new UniDialog.DialogTree()
      .if(() => firstTimeDialog)
      .call(() => (firstTimeDialog = false))
      .say(
        () =>
          `Agatha says, "Hail ${this.playerName}. Perhaps you can help me? I seem to be [trapped]. "`,
        { color: npcColor }
      )
      .beginOptionsGroup()
      .option(() => "-> Why are you trapped?")
      .say(() => 'You say, "Why are you trapped?"', { color: playerColor })
      .say(
        () =>
          'Agatha says, "I am not certain. I am unable to move. This [prison] holds me."',
        { color: npcColor }
      )
      .beginOptionsGroup()
      .option(() => "-> What sort of prison?")
      .say(() => 'You say, "What sort of prison? I might be able to help.".', {
        color: playerColor
      })
      .say(
        () =>
          'Agatha says, "I am not certain of the origin. I woke up here one day."',
        { color: npcColor }
      )
      .endOption()
      .option(() => "-> Why would I care enough to help?")
      .say(() => 'You say, "Why should I help you?".', { color: playerColor })
      .say(
        () =>
          `Agatha says, "I will be sure to make it worth your while ${this.playerName}."`,
        { color: npcColor }
      )
      .endOption()
      .option(() => "-> How do you know my name?")
      .say(() => `You say, "How do you know y name?"`, { color: playerColor })
      .say(
        () =>
          `Agatha say, "I know many things ${this.playerName}. Help me and I will help you."`,
        { color: npcColor }
      )
      .endOption()
      .endOptionsGroup()
      .endOption()
      .endOptionsGroup()
      .say(
        () =>
          `Agatha says, "There is some pattern here that can be used to free me."`,
        { color: npcColor }
      )
      .say(
        () =>
          'Agatha says, "If you get stuck there may be a man who can provide some answers."',
        { color: npcColor }
      )
      .say(
        () =>
          'Agatha says, "Search to the west. There is a man called water or something like that."',
        { color: npcColor }
      )
      .say(() => 'Agatha says, "He may be able to [help]."', {
        color: npcColor
      })
      .beginOptionsGroup()
      .option(() => "-> I will do my best!")
      .say(
        () =>
          'You say, "I will try to find the sequence."',
        { color: playerColor }
      )
      .say(
        () =>
          `Agatha says, "Peace be upon you ${this.playerName}. Free me quickly!"`,
        { color: npcColor }
      )
      .call(() => this.onSequenceComplete())
      .endOption()
      .option(() => "-> Maybe some other time...")
      .say(
        () =>
          'You say, "Maybe some other time, something does not seem right here"',
        { color: playerColor }
      )
      .say(() => 'Agatha says, "I see. You are no hero then. So be it."', {
        color: npcColor
      })
      .say(() => 'Agatha says, "Someone bold will come along eventually."', {
        color: npcColor
      })
      // .call(() => {
      //     firstTimeDialog = false
      // })
      .endOption()
      .option(() => "-> I cannot find the person you mentioned.")
      .say(() => 'You say, "I cannot find him, I need another hint"', {
        color: playerColor
      })
      .say(() => `Agatha says, "I see. Try many crystal combinations."`, {
        color: npcColor
      })
      .say(() => `Agatha says, "Perhaps you will discover the sequence"`, {
        color: npcColor
      })
      // .call(() => {
      //     firstTimeDialog = false
      // })
      .endOption()
      .endOptionsGroup()
      .else()
      .if(() => !this.onSequenceComplete)
      .say(() => 'Agatha says, "Have you changed your mind then?"')
      .else()
      .say(() => 'Agatha says, "Did you find the old man?"')
      .beginOptionsGroup()
      .option(() => "-> Oh I found him alright")
      .say(() => 'You say, "I spoke to the Old Man."', { color: playerColor })
      .say(
        () => 'Agatha says, "Excellent! Release me, I am growing impatient."',
        { color: npcColor }
      )
      .endOption()
      .option(() => "-> Not just yet...")
      .say(() => 'You say, "Not just yet"', { color: playerColor })
      .say(() => 'Agatha says, "Please. I beg you! Find him"', {
        color: npcColor
      })
      .endOption()
      .option(() => "-> I have not started looking")
      .say(() => 'You say, "I will find him, be patient please."', {
        color: playerColor
      })
      .say(() => 'Agatha says, "He is out there! Please find him"', {
        color: npcColor
      })
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
