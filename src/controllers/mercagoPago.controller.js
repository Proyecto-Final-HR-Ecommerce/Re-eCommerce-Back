const axios = require('axios')
const mercadoPagoLink = require('../helper/mercadoPago')
const OrderModel = require('../models/OrderModel')
const Product = require('../models/Product')

let order

const postOrder = async (req, res) => {
    
   try {
    
    const products = req.body
     const id = req.params.id
    
     console.log(products)
    
      order = new OrderModel({ user : id , orderItems : products.map(el => {
        return {
            name: el.name,
            qty: el.count,
            image: el.image,
            price: el.price,
            product: el._id
        }
     }),  
    
    
    })
     
    await order.save();
     
    
     const link = await mercadoPagoLink(products)
      
     
     res.json(link)
   } catch (error) {
    console.log(error)
   }
    
}

const notification = async (req, res) => {
    const datos = req.query

 

    const idStatus = datos["data.id"]
    console.log(idStatus)
    try {
        const dataCompra = await axios(`https://api.mercadopago.com/v1/payments/${idStatus}` , {
            headers: { 'Authorization' : 'Bearer '+process.env.ACCESS_TOKEN }
              
            })
           
          
        if(dataCompra.data.status ){
           
          
            order.status = dataCompra.data.status
            if(dataCompra.data.status === 'approved') {
                order.totalPrice = dataCompra.data.transaction_amount
                order.isPaid = true   
            }
                       
             await order.save()
          
        }
        
    } catch (error) {
        //console.log(error)
    }
    res.status(200)
}
module.exports = {
    postOrder,
    notification

}