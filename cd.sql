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

-- Exercise 4: WHERE part 2
SELECT *
FROM cd.facilities
WHERE membercost > 0
  AND guestcost > 10;

-- Exercise 5: LIKE
SELECT *
FROM cd.facilities
WHERE name LIKE '%Tennis%';

-- Exercise 6: IN
SELECT *
FROM cd.facilities
WHERE facid IN (1, 5);

-- Exercise 7: CASE
SELECT name,
       CASE
           WHEN membercost = 0 THEN 'Free'
           ELSE 'Paid'
       END AS cost_type
FROM cd.facilities;

-- Exercise 8: Dates
SELECT *
FROM cd.bookings
WHERE starttime >= '2012-09-01'
  AND starttime < '2012-10-01';

-- Exercise 9: DISTINCT + ORDER BY
SELECT DISTINCT memid
FROM cd.bookings
ORDER BY memid;

-- Exercise 10: UNION
SELECT firstname
FROM cd.members
UNION
SELECT surname
FROM cd.members
ORDER BY 1;

-- Exercise 11: MAX / COUNT
SELECT MAX(guestcost) AS highest_guest_cost,
       COUNT(*) AS facility_count
FROM cd.facilities;

-- Exercise 12: More aggregation
SELECT facid,
       COUNT(*) AS booking_count
FROM cd.bookings
GROUP BY facid
ORDER BY facid;