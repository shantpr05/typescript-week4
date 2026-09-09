// --- Promise ---

const inStock = true;

const checkStock = new Promise((resolve, reject) => {
  // This is the first line inside the Promise executor. 
  console.log("Checking stock...");

  if (inStock) {
    resolve("Item is in stock.");
  } else {    
    reject("Item is out of stock.");
  }
});

// This runs immediately after creating the Promise. 
console.log("Promise created.");

checkStock.then((message) => {
  console.log(message);
})
.catch((error: unknown) => {
  console.error(`Error: ${error}`);
});   
