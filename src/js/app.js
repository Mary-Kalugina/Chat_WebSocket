import ModalWindow from "./ModalWindow";
const modalWindow = new ModalWindow();

document.addEventListener("DOMContentLoaded", () => {
    modalWindow.init();
    document.querySelector(".submit_name").addEventListener("click", modalWindow.submitName());
});
