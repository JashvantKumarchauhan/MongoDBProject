let express = require("express");
let cors = require("cors");
let path = require("path");
let mongoose = require("mongoose");
require("dotenv").config();

let app = express();
app.use(express.json());
app.use(cors());

const dirname = path.resolve();

const enquiryRouter = require("./App/routes/web/enquiryRoutes"); // Adjust path if incorrect

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server is running on port", process.env.PORT || 3001);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use("/api/website/enquiry", enquiryRouter);

// Serve static files
app.use(express.static(path.join(dirname, "/cliect/dist"))); // Fixed folder name

app.get("*", (req, res) => {
  res.sendFile(path.resolve(dirname, "cliect", "dist", "index.html")); // Fixed folder name
});
