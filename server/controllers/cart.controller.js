import { Cart } from "../models/cart.model.js";

// add to cart
export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;
  const userId = req.user;

  // cart find by userID
  let cart = await Cart.findOne({ userId });

  if (!cart) {  
    cart = new Cart({ userId, items: [] });
  }

  // Checking If the Product Is Already in the Cart
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty;
  } else {
    cart.items.push({ productId, title, price, qty, imgSrc });
  }

  await cart.save();
  res.status(201).json({
    sucess: true,
    message: "Items Added To Cart Sucessfully",
    cart,
  });
};

// get User cart
// export const userCart = async (req, res) => {
//   const userId = req.user
//   let cart = await Cart.findOne({ userId });
//   // console.log("Cart", cart);
//   if (!cart) {
//       res.status(401).json({
//       sucess: false,
//       message: "Invalid Cart Not Found",
//     });

//     res.status(201).json({
//       sucess: true,
//       message: "user cart",
//       cart
//     });
//   }
// };

// get user cart
export const userCart = async (req, res) => {
  try {
    const userId = req.user; 

    // Find the cart for the given user ID
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the user",
      });
    }

    // If cart exists, send it in the response
    res.status(200).json({
      success: true,
      message: "User cart retrieved successfully",
      cart,
    });
  } catch (error) {
    console.error("Error fetching user cart:", error);

    // Handle errors gracefully
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the cart",
      error: error.message,
    });
  }
};


// remove cart
export const removeaProductFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(401).json({
        sucess: false,
        message: "Invalid Cart Not Found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(201).json({
      sucess: true,
      message: "Product Remove form cart",
    });
  } catch (error) {
    res.status(501).json({
      message: error.message,
    });
  }
};

// clear cart
export const clearCart = async (req, res) => {
  const userId = req.user;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({items:[]});
    } else {
      cart.items = [];
    }
    await cart.save();
    res.status(201).json({
      sucess: true,
      message: "clear Cart",
    });
  } catch (error) {
    res.status(501).json({
      message: error.message,
    });
  }
};

// decrease qty
export const decreaseProductQty = async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  // console.log("cart backend" , cart)

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );
  

  if (itemIndex > -1) {
    const item = cart.items[itemIndex]
    if(item.qty >qty){
      const pricePerUnit = item.price/item.qty

      item.qty -= qty,
      item.price -= pricePerUnit*qty
    }else{
      cart.items.splice(itemIndex,1)
    }

  } else {
    res.status(401).json({
      sucess:false,
      message:"Invalid Product Id"
    })
  }

  await cart.save();
  res.status(201).json({
    sucess: true,
    message: "Items qty decresed",
    cart,
  });
};

// increase qty
export const increaseProductQty = async (req, res) => {
  const { productId, qty } = req.body; // qty to increase by
  const userId = req.user;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      const item = cart.items[itemIndex];
      const pricePerUnit = item.price / item.qty;

      item.qty += qty;
      item.price += pricePerUnit * qty;

      await cart.save();

      res.status(200).json({
        success: true,
        message: "Item quantity increased",
        cart,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while increasing product quantity",
      error: error.message,
    });
  }
};



