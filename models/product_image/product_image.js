class ProductImage{
    constructor(props){
        this.id=props?.id;
        this.product_id=props?.product_id;
        this.image_url=props?.image_url;

    };

    static MapAll(rows){
        return rows.map((row)=>new ProductImage(row));
    }

    static MapOne(row){
        return new ProductImage(row);
    }

}

module.exports=ProductImage;