const products = [] ;

module.exports = class Product{
    constructor(t,n){
        this.title = t ;
        this.name = n ;
    }
    save(){
        products.push(this) ; 
    }
    static fetchAll(){
        return products ; 
    }
}