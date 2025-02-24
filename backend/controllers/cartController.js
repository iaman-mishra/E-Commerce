import userModel from "../models/userModel.js"

const addToCart = async (req,res)=>{
    try {
        const {userId, id, Size} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (cartData[id]) {
            if(cartData[id][Size]){
                cartData[id][Size] += 1
            }else{
                cartData[id][Size] = 1
            }
        }else{
            cartData[id] = {}
            cartData[id][Size]= 1
        }

        await userModel.findByIdAndUpdate(userId,{cartData})

        res.json({success:true, message: "Added To Cart"})
    
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, id, Size, quantity } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if (quantity === 0) {
            delete cartData[id][Size]; // Remove the specific size from the item
            if (Object.keys(cartData[id]).length === 0) {
                delete cartData[id]; // Remove the item if no sizes remain
            }
        } else {
            cartData[id][Size] = quantity;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getUserCart = async (req,res)=>{
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({success:true, cartData})

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}


export {addToCart,updateCart,getUserCart};