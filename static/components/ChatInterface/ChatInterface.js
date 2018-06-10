class ChatInterface {
    constructor (node, styles) {
        this.styles = styles;
        this.node = node;
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
        this.latestTimestamp = messages[messages.length - 1].timestamp;
    }

    getLatestTimestamp () {
        return this.latestTimestamp;
    }
}