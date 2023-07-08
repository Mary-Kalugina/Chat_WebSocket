import Chat from "./Chat";

export default class WebSocketConnection {
        constructor() {
          this.apiUrl = 'https://chat-on-websocket.onrender.com';
          this.chat = new Chat();
          this.ws = new WebSocket('wss://https://chat-on-websocket.onrender.com');
          this.user = null;
        }
        
        async add(user) {
          this.chat.removeError();
          const request = fetch(this.apiUrl + '/new-user', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
          });
          
          const result = await request;
          this.user = result.user;
          if (result.status === "error") {
            this.chat.renderError(result.message);
            
            return;
          }
          
          this.chat.removeWindow();
          this.chat.onEnterChatHandler(this.user.id, this.user.name);
          const json = await result.json();
          const status = json.status;
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
            console.log(e);
            
            console.log('ws open');
          });
          
          ws.addEventListener('close', (e) => {
            console.log(e);
            console.log('ws close');

            ws.send(JSON.stringify(
              {
                user: this.user, 
                type: "exit", 
                message
              }
            ));    
            
            this.chat.onExit();        
          });
          
          ws.addEventListener('error', (e) => {
            console.log(e);
            
            console.log('ws error');
          });
          
          ws.addEventListener('message', (e) => {
            console.log(e);
            const data = JSON.parse(e.data);
            data.user.id === this.user.id ? this.chat.renderMessage(data.message, "You") : this.chat.renderMessage(data.message, data.user.name)
          });
        }
      }
    