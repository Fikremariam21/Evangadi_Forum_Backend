const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleWare/authMiddleWare");
const { createQuestion, allQuestions, getQuestionDetail, deleteQuestion,updateQuestion } = require("../controller/question");

// use get for getting question detail
router.get('/detail-question/:question_id', authMiddleware, getQuestionDetail); 

// Use POST for creating a new question
router.post("/create-question", authMiddleware, createQuestion); 
// Use POST for updating a question
router.put("/update-question/:question_id", authMiddleware, updateQuestion); 

// Use GET for retrieving all questions
router.get("/all-questions", authMiddleware, allQuestions);
router.delete("/questions/:question_id", authMiddleware, deleteQuestion); 


module.exports = router;


















 