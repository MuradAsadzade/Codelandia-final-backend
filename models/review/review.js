class Review{
    constructor(props){
        this.product_id=props?.product_id;
        this.user_id=props?.user_id;
        this.rating=props?.rating;
        this.comment=props?.comment;

    };

    static MapAll(rows){
        return rows.map((row)=>new Review(row));
    }

    static MapOne(row){
        return new Review(row);
    }

}

module.exports=Review;