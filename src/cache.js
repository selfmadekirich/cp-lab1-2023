class Cache{

   #storage 

   constructor(){
    this.#storage = new Map()
   }

   #keyIsValid(key){
    return !Array.isArray(key) && !(key instanceof Set) 
            && !(key instanceof Map) && (key != "") && !(typeof key === 'object')
   }

   setValue(key,value,hits){

    if (!this.#keyIsValid(key) || this.#storage.has(key) || hits < 1){
        return false;
    }

    const hit = hits === undefined || hits === null ? 1 : hits
    
    this.#storage.set(key,{"data":value,"hits":hit})
    return true;

   }

    getValue(key){
    if (!this.#keyIsValid(key) || !this.#storage.has(key)){
        return null;
    }
    this.#storage.get(key)['hits']--;

    const data = this.#storage.get(key)['data']

    if(this.#storage.get(key)['hits'] === 0){
        this.#storage.get(key)['data'] = null
    }
    return data
   }

   getStats(){
    const stats = [] 
    this.#storage.forEach((value,key,map)=>{
       stats.push({"key":key,"value": value['data'],"hit remains":value['hits']})
    })
    return stats
   }

   getStatByKey(key){
    if (!this.#keyIsValid(key) || !this.#storage.has(key)){
        return null;
    }
    return {"key":key,"value":this.#storage.get(key)['data'],"hit remains":this.#storage.get(key)['hits']}
   }

}
export {Cache}