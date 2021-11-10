import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js"; 
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDRjzK3bLjxjMoETPbegZ-6nk8iRdsTVcQ",
    authDomain: "clone-67ce5.firebaseapp.com",
    projectId: "clone-67ce5",
    storageBucket: "clone-67ce5.appspot.com",
    messagingSenderId: "779242240417",
    appId: "1:779242240417:web:97db1025189f381badb3e0"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

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
    console.log(items);
}

getItems();