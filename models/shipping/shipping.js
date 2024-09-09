class Shipping{
    constructor(props){
        this.id=props?.id;
        this.order_id=props?.order_id;
        this.shipping_address=props?.shipping_address;
        this.shipping_method=props?.shipping_method;
        this.shipping_status=props?.shipping_status;
        this.shipping_date=props?.shipping_date;

    };

    static MapAll(rows){
        return rows.map((row)=>new Shipping(row));
    }

    static MapOne(row){
        return new Shipping(row);
    }

}

module.exports=Shipping;