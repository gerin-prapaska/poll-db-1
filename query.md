```SQL
select sum(id_candidate = (select id from candidate where name like "Olympia%")) as totalVote,
candidate.name
from vote
join candidate
where candidate.id = (select id from candidate where name like "Olympia%");


select name, count(*) as totalVote from candidate join vote on vote.id_candidate = candidate.id where name like "Adam%" group by name;

 select  count(*) as totalVote , name, party, location from candidate join vote on vote.id_candidate = candidate.id group by name order by totalVote DESC limit 3;

 select firstName, lastName, gender, age from voter join vote join candidate on voter.id = vote.id_voter where vote.id_candidate  = (select id from candidate where name = "Olympia Snowe")  limit 4


release 1
 create view grades as select * from candidate where grade_current < 9
 elect name, party, location, count(*) as totalVotes from grades join vote on vote.id_candidate = grades.id group by name order by totalVotes


 release 2
 CREATE VIEW votes AS SELECT candidate.id,candidate.name,COUNT(*) as totalVotes FROM candidate join vote on vote.id_candidate = candidate.id GROUP BY name ORDER BY totalVotes DESC limit 3;

 create view totalthevotes as select votes.totalVote, votes.politicianName, firstName || " " || lastName as voterName, gender from voter join vote join votes on vote.id_voter = voter.id where vote.id_candidate = votes.id group by voterName, gender order by totalVote DESC;

 select totalVote,politicianName,voterName,gender from (select *, row_number() over(partition by politicianName) as rn from totalthevotes) where rn <= 3 order by totalVote DESC;
```
