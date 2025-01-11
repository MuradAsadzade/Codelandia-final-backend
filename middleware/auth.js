const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const authenticationHeader = req.headers.authorization;
    const token = authenticationHeader;
    console.log(token);
    

    if (!token)
        return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            
            res.sendStatus(401);
        }
        else {      
            req.user = user;
            console.log(req.user);
            
            next();
        }
    });
}

const authenticateAdmin = (req, res, next) => {
    const authenticationHeader = req.headers.authorization;
    const token = authenticationHeader;
    // console.log(token);
    

    if (!token)
        return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, admin) => {
        if (err) {
            
            res.sendStatus(401);
        }
        else {      
            req.admin = admin;
            // console.log(req.admin);
            
            next();
        }
    });
}

module.exports ={
authenticateUser,
authenticateAdmin
}

;
    