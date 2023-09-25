class Cache{
   constructor(){
    this.storage = {}
   }

   setValue(key,value,hits){
    return false;
   }

   getValue(key){
    return null;
   }

   getStats(){
    return {}
   }

   getStatByKey(key){
    return {}
   }

}
export {Cache}