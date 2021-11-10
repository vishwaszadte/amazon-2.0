import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const db = getFirestore();

async function getItems() {
    const querySnapshot = await getDocs(collection(db, "items"));
    let items = [];
    // console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
        items.push({
            id: doc.id,
            image: doc.data().id,
            name: doc.data().name,
            make: doc.data().make,
            rating: doc.data().rating,
            price: doc.data().price
        })
    });
    generateItems(items);
}

function generateItems(items) {
    items.forEach((item) => {

    })
}

getItems();