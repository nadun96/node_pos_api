const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware

const port = process.env.PORT || 5000;
// routes
const userRoutes = require("./routes/User");
const orderRoutes = require("./routes/Order");
const productRoutes = require("./routes/Product");
const paymentRoutes = require("./routes/Payment");
const customerRoutes = require("./routes/Customer");

const app = express();
app.use(bodyParser.json());

app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
