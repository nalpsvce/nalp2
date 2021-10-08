const Service = require("../models/serviceModel");
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

exports.createService = async (req, res, next) => {
  try {
    const newService = {
      category: req.body.categoryId,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      //productImage: req.file.filename,
      vendorId: req.body.vendorId,
      location: req.body.location,
      //quantity: req.body.quantity,
    };
    //const newProduct = await createProductObj(req);
    const service = await Service.create(newService);
    return res.status(200).send({ message: "Service created successfully!", service });
  } catch (error) {
    if (error.code === 11000) return res.status(200).send({ message: "service already exist" });
    return res.status(400).send({ message: "unable to create service", error });
  }
};

exports.updateService = async (req, res, next) => {
  const filter = { _id: req.body.id };
  await Product.findByIdAndUpdate(filter, update);
}


exports.getServices = (req, res, next) => {

  const pageNo = parseInt(req.query.pageNo);
  const size = 3;
 
  if (pageNo <= 0 ) {
    return res.status(200).send({ error: true, message: "invalid page number" });
  }

  const query = {
    //skip = size * (pageNo - 1),
    //limit = size,
  };

  Product.find({}, {}, query)
    .select("-_id -__v -updatedAt")
    .populate("category", "-_id name")
    .exec((err, services) => {
      if (err) return res.status(400).send({ message: "showing order", err });
      return res.status(200).send({ message: "showing all orders in the cart", services });
    });
};

const createServiceObj = async (req) => {
  return {
    category: req.body.categoryId,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    //productImage: req.file.filename,
    vendorId: req.body.vendorId,
    location: req.body.location,
    //quantity: req.body.quantity,
  };
}

