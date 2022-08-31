import { MessageBarManager } from "../../react-native-message-bar";

const MESSAGE_TYPES = {
    INFO: "info",
    ERROR: "error",
    SUCCESS: "success"
};

class Util {
    isEmailValid(email: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    isPasswordValid(password: string) {
        const re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
        return re.test(password)
    }
    isWebSiteValid(webiste: string) {
        const re = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/
        return re.test(webiste)
    }
    topAlertError(message, alertType = MESSAGE_TYPES.ERROR) {
        MessageBarManager.showAlert({
            message,
            alertType,
        });
    }
    topAlertSuccess(message, alertType = MESSAGE_TYPES.SUCCESS) {
        MessageBarManager.showAlert({
            message,
            alertType
        });
    }
}


export default new Util();