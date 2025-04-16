const Products = require("../model/Product");

// functions
const saveProduct = async (req, res) => {
  const product = new Products(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).json({ messge: "Product Saved", data: savedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { searchText, page = 1, size = 10 } = req.query;
    const filter = searchText
      ? {
          $or: [
            { productname: { $regex: searchText, $options: "i" } },
            { descrioption: { $regex: searchText, $options: "i" } },
          ],
        }
      : {};

    const products = await Products.find(filter)
      .skip((page - 1) * size)
      .limit(size);
    const total = await Products.countDocuments(filter);

    res.status(200).json({
      message: "data list",
      data: { datalist: products, count: total },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product found", data: updatedProduct });
    }
    res.status(201).json({ message: "Product not found", updatedProduct });
  } catch {}
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findLowStockProducts = async (req, res) => {
  try {
    const lowStockProcducts = Products.findLowStockProducts();

    if (lowStockProcducts) {
      return res
        .status(200)
        .json({ message: "Low stocks Product", data: lowStockProcducts });
    }

    res
      .status(404)
      .json({ message: "Product Not Found", data: lowStockProcducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  findLowStockProducts,
};
