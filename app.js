const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");
const { mongodb_pass } = require("./privateConstants");
const multer = require("multer");

const app = express();
const url = `mongodb+srv://Arkojit:${mongodb_pass}@rivu-909.1fcvtlq.mongodb.net/messages`;
const fileStorage = multer.diskStorage({
    destination: (req, file, _callback) => {
        // to store the file in memory i.e. in images folder
        _callback(null, "images");
    },
    filename: (req, file, _callback) => {
        _callback(null, file.originalname);
    },
});
const fileFilter = (req, file, _callback) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        _callback(null, true);
    } else {
        _callback(null, false);
    }
};

app.use(bodyParser.json()); // application/json for json data parsing
app.use(multer({ storage: fileStorage, fileFilter }).single("image"));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, nect) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
});

mongoose
    .connect(url)
    .then((result) => {
        app.listen(8080, () => {
            console.log("connected");
        });
    })
    .catch((err) => console.log(err));
