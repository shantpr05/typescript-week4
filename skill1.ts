// --- Order Confirmation ---
type orderCallback = () => void;

const placeOrder = (item: string,callback: orderCallback): void => {
  console.log(`Order placed for ${item}.`); 
  callback();
};

placeOrder("Laptop", () => {
    console.log("Order confirmed. Thank you for your purchase!");
});

// --- Sum with a Named Type ---
type sumCallback = (result: number) => void;
const sumNumbers = (a: number, b: number, callback: sumCallback): void => {
  const result = a + b;
  callback(result);
}   

sumNumbers(5, 10, (result) => {
    console.log(`The sum result is: ${result}`);
}); 

