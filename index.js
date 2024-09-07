const express=require("express");
const dotenv=require("dotenv");
const router=require("./routes/index.js");
const cors=require("cors")
dotenv.config();

const PORT=process.env.PORT;

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.use("/",router);

// app.use('/', (req, res, next) => {
//     const filters = req.query;
//     const filteredUsers = data.filter(user => {
//         let isValid = true;
//         for (key in filters) {
//             console.log(key, user[key], filters[key]);
//             isValid = isValid && user[key] == filters[key];
//         }
//         return isValid;
//     });
//     res.send(filteredUsers);
// });



app.listen(PORT,()=>{
    console.log(`Server is listening ${PORT}`);
}
)