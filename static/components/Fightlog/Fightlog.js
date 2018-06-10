class Fightlog{

    constructor(str){
        this.tagarr=[];
        this.pril_atack = ["Ловкий ", "Меткий ", "Фартовый ", "Мощьный ", "Расчетливый ", "Зазевавшийся ", "Косой ", "Самонадеянный ", "Сонный ", "Ленивый "];
        this.pril_def = ["ловкого ", "меткого ", "фартовго ", "мощьнго ", "расчетливого ", "зазевавшегося ", "косого ", "самонадеянному ", "сонного ", "ленивого "];
        this.hitbox = ["", "Голову ", "Грудь ", "Пояс ", "Ноги "];
        this.massages = [];
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
                        restag.last_time_orig = tag.results[i][j].origin.last_active % 1000;
                        restag.last_time_targ = tag.results[i][j].target.last_active % 1000;
                        temp.tagarr.push(restag);
                    }    
                }
            } else {
                
            }
        };
        tagfactory(logtag);
        this.createmassages();
    }
   
    createmassages(){
        if(this.tagarr.length!=0){
            function gener_pril(half, timestamp)
            {   
                half = half*5;
                var seed = timestamp / 1000;
                return Math.round(seed * (4) + half);
            };
            for(let i = 0; i < this.tagarr.length; i++){
                let msg='';
            
                if (this.tagarr[i].block){
                    msg = this.pril_atack[gener_pril(1, this.tagarr[i].last_time_orig)] + this.tagarr[i].orig + " не смог попасть в " + 
                    this.hitbox[this.tagarr[i].hit]  + " " + this.pril_def[gener_pril(0, this.tagarr[i].last_time_targ)] + this.tagarr[i].targ + 
                    "\nУдар был заблокирован";
                }else{
                    msg = this.pril_atack[gener_pril(0, this.tagarr[i].last_time_orig)] + this.tagarr[i].orig + " попал в " +
                    this.hitbox[this.tagarr[i].hit]  + " " + this.pril_def[gener_pril(1, this.tagarr[i].last_time_targ)] + this.tagarr[i].targ;
                }
                this.massages.push(msg);
            }
            return this.massages;
        }else{
            return ["Раундов боя еще не было"];
        }
    };
    
    
}