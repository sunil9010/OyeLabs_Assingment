// 2. Refer to the tables below, Write a sql query for finding the subjects for each
// student, the subjects should be order by alphabetically .

SELECT c.customerId, c.name, (
    SELECT GROUP_CONCAT(s.subjectName ORDER BY s.subjectName ASC SEPARATOR ', ')
    FROM student_subject AS ss
    JOIN subjects AS s ON ss.subjectId = s.subjectId
    WHERE ss.customerId = c.customerId
) AS subjects
FROM customers AS c;


