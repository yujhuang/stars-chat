var ChatApp = window.React.createClass({
    getInitialState: function() {
      return {
          messages: [],
          socket: window.io(window.location.hostname),
          user: "Guest"
      }
    },
    componentWillUpdate: function() {
        window.setInterval(function() {
            var elem = document.getElementById('content-box');
            elem.scrollTop = elem.scrollHeight;
        }, 100);
    },
    componentDidMount: function() {

        let self = this;
        this.state.socket.on("receive-message", function(msg) {
            let messages = self.state.messages;
            messages.push(msg);
            self.setState({messages: messages})
        });
    },
    submitMessage: function() {
        let body = document.getElementById("message").value;
        var message = {
            body: body,
            user: this.state.user || "Guest"
        };
        document.getElementById("message").value = "";
        this.state.socket.emit("new-message", message);

    },
    pickUser: function() {
      let user = document.getElementById('user').value;
      this.setState({user: user});
    },
    render: function() {
        let self = this;
        var messages = self.state.messages.map(function(msg){
            return <li><strong id="name">{msg.user}</strong>:       <span id="text">{msg.body}</span></li>
        });
        return (
            <div>
                <nav id="title">
                    <div id="head">
                       <h2>Welcome to STARS</h2>
                    </div>
                    <div id="profile" className="pull-right">
                        User: {self.state.user}
                    </div>
                </nav>
              <div className="fluid-container" id="content-box">
                  <ul className="list" id="content">
                      {messages}
                  </ul>
              </div>

              <div id = "msg-form">
                  <div >
                        <textarea id="message" type="text" placeholder="Enter your message " /> <button id="send" onClick={() => self.submitMessage()}>send</button> <br />
                  </div>
                  <div id = "usr"><input id="user" type="text" placeholder="choose a username" /> <a onClick={() => self.pickUser()}>CHOOSE</a></div>
              </div>
            </div>
        )
    }
});

window.ReactDOM.render(
    <ChatApp/>,
    document.getElementById("chat")
);