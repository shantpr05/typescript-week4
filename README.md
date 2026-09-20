# Week 6 - HTTP & Express CRUD

## Swedish 2026 Riksdag Election API

This project is a simple CRUD API built with TypeScript and Express.

The API uses an in-memory array of Swedish political parties and demonstrates:

* GET
* POST
* PUT
* DELETE
* req.body
* req.params
* HTTP status codes
* JSON responses

The initial party seat data is based on the confirmed 2026 Swedish parliamentary election result published by Sveriges riksdag.

## How to Run

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Server:

```text
http://localhost:3000
```

## API Routes

### GET /parties

Returns all parties.

Status:

```text
200 OK
```

### POST /parties

Creates a new party.

Request body:

```json
{
  "name": "Test Party",
  "leader": "Test Leader",
  "seats": 10
}
```

Success status:

```text
201 Created
```

### PUT /parties/:id

Updates an existing party.

Example:

```text
PUT /parties/1
```

Request body:

```json
{
  "name": "Updated Party",
  "leader": "Updated Leader",
  "seats": 100
}
```

Success status:

```text
200 OK
```

If the party does not exist:

```text
404 Not Found
```

### DELETE /parties/:id

Deletes an existing party.

Example:

```text
DELETE /parties/9
```

Success status:

```text
200 OK
```

If the party does not exist:

```text
404 Not Found
```

### GET /parties/seats-total

Returns the total number of seats.

Example response:

```json
{
  "totalSeats": 349
}
```

Success status:

```text
200 OK
```

### GET /parties/:id

Returns one party by ID.

Example:

```text
GET /parties/1
```

Success status:

```text
200 OK
```

If the party does not exist:

```text
404 Not Found
```

## Error Handling

### Missing required fields

If `name` or `leader` is missing when creating a party:

```text
400 Bad Request
```

Example response:

```json
{
  "error": "Name and leader are required."
}
```

## Insomnia Screenshots

### GET /parties

Add screenshot here.

### POST /parties - 201 Created

Add screenshot here.

### POST /parties - 400 Bad Request

Add screenshot here.

### PUT /parties/:id - 200 OK

Add screenshot here.

### PUT /parties/:id - 404 Not Found

Add screenshot here.

### DELETE /parties/:id - 200 OK

Add screenshot here.

### GET /parties/seats-total

Add screenshot here.

### GET /parties/:id

Add screenshot here.
