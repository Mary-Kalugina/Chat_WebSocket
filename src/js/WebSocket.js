import Chat from "./Chat";

export default class WebSocketConnection {
        constructor() {
          this.apiUrl = 'https://chat-on-websocket.onrender.com';
          this.chat = new Chat();
          this.ws = new WebSocket('wss://https://chat-on-websocket.onrender.com');
          this.user = null;
        }

        add(user) {
          document.querySelector(".error_message").textContent = "";
          const xhr = new XMLHttpRequest();
          const body = JSON.stringify(user);
        
          xhr.open("POST", this.apiUrl + '/new-user');
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status == 200) {
              try {
                const result = xhr.response;
                this.user = result.user;
                if (result.status === "error") {
                  document.querySelector(".error_message").textContent = result.message;
                  
                  return;
                }
                this.removeWidget();
                this.chat.onEnterChatHandler(this.user.id, this.user.name);
              } catch (e) {
                console.error(e);
              }
            }
          };
          xhr.send(body);
        }

        removeWidget() {
          document.querySelector(".widget").remove();
          document.querySelector(".container").style.display = "inline";
        }

        sendMessage() {
          const chatInput = document.querySelector('.chat_input');
          const message = chatInput.value;
          
          if (!message) return;
          
          ws.send(JSON.stringify(
            {
              user: this.user, 
              type: "send", 
              message
            }
          ));
          
          chatInput.value = '';
        };

        subscribeOnEvents() {
          ws.addEventListener('open', (e) => {          
            console.log('ws open');
          });
          
          ws.addEventListener('close', (e) => {
            console.log('ws close');

            ws.send(JSON.stringify(
              {
                user: this.user, 
                type: "exit", 
                message
              }
            ));    
            
            document.getElementById(this.user.id).remove();        
          });
          
          ws.addEventListener('error', (e) => {
            
            console.log('ws error');
          });
          
          ws.addEventListener('message', (e) => {
            const data = JSON.parse(e.data);
            data.user.id === this.user.id ? this.chat.renderMessage(data.message, "You") : this.chat.renderMessage(data.message, data.user.name);
          });
        }
      }
    