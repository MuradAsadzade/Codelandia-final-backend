class Order{
    constructor(props){
        this.id=props?.id;
        this.user_id=props?.user_id;
        this.total_amount=props?.total_amount;
        this.status=props?.status;
    }

    static MapAll(rows){
        return rows.map((row)=>new Order(row));
    }

    static MapOne(row){
        return new Order(row);
    }

}

module.exports=Order;