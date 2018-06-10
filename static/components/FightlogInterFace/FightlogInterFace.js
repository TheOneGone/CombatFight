class FightlogInterFace{

    constructor(node){
        this.node = node;
    }
   
    refresh ( log ){
        var range = document.createRange();
        range.selectNodeContents(this.node);
        range.deleteContents();
        var logmsg = "";
        for(let i =0; i < log.massages.length; i++){
            logmsg = logmsg + "<span>" + log.massages[i] + "</span>";
        }
        this.node.innerHTML = logmsg;
    };
    
    
}