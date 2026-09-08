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

// 7. Download Simulation

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

// 8. Success and Error Callback

type successFunction = (message: string) => void;
type errorFunction = (errorMessage: string) => void;

const processSomething = (
    successCallback: successFunction,
    errorCallback: errorFunction    
) => {
    const success = Math.random() > 0.5; // Simulating success or error randomly
    if (success) {
        successCallback("Process completed successfully!"); 
    } else {
        errorCallback("An error occurred during the process.");
    }
};

const showSuccess = (message: string) => {
    console.log("Success: ", message);
};

const showError = (errorMessage: string) => {
    console.log("Error: ", errorMessage);
};

processSomething(showSuccess, showError);

// 9. Math with Different Operations

type mathFunction = (result: number) => void;  

const calculate = (
    num1: number,
    num2: number,
    operation: string,      
    callback: mathFunction
) => {
    let result: number;

    if (operation === "add") {
        result = num1 + num2;
    } else if (operation === "subtract") {
        result = num1 - num2;
    } else if (operation === "multiply") {
        result = num1 * num2;
    }  else if (operation === "divide") {
        result = num1 / num2;
    } else {
        console.log("Invalid operation");
        return;
    }

    callback(result);
};

const showMathResult = (result: number) => {
    console.log("The result is: ", result);
};

calculate(10, 5, "add", showMathResult);
calculate(10, 5, "subtract", showMathResult);
calculate(10, 5, "multiply", showMathResult);
calculate(10, 5, "divide", showMathResult);


// 10. Chained Callbacks

type StepDoneFunction = (step: string) => void;

const step1 = (callback: StepDoneFunction) => {
    setTimeout(() => {
        console.log("Step 1 completed");
        callback("Step 1 done");
    }, 1000);
};

const step2 = (callback: StepDoneFunction) => {
    setTimeout(() => {
        console.log("Step 2 completed");
        callback("Step 2 done");
    }, 1000);   
};

const step3 = (callback: StepDoneFunction) => {
    setTimeout(() => {
        console.log("Step 3 completed");
        callback("Step 3 done");
    }, 1000);
};

const finish = () => {
    console.log("All steps completed!");
};

step1(() => {
    step2(() => {
        step3(finish);
    });
});