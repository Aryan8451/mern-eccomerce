import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import dotenv from 'dotenv'
import braintree from "braintree";
import orderModel from "../models/orderModel.js"
dotenv.config()
//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
export const createProductController = async (req, res) => {
  try {
    const { name, description, category, price, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    if (!name) {
      return res.status(500).send({ error: "name is required" });
    }
    if (!description) {
      return res.status(500).send({ error: "description is required" });
    }
    if (!category) {
      return res.status(500).send({ error: "category is required" });
    }
    if (!price) {
      return res.status(500).send({ error: "price is required" });
    }
    if (!quantity) {
      return res.status(500).send({ error: "quantity is required" });
    }
    if (!shipping) {
      return res.status(500).send({ error: "shipping is required" });
    }
    if (photo && photo.size > 1000000) {
      return res
        .status(500)
        .send({ error: "photo is required and should be less than 10 MB" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in creating product",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const productQuery = productModel
      .find({})
      .populate("category")
      .select("-photo");
    const product = await productQuery.limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total_count: product.length,
      message: "all products ",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "error in geting product",
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "error in geting single product",
    });
  }
};
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "error while getting photo",
    });
  }
};
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "error while deleting product",
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, category, price, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    if (!name) {
      return res.status(500).send({ error: "name is required" });
    }
    if (!description) {
      return res.status(500).send({ error: "description is required" });
    }
    if (!category) {
      return res.status(500).send({ error: "category is required" });
    }
    if (!price) {
      return res.status(500).send({ error: "price is required" });
    }
    if (!quantity) {
      return res.status(500).send({ error: "quantity is required" });
    }
    if (!shipping) {
      return res.status(500).send({ error: "shipping is required" });
    }
    if (photo && photo.size > 1000000) {
      return res
        .status(500)
        .send({ error: "photo is required and should be less than 10 MB" });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "product updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "error in updating product",
    });
  }
};
// filters
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;

    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "errror while filtering products",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in Search product Api",
      error,
    });
  }
};
//similar product
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: {
          $ne: pid,
        },
      })
      .select("-photo")
      .limit(6)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while getting related product",
      error,
    });
  }
};
// product count
export const productCountController = async (req, res) => {
  try {
    const totals = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      totals,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in counting product ",
      error,
      success: false,
    });
  }
};
//product list based on page
export const productlistController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in counting product ",
      error,
      success: false,
    });
  }
};

// get product by category
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in while getting product ",
      error,
      success: false,
    });
  }
};

// payment gateway controller
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, resposnse) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(resposnse);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
    });
  }
};
//payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {total += + i.price});
    let newTransaction= gateway.transaction.sale({
      amount:total,
      paymentMethodNonce:nonce,
      options:{
        submitForSettlement:true
      }
    },
    function (err, result) {
      if (result) {
        const order = new orderModel({
          products:cart,
          payment:result,
          buyers:req.user._id
        }).save()
        res.json({ok:true})
      }else{
        res.status(500).send(err)
      }
    }
    )
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
    });
  }
};
