const express = require('express');
const {
    getAddArticlePageContent,
    createNewArticle,
} = require('../controllers/articleController');

const router = express.Router();

//GET add article page
router.get('/add', getAddArticlePageContent);

//CREATE a new Article
router.post('/add', createNewArticle);

module.exports = router;