"use strict";
/*const deliverPackage = (displayData: (data: string) => void) => {
    console.log("waiting for package...");
    setTimeout(() => {
        const data = "Delivering package";
        displayData(data);
    }, 2000);
};
const displayData = (data: string) => {
    console.log(data);
};

deliverPackage(displayData); */
const sayHello = (callback) => {
    callback(`Hello from callback`);
};
const showHello = (message) => {
    console.log(message);
};
sayHello(showHello);
const delayedGreeting = (greeting, callback) => {
    setTimeout(() => {
        callback(greeting);
    }, 2000);
};
const showDelayedGreeting = (message) => {
    console.log(message);
};
delayedGreeting("Hello, I am bit late!", showDelayedGreeting);
const addNumbers = (num1, num2, callback) => {
    const result = num1 + num2;
    callback(result);
};
const showResult = (result) => {
    console.log("The result is: ", result);
};
addNumbers(5, 10, showResult);
const convertToUppercase = (message, callback) => {
    const result = message.toUpperCase();
    callback(result);
};
const showUppercase = (message) => {
    console.log("The uppercase string is: ", message);
};
convertToUppercase("hello, typescript!", showUppercase);
const orderPizza = (callback) => {
    setTimeout(() => {
        callback("Your pizza is ready!");
    }, 2000);
};
const showOrderStatus = (status) => {
    console.log("Your pizza order is: ", status);
};
orderPizza(showOrderStatus);
const sendMessages = (callback) => {
    callback("Hello!");
    callback("How are you?");
    callback("I'm doing great!");
};
const showMessage = (message) => {
    console.log("Message: ", message);
};
sendMessages(showMessage);
const downloadFile = (url, callback) => {
    setTimeout(() => {
        callback(`File downloaded from ${url}`);
    }, 2000);
};
const showDownloadedData = (data) => {
    console.log(data);
};
downloadFile("https://example.com/file.zip", showDownloadedData);
