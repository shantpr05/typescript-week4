
-- Query 1: Get an author and their books

SELECT
  "Author"."id",
  "Author"."name",
  "Books"."id" AS "Books.id",
  "Books"."title" AS "Books.title",
  "Books"."genre" AS "Books.genre",
  "Books"."published_year" AS "Books.published_year",
  "Books"."author_id" AS "Books.author_id"
FROM "authors" AS "Author"
LEFT OUTER JOIN "books" AS "Books"
ON "Author"."id" = "Books"."author_id"
WHERE "Author"."id" = '1';


-- Query 2: Get a member and their borrowed books with loan details

SELECT
  "Member"."id",
  "Member"."name",
  "Books"."id" AS "Books.id",
  "Books"."title" AS "Books.title",
  "Books"."genre" AS "Books.genre",
  "Books"."published_year" AS "Books.published_year",
  "Books"."author_id" AS "Books.author_id",
  "Books->Loan"."id" AS "Books.Loan.id",
  "Books->Loan"."borrowed_at" AS "Books.Loan.borrowed_at",
  "Books->Loan"."returned_at" AS "Books.Loan.returned_at"
FROM "members" AS "Member"
LEFT OUTER JOIN (
  "loans" AS "Books->Loan"
  INNER JOIN "books" AS "Books"
  ON "Books"."id" = "Books->Loan"."book_id"
)
ON "Member"."id" = "Books->Loan"."member_id"
WHERE "Member"."id" = '1';

-- Query 3: Equivalent SQL – Get an author and their books
SELECT
    a.id,
    a.name,
    b.id AS book_id,
    b.title,
    b.genre,
    b.published_year
FROM authors AS a
LEFT JOIN books AS b
    ON a.id = b.author_id
WHERE a.id = 1;


-- Query 4: Get a member's borrowed books and loan details

SELECT
    m.id AS member_id,
    m.name AS member_name,
    b.id AS book_id,
    b.title,
    b.genre,
    l.borrowed_at,
    l.returned_at
FROM members AS m
LEFT JOIN loans AS l
    ON m.id = l.member_id
LEFT JOIN books AS b
    ON l.book_id = b.id
WHERE m.id = 1;
