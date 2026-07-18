const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/complaint", complaintRoutes);

app.get("/", (req, res) => {
  res.send("Complaint hub is running on port 5000");
});

const Port = process.env.PORT || 8000;
app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
