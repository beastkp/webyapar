const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./db/connectDB");
const ImageModel = require("./models/image");
const userRouter = require("./routes/userRoute");
dotenv.config();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.set("views", path.join(__dirname, "views"));

const authRouter = require("./routes/authRoute");
const adminRouter = require("./routes/adminRoute");

const authenticateAdmin = require("./middleware/adminAuthorization");
const authentication = require("./middleware/authorization");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("testImage");

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use('/api/v1/user',authentication,userRouter)
app.use("/api/v1/admin", authentication, authenticateAdmin, adminRouter);

app.get("/", (req, res) => {
  res.render("adminlogin");
});

app.get("/userLogin", (req, res) => {
  res.render("userlogin");
});

app.get("/adminPage", (req, res) => {
  res.render("adminPage");
});

app.get("/userProfile", (req, res) => {
  console.log("cannot get user profile");
  res.render("userProfile");
});
app.post("/upload", authentication, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.file.filename);
      const newImage = new ImageModel({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType: "image/png or jpeg",
        },
        path: "/uploads/" + req.file.filename,
        userId: req.user.userId,
      });
      newImage
        .save()
        .then(() => {
          res.json({ newImage: newImage, message: "Successfully uploaded" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});


app.get("/x", async (req, res) => {
  // Assuming you want to redirect to page 'y' with some headers
  const token = req.query.token;
  // console.log("This is the token",token);
  const response = await fetch("http://localhost:3000/api/v1/admin/fetchUsers", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    const data = await response.json();
  // Redirect to page 'y'
  res.render("dashboard", {users:data});
});

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
