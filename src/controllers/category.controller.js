const Category = require("../models/Category");
const Product = require("../models/Product");

const postCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const categorySave = await category.save();
    return res.status(200).json(categorySave);
  } catch (error) {
    console.log(error);
  }
};
const getProductCategories = async (req, res) => {
  const { productId } = req.params;
  if (productId) {
    const categories = await Category.find({ product: productId });
    if (categories) {
      return res.status(200).json(categories);
    } else {
      return res.status(404).send(`Aún no hay reviews`);
    }
  }
};

const modifyProductCategories = async (req, res) => {
  const { productId } = req.params;
  const {
    brand,
    model,
    cell,
    phoneCover,
    headphones,
    charger,
    screen,
    freeShipping,
    ram,
    storagessd,
    systemOp,
    onSale,
  } = req.body;
  try {
    if (productId) {
      const categories = await Category.find({ product: productId });
      const categMatch = await Category.findById(categories[0]._id);
      categMatch.brand = brand;
      categMatch.model = model;
      categMatch.cell = cell;
      categMatch.phoneCover = phoneCover;
      categMatch.headphones = headphones;
      categMatch.charger = charger;
      categMatch.screen = screen;
      categMatch.freeShipping = freeShipping;
      categMatch.ram = ram;
      categMatch.storagessd = storagessd;
      categMatch.systemOp = systemOp;
      categMatch.onSale = onSale;
      const update = await categMatch.save();
      return res.status(200).json(update);
    } else {
      return res.status(404).send(`Aún no hay reviews`);
    }
  } catch (err) {
    console.log(err);
  }
};

const getFilterbyQuery = async (req, res) => {
  const {
    brand,
    model,
    cell,
    phoneCover,
    headphones,
    charger,
    screen,
    freeShipping,
    ram,
    storagessd,
    systemOp,
    watch,
    onSale,
  } = req.query;

  try {
    const query = await Category.find({
      $or: [
        { cell: cell },
        { brand: { $regex: brand, $options: "i" } },
        { model: { $regex: model, $options: "i" } },
      ],
    });
    const filter = await Category.find({
      $or: [
        {
          systemOp: systemOp,
        },
        { phoneCover: phoneCover },
        { headphones: headphones },
        { charger: charger },
        { screen: screen },
        { freeShipping: freeShipping },
        { ram: ram },
        { storagessd: storagessd },
        { watch: watch },
        { onSale: onSale },
      ],
    });
    if (
      (phoneCover,
      headphones,
      charger,
      screen,
      freeShipping,
      ram,
      storagessd,
      systemOp,
      watch,
      onSale)
    ) {
      return res.status(200).json(filter);
    }
    return res.status(200).json(query);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getFilterbyQuery,
  postCategory,
  getProductCategories,
  modifyProductCategories,
};
