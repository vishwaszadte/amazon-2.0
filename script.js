import { getFirestore, doc, getDoc, collection, getDocs, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const db = getFirestore();

async function getItems() {
    const querySnapshot = await getDocs(collection(db, "items"));
    let items = [];
    // console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
        items.push({
            id: doc.id,
            image: doc.data().image,
            name: doc.data().name,
            make: doc.data().make,
            rating: doc.data().rating,
            price: doc.data().price
        })
    });
    // console.log(items);
    generateItems(items);
}

function generateItems(items) {
    let itemsHTML = "";
    items.forEach((item) => {
        let doc = document.createElement("div");
        doc.classList.add("main-product", "mr-5", "mt-5");
        doc.innerHTML = `
            <div class="product-image w-48 h-52 bg-white rounded-lg">
                                <img class="w-full h-full object-contain p-4" src="${item.image}" alt="">
                            </div>
                            <div class="product-name text-gray-700 font-bold mt-2 text-sm">
                                <span>${item.name}</span>
                            </div> 
                            <div class="product-make text-green-700 font-bold">
                                <span>${item.make}</span>
                            </div>
                            <div class="product-rating my-1">
                                <span>⭐⭐⭐⭐⭐ ${item.rating}</span>
                            </div>
                            <div class="product-price font-bold text-gray-700 text-lg">
                                <span>₹ ${item.price}</span>
                            </div>
        `;

        let addToCartElem = document.createElement("button");
        addToCartElem.classList.add("add-to-cart", "w-28", "h-8", "bg-yellow-500", "rounded", "flex", "items-center", "justify-center", "text-white", "text-md", "hover:bg-yellow-600");
        addToCartElem.addEventListener("click", function() {
            addToCart(item);
        })
        addToCartElem.innerText = "Add to cart";
        doc.appendChild(addToCartElem);
        document.querySelector(".main-section-products").appendChild(doc);
    })
}

async function addToCart(item) {
    console.log(item);
    let cartItem = await getDoc(doc(db, "cart-items", item.id));
    if (cartItem.exists()) {
        // let newQuant = cartItem.data().quantity + 1;
        updateDoc(doc(db, "cart-items", item.id), {
            quantity: cartItem.data().quantity + 1
        });
    } else {
        await setDoc(doc(db, "cart-items", item.id), {
            image: item.image,
            name: item.name,
            make: item.make,
            rating: item.rating,
            price: item.price,
            quantity: 1
        })
    }
}

getItems();