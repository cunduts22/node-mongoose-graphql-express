const checkObject = function(results) {
    let keys;
    let values;
    let produce = []    
    const check = () => {        
        for(let obj of results) {
            looping(obj)
        }
        return produce
    }

    const looping = (obj) => {  

        for (let [key, value] of Object.entries(obj)) {
            keys = key
            values = value
            if (checkTypeOf(value)) {
                first(value);
            } else {
                produce.push({
                    [keys]: values
                })
            }
        }

        const first = (objects) => {
            let x = keys;
            for (let [key, value] of Object.entries(objects)) {                
                if (checkTypeOf(value)) {                    
                    keys = x+'.'+key;
                    second(value)
                } else {                    
                    keys = x+'.' + key
                    values = value
                    produce.push({ [keys]: values }) 
                    keys = x;
                }
            }
        }

        const second = (objects) => {            
            let x = keys;
            for (let [key, value] of Object.entries(objects)) {
                if (checkTypeOf(value)) {
                    keys = x + '.' + key;
                    first(value)                    
                } else {
                    keys = x + '.' + key
                    values = value
                    produce.push({ [keys]: values })
                    keys = x;
                }
            }
        }                                   
    }

    const checkTypeOf = (obj) => {
        if(typeof obj === 'object') {
            return true
        } else {
            return false
        }
    }

    const mob = {
        check,
        looping
    }
    return mob
    
}

module.exports = checkObject