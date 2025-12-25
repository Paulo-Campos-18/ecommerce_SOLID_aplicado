import {Product} from './Product'

export class DigitalProduct extends Product{
    megabytes:number;
    
    constructor(id:number,name:string,price:number,megabytes:number){
        super(id,name,price);
        this.megabytes = megabytes
    }
    
    calculateFreight(): number {
        return 0;
    }
}