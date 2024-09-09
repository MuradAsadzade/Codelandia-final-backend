class User{
    constructor(props){
        this.id=props?.id;
        this.username=props?.username;
        this.email=props?.email;
        this.password=props?.password;
    }

    static MapAll(rows){
        return rows.map((row)=>new User(row));
    };

    static MapOne(row){
        return new User(row);
    }
}

module.exports=User;