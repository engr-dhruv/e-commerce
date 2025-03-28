import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req,res) => {

    try {
        
        const {name,description,price,category,subCategory,sizes,bestseller} = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
        // console.log(image1);
        const images = [image1,image2,image3,image4].filter((item)=>item!==undefined);
        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;
            })
        )
        // console.log(imagesUrl);
        // res.json({});
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            image : imagesUrl,
            date: Date.now()
        }
        const product = new productModel(productData);
        await product.save();

        res.json({success:true,message:"Product added"});

    } catch (error) {
        console.error(error);
        res.json({success:false,message:error.message});
    }
}

const listProducts = async (req,res) => {
    //return
    try {
        const products = await productModel.find();
        res.json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }

}

const removeProduct = async (req,res) => {
    //return
    try {
         // Get product ID from request parameters

        // Find and delete the product
        const deletedProduct = await productModel.findByIdAndDelete(req.body.id);

        if (!deletedProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

const singleProduct = async (req,res) => {
    //return
    try {
        const foundProduct = await productModel.findById(req.body.id);
    if (!foundProduct) {
        return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product removed successfully" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}



export {addProduct,listProducts,removeProduct,singleProduct};