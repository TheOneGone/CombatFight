class Fightlog{

    constructor(str){
        this.tagarr=[];
        this.pril_o = ["Ловкий ", "Меткий ", "Фартовый ", "Мощьный ", "Расчетливый ", "Зазевавшийся ", "Косой ", "Самонадеянный ", "Сонный ", "Ленивый "];
        this.pril_t = ["ловкого ", "меткого ", "фартовго ", "мощьнго ", "расчетливого ", "зазевавшегося ", "косого ", "самонадеянному ", "сонного ", "ленивого "];
        this.hitbox = ["", "Голову ", "Грудь ", "Пояс ", "Ноги "]
        let temp=this;
        let logtag = JSON.parse(str);
        function tagfactory(tag){
            if(tag.results[0].length!=0){
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
            } else {
                
            }
        };
        tagfactory(logtag);
    }
   
    sendmsg(){
        if(this.tagarr.length!=0){
            let thmsg = "";
            function gR(min, max)
            {
                return Math.floor(Math.random() * (max - min) + min);
            };
            for(let i = 0; i < this.tagarr.length; i++){
                let msg='';
                if (this.tagarr[i].block){
                    msg = this.pril_o[gR(5,9)] + this.tagarr[i].orig + " не смог попасть в " + this.hitbox[this.tagarr[i].hit]  + " " + this.pril_t[gR(0,4)] + this.tagarr[i].targ + "\nУдар был заблокирован";
                }else{
                    msg = this.pril_o[gR(0,4)] + this.tagarr[i].orig + " попал в " + this.hitbox[this.tagarr[i].hit]  + " " + this.pril_t[gR(5,9)] + this.tagarr[i].targ + '';
                }
                thmsg = thmsg + "\n" + msg;
            }
            return thmsg;
        }else{
            return "Раундов боя еще не было";
        }
    };
    
    
}