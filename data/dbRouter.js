const express = require('express');

const Posts = require('./db.js');

const router = express.Router();

// now set the urls that begin with /api/posts

//same as get /api/posts
router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(post => {
            res.status(200).json(post);
            console.log(post);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'this is the get error change later' });
        });
});

//same as post /api/posts will need title and contents keys
router.post('/', (req, res) => {
    const postData = req.body;
    console.log('post data', postData);
    if (!postData.title || !postData.contents) {
        res.status(400).json({ message: 'please provide title and contents for the post' });
    } else {
        Posts.insert(postData)
            .then(post => {
                res.status(201).json(post);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: 'there was an error while saving the post to the database' });
            });
    }
});

//for comments
router.post('/:id/comments', (req, res) => {
    const postData = req.body;
    const id = req.params.id;
    Posts.findById(id)
    if (!postData.text) {
        res.status(400).json({ message: 'please provide text for the comment.' });
    } else {
        Posts.insertComment(postData)
            .then(post => {
                console.log(postData);
                res.status(201).json(post);
            })
            .catch(error => {
                console.log(id, postData, error);
                res.status(500).json({ message: 'unable to post' });
            });
    };
});

//same as get /api/posts/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Posts.findById(id)
        .then(post => {
            if (!id) {
                res.status(404).json({ message: 'could not find post by that id' });
            } else {
                res.status(200).json(post);

            };
        })
        .catch(error => {
            res.status(500).json({ message: 'couldnt find post with that id' });
        });
});

//same as get /api/posts/:id/comments
router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    Posts.findCommentById(id)
        .then(post => {
            console.log('from line 79');
            console.log(id);

            res.status(200).json(post);
        })
        .catch(error => {
            console.log(req.params.id);
            res.status(500).json({ message: ' couldnt find comment with that id' });
        })
})


//same as /api/posts/:id
router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    Posts.update(id, changes)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: 'post not found' });
            } else {
                res.status(200).json(post);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'error updating' });
        });
});


//same as api/posts/:id for delete
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Posts.remove(id)
        .then(post => {
            if (post) {
                res.status(201).json({ message: 'deleted' });
            } else {
                res.status(404).json({ message: 'post not found' });

            };
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'couldnt remove at this time' });
        });
});



module.exports = router;