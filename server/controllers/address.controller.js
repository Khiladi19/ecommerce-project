import { Address } from "../models/address.model.js";


// add address
export const addAddress = async (req, res) => {
  const { fullName, phoneNumber, country,state, city, pincode,address } = req.body;
  const userId = req.user
  try {
    const userAddress = await Address.create({
      userId,
      fullName,
      phoneNumber,
      country,
      state,
      city,
      pincode,
      address,
    });

    if(!userAddress){
        res.status(401).json({
            sucess: false,
            message: "Address not added sucessfuly "
          });
    }

    res.status(201).json({
        sucess: true,
        message: "Address is added",
        userAddress
      });
  } catch (error) {
    res.status(501).json({
      sucess: false,
      message: error.message,
    });
  }
};


// get address
// export const getAddress = async (req,res)=>{
//   const userId= req.user._id.toString()
//   // console.log("userID",userId)
//   const address = await Address.find({userId}).sort({createdAt:-1});
//   if(!address){
//     res.status(401).json({
//       sucess:false,
//       message:"Address not found"
//     })
//   }

//   res.status(201).json({
//     sucess:true,
//     message:"Address found sucessfully",
//     userAddress:address[0],
//   })


// }

// get address
export const getAddress = async (req, res) => {
  const userId = req.user._id.toString();
  const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

  if (!addresses || addresses.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No addresses found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Addresses fetched successfully",
    addresses, // return all
  });
};
