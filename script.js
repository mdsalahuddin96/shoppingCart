const productCardContainer=document.getElementById('product-card-container');
const showCartBtn=document.getElementById('show-cart-btn');
const clearCartBtn=document.getElementById('clear-cart-btn');
const cartContainer=document.getElementById('cart-container');
const showText=document.getElementById('show-text');
const productCartContainer=document.getElementById('products-container');
const totalItems=document.getElementById('total-items');
const subTotalElm=document.getElementById('subtotal');
const taxElm=document.getElementById('taxes');
const totalElm=document.getElementById('total');
const products=[
{
    id: 1,
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
  {
    id: 2,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
  },
  {
    id: 3,
    name: "Pumpkin Cupcake",
    price: 3.99,
    category: "Cupcake",
  },
  {
    id: 4,
    name: "Chocolate Cupcake",
    price: 5.99,
    category: "Cupcake",
  },
  {
    id: 5,
    name: "Chocolate Pretzels (4 Pack)",
    price: 10.99,
    category: "Pretzel",
  },
  {
    id: 6,
    name: "Strawberry Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 7,
    name: "Chocolate Macarons (4 Pack)",
    price: 9.99,
    category: "Macaron",
  },
  {
    id: 8,
    name: "Strawberry Pretzel",
    price: 4.99,
    category: "Pretzel",
  },
  {
    id: 9,
    name: "Butter Pecan Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 10,
    name: "Rocky Road Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 11,
    name: "Vanilla Macarons (5 Pack)",
    price: 11.99,
    category: "Macaron",
  },
  {
    id: 12,
    name: "Lemon Cupcakes (4 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
];
let cartTracker={}

function getValue(element){
  return Number(element.innerText);
}
// Load all products in the ui
for(const {id,name,price,category} of products){
    const card=`<div id=${id} class="card bg-base-100 w-96 shadow-sm">
            <figure class="px-10 pt-10">
                <img
                src="./cake.jpg"
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${name}</h2>
                <h3>Price: <span> ${price}</span></h3>
                <p>Category: ${category}</p>
                <div class="card-actions">
                    <button id="add-to-cart-btn" class="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </div>`;
        productCardContainer.insertAdjacentHTML('beforeend',card);
}

// show and hide cart
showCartBtn.addEventListener('click',(event)=>{
  cartContainer.classList.toggle('hidden');
  if(showText.innerText==='Show'){
    showText.innerText="Hide"
  }
  else{
    showText.innerText="Show"
  }
})

// clear cart 
clearCartBtn.addEventListener('click',()=>{
  const isConfirmed = confirm("Are you sure you want to clear cart items?");
  if(isConfirmed){
    productCartContainer.innerHTML='';
    totalItems.innerText=0;
    subTotalElm.innerText=0;
    taxElm.innerText=0;
    totalElm.innerText=0;
    cartTracker={}
  }
})
 
// functionality for clicking on add to cart button
productCardContainer.addEventListener('click',(event)=>{
  if(event.target.tagName==='BUTTON'){
    const card=event.target.closest('.card');
    const selectedCard=products.find(product=>product.id===Number(card.id));
    addToCardContainer(selectedCard);
  }
})

// rendering product in cart Container
function addToCardContainer({id, name, price}){
  cartTracker[id]=(cartTracker[id]||0)+1;
  totalItems.innerText=Number(totalItems.innerText)+1;
    if(cartTracker[id]>1){
      const item=document.getElementById(`item-${id}`);
      item.innerText=`${cartTracker[id]} X `;
    }
    else{
      const p=`<p> <span id="item-${id}"></span>${name}- $${price}</p>`;
      productCartContainer.insertAdjacentHTML('beforeend',p);
    }
    priceCalculator(price);
}

function priceCalculator(price){
  const subTotalValue=getValue(subTotalElm);
  const taxValue=getValue(taxElm);
  let newSubtotal=subTotalValue+price;
  subTotalElm.innerText=newSubtotal.toFixed(2);
  const tax=price*0.08;
  totalElm.innerText=(newSubtotal+tax).toFixed(2);
  taxElm.innerText=(taxValue+tax).toFixed(2);
}
