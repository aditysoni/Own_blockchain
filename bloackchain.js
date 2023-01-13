
//requiring sha256 function for hashing
const SHA256 = require("crypto-js/sha256")


//properties of a block (can add more properties as per need ) 

class Block 
{
    constructor (index , timestamp , data , previousHash = '') 
    //index -- tells us where the block stands un the blockchain 
    //timestamp -- tells us when the block is created 
    //data -- include any type of data u want to include 
    //previousHAsH -- its a string which contains the hash of previos block 

    {
    this.index = index ;
    this.timestamp = timestamp ; 
    this.data = data ;
    this.previousHash = previousHash ;
    this.hash = this.calculateHash() ;

    }
    
    
    //everytime the properties of the block is altered the hash should get changed

    calculateHash () {
    
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString() ;

     

    }
    
     // proof of work 
   // the more the difficulty the more will be the zeros 

    mine(difficulty) 
    {
        
        while(!this.hash.startsWith(Array (difficulty + 1 ) .join("0")));
        // will work until the given hash is equal 
        {
        this.nonce ++ ; 

        this.hash = this.getHash() ;
        }
    }
     
}

     
}


class Blockchain 
{
    constructor(){
        this.chain=[this.createGenesisBlock()];
    }
 
 createGenesisBlock ()
 {
    return new Block(0 , "12/01/2023" , "GENESISI BLOCK" , "0" ) ; 

 }
 
 getLatestBlock() 
  {
    return this.chain[this.chain.length - 1 ] ;

  }
  
  
  //checks whether the chain is valid or not

   isChainValid(  ) 
   {
    for(let i = 1 ; i < this.chain.length ; i++ )
    {
        const currentBlock = this.chain[i] ;
        const previousBlock = this.chain[i-1] ;
          if(currentBlock.hash  !== currentBlock.calculateHash())
              return false ;
          
          
          if(currentBlock.previousHash !== previousBlock.hash){
            return false  ;

          }
          
          return true ; 
    }
   }
