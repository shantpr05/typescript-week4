-- Exercise 1: Retrieve everything from a table
SELECT *
FROM cd.facilities;

-- Exercise 2: Retrieve specific columns
SELECT name, membercost
FROM cd.facilities;

-- Exercise 3: WHERE
SELECT *
FROM cd.facilities
WHERE membercost > 0;

-- Exercise 4: Control which rows are retrieved - part 2
SELECT facid, name, membercost, monthlymaintenance
FROM cd.facilities
WHERE membercost > 0
  AND membercost < monthlymaintenance / 50.0;

-- Exercise 5: LIKE
SELECT *
FROM cd.facilities
WHERE name LIKE '%Tennis%';

-- Exercise 6: IN
SELECT *
FROM cd.facilities
WHERE facid IN (1, 5);

-- Exercise 7: CASE -- Exercise 7: Classify results into buckets
SELECT name,       
       CASE
           WHEN monthlymaintenance > 100 THEN 'expensive'
           ELSE 'cheap'
       END AS cost
FROM cd.facilities;

-- Exercise 8: Dates
SELECT memid, surname, firstname, joindate
FROM cd.members
WHERE joindate >= '2012-09-01'
  

-- Exercise 9: DISTINCT + ORDER BY
SELECT DISTINCT surname
FROM cd.members
ORDER BY surname
LIMIT 10;

-- Exercise 10: UNION
SELECT surname
FROM cd.members
UNION
SELECT name
FROM cd.facilities


-- Exercise 11: MAX / COUNT
select max(joindate) as latest
	from cd.members; 

-- Exercise 12: More aggregation
SELECT firstname, surname, joindate
        FROM cd.members
        WHERE joindate = (SELECT MAX(joindate) FROM cd.members);
       