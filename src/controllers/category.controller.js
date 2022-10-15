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
    onSale,
  } = req.query;

  try {
    const products = await Product.find();
    const categories = await Category.find();
    const productsId = categories[0].product;
    console.log(productsId);

    // console.log(categories);
    // if (cell === true) {
    //   const cells = categories.filter((e) => e.cell === true);
    //   res
    //     .status(200)
    //     .json(products.filter((p) => p._id.includes(cells.product)));
    // }
    // if (phoneCover === true) {
    //   const covers = categories.filter((e) => e.phoneCover === true);
    //   res
    //     .status(200)
    //     .json(products.filter((p) => p._id.includes(covers.product)));
    // }
    // if (headphones === true) {
    //   const headphone = categories.filter((e) => e.headphones === true);
    //   res
    //     .status(200)
    //     .json(products.filter((p) => p._id.includes(headphone.product)));
    // }
    // if (charger === true) {
    //   const chargers = categories.filter((e) => e.charger === true);
    //   res
    //     .status(200)
    //     .json(products.filter((p) => p._id.includes(chargers.product)));
    // }
    return res.status(200).json(products);
    // function byDiscount(onSale, freeShipping) {}
    // function byOS(systemOp) {}
    // function byDescription(ram, storagessd, screen) {}
    // function byBrand(brand, model) {}
  } catch (err) {
    res.status(500).send(err);
  }
  //funcion para filtrar freeshiping y onsale que se repiten en varios patrones de busqueda
  // function freeShippingAndOnSale(freeShipping, onSale, array) {
  //   if (freeShipping) {
  //     array = array.filter((e) => e.freeShipping === true);
  //   }
  //   if (onSale) {
  //     array = array.filter((e) => e.onSale === true);
  //   }
  //   return array;
  // }

  // function forCellandBrand(
  //   model,
  //   charger,
  //   screen,
  //   ram,
  //   storagessd,
  //   systemOp,
  //   array
  // ) {
  //   if (model) {
  //     array = array.filter((e) => e.model === model);
  //   }
  //   if (charger && array.length > 0) {
  //     array = array.filter((e) => e.charger === true);
  //   }
  //   if (screen && array.length > 0) {
  //     array = array.filter((e) => e.screen === screen);
  //   }
  //   if (ram && array.length > 0) {
  //     array = array.filter((e) => e.ram === ram);
  //   }
  //   if (storagessd && array.length > 0) {
  //     array = array.filter((e) => e.storagessd === storagessd);
  //   }
  //   if (systemOp && array.length > 0) {
  //     array = array.filter((e) => e.systemOp === systemOp);
  //   }
  //   return array;
  // }
  // // Propiedades en comun, brand -- ¡¿model?! -- freeShipping -- onSale
  // try {
  //   if (phoneCover) {

  //     let categoryPhoneCover = await Category.find({ case: true });
  //     categoryPhoneCover = freeShippingAndOnSale(
  //       freeShipping,
  //       onSale,
  //       categoryPhoneCover
  //     );
  //     return res.status(200).json(categoryPhoneCover);
  //   } else if (headphones) {
  //     // false phoneCover and cell¿?
  //     console.log("if HEADPHONE");
  //     let categoryHeadphones = await Category.find({ headphones: true });
  //     categoryHeadphones = freeShippingAndOnSale(
  //       freeShipping,
  //       onSale,
  //       categoryHeadphones
  //     );
  //     if (brand.length > 0) {
  //       let newArrayBrand = [];
  //       newArrayBrand.push(
  //         categoryHeadphones.filter((headphones) => headphones.brand === brand)
  //       );
  //       return res.status(200).json(newArrayBrand);
  //     }
  //     return res.status(200).json(categoryHeadphones);
  //     // un ordenamiento por marcas y cell por defecto¿?
  //   } else if (cell) {
  //     // false phoneCover and headphones ¿?
  //     let categoryCell = await Category.find({ cell: true });
  //     // categoryCell = freeShippingAndOnSale(freeShipping, onSale, categoryCell);
  //     categoryCell = forCellandBrand(
  //       model,
  //       charger,
  //       screen,
  //       ram,
  //       storagessd,
  //       systemOp,
  //       categoryCell
  //     );
  //     if (brand.length > 0) {
  //       let newArrayBrand = [];
  //       newArrayBrand.push(categoryCell.filter((cell) => cell.brand === brand));
  //       if (newArrayBrand.length > 0) {
  //         return res.status(200).json(newArrayBrand);
  //       } else return res.status(200).json("sin marcas");
  //     }
  //     console.log(categoryCell);
  //     return res.status(200).json(categoryCell);
  //   }
  //   if (brand.length > 0) {
  //     let brandFilter = [];
  //     let array = await Category.find({ brand: brand });
  //     brandFilter.push(array);
  //     brandFilter = freeShippingAndOnSale(freeShipping, onSale, brandFilter);
  //     brandFilter = forCellandBrand(
  //       model,
  //       charger,
  //       screen,
  //       ram,
  //       storagessd,
  //       systemOp,
  //       brandFilter
  //     );
  //     return res.status(200).json(brandFilter);
  //   } else {
  //     const allCategory = await Category.find({});
  //     return res.status(200).json(allCategory);
  //   }
  // } catch (error) {
  //   res.status(400).json({ msg: error });
  // }
};

module.exports = {
  getFilterbyQuery,
  postCategory,
  getProductCategories,
  modifyProductCategories,
};
