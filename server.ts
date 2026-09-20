import express, { Request, Response } from "express";

const app = express();

const PORT = 3000;

// Allows Express to read JSON from req.body

app.use(express.json());

type Party = {
  id: number;
  name: string;
  leader: string;
  seats: number;
};

type PartyParams = {
  id: number;
};

// Swedish Riksdag Parties after the 2026 election
const parties: Party[] = [
  {
    id: 1,
    name: "Socialdemokraterna",
    leader: "Magdalena Andersson",
    seats: 99,
  },
  {
    id: 2,
    name: "Moderaterna",
    leader: "Ulf Kristersson",
    seats: 70,
  },
  {
    id: 3,
    name: "Sverigedemokraterna",
    leader: "Jimmie Åkesson",
    seats: 70,
  },
  {
    id: 4,
    name: "Vänsterpartiet",
    leader: "Nooshi Dadgostar",
    seats: 30,
  },
  {
    id: 5,
    name: "Centerpartiet",
    leader: "Elisabeth Thand Ringqvist",
    seats: 25,
  },
  {
    id: 6,
    name: "Kristdemokraterna",
    leader: "Ebba Busch",
    seats: 22,
  },
  {
    id: 7,
    name: "Mijöpartiet",
    leader: "Amanda Lind / Daniel Hellden",
    seats: 22,
  },
  {
    id: 8,
    name: "Liberalerna",
    leader: "Simona Mohamsson",
    seats: 19,
  },
];

// Task 1: List All Parties

app.get("/parties", (req: Request, res: Response) => {
  res.status(200).json(parties);
});


// Task 2 + Task 6 + Task 7: POST /parties 
// Add a new party 
// Success: 201 Created 
// Bad input: 400 Bad Request

app.post("/parties", (req: Request, res: Response) => {
  const { name, leader, seats } = req.body;

  // Check required fields

  if (!name || !leader) {
    res.status(400).json({
      error: "Name and leader are required.",
    });
    return;
  }

  const newParty: Party = {
    id:
      parties.length > 0
        ? Math.max(...parties.map((party) => party.id)) + 1
        : 1,
    name,
    leader,
    seats: Number(seats),
  };
  parties.push(newParty);

  res.status(201).json({
    message: "Party created successfully.",
    party: newParty,
  });
});

// Task 4: Update a party info

app.put("/parties/:id", (req: Request<PartyParams>, res: Response) => {
  const id = Number(req.params.id);
  const party = parties.find((party) => party.id === id);
  if (!party) {
    res.status(404).json({
      error: `Party with id ${id} was not found.`,
    });
    return;
  }

  const { name, leader, seats } = req.body;
  if (name !== undefined) {
    party.name = name;
  }

  if (leader !== undefined) {
    party.leader = leader;
  }

  if (seats !== undefined) {
    party.seats = Number(seats);
  }

  res.status(200).json({
    message: "Party updated successfully.",
    party,
  });
});

// Task 8: A Seats Total Route

app.get("/parties/seats-total", (req: Request, res: Response) => {
  const totalSeats = parties.reduce((total, party) => total + party.seats, 0);
  res.status(200).json({
    totalSeats,
  });
});

app.get("/parties/:id", (req: Request<PartyParams>, res: Response) => {
  const id = Number(req.params.id);
  const party = parties.find((party) => party.id === id);
  if (!party) {
    res.status(404).json({ error: `Party with id ${id} was not found.` });
    return;
  }
  res.status(200).json(party);
});

// Task 5: Remove a Party

app.delete("/parties/:id", (req: Request<PartyParams>, res: Response) => {
  const id = Number(req.params.id);
  const partyIndex = parties.findIndex((party) => party.id === id);
  if (partyIndex === -1) {
    res.status(404).json({ error: `Party with id ${id} was not found.` });
    return;
  }
  const deletedParty = parties.splice(partyIndex, 1)[0];
  res
    .status(200)
    .json({ message: "Party deleted successfully.", 
        party: deletedParty 
    });
});

// -------------------------------------------------- 
// Start server 
// --------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
