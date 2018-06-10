class RadioInterface{
    constructor(name, fields, root, className){
        this.buttons = [];
        for (let field in fields){
            let radioLabel = document.createElement("label");
            radioLabel.setAttribute("for", field);
            radioLabel.innerText = field;
            radioLabel.setAttribute("class", "rl");
            root.appendChild(radioLabel);
            
            let radioButton = document.createElement("input");
            radioButton.setAttribute("type", "radio");
            radioButton.setAttribute("name", name);
            radioButton.setAttribute("id", field);
            radioButton.setAttribute("class", "rb");
            if (className) {
                radioButton.setAttribute("class", className);
            }
            radioButton.setAttribute("value", fields[field]);
            root.appendChild(radioButton);
            this.buttons.push(radioButton);
        }
        this.buttons[0].checked = true;
    }

    value(){
        for(let button of this.buttons){
            if(button.checked){
                return button.value;
            }
        }
    }
}