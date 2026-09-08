// --- Countdown Timer ----

// 1. before countdown
// 2. After countdown
// 3. Time's up!
// 4. Countdown finished

const countdown = (seconds: number, callback: () => void) => {
    setTimeout(() => {
        console.log("Time's up!");
        callback();
    }, seconds * 1000);
}

console.log("Before countdown");
countdown(3, () => {
    console.log("Countdown finished");
});

console.log("After countdown");

// --- Delayed Greeting ----
const delayedGreeting = (name: string, delay: number, callback: () => void) => {
    setTimeout(() => {
        console.log(`Hello, ${name}!`);
        callback();
    }, delay);
}   

delayedGreeting("Alice", 2000, () => {
    console.log("First delay is over");
});

delayedGreeting("Bob", 1000, () => {
    console.log("Second delay is over");
});