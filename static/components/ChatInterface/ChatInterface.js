class ChatInterface {
    constructor (node, styles, callback) {
        this.styles = styles;
        this.node = node;
        
        let form = document.createElement('form');
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'message-input');
        let button = document.createElement('button');
        form.appendChild(input);
        form.appendChild(button);
        var _this = this;
        form.onsubmit = function (event) {
            event.preventDefault();
            button.setAttribute('disabled', 'disabled');
            callback(input.value, _this.getLatestTimestamp()).then(
                button.removeAttribute('disabled', 'disabled')
            )
        };

        node.appendChild(form);
    }

    add (messages) {
        for (let message of messages) {
            let fighter = new FighterInfo(message.user);
            let userSpan = fighter.badge();
            userSpan.setAttribute("class", this.styles.userClass);

            let messageText = document.createElement("span");
            messageText.innerText = message.message;
            messageText.setAttribute("class", this.styles.textClass);

            let messageDiv = document.createElement("div");
            messageDiv.setAttribute("class", this.styles.divClass);
            messageDiv.appendChild(userSpan);
            messageDiv.appendChild(messageText);
            this.node.appendChild(messageDiv);
        }
        if (messages[messages.length - 1]) this.latestTimestamp = messages[messages.length - 1].timestamp;
    }

    getLatestTimestamp () {
        return this.latestTimestamp;
    }
}