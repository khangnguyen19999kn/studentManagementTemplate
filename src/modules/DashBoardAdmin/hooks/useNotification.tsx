import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

export default function useNotification() {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationSuccess = (
    placement: NotificationPlacement,
    message: string,
    description: string,
    type: "success" | "info" | "warning" | "error" | undefined = "success"
  ) => {
    const option = {
      message: message,
      description: description,
      placement,
    };
    switch (type) {
      case "success":
        return api.success(option);
      case "info":
        return api.info(option);
      case "warning":
        return api.warning(option);
      case "error":
        return api.error(option);
      default:
        return api.success(option);
    }
  };
  return {
    openNotificationSuccess,
    contextHolder,
  };
}
