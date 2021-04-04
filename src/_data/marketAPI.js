require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function joinPrice(product,listPrices) {
    try {
        const reviews = require(`./${ product.id }.json`);
        let priceItem = listPrices.filter(x=>{return x.product===product.id});
        return {
			"code": product.id,
            "name": product.name,
            "description": product.description,
			"prix": priceItem[0].unit_amount/100,
			"devise": priceItem[0].currency,
			"frequence": priceItem[0].type,
            "reviews": reviews,
		};
	} catch (error) {
        console.log(error);
	}
}

module.exports = async function () {
    const products = await stripe.products.list({});
    const prices = await stripe.prices.list({});
    var promises = products.data.map(x=>joinPrice(x,prices.data))
    return Promise.all(promises).then((nobbject) => {
		console.log("nobject:", nobbject);
		return [].concat.apply([], nobbject);
	});
};