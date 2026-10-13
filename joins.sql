-- ============================================
-- COUNTRY CLUB RELATIONSHIPS
-- ============================================

-- 1. Which columns in cd.bookings are foreign keys?
--
-- cd.bookings.memid references cd.members.memid.
-- cd.bookings.facid references cd.facilities.facid.
--
-- Therefore:
-- bookings -> members
-- bookings -> facilities
--
-- bookings is connected to both members and facilities.


-- 2. What kind of relationship exists between
-- members and facilities?
--
-- It is a MANY-TO-MANY relationship.
--
-- One member can make many bookings.
-- One facility can have many bookings.
-- The bookings table acts like the junction table,
-- similar to student_courses in the video.


-- 3. recommendedby points back to cd.members.memid.
--
-- This is a SELF-REFERENCING relationship.
--
-- One member can recommend other members,
-- and the recommender is also stored in cd.members.

-- ============================================
-- 1. Retrieve the start times of members' bookings
-- ============================================

SELECT bks.starttime
FROM cd.bookings bks
JOIN cd.members mems
    ON mems.memid = bks.memid
WHERE mems.firstname = 'David'
  AND mems.surname = 'Farrell';

-- ============================================
-- 2. Work out the start times of bookings
-- for tennis courts
-- ============================================

SELECT bks.starttime
FROM cd.bookings bks
JOIN cd.facilities facs
    ON bks.facid = facs.facid
WHERE facs.name LIKE 'Tennis Court%';

-- ============================================
-- 3. Produce a list of all members who have
-- recommended another member
-- ============================================

SELECT DISTINCT
    mems.firstname,
    mems.surname
FROM cd.members mems
JOIN cd.members recommender
    ON mems.memid = recommender.recommendedby;

-- ============================================
-- 4. Produce a list of all members,
-- along with their recommender
-- ============================================

SELECT
    mems.firstname,
    mems.surname,
    recommender.firstname AS recommender_firstname,
    recommender.surname AS recommender_surname
FROM cd.members mems
LEFT JOIN cd.members recommender
    ON mems.recommendedby = recommender.memid
ORDER BY mems.surname, mems.firstname;

-- ============================================
-- 5. Produce a list of all members who have
-- used a tennis court
-- ============================================

SELECT DISTINCT
    mems.firstname,
    mems.surname
FROM cd.members mems
JOIN cd.bookings bks
    ON mems.memid = bks.memid
JOIN cd.facilities facs
    ON bks.facid = facs.facid
WHERE facs.name LIKE 'Tennis Court%'
ORDER BY mems.surname, mems.firstname;

-- ============================================
-- 6. Produce a list of costly bookings
-- ============================================

SELECT
    mems.firstname,
    mems.surname,
    facs.name,
    CASE
        WHEN mems.memid = 0 THEN bks.slots * facs.guestcost
        ELSE bks.slots * facs.membercost
    END AS cost
FROM cd.members mems
JOIN cd.bookings bks
    ON mems.memid = bks.memid
JOIN cd.facilities facs
    ON bks.facid = facs.facid
WHERE
    CASE
        WHEN mems.memid = 0 THEN bks.slots * facs.guestcost
        ELSE bks.slots * facs.membercost
    END > 30
ORDER BY cost DESC;

-- ============================================
-- 7. Produce a list of all members,
-- along with their recommender,
-- using no joins
-- ============================================

SELECT
    firstname,
    surname,
    (
        SELECT firstname
        FROM cd.members recommender
        WHERE recommender.memid = mems.recommendedby
    ) AS recommender_firstname,
    (
        SELECT surname
        FROM cd.members recommender
        WHERE recommender.memid = mems.recommendedby
    ) AS recommender_surname
FROM cd.members mems
ORDER BY surname, firstname;


-- ============================================
-- 8. Produce a list of costly bookings,
-- using a subquery
-- ============================================

SELECT
    firstname,
    surname,
    name,
    cost
FROM (
    SELECT
        mems.firstname,
        mems.surname,
        facs.name,
        CASE
            WHEN mems.memid = 0 THEN bks.slots * facs.guestcost
            ELSE bks.slots * facs.membercost
        END AS cost
    FROM cd.members mems
    JOIN cd.bookings bks
        ON mems.memid = bks.memid
    JOIN cd.facilities facs
        ON bks.facid = facs.facid
) AS booking_costs
WHERE cost > 30
ORDER BY cost DESC;