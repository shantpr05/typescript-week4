# Week 5 - HTTP & Express Homework

## Topic

My Programming Collection

This project is a simple Express API about programming languages,
web development frameworks, and development tools.

The project uses TypeScript and Express.

## How to Run

Install dependencies:

npm install

Start the server:

npm start

The server runs at:

http://localhost:3000

## API Routes

| Method | Path | Description | Expected Status |
|---|---|---|---|
| GET | / | Returns a welcome message | 200 OK |
| GET | /collection | Returns programming categories and lastUpdated | 200 OK |
| GET | /about | Returns information about the collection | 200 OK |
| GET | /message | Returns a plain-text message | 200 OK |
| GET | /languages | Returns programming languages as JSON | 200 OK |
| GET | /maintenance | Returns a maintenance message | 503 Service Unavailable |
| GET | /does-not-exist | Route that does not exist | 404 Not Found |

## Task Details

### Task 1

Created a homepage route using res.send().

### Task 2

Created a main collection route using res.json().
The response contains a title, three categories, and a lastUpdated field.

### Task 3

Tested the homepage and collection routes using Insomnia.

### Task 4

Created an /about route that returns descriptive JSON information.

### Task 5

Created a /message route using res.send().
This route returns plain text, so res.send() is suitable.

### Task 6

Added comments explaining expected HTTP status codes.
Tested a route that does not exist and received 404 Not Found.

### Task 7

Created a /languages route using res.status(200).json().

### Task 8

Created a /maintenance route that intentionally returns
503 Service Unavailable.

## Insomnia Screenshots

Add screenshots below each route after testing.

### Homepage

Paste your Insomnia screenshot here.

### Collection

Paste your Insomnia screenshot here.

### About

Paste your Insomnia screenshot here.

### Message

Paste your Insomnia screenshot here.

### Languages

Paste your Insomnia screenshot here.

### Maintenance

Paste your Insomnia screenshot here.

### Not Found Route

Paste your Insomnia screenshot here.