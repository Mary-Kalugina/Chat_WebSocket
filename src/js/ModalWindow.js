import WebSocketConnection from "./WebSocket";

export default class ModalWindow {
    constructor() {
        this.ws = new WebSocketConnection();
    }
    init() {
    const widget = `<div class="widget">
    <h4 class="modal__header">Choose nickname</h4>
    <input type="text" class="input_name">
    <div class="error_message"></div>
    <button type="submit" class="submit_name">Continue</button>
    </div>`;
    document.getElementById("root").insertAdjacentHTML("afterBegin", widget);
    document.querySelector(".container").style.display = "none";
  }

  submitName() {
    const userNameInput = document.querySelector(".input_name").textContent;
    this.ws.add(userNameInput);
  }
}
