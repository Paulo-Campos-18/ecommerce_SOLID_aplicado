// Mesmo atributos contidos na tabela

import { ProductDetail } from "./ProductDetail";

export class OrderBd{
    id?:number;
    costumer:string;
    items:ProductDetail[];
    total:number;
    status:string;
    createdAt? : Date

    constructor(costumer:string,items:ProductDetail[],total:number,status:string,id?:number,createdAt?:Date){
        this.costumer=costumer
        this.items= items
        this.total=total
        this.status=status
        if(id != null){
            this.id = id
        }else this.id = undefined;
        if(createdAt != null){
            this.createdAt = createdAt
        }else this.createdAt = undefined
    }
}