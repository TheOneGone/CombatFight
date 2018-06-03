function FighterInfo (userInfoJSON) {

    userInfo = JSON.parse(userInfoJSON);

    this.id = userInfo.id;
    this.userName =  userInfo.username;
    this.lastActive =  userInfo.last_active;
    this.health = userInfo.health;
    this.token = userInfo.token;
}

var user = new FighterInfo(userInfoJSON);