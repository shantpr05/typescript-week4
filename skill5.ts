// --- Promises with fetch ---

// AdviceSliptype 

type AdviceSlipType = {
    slip: {
        id: number;
        advice: string;
    };  
    
};

// --- A different Advice slip ---

const fetchAdviceAndLog = (id: number): void => {
    fetch(`https://api.adviceslip.com/advice/${id}`)
        .then((response: Response) => {
            if (!response.ok) {
                console.log( `Request failed for advice ID ${id}` 

                ); 
                
                throw new Error( `HTTP error: ${response.status}`

                );
            }
            return response.json() as Promise<AdviceSlipType>;
        })
        .then((data: AdviceSlipType) => {
            console.log(`Advice Slip ${data.slip.id}: ${data.slip.advice}`);
        })
        .catch((error: unknown) => {
            console.log(`Error fetching advice slip ${id}: ${error}`);
        });
};

// Three different IDs 
fetchAdviceAndLog(1); 
fetchAdviceAndLog(2); 
fetchAdviceAndLog(3);