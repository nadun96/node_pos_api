const Customer = require("../model/Customer");

// functions
const saveCustomer = async (req, res) => {
  // admin, manager
  try {
    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();
    res.status(201).json({ message: "Customer Saved", data: savedCustomer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCustomer = async (req, res) => {
  // admin, manager
  try {
    const customer = new Customer(req.body);
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(404).json({ message: "Customer not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const selectedCustomer = await Customer.findById(
      { _id: req.params.id },
      req.body
    );
    if (!selectedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(201).json({ message: "Customer found", data: selectedCustomer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const deletedCustomer = await Customer.findByIdAndDelete(
      { _id: req.params.id },
      req.body
    );
    if (deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loadAllCustomers = async (req, res) => {
  try {
    const { searchText, page = 1, size = 10 } = req.query;
    const filter = searchText
      ? {
          $or: [
            { name: { $regex: searchText, $options: "i" } },
            { email: { $regex: searchText, $options: "i" } },
          ],
        }
      : {};
    res.status(200).json({ message: "Loaded", data: customers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  saveCustomer,
  updateCustomer,
  findCustomer,
  deleteCustomer,
  loadAllCustomers,
};
