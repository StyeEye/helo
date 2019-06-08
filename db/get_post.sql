SELECT
  posts.id,
  posts.title,
  posts.img,
  posts.content,
  users.username as authorname,
  users.profile_pic as authorpic
FROM
    posts,
    users
WHERE
    users.id = posts.author_id
    AND posts.id = ${postid};