import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        
        const user = await userModel.findOne({email});

        if(!user)
        {
            return res.json({success:false, message:"User does not exists"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch)
        {
            const token = createToken(user._id);
            res.json({success:true,token});
        }
        else
        {
            res.json({success:false, message:"Invalid credentials"});
        }


    } catch (error) {
        console.error(error);
        res.json({success:false,message:error.message});
    }
}

const registerUser = async (req,res) => {
    try{
        const {name, email, password} = req.body;

        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message:"User already exists"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"});
        }
        if(password.length<8){
            return res.json({success:false, message:"Please enter a strong password "});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email, 
            password:hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token});

    } catch(err)  {
        console.error(err);
        res.json({success:false,message:err.message});
    }
}

const adminLogin = (req,res) => {
    try {
        const {email,password} = req.body;
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD)
    {
        const token = jwt.sign(email+password,process.env.JWT_SECRET);
        return res.json({success:true,token});
        // return res.json({success:false,message:"Invalid Credentials"});
    }
    else
    {
        return res.json({success:false,message:"Invalid Credentials"});
    }    

    } catch (err) {
        console.error(err);
        res.json({success:false,message:err.message});
    }
}

const addToCart = async (req, res) => {
    try {
      const { token, productId, size, quantity } = req.body;
  
      // Use jwt.verify to validate the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      if (!userId || !productId || !size || !quantity) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const user = await userModel.findOne({ _id: userId });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if the product with the same size already exists in the cart
      const existingItem = user.cart.find(
        (item) => item.productId.toString() === productId && item.size === size
      );
  
      if (existingItem) {
        // Update the quantity
        existingItem.quantity += quantity;
      } else {
        // Add new product to the cart
        user.cart.push({ productId, size, quantity });
      }
  
      await user.save();
  
      res.json({ success: true, cart: user.cart });
  
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  

const fetchCart = async (req,res) => {
        try {
            const { token } = req.body;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;
            if (!userId) {
                return res.status(400).json({ error: "User ID is required" });
            }
    
            const user = await userModel.findOne({ _id: userId }).populate("cart.productId");
    
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
    
            res.json({ success: true, cart: user.cart });
    
        } catch (error) {
            console.error("Error fetching cart:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    
}

export {loginUser, registerUser, adminLogin, addToCart, fetchCart};