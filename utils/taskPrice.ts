export default function (quantity) {
	const tiers = 10;
	const multiplyAndDouble = (startNumber, tier_num) => {
		let results = [];
		let currentNumber = startNumber;
		results.push(startNumber);
		while (currentNumber <= startNumber ** tier_num) {
			currentNumber = currentNumber * 5;
			results.push(currentNumber);
			let nextNumber = currentNumber * 2;
			results.push(nextNumber);
			currentNumber = nextNumber;
		}
		return results;
	};

	const pricing = [...Array(tiers)]
		.fill(undefined)
		.map((_, i) => {
			const initial_value = 0.005;
			const decay_rate = 0.2;
			return initial_value * (1 - decay_rate) ** i;
		})
		.map((o, i) => {
			const start_tier = 1000000;
			return {
				quantity: multiplyAndDouble(start_tier, tiers)[i],
				price: o,
			};
		});

	let price = 0;
	let remainingQuantity = quantity;
	for (let i = 0; i < pricing.length; i++) {
		let tier = pricing[i];
		let tierQuantity = tier.quantity;
		let tierPrice = tier.price;
		if (remainingQuantity <= tierQuantity) {
			price += remainingQuantity * tierPrice;
			break;
		} else {
			price += tierQuantity * tierPrice;
			remainingQuantity -= tierQuantity;
		}
	}
	return price;
}
