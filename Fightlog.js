class Fightlog{

    constructor(str){
        this.tagarr=[];
        let temp=this;
        let logtag = JSON.parse(str);
        function tagfactory(tag){
            for(let i = 0; i < tag.results.length; i++){
                for(let j = 0; j < tag.results[i].length; j++){
                    let restag = {};
                    restag.orig = tag.results[i][j].origin.username;
                    restag.targ = tag.results[i][j].target.username;
                    restag.hit = tag.results[i][j].hit;
                    restag.block = tag.results[i][j].blocked;
                    temp.tagarr.push(restag);
                }    
            }
        };
        tagfactory(logtag);
    }
   
    sendmsg(){
        alert(this.tagarr[0].orig);
    };
    
    gR(res){
        
    }
}