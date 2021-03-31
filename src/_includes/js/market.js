const { default: Stripe } = require("stripe");

for (var item of document.getElementsByName("buyingForm")) { 
	item.addEventListener("submit", handler); 
} 
 
function handler(event) 
{ 
	event.preventDefault; 
	const form = new FormData(event.target); 
 
	const data = { 
		sku: form.get("sku"), 
		quantity: Number(1),//can only buy one virtual product 
	}; 

}