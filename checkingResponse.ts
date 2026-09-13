type adviceSlipType = {
  slip: {
    id: number;
    advice: string;
  };
};

const fetchAdviceById = async (id: number): Promise<void> => {
    try {
        const response = await fetch(
            `https://api.adviceslip.com/advice/${id}`

        );

        if (!response.ok) {
            throw new Error(
                `HTTP error! status: ${response.status}`
            );
        }
        const data: adviceSlipType = await response.json();
        console.log(
            `Task5: ${data.slip.advice}`
        );
    } catch (error: unknown) {
        console.log(
            `Task5 - Error fetching advice by ID ${id}: `, String(error));
    }
};

fetchAdviceById(2);
