//UI
const productsContainer = document.querySelector('.products');
const listContainer = document.querySelector('.list-container');
const alertBoxContainer = document.querySelector('.alert-box-container');
const filterBtns = document.querySelectorAll('.category');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const products = document.querySelectorAll('.product');
const alertBox = document.querySelector('.alert-box');
const listMsg = document.querySelector('.list-msg');
const qty = document.querySelector('.quantity');
const totalQtys = document.querySelector('.qty');
const totalPrice = document.querySelector('.total');
const cartIcon = document.querySelector('.cart-icon > svg');
const productList = document.querySelector('.products-list');

filterBtns.forEach((filterBtn) => {
	filterBtn.addEventListener('click', () => {
		let categoryTxt = filterBtn.textContent.toLocaleLowerCase();
		chgProduct(categoryTxt);
		addAnimation();
	});
});

products.forEach((product) => {
	product.addEventListener('click', (e) => {
		// console.log(e.target.parentNode);
		let item = e.target.parentNode;

		addToCart(item);
		showMsg();
		countLists();
	});
});

cartIcon.addEventListener('click', () => {
	productList.classList.toggle('hide');
	isEmpty();
});

function chgProduct(category) {
	let filteredCategory = allProducts.filter((product) => {
		return product.category === category;
	});

	if (category === 'all') {
		updateProduct(previewProducts);
	} else {
		updateProduct(filteredCategory);
	}
}
function updateProduct(category) {
	for (let i = 0; i < category.length; i++) {
		products[i].innerHTML = `
            <img src=${category[i].image} alt="" />
            <h4>${category[i].name}</h4>
            <p>$${category[i].price}</p>
			<span class="add-to-cart-btn"></span>
       `;
		// products[i].addEventListener('click', (e) => {
		// 	console.log('clicked');
		// });
	}
}
function addToCart(item) {
	let itemName = item.querySelector('h4').textContent;
	let itemPrice = item.querySelector('p').textContent;
	let itemImage = item.querySelector('img').src;
	// console.log(itemName,itemPrice,itemImage);

	// let userList = [];
	// let itemImage = item.querySelector('img').src;

	// let selectedList = allProducts.filter((product) => {
	// 	return product.image === itemImage;
	// });
	// userList.push(selectedList);

	// userList.forEach((list) => {
	// 	if (list === selectedList) {
	// 		selectedList.forEach((li) => {
	// 			li.quantity++;
	// 		});
	// 	} else {
	// 		userList.push(selectedList);
	// 	}
	// 	// createList(list.name, list.price, list.image);
	// });

	createList(itemName, itemPrice, itemImage);
	isEmpty();
	countLists();
	getTotal();
}
function createList(name, price, image) {
	const li = document.createElement('li');

	li.className = 'list';
	li.innerHTML = `
			<img src=${image} alt="" />
			<h4>${name}</h4>
			<p class="sg-price">${price}</p>
			<input class="quantities" type="number" name="" id="" value="1" min="1" max="50"/>
			<p class="multi-price">${price}</p>
			<button class="btn-remove"></button>
		`;

	listContainer.appendChild(li);

	const removeBtn = li.querySelector('.btn-remove');
	const inputEl = li.querySelector('input');
	const sgPriceEl = li.querySelector('.sg-price');
	const multiPriceEl = li.querySelector('.multi-price');

	removeBtn.addEventListener('click', (e) => {
		// console.log(e.target.parentNode);
		let list = e.target.parentNode;
		removeList(list);
		isEmpty();
		countLists();
		getTotal();
	});

	inputEl.addEventListener('change', () => {
		// console.log("changed");
		let qtys = parseInt(inputEl.value);
		let sgPrice = parseFloat(sgPriceEl.textContent.substring(1));

		let priceResult = qtys * sgPrice;

		multiPriceEl.textContent = `$ ${priceResult}`;

		getTotal();
	});
}
function getTotal() {
	let sumQty = 0;
	let sumPrice = 0;
	let quantities = document.querySelectorAll('.quantities');
	let prices = document.querySelectorAll('.multi-price');

	// console.log(quantities);
	for (let i = 0; i < quantities.length; i++) {
		sumQty += parseInt(quantities[i].value);
		sumPrice += parseFloat(prices[i].textContent.substring(1));
	}
	// console.log(sumQty);
	totalQtys.textContent = sumQty;
	totalPrice.textContent = `$${sumPrice.toFixed(2)}`;
}
function removeList(list) {
	list.remove();
}
function countLists() {
	let lists = listContainer.querySelectorAll('.list');
	qty.textContent = lists.length;
}
function showMsg() {
	const div = document.createElement('div');
	div.className = 'alert-box';
	div.innerHTML = `
		<h4>The item has been successfully added to the cart</h4>
	`;
	div.animate(
		[
			{
				transform: 'translateX(100%)',
			},
			{
				transform: 'translateX(0)',
			},
		],
		{
			duration: 200,
			iterations: 1,
			fill: 'forwards',
		}
	);
	alertBoxContainer.appendChild(div);
	setTimeout(() => {
		div.animate(
			[
				{
					transform: 'translateX(0%)',
				},
				{
					transform: 'translateX(100%)',
				},
			],
			{
				duration: 200,
				iterations: 1,
				fill: 'forwards',
			}
		);
	}, 2000);
	setTimeout(() => {
		div.remove();
	}, 2200);
}
function isEmpty() {
	let lists = listContainer.querySelectorAll('.list');
	if (lists.length === 0) {
		listMsg.style.display = 'block';
	} else {
		listMsg.style.display = 'none';
	}
}
function addAnimation() {
	for (let i = 0; i < products.length; i++) {
		products[i].animate(
			[
				{
					transform: 'translateY(-100px)',
					opacity: 0,
				},
				{
					transform: 'translateY(0)',
					opacity: 1,
				},
			],
			{
				duration: 500,
				iterations: 1,
				fill: 'backwards',
				delay: `${i * 60}`,
			}
		);
		products[i].style.animationDelay = `${i * 0.1}s`;
	}
}
