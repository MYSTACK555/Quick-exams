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
	alert(data.sku);
	const response = await fetch('/.netlify/functions/create-checkout', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	  }).then((res) => res.json());
	
	  const stripe = Stripe(response.publishableKey);
	  const { error } = await stripe.redirectToCheckout({
		sessionId: response.sessionId,
	  });
	
	  if (error) {
		console.error(error);
	  }
}