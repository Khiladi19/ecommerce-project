import { Product } from "../models/product.model.js";


// add Product
export const addProduct = async (req, res) => {
  const { title, description, price, catagory, qty, imgSrc } = req.body;
  try {
    const product = await Product.create({
      title,
      description,
      price,
      catagory,
      qty,
      imgSrc,
    });

    if(!product){
      res.status(400).json({
        success:false,
        message:'Product Not created Sucessfully'
      })
    }

    res.status(201).json({
        sucess:true,
        message:"Product Add Sucessfully",
        product
    })
    

  } catch (error) {
    res.status(501).json({
        message:error.message,
    })
  }
};

// filter, search, and price range product controller
export const filterProducts = async (req, res) => {
  try {
    const { search, catagory, minPrice, maxPrice } = req.query;

    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" }; // Assuming you're searching in "title"
    }

    if (catagory) {
      query.catagory = catagory; // Match your schema field name ("catagory" as per your model)
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Filtered Products",
      products,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// getAll  Product Details
export const getProduct = async (req,res)=>{

  try {
    const products = await Product.find().sort({createdAt:-1})
    if(!products){
      res.status(401).json({
        sucess:false,
        message:"something went worng product detail not found!"
      })
    }
    res.status(201).json({
      sucess:true,
      message:"All the Product",
      products
    })

  } catch (error) {
    res.status(501).json({
      message:error.message
    })
  }
}


// find product By Id
export const getProductById = async (req,res)=>{
  const id = req.params.id

  try {
    
    const product = await Product.findById(id)
    if(!product){
      res.status(401).json({
        sucess:false,
        message:"Product detail not found! Invalid Id"
      })
    }
    res.status(201).json({
      sucess:true,
      message:"Specific Product",
      product
    })

  } catch (error) {
    res.status(501).json({
      message:error.message
    })
  }
}

// update Product By Id
export const updateProductById = async (req,res)=>{
  const id = req.params.id
  try {
    const product = await Product.findByIdAndUpdate(id,req.body,{new:true})
    if(!product){
      res.status(401).json({
        sucess:false,
        message:"Product detail not found & updated"
      })
    }
    res.status(201).json({
      sucess:true,
      message:"Product has been updated",
      product
    })

  } catch (error) {
    res.status(501).json({
      message:error.message
    })
  }
}

// delete Product By Id
export const deleteProductById = async (req,res)=>{
  const id = req.params.id
  try {
    const product = await Product.findByIdAndDelete(id)
    if(!product){
      res.status(401).json({
        sucess:false,
        message:"Product not deleted by Id"
      })
    }
    res.status(201).json({
      sucess:true,
      message:"Product is deleted",
      product
    })

  } catch (error) {
    res.status(501).json({
      message:error.message
    })
  }
}

