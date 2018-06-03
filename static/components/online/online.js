function Online (node, newFighters) {

    this.fighters = newFighters;
    this.fighters.sort(function (a, b) {
        if (a.userName > b.userName) {
            return 1;
        }
        if (a.userName < b.userName) {
            return -1;
        }
        return 0;
    })

    this.fighters.forEach((item) => {
        node.appendChild(item.badget());
    });

    this.isChanged = function (newFighters) {
        if (this.fighters.length != newFighters.length) {
            return flase;
        }
        return true;
    }

    this.refresh = function (newFighters) {

        var tmpFighters = newFighters;
        tmpFighters.sort(function (a, b) {
            if (a.userName > b.userName) {
                return 1;
            }
            if (a.userName < b.userName) {
                return -1;
            }
            return 0;
        })

        this.fighters.forEach((item, i) => {
            if (item != tmpFighters[i]) {
                this.fighters[i] = tmpFighters[i];
            }
        })

        this.fighters.forEach((item, i) => {
            if (node.children[i].innerText != item.userName) {
                node.children[i].innerText = item.userName;
                node.children[i].href = 'user.html?id=' + this.id;
                node.children[i].className = 'fighter';
                node.children[i].setAttribute('data-id', this.id);
            }
        })
    }
}