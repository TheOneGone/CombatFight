function Online (node, newFighters) {

    this.fighters = newFighters;
    this.fighters.sort(function (a, b) {return sortFighters(a, b) });

    this.fighters.forEach(function (item) {
        node.appendChild(item.badge());
    });

    this.refresh = function (node, newFighters) {
        var curFighters = this.fighters;
        var newArrived = newFighters;

        newArrived.sort(function (a, b) { return sortFighters(a, b) });

        var newArrivedId = newArrived.map(function (val) {return val.id;});
        for (var i = 0; i < curFighters.length; i++) {
            if (!~newArrivedId.indexOf(curFighters[i].id)) {
                curFighters.splice(i, 1);
                node.children[i].remove();
                i--;
            }
        }
        console.log(curFighters);

        var curFightersId = curFighters.map(function (val) {return val.id;});
        for (var i = 0; i < newArrived.length; i++) {
            if (~curFightersId.indexOf(newArrived[i].id)) {
                newArrived.splice(i, 1);
                i--;
            }
        };
        console.log(newArrived);

        newArrived.forEach(function (item, i) {
            end = false;
            for (var j = 0; j < node.children.length; j++) {
                if (item.userName <= node.children[j].innerText) {
                    node.insertBefore(item.badge(), node.children[j]);
                    break;
                } else {
                    end = true;
                }
            }
            if (end) {
                node.appendChild(item.badge());
            }
        });
        this.fighters = curFighters.concat(newArrived).sort(function (a, b) { return sortFighters(a, b); });
    };
}

function sortFighters (a, b) {
    if (a.userName > b.userName) {
        return 1;
    }
    if (a.userName < b.userName) {
        return -1;
    }
    return 0;
}