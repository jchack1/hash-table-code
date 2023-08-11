class HashTable {
    constructor(numBuckets) {
        this.table = new Array(numBuckets)
        this.size = 0
    }


    _hash(key) {
        let hash = 0
        for(let i = 0; i < key.length; i++){
            hash += key.charCodeAt(i)
        }
        return hash % this.table.length
    }


    get(key){
        const index = this._hash(key)

        if(typeof this.table[index] === "undefined") return undefined
        
        //check length of the bucket - if more than one item, have to iterate through, making the operation O(n)
        if(this.table[index].length > 1){
            for(let i = 0; i < this.table[index].length; i++){
                if(this.table[index][i][0] === key){
                    return this.table[index][i]
                }
            }
        }

        //make sure key matches
        if(this.table[index][0][0] !== key) return undefined
      
        //otherwise, just return the item - O(1) operation
        return this.table[index]

    }

    set(key, value){
        //get an index using hash function
        const index = this._hash(key)

        //check if anything at this index - if there isn't, add item
        if(this.table[index] === undefined){
            this.table[index] = [[key, value]]
            this.size++

        } else{
            let inserted = false

            //check everything in this bucket to see if we already have this key

            for(let i = 0; i < this.table[index].length; i++){
                if(this.table[index][i][0] === key){
                    
                    //if we come across the same key, replace the old value with the new value
                    this.table[index][i][1] = value

                    inserted = true
                }
            }

            //if after checking everything in the bucket we haven't added the new value, push it into the bucket now
            if(inserted === false){
                this.table[index].push([key, value])
            }
        }
        

    }

    remove(key){
        const index = this._hash(key)

          //if nothing here, return
          if(this.table[index] === undefined){
            return false
        }

        //originally wanted to use splice, but that changes the index of everything else

        //check if this bucket has multiple items, should be able to splice here since we're not depending on the index *inside* the bucket
        if(this.table[index].length > 1){
            for(let i = 0; i < this.table[index].length; i++){
                if(this.table[index][i][0] === key){
                    this.table[index].splice(i, 1)
                    return true
                }
            }
        }

      
        //if one item here, set to undefined
        
        this.table[index] = undefined
        this.size--
        return true
    }
}

