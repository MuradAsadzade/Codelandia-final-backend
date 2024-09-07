class Payment{
    constructor(props){
        this.order_id=props?.order_id;
        this.payment_method=props?.payment_method;
        this.payment_status=props?.payment_status;
        this.payment_date=props?.payment_date;
    };

    static MapAll(rows){
        return rows.map((row)=>new Payment(row));
    }

    static MapOne(row){
        return new Payment(row);
    }

}

module.exports=Payment;