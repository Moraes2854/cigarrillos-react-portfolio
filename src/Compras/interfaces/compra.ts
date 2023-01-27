export interface Compra {
    id:string;
    amount:number;
    buy_price:number;
    sell_price:number;
    date:string;
    cigarrilloId:string
}

export interface CreateCompraDto{
    cigarrilloId:string;
    amount:number;
    date:string;
}