// The second fetch starts only after the first fetch finishes.

const fetchTwoAdvice = async (): Promise<void> => {
    try {
        //First fetch
        const response1 = await fetch(
            "https://api.adviceslip.com/advice"
        );

        if (!response1.ok) {
            throw new Error(
                `HTTP error! status: ${response1.status}`
            );
        }
        const data1 = await response1.json();
        console.log("Task6 - First advice: ", data1.slip.advice);
        
        // Second fetch starts after the first one has finished.
        
        const response2 = await fetch(
            "https://api.adviceslip.com/advice"
        );

        if (!response2.ok) {
            throw new Error(
                `HTTP error! status: ${response2.status}`
            );
        }
        const data2 = await response2.json();

        console.log(
            `Task6 - Second advice: ${data2.slip.advice}`
        );
    } catch (error: unknown) {
        console.log(
            `Task6 - Error fetching advice: ${String(error)}`
        );
    }
};

fetchTwoAdvice();