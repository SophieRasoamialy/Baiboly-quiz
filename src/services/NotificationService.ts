import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants, { ExecutionEnvironment } from "expo-constants";

const VERSE_NOTIF_KEY = "@verse_notif_enabled";

// In SDK 53+, Expo Go has limited support for expo-notifications.
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export const NotificationService = {
  async requestPermissions() {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      return finalStatus === "granted";
    } catch (e) {
      console.warn("Notification permissions error:", e);
      return false;
    }
  },

  async scheduleDailyVerseNotification() {
    try {
      // 1. Cancel existing daily notifications to avoid duplicates
      await this.cancelDailyVerseNotification();

      // 2. Schedule new one at 7:00 AM
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Teny Fikasana ho anao ✨",
          body: "Tsindrio raha hijery ny Teny Fikasana ho anao androany.",
          data: { screen: "VerseOfDay" },
          sound: true,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: 7,
          minute: 0,
        } as Notifications.DailyTriggerInput,
      });

      await AsyncStorage.setItem(VERSE_NOTIF_KEY, "true");
    } catch (e) {
      console.warn("Schedule notification error:", e);
    }
  },

  async cancelDailyVerseNotification() {
    try {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      for (const notif of scheduled) {
        if (notif.content.data?.screen === "VerseOfDay") {
          await Notifications.cancelScheduledNotificationAsync(notif.identifier);
        }
      }
      await AsyncStorage.setItem(VERSE_NOTIF_KEY, "false");
    } catch (e) {
      console.warn("Cancel notification error:", e);
    }
  },

  async isDailyVerseEnabled() {
    const val = await AsyncStorage.getItem(VERSE_NOTIF_KEY);
    return val === "true";
  },

  init() {
    try {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });
    } catch (e) {
      console.warn("Notification handler init error:", e);
    }
  },
};
