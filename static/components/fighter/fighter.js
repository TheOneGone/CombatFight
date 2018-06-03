function FighterInfo (userInfoJSON) {
    
    if (typeof userInfoJSON == "string") {
        userInfo = JSON.parse(userInfoJSON);
    } else {
        userInfo = userInfoJSON;
    }
 
    this.id = userInfo.id;
    this.userName =  userInfo.username;
    this.lastActive =  userInfo.last_active;
    this.health = userInfo.health;
    this.token = userInfo.token;

    this.badge = function () {
        var a = document.createElement('a');
        a.innerText = this.userName;
        a.href = 'user.html?id=' + this.id;
        a.className = 'fighter';
        a.setAttribute('data-id', this.id);
        return a;
    }
}