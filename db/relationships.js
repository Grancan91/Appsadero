const Asadero = require('../api/models/asadero.model')
const Place = require('../api/models/place.model')
const User = require('../api/models/user.model')
const Preference = require('../api/models/preference.model')
const Product = require('../api/models/product.model')
const Cart = require('../api/models/cart.model')
const Allergy = require('../api/models/allergy.model')

const initRelationships = () => {

    //@OneToMany Preferences w Products
    /*
    Preference.hasMany(Product)    
    Product.belongsTo(Preference)
    */

    //@ManyToMany Preferences w Users --> table in the middle USER_PREFERENCE
    /*
    User.belongsToMany(Preference, {through: 'user_preference'})
    Preference.belongsToMany(User, {through: 'user_preference'})
    */

    //Allergies Many to Many with Products
    Allergy.belongsToMany(Product, { through: allergy_products })
    Product.belongsToMany(Allergy, { through: allergy_products })




}

module.exports = {
    initRelationships
}