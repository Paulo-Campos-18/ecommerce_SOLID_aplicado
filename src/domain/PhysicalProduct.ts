import {Product} from './IProduct'

export class PhysicalProduct extends Product{
    weight:number;

    constructor(id:number,name:string,price:number,weight:number){
        super(id,name,price);
        this.weight = weight
    }
    
    calculateFreight(): number {
        return 10;
    }
    
}