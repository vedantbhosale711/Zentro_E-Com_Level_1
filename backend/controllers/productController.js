import {sql} from '../config/db.js';

//CRUD operations

export const getProducts = async (req,res)=>{
    try{
        const products = await sql`
            SELECT*FROM products 
            ORDER BY created_at DESC
        `;
        console.log('Fetched Products: '+products);
        res.status(200).json({success:true,data:products});
    }catch(error){
        console.log('getProducts Error: '+error);
        res.status(500).json({success:false,message:'internal server error'});
    }
}

export const getProduct = async (req,res)=>{
    const {id} = req.params // takes data from url we send
    try{
        const product = await sql`
            SELECT*FROM products 
            WHERE id=${id}; 
        `
        res.status(200).json({success:true,message:'product fetched successfully',data:product[0]}); // as product is an array of product
    }catch(error){
        console.log('getProduct Error: '+error);
        res.status(500).json({success:false,message:'internal server error'});
    }
}

export const createProduct = async (req,res)=>{
    const {name,price,image} = req.body;
    if(!name || !price ||!image){
        return res.status(400).json({success:false,message:'Fill all the three'});
    }
    try{
        const newProduct = await sql`
        INSERT INTO products(name,price,image)
        VALUES (${name},${price},${image})
        RETURNING *
        `
        console.log(`New product added: ${newProduct[0]}`);//[0] because
        return res.status(201).json({success:true,message:'New product added',data:newProduct[0]});

    }catch(error){
        console.log('createProduct Error: '+error);
        return res.status(500).json({success:false,message:'internal server error'});
    }
}

export const updateProduct = async (req,res)=>{
    const {id} = req.params;
    const {name,price,image} = req.body;

    try{
        const updatedProduct = await sql`
            UPDATE products
            SET name=${name}, price=${price}, image=${image}
            WHERE id=${id}
            RETURNING*
        `
        if(updatedProduct.length==0){
            return res.status(404).json({success:false,message:'Product not found'});
        }

        return res.status(200).json({success:true,message:'Product updated',data:updatedProduct[0]});

    }catch(error){
        console.log('updateProduct Error: '+error);
        return res.status(500).json({success:false,message:'internal server error'});
    }
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;
    try{
        const deletedProduct = await sql`
            DELETE FROM products
            WHERE id=${id}
            RETURNING*
        `
        //if check for knowing if the product is really deleted or not
        if(deletedProduct.length===0){
            return res.status(404).json({success:false,message:'product not found'});
        }

        res.status(200).json({success:true,message:'Product deleted cuccessfully',data:deletedProduct[0]});
    }catch(error){
        console.log('deleteProduct Error: '+error);
        return res.status(500).json({success:false,message:'internal server error'});
    }
}

