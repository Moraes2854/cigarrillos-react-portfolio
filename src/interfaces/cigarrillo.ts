export interface Cigarrillo {
    id:string;
    name:string;
    stock:number;
    buy_price:number;
    sell_price:number;
    isActive:boolean;
}

export interface CreateCigarrilloDto {
    name:string;
    buy_price:number;
    sell_price:number;
}

export interface UpdateCigarrilloDto {
    id:string;
    name:string;
    buy_price:number;
    sell_price:number;
    stock:number; 
}