class OrderItem{
    constructor(props){
        this.id=props?.id;
        this.order_id=props?.order_id;
        this.product_id=props?.product_id;
        this.quantity=props?.quantity;
        this.price=props?.price;
    }

    static MapAll(rows){
        return rows.map((row)=>new OrderItem(row));
    }

    static MapOne(row){
        return new OrderItem(row);
    }

}

module.exports=OrderItem;