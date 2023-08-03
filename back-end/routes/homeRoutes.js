const express = require('express');
const {
    getAllArticle,
    deleteArticle,
    getSingleArticle,
    updateArticle
} = require('../controllers/articleController');

const router = express.Router();

//GET all the articles
router.get('/', getAllArticle);

//GET single article
router.get("/post/:id", getSingleArticle)

//GET single article
router.get("/update/:id", getSingleArticle)

//UPDATE single article
router.patch("/update/:id", updateArticle)

//DELETE a Article
router.delete('/:id', deleteArticle);

module.exports = router;