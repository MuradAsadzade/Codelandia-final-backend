class Product{
    constructor(props){
        this.id=props?.id;
        this.name=props?.name;
        this.description=props?.description;
        this.price=props?.price;
        this.stock_quantity=props?.stock_quantity;
        this.category_id=props?.category_id;
        this.images=props?.images;
    };

    static MapAll(rows){
        return rows.map((row)=>new Product(row));
    }

    static MapOne(row){
        return new Product(row);
    }

}

module.exports=Product;