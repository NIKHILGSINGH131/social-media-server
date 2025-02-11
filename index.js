const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const postsRouter = require("./routers/postsRouter");
const userRouter=require("./routers/userRouter")
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const cloudinary=require('cloudinary').v2;

dotenv.config("./.env");

//congifure
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME ,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

const app = express();

//middlewear
app.use(express.json({limit:'10mb'}));
app.use(morgan("common"));
app.use(cookieParser());

// let origin='http://localhost:3000';
// console.log('here env',process.env.NODE_ENV);
// if(process.env.NODE_ENV === 'production'){
//   origin=process.env.CORS_ORIGIN;
// }


// app.use(cors({
//   credentials:true,
//   // origin:process.env.CORS_ORIGIN
//   origin
// }))     

const allowedOrigins = [
  "http://localhost:3000", 
  "https://client-app-6eix9.ondigitalocean.app", // Your deployed frontend
  "http://13.210.195.165:3000", // Public IP of Frontend
  "https://yourdomain.com" // Add your domain if using one
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/user",userRouter);
app.get("/", (req, res) => {
  res.status(200).send("OK from server");
});

const PORT = process.env.PORT || 4001;

dbConnect();
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
