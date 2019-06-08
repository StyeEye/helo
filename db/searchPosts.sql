SELECT
  posts.title,
  posts.id,
  posts.author_id as authorid,
  users.username as authorname,
  users.profile_pic as profile
FROM
  posts
  INNER JOIN users ON users.id = posts.author_id;