import { getFirestore, doc, getDoc, collection, getDocs, setDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
const db = getFirestore();

async function getCartItems() {
    const snapshot = onSnapshot(collection(db, "cart-items"), (collection) => {
        let totalCount = 0;
        // console.log(snapshot);
        collection.forEach((doc) => {
            totalCount += doc.data().quantity;
        });
        setCartCounter(totalCount);
    });
    

    // db.collection("cities").doc("SF")
    // .onSnapshot((doc) => {
    //     console.log("Current data: ", doc.data());
    // });
    
}

function setCartCounter(totalCount) {
    document.querySelector(".cart-item-number").innerHTML = `<span>${totalCount}</span>`
}

getCartItems();