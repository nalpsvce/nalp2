const express = require("express");
const app = express();
const port = 3000

require("./database/db");
const userRoute = require("./routes/userRoute");
const vendorRoute = require("./routes/vendorRoute");
const categoryRoute = require("./routes/cateRoute");
const serviceRoute = require("./routes/serviceRoute");
const cartRoute = require("./routes/cartRoute");


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views/'));
app.use("/user", userRoute);
app.use("/vendor", vendorRoute);
app.use("/category", categoryRoute);
app.use("/service", serviceRoute);
app.use("/cart", cartRoute);


app.get('/', (req, res) =>{
    res.render("home");
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  


