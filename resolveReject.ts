const myPromise = new Promise((resolve, reject) => {
    const success = true;
    if(success) {
        resolve("Resolved operation successfully!");
    } else {
        reject("Resolved operation rejected!");
    }
});

const handleMyPromise = async (): Promise<void> => {
    try {
        const result = await myPromise;
        console.log("Task2: ", result);
    } catch (error: unknown) {
        console.log("Task2 error: ", String(error));
    }
};

handleMyPromise();