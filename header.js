import { getFirestore, doc, getDoc, collection, getDocs, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
const db = getFirestore();

async function getCartItems() {
    const querySnapshot = await getDocs(collection(db, "cart-items"));
    let totalCount = 0;
    querySnapshot.forEach((doc) => {
        totalCount += doc.data().quantity;
    });
    setCartCounter(totalCount);
}

function setCartCounter(totalCount) {
    document.querySelector(".cart-item-number").innerHTML = `<span>${totalCount}</span>`
}

getCartItems();