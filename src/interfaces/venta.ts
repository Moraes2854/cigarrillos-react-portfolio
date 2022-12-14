export interface Venta {
    id?:string;
    amount:number;
    buy_price:number;
    sell_price:number;
    date:string;
    cigarrilloId:string;
}

export interface CreateVentaDto{
    cigarrilloId:string;
    amount:number;
    date:string;
}