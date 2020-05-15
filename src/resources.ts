export default {
    sounds: {
        moveObject1: new AudioClip("sounds/move_object1.mp3"),
        moveObject2: new AudioClip("sounds/move_object2.mp3"),
        goblinHit: new AudioClip("sounds/goblin_hit.mp3"),
        punch: new AudioClip("sounds/punch.mp3"),
        playerHit: new AudioClip("sounds/player_hit.mp3"),
        playerHit2: new AudioClip("sounds/player_hit2.mp3"),
        doorIsLocked: new AudioClip("sounds/door_lock.mp3"),
        grobb: new AudioClip("sounds/GROBB.mp3"),
        lava: new AudioClip("sounds/LAVASTOR.mp3"),
        fear: new AudioClip("sounds/FEARPLAN.mp3"),
        unlocksorceress: new AudioClip("sounds/unlock_sorceress.mp3"),
        peasantunlock: new AudioClip("sounds/peasantunlock.mp3"),
        fighterhit: new AudioClip("sounds/fighterhit.mp3"),
        missioncomplete: new AudioClip("sounds/missioncomplete.mp3"),
        executioner: new AudioClip("sounds/executioner.mp3"),
        button: new AudioClip("sounds/button.mp3"),
        spellAttack1: new AudioClip("sounds/zapsplat_magic1.mp3"),
        evillaugh: new AudioClip("sounds/crazyChickLaugh.mp3"),

    },
    models: {
        agatha: new GLTFShape("models/agatha3.glb"),
        yellowcrystal: new GLTFShape("models/Crystal_05/Crystal_05.glb"),
        lightbluecrystal: new GLTFShape("models/Crystal_03/Crystal_03.glb"),
        bluecrystal: new GLTFShape("models/Crystal_01/Crystal_01.glb"),
        redcrystal: new GLTFShape("models/Crystal_02/Crystal_02.glb"),
        dagger: new GLTFShape('models/floor2/Dagger_01/Dagger_01.glb'),
        grassblades: new GLTFShape("models/grass_glb.glb"),
    },
    textures: {
        grayContainer: new Texture("src/images/dialogs/graybox.png"),
        valkyrieHpBar: new Texture("src/images/ValkyrieHPBar.png"),
        playerCounter: new Texture("src/images/player.png")
      }
}