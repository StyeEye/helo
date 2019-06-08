module.exports = {
    register: (req, res, next) => {
        const { username, password } = req.body;
        const db = req.app.get("db");

        db.users.insert({
            username: username,
            password: password,
            profile_pic: `https://robohash.org/${username}`
        }).then(response => {
            req.session.userid = response.id;
            res.send({
                username: response.username,
                profile: response.profile_pic,
            });
        }).catch((err) => {
            res.status(401).send(err);
        });
    },
    login: (req, res, next) => {
        const { username, password } = req.body;
        const db = req.app.get("db");

        db.users.findOne({
            username: username,
            password: password
        })
            .then(user => {
                req.session.userid = user.id;
                res.send({
                    username: user.username,
                    profile: user.profile_pic,
                });
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },
    searchPosts: (req, res, next) => {
        const db = req.app.get("db");
        const userid = parseInt(req.session.userid);
        const includeOwn = req.query.userposts.toLowerCase() === 'true';
        const search = decodeURIComponent(req.query.search).toLowerCase();

        db.searchPosts()
            .then(data => {
                //console.log(data);
                const matches = data.filter(e => {
                    if (includeOwn && search)
                        return e.title.includes(search);
                    else if (!includeOwn && !search)
                        return e.authorid !== userid;
                    else if (!includeOwn && search)
                        return e.authorid !== userid && e.title.includes(search);
                    else
                        return true;
                })
                    .map(e => ({
                        title: e.title,
                        author: e.authorname,
                        authorPic: e.profile,
                        postid: e.id
                    }));

                //console.log(matches);
                res.send(matches);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },
    getPost: (req, res, next) => {
        const db = req.app.get("db");
        const postid = parseInt(req.params.postid);
        //console.log(postid);

        db.get_post({
            postid: postid
        })
            .then(post => {
                //console.log(post)
                const data = {
                    title: post[0].title,
                    img: post[0].img,
                    content: post[0].content,
                    author: post[0].authorname,
                    authorPic: post[0].authorpic
                }

                res.send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    },
    createPost: (req, res, next) => {
        const db = req.app.get("db");
        const userid = parseInt(req.session.userid);
        const { title, img, content } = req.body;

        db.posts.insert({
            title: title,
            img: img,
            content: content,
            author_id: userid
        })
            .then(post => {
                res.sendStatus(200);
                //console.log(post)
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },
    logout: (req, res, next) => {
        req.session.destroy();
        res.send("User logged out");
    },
    currentUser: (req, res, next) => {
        const db = req.app.get("db");
        //console.log("Current user:", req.session.userid);
        db.users.findOne({
            id: parseInt(req.session.userid)
        })
            .then(user => {
                res.send({
                    username: user.username,
                    profile: user.profile_pic,
                });
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
};