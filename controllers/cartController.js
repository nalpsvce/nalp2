const Cart = require("../models/cartModel");
const Service = require("../models/serviceModel");
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

exports.createOrder = async (req, res, next) => {
  const newOrder = {
    service: req.body.serviceId,
    quantity: parseInt(req.body.quantity),
    user: req.body.userId,
  };

  try {
    const stock = await Service.findById(newOrder.service);
    //if (newOrder.quantity > stock.quantity) return res.status(200).send({ message: "Service is out of stock" });
    const service = await Cart.create(newOrder);
    //const update = { quantity: stock.quantity - newOrder.quantity };
    //await Service.findByIdAndUpdate(stock.id, update, { new: true });
    return res.status(200).send({ message: "Order created successfully!", service });
  } catch (error) {
    return res.status(400).send({ message: "unable to create order", error });
  }
};

exports.getOrder = async (req, res, next) => {
    await Cart.findById(req.params.cartId)
    .populate("service", "location name price")
    .exec((err, cart) => {
      if (err) return res.status(400).send({ message: "showing order", err });
      const order = returnOrder(cart);
      return res.status(200).send({ message: "showing order", order });
    });
};

exports.getAllOrders = async (req, res, next) => {
  // const results = await Cart.aggregate([
  //   {
  //     $group: {
  //       _id: "$product",
  //       orderSum: { $sum: "$quantity" },
  //     },
  //   },
  // ])
  //   .populate("product", "productImage name price createdAt -_id ")
  //   .exec((err, cart) => {
  //     if (err) return res.status(400).send({ message: "showing order", err });
  //     return res
  //       .status(200)
  //       .send({ message: "showing all orders in the cart", cart });
  //   });

  res.status(200).json({
    status: "success",
    results,
  });

  // Cart.find({ user: req.params.userId }, '-_id quantity product')
  //   .populate("product", "productImage name price createdAt -_id ")
  //   .exec((err, cart) => {
  //     if (err) return res.status(400).send({ message: "showing order", err });
  //     return res.status(200).send({ message:"showing all orders in the cart", cart,});
  //   });
};

function returnOrder(cart) {
  return {
    name: cart.service.name,
    description: cart.service.description,
    price: cart.service.price,
    quantity: cart.quantity,
    total: cart.service.price * cart.quantity,
    //image: cart.product.productImage,
    orderDate: cart.createdAt,
  };
}
