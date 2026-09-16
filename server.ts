import express, { Request, Response } from "express";

const app = express();

const PORT = 3000;

const programmingCollection = {

    categories: {
    
      languages: ["JavaScript", "Python", "Java", "C++"],
    
       frameworks: ["React", "Angular", "Vue", "Django", "Spring"],

       tools: ["Git", "Docker", "Webpack", "Babel"]
    
    },

    lastUpdated: new Date().toISOString().split("T")[0]
};


// Task 1: Homepage Route


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my programming collection!");
});

// Task 2: Main Data Route

app.get("/collection", (req: Request, res: Response) => {
  res.json(programmingCollection);
});

// Task 4: Second JSON Route

// Expected success status: 200 OK
// If this route does not exist: 404 Not Found

app.get("/about", (req: Request, res: Response) => {
  res.json({
    title: "About My Programming Collection",
    description:
      "This collection contains programming languages, frameworks, and tools that are useful for web development.",
    founded: "Web development has evolved over several decades.",
    funFact:
      "JavaScript was created in 1995 and is one of the main languages used to make websites interactive."
  });
});

// Task 5: Comparing Response Types

app.get("/message", (req: Request, res: Response) => {
  res.send("Keep learning programming and building projects!");
});

// Task 7: Setting Status Codes Explicitly


// Expected success status: 200 OK
// If this route does not exist: 404 Not Found

app.get("/languages", (req: Request, res: Response) => {
  res.status(200).json({
    title: "Programming Languages",
    languages: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java"
    ]
  });
});


// Task 8: Deliberate Error Response

// Expected status: 503 Service Unavailable

app.get("/maintenance", (req: Request, res: Response) => {
  res
    .status(503)
    .send("We're down for maintenance, check back soon!");
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});