import { getFirestore, doc, getDoc, collection, getDocs, setDoc, updateDoc, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
const db = getFirestore();

function getCartItems() {
    const snapshot = onSnapshot(collection(db, "cart-items"), (collection) => {
        let cartItems = [];
        collection.forEach((doc) => {
            cartItems.push({
                id: doc.id,
                // image: doc.data().image,
                // name: doc.data().name,
                // make: doc.data().make,
                // rating: doc.data().rating,
                // price: doc.data().price,
                // quantity: doc.data().quantity
                ...doc.data()
            })
        });
        generateCartItems(cartItems);
        getTotalCost(cartItems);
    });
}

async function decreaseCount(itemId) {
    let cartItem = await getDoc(doc(db, "cart-items", itemId));
    if (cartItem.exists()) {
        if (cartItem.data().quantity > 1) {
            updateDoc(doc(db, "cart-items", itemId), {
                quantity: cartItem.data().quantity - 1
            });
        }
    }
}

async function increaseCount(itemId) {
    let cartItem = await getDoc(doc(db, "cart-items", itemId));
    if (cartItem.exists()) {
        if (cartItem.data().quantity > 0) {
            updateDoc(doc(db, "cart-items", itemId), {
                quantity: cartItem.data().quantity + 1
            });
        }
    }
}

async function deleteItem(itemId) {
    await deleteDoc(doc(db, "cart-items", itemId));

}

function getTotalCost(items) {
    let totalCost = 0;
    items.forEach((item) => {
        totalCost += item.quantity * item.price;
    })
    // console.log(totalCost);
    document.querySelector(".total-cost-number").innerHTML = `<span>₹ ${numeral(totalCost).format('0,0')}</span>`;
}

function generateCartItems(cartItems) {
    let itemsHTML = "";
    cartItems.forEach((item) => {
        itemsHTML += `
        <div class="cart-item flex items-center pb-4 border-b border-gray-100">
            <div class="cart-item-image w-40 h-24 bg-white p-2 rounded-lg">
                <img class="w-full h-full object-contain" src="${item.image}" alt="">
            </div>
            <div class="cart-item-details flex-grow">
                <div class="cart-item-title font-bold text-sm text-gray-600">
                    <span>${item.name}</span>
                </div>
                <div class="cart-item-brand text-sm text-gray-400 font-bold">  
                    <span>${item.make}</span>
                </div>
            </div>
            <div class="cart-item-counter w-48 flex items-center">
                <div data-id="${item.id}" class="cart-item-decrease w-6 h-6 cursor-pointer text-gray-400 bg-gray-100 rounded flex justify-center items-center hover:bg-gray-200 mr-2">
                    <i class="fas fa-chevron-left fa-xs"></i>
                </div>
                <h4 class="text-gray-400">x${item.quantity}</h4>
                <div data-id="${item.id}" class="cart-item-increase w-6 h-6 cursor-pointer text-gray-400 bg-gray-100 rounded flex justify-center items-center hover:bg-gray-200 ml-2">
                    <i class="fas fa-chevron-right fa-xs"></i>
                </div>
            </div>
            <div class="cart-item-total-cost w-48 font-bold text-gray-400">
                <span>₹ ${
                    numeral(item.price * item.quantity).format('0,0')}</span>
            </div>
            <div data-id="${item.id}" class="cart-item-delete w-10 font-bold text-gray-200 cursor-pointer hover:text-gray-400">
                <i class="fas fa-times"></i>
            </div>
        </div>
        `;
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListeners();
}

function createEventListeners() {
    let decreaseButtons = document.querySelectorAll(".cart-item-decrease");
    let increaseButtons = document.querySelectorAll(".cart-item-increase");
    let deleteButtons = document.querySelectorAll(".cart-item-delete");

    // console.log(deleteButtons);

    decreaseButtons.forEach((button) => {
        button.addEventListener("click", function() {
            decreaseCount(button.dataset.id);
        })
    })

    increaseButtons.forEach((button) => {
        button.addEventListener("click", function() {
            increaseCount(button.dataset.id);
        })
    })

    deleteButtons.forEach((button) => {
        button.addEventListener("click", function() {
            deleteItem(button.dataset.id);
        })
    })
}

getCartItems();