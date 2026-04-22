/**
 * SoundHelper — plays quiz feedback sounds.
 * 
 * This version is HIGHLY DEFENSIVE to prevent app crashes if the 
 * native 'ExponentAV' module is missing on the device (common in Expo Go).
 */

let Audio: any = null;

// Use require instead of import to prevent top-level crashes
try {
  const ExpoAV = require("expo-av");
  Audio = ExpoAV.Audio;
} catch (error) {
  console.warn("SoundHelper: expo-av native module not found. Sounds will be disabled.");
}

const SOUNDS = {
  correct: require("../../assets/sounds/correct.mp3"),
  wrong: require("../../assets/sounds/wrong.mp3"),
  win: require("../../assets/sounds/win.mp3"),
};

type SoundKey = keyof typeof SOUNDS;

class SoundHelper {
  private static instance: SoundHelper;
  private currentSound: any = null;
  private audioInitialised = false;

  private constructor() {}

  public static getInstance(): SoundHelper {
    if (!SoundHelper.instance) {
      SoundHelper.instance = new SoundHelper();
    }
    return SoundHelper.instance;
  }

  private async ensureAudioReady() {
    if (this.audioInitialised || !Audio) return;
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
      this.audioInitialised = true;
    } catch (error) {
      console.warn("SoundHelper: failed to configure audio mode", error);
    }
  }

  public async playSound(soundKey: SoundKey, enabled: boolean) {
    // If sounds are disabled in settings OR native module is missing, do nothing
    if (!enabled || !Audio) return;

    try {
      await this.ensureAudioReady();

      if (this.currentSound) {
        try {
          await this.currentSound.stopAsync();
          await this.currentSound.unloadAsync();
        } catch (_) {}
        this.currentSound = null;
      }

      const { sound } = await Audio.Sound.createAsync(SOUNDS[soundKey], {
        shouldPlay: true,
        volume: 1.0,
      });

      this.currentSound = sound;

      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(() => {});
          if (this.currentSound === sound) {
            this.currentSound = null;
          }
        }
      });
    } catch (error) {
      console.warn("SoundHelper: failed to play", soundKey, error);
    }
  }

  public playCorrect(enabled: boolean) {
    return this.playSound("correct", enabled);
  }

  public playWrong(enabled: boolean) {
    return this.playSound("wrong", enabled);
  }

  public playWin(enabled: boolean) {
    return this.playSound("win", enabled);
  }
}

export const soundHelper = SoundHelper.getInstance();
