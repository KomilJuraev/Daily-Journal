const Article = require('../models/articleModel');
const mongoose = require('mongoose');

const getAllArticle = async (req, res) => {
    try {
        const allArticle = await Article.find().sort({ createdAt: -1 });
        res.status(200).json(allArticle);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from the database" });
    }
};

const getSingleArticle = async (req, res) => {
    console.log("id", req.params.id);
    try {
        const singleArticle = await Article.findOne({ _id: req.params.id }).sort({ createdAt: -1 });
        console.log(singleArticle.title)
        res.status(200).json(singleArticle);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from the database" });
    }
};

const updateArticle = async (req, res) => {
    console.log("id", req.params.id);
    try {
        const updatedArticle = await Article.findOneAndUpdate(
            { _id: req.params.id },
            {
                title: req.body.newTitle,
                content: req.body.newContent
            },
            { new: true } // Set new to true to get the updated article as the result
            ).sort({ createdAt: -1 });
        console.log(updatedArticle);
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ error: "Error updating data in the database" });
    }
};

const getAddArticlePageContent = async (req, res) => {
    try {
        await res.send("Hello Add");
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from the database" });
    }
};

const createNewArticle = (req, res) => {
    console.log("post body from react " + req.body.newTitle + " body " + req.body.newContent)
    const article = new Article({
        title: req.body.newTitle,
        content: req.body.newContent
    })
    article.save()
        .then(function () {
            res.send({ success: true, message: 'Successfully submitted' });
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error saving article' });
        });

};

const deleteArticle = async (req, res) => {
    await Article.findOneAndDelete({ _id: req.params.id }).then(() => {
        res.send('Successfully deleted')
    }).catch((err => {
        console.log(err);
    }))
}

module.exports = {
    getAllArticle,
    getAddArticlePageContent,
    createNewArticle,
    deleteArticle,
    getSingleArticle,
    updateArticle
};
