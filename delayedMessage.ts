const delayedMessage = (
    message: string, 
    delay: number
): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(message);
        }, delay);
    });
};

const showDelayedMessage = async (): Promise<void> => {
    try {
        const result = await delayedMessage("This is a delayed message!", 2000);
        console.log("Task3: ", result);
    } catch (error: unknown) {
        console.log("Task3 error: ", String(error));
    }
};

showDelayedMessage();