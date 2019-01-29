const mongoose = require('mongoose');
const Store = mongoose.model('Store')

exports.homePage = (req, res) => {
    res.render('index')
}

exports.addStore = (req, res) => {
    res.render('editStore', {title: 'Add Store'})
}

exports.createStore = async (req, res) => {
    const store = await (new Store(req.body)).save();
    req.flash('success', `Successfully Created ${store.name}`)
    res.redirect(`/store/${store.slug}`)
}

exports.getStores = async (req, res) => {
   const stores = await Store.find();
   res.render('stores',{title: 'Stores', stores: stores})
}

exports.editStore = async (req, res) => {
    // find the store givven the id
    const store = await Store.findOne({_id: req.params.id})
    //confirm they re the owner of the store

    // render out the edit form 
    res.render('editStore', {title: `Edit ${store.name}`, store})
}

exports.updateStore = async (req, res) => {
 //find and update the store
 const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
     new: true, // retunr the new store instead of the old one
     runValidatores: true   
 }).exec()
 req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`)
 //redirect them the store
 res.redirect(`/stores/${store._id}/edit`);
}
