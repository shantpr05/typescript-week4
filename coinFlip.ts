const flipCoin = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        const outcome = Math.random() > 0.5;
        if (outcome) {
            resolve("You win! Heads");
        } else {
            reject("You lose! Tails");
        }  
        
    });
};

const playCoinFlip = async (): Promise<void> => {
    try {
        const result = await flipCoin();
        console.log("Task1: ", result);
    } catch (error) {
        console.log("Task1: ", String(error));
    }
};

playCoinFlip();