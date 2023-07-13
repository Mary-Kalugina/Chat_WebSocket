import WebSocketConnection from "./WebSocket";

export default class ModalWindow {
  constructor() {
    this.ws = new WebSocketConnection();
  }

  init() {
    document.querySelector(".container").classList.add("hidden");
    this.subscribeOnEvent();
  }

  subscribeOnEvent() {
    document
      .querySelector(".submit_name")
      .addEventListener("click", this.submitName.bind(this));
  }

  submitName() {
    const userNameInput = document.querySelector(".input_name").value;
    this.ws.add(userNameInput);
  }
}
