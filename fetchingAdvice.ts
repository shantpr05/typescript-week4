const fetchAdvice = async (): Promise<void> => {
    try {
        const response = await fetch("https://api.adviceslip.com/advice");  
        const data = await response.json();
        console.log("Task4: ", data.slip.advice);
    } catch (error: unknown) {
        console.log("Task4 - Error fetching advice: ", String(error));
    }
};

fetchAdvice();  