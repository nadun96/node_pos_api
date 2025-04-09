const Customer = require("../model/Customer");

// functions
const saveCustomer = async (req, res) => {
  // admin, manager
  try {
    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();
    res.status(201).json({ message: savedCustomer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const findCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {};
