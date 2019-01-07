export function getFromStorage(key){
    if (!key){
     return null
    }
    try{
        const valueStr = localStorage.getItem(key);
        if(valueStr){
            return JSON.parse(valueStr);
        }
        return null
    }
    catch(err){
        return null
    }
}
export function deleteStorage(){
    try{
        localStorage.removeItem('test_token');
        return true
    }
    catch(err){
        console.log(err)
    }
}



export function setInStorage(key,obj){
    if(!key){
        console.error('Key is missing')
    }
    try{
        localStorage.setItem(key, JSON.stringify(obj))
    }
    catch(err){
        console.error(err)
    }
}
export function setInStorageUserData(key,obj){
    if(!key){
        console.error('Key is missing')
    }
    try{
        localStorage.setItem(key, JSON.stringify(obj))
    }
    catch(err){
        console.error(err)
    }
}
export function getFromStorageUserData(key){
    if (!key){
     return null
    }
    try{
        const valueStr = localStorage.getItem(key);
        if(valueStr){
            return JSON.parse(valueStr);
        }
        return null
    }
    catch(err){
        return null
    }
}