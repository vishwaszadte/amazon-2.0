import { getFirestore, doc, getDoc, collection, getDocs, setDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
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
    });
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
                <div div="${item.id}" class="chevron-left w-6 h-6 cursor-pointer text-gray-400 bg-gray-100 rounded flex justify-center items-center hover:bg-gray-200 mr-2">
                    <i class="fas fa-chevron-left fa-xs"></i>
                </div>
                <h4 class="text-gray-400">x${item.quantity}</h4>
                <div class="chevron-right w-6 h-6 cursor-pointer text-gray-400 bg-gray-100 rounded flex justify-center items-center hover:bg-gray-200 ml-2">
                    <i class="fas fa-chevron-right fa-xs"></i>
                </div>
            </div>
            <div class="cart-item-total-cost w-48 font-bold text-gray-400">
                <span>₹ ${item.price * item.quantity}</span>
            </div>
            <div class="cart-item-delete w-10 font-bold text-gray-200 cursor-pointer hover:text-gray-400">
                <i class="fas fa-times"></i>
            </div>
        </div>
        `;
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
}

getCartItems();