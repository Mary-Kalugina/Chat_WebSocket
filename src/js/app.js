import ModalWindow from "./ModalWindow";
import ChatAPI from "./ChatAPI";
const modalWindow = new ModalWindow();
const chatAPI = new ChatAPI();

document.addEventListener("DOMContentLoaded", () => {
  modalWindow.init();
  chatAPI.subscribeOnEvents();
});
