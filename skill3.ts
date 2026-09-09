// Temperature converter ---

type ConvertCallback = (celsius: number) => void;
const convertTemperature = (
    celsius: number,
    callback: ConvertCallback
) => {
    return callback(celsius);
};

// Celsius to Fahrenheit conversion
const fahrenheit = convertTemperature(25, (celsius) => { 
    return (celsius * 9) / 5 + 32; 
}); 

console.log(`25°C in Fahrenheit: ${fahrenheit}°F`);

// Celsius to Kelvin conversion
const kelvin = convertTemperature(25, (celsius) => { 
    return celsius + 273.15; 
});

console.log(`25°C in Kelvin: ${kelvin}K`);