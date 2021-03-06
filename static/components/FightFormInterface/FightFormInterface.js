class FightFormInterface{
    constructor(formDOM, radios, submitButtonInfo, onSubmit){
        this.radioIntrefaces = [];
        let i = 0;
        for(let radio of radios){
            let buttonsDiv = document.createElement("div");
            buttonsDiv.classList.add("radio-buttons");
            buttonsDiv.classList.add("radio-buttons-" + i);
            buttonsDiv.classList.add("radio-div-" + i);
            i++;
            formDOM.appendChild(buttonsDiv);
            let radioInterface = new RadioInterface(radio.name, radio.fields, buttonsDiv, radio.className);
            this.radioIntrefaces.push(radioInterface);
        }
        let submitButton = document.createElement("input");
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", submitButtonInfo.name);
        submitButton.setAttribute("class", submitButtonInfo.className);
        formDOM.appendChild(submitButton);
        formDOM.onsubmit = (e) => {
            e.preventDefault();
            let submitData = {};
            submitData.hit = +this.radioIntrefaces[0].value() + 1 + "";
            let block = this.radioIntrefaces[1].value();
            submitData.blocks = [+block + 1 + "", ((+block + 2) % 5) == 0 ? 1 : ((+block + 2) % 5) + ""];
            this.latestSubmitData = submitData;
            onSubmit(submitData);
        }
    }

    getLatestSubmitData(){
        return this.latestSubmitData;
    }

    reset(){
        for (let radio of this.radioIntrefaces) {
            radio.reset();
        }
    }
}