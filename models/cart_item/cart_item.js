class CartItem{
    constructor(props){
        this.user_id=props?.user_id;
        this.product_id=props?.product_id;
        this.quantity=props?.quantity;
    }

    static MapAll(rows){
        return rows.map((row)=>new CartItem(row));
    }

    static MapOne(row){
        return new CartItem(row);
    }

}

module.exports=CartItem;