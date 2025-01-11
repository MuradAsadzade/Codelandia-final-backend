class Admin{
    constructor(props){
        this.id=props?.id;
        this.username=props?.username;
        this.email=props?.email;
        this.password=props?.password;
    }

    static MapAll(rows){
        return rows.map((row)=>new Admin(row));
    };

    static MapOne(row){
        return new Admin(row);
    }
}

module.exports=Admin;