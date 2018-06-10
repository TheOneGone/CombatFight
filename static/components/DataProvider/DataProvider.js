function DataProvider (obj, params) {
    let compare = (props, obj) => {
        if (!obj || !props) return false;
        for (let prop in props) {
            if (typeof props[prop] == "object") {
                if (!compare(props[prop], obj[prop])) {
                    return false;
                }
            } else if (obj[prop] == undefined || props[prop] != obj[prop]) {
                return false;
            }
        }
        return true;
    }

    return {
        on: function(props, callback) {
            let timer = () => {
                let next;
                if(typeof obj == "string"){
                    next = fetch(obj, params);
                } else {
                    next = new Promise((res, rej) => {
                        res(obj);
                    });
                }
                next
                    .then(res => res.json ? res.json() : res)
                    .then(res => {
                        if (compare(props, res)) {
                            callback(res);
                            return;
                        }
                        setTimeout(timer, 1000);
                    });
            }
            timer();
            return this;
        }
    }
}