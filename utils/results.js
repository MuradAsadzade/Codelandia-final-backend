class Result{
    constructor(success,data=null,message=null) {
        this.success=success;
        this.data=data;
        this.message=message;
    }
}

class ErrorResult extends Result{
    constructor(data=null,message) {
        super(false,data,message);   
    }
}

class SuccessResult extends Result{
    constructor(data=null,message){
        super(true,data,message);
    }
}

class EmptyResult extends Result{
    constructor(message){
        super(true,null,message);

    }
}

module.exports={
    Result,
    ErrorResult,
    SuccessResult,
    EmptyResult
}