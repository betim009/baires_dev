const express = require("express");
const router = express.Router();
let db = require("./database.js");

router.get("/posts", (req, res, next) => {
    const sql = "SELECT * FROM post";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

router.get("/posts/:id", (req, res, next) => {
    const sql = "SELECT * FROM post WHERE id = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: "Not found" });
            return;
        }

        const likesSql = "SELECT COUNT(*) as likes FROM likes WHERE postid = ?";
        db.get(likesSql, params, (err, likesRow) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            const commentsSql = "SELECT comment, name FROM comments JOIN user ON comments.userid = user.id WHERE postid = ?";
            db.all(commentsSql, params, (err, commentsRows) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }

                res.json({
                    message: "success",
                    data: {
                        ...row,
                        likes: likesRow.likes || 0,
                        comments: commentsRows || []
                    }
                });
            });
        });
    });
});

router.post('/posts', (req, res, next) => {
    const { image, description } = req.body;
    const sql = "INSERT INTO post (image, description, user, createdAt) VALUES (?, ?, ?, ?)";
    const params = [image, description, 1, new Date().toISOString()];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success"
        });
    });
});

router.put('/posts/:id', (req, res, next) => {
    const { image, description } = req.body;
    const sql = "UPDATE post SET image = ?, description = ? WHERE id = ?";
    const params = [image, description, req.params.id];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success"
        });
    });
});

router.delete('/posts/:id', (req, res, next) => {
    const sql = "DELETE FROM post WHERE id = ?";
    const params = [req.params.id];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "deleted"
        });
    });
});

router.post('/follow/:id', (req, res, next) => {
    const sql = "INSERT INTO follows (from_user, to_user) VALUES (?, ?)";
    const params = [1, req.params.id];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success"
        });
    });
});

router.post('/unfollow/:id', (req, res, next) => {
    const sql = "DELETE FROM follows WHERE from_user = ? AND to_user = ?";
    const params = [1, req.params.id];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success"
        });
    });
});


router.get('/user/:id', (req, res, next) => {
    const sql = "SELECT * FROM user WHERE id = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: "Not found" });
            return;
        }

        const followersSql = "SELECT COUNT(*) as followers FROM follows WHERE to_user = ?";
        const followingSql = "SELECT COUNT(*) as follows FROM follows WHERE from_user = ?";

        db.get(followersSql, params, (err, followersRow) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            db.get(followingSql, params, (err, followingRow) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }

                res.json({
                    message: "success",
                    data: {
                        ...row,
                        followers: followersRow.followers || 0,
                        follows: followingRow.follows || 0
                    }
                });
            });
        });
    });
});


router.post('/like/:id', (req, res, next) => {
    const sql = "INSERT INTO likes (userid, postid) VALUES (?, ?)";
    const params = [1, req.params.id];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success"
        });
    });
});

router.post('/unlike/:id', (req, res, next) => {
    const sql = "DELETE FROM likes WHERE userid = ? AND postid = ?";
    const params = [1, req.params.id];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success"
        });
    });
});


router.post('/comment/:id', (req, res, next) => {
    const { comment } = req.body;
    const sql = "INSERT INTO comments (comment, userid, postid) VALUES (?, ?, ?)";
    const params = [comment, 1, req.params.id];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success"
        });
    });
});


module.exports = router;