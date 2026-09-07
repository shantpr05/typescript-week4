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

// 1. Hello Callback

type helloFunction = (name: string) => void;

const sayHello = ( callback: helloFunction) => {
    callback(`Hello from callback`);
};

const showHello = (message: string) => {
    console.log(message);
};

sayHello(showHello);

// 2. Delayed Greeting

type delayedGreetingFunction = (greeting: string) => void;

const delayedGreeting = (greeting: string, callback: delayedGreetingFunction) => {
    setTimeout(() => {
        callback(greeting);
    }, 2000);
};

const showDelayedGreeting = (message: string) => {
    console.log(message);
};

delayedGreeting("Hello, I am bit late!", showDelayedGreeting);

// 3. Math Callback

type numberFunction = (result: number) => void;

const addNumbers = (num1: number, num2: number, callback: numberFunction) => {
    const result = num1 + num2;
    callback(result);
}; 

const showResult = (result: number) => {
    console.log("The result is: ", result);
};

addNumbers(5, 10, showResult);

// 4. Uppercase Callback

type stringFunction = (message: string) => void;

const convertToUppercase = (message: string, callback: stringFunction) => {
    const result = message.toUpperCase();
    callback(result);
};

const showUppercase = (message: string) => {
    console.log("The uppercase string is: ", message);
};

convertToUppercase("hello, typescript!", showUppercase);


// 5. Pizza Order
type orderStatusFunction = (status: string) => void;

const orderPizza = (callback: orderStatusFunction) => {
    setTimeout(() => {
        callback("Your pizza is ready!");
    }, 2000);
};

const showOrderStatus = (status: string) => {
    console.log("Your pizza order is: ", status);
};

orderPizza(showOrderStatus);


// 6. Multiple Messages

type messageFunction = (message: string) => void;

const sendMessages = (callback: messageFunction) => {
    callback("Hello!");
    callback("How are you?");
    callback("I'm doing great!");
};

const showMessage = (message: string) => {
    console.log("Message: ", message);
};

sendMessages(showMessage);

//m7. Download Simulation

type downloadFunction = (status: string) => void;

const downloadFile = (
    url: string,
    callback: downloadFunction

) => {
    setTimeout(() => {
        callback(`File downloaded from ${url}`);
    }, 2000);
};

const showDownloadedData = (data: string) => {
    console.log(data);
};  

downloadFile("https://example.com/file.zip", showDownloadedData);

