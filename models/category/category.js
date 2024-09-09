class Category{
    constructor(props){
        this.id=props?.id;
        this.name=props?.name;
        this.description=props?.description;
    }

    static MapAll(rows){
        return rows.map((row)=>new Category(row));
    }

    static MapOne(row){
        return new Category(row);
    }

}

module.exports=Category;