import icon from "@images/logo.png";
import { toast } from "react-toastify";

const permissionStatus = {
  GRANTED: "granted",
  DENIED: "denied",
};

export function notifyUser(text: string) {
  toast(text);

  if (!("Notification" in window)) {
    console.log("Web Notifications are not supported.");
    globalThis.alert(text);
  } else if (Notification.permission === permissionStatus.GRANTED) {
    showNotification(text);
  } else if (Notification.permission !== permissionStatus.DENIED) {
    Notification.requestPermission().then((permission) => {
      if (permission === permissionStatus.GRANTED) {
        showNotification(text);
      }
    });
  }
}

function showNotification(text: string) {
  const notification = new Notification(text, { icon });
  setTimeout(notification.close.bind(notification), 3000);
}
