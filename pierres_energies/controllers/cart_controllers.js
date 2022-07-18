const Cart = require('../models/cart_model');
const Item = require('../models/item_model');

module.exports.get_cart_items = async (req,res) => {
    const userId = req.params.id;
    try {
        let cart = await Cart.findOne({userId});
        if (cart && cart.items.length > 0) {
            res.send(cart)
        } else {
            res.send(null);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

module.exports.add_cart_item = async (req,res) => {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne ({userId});
        let item = await Item.findOne ({_id: productId});
        if(!item) {
            res.status(404).send('Item not found')
        }
        const price = item.price;
        const name = item.title;

        if(cart) {
            // Si un panier existe déjà pour l'utilisateur 
            let itemIndex = cart.items.findIndex(p => p.productId == productId);

            // On vérifie si le produit existe déjà ou non
            if (itemIndex > -1) {
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            } else {
                cart.items.push({ productId, name, quantity, price })
            }
            cart.bill += quantity*price;
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            // Le panier n'existe pas, création de celui-ci
            const newCart = await Cart.create({
                userId,
                items: [{ productId, name, quantity, price }],
                bill: quantity*price
            });
            return res.status(201).send(newCart);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong")
    }
}

module.exports.remove_cart_item= async (req,res) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;
  try {
    let cart = await Cart.findOne({userId});
    let itemIndex = cart.items.findIndex(p => p.productId == productId);
    if(itemIndex > -1)
    {
      let productItem = cart.items[itemIndex];
      cart.bill -= productItem.quantity*productItem.price;
      cart.items.splice(itemIndex,1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
}