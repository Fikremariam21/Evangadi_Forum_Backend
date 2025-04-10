const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleWare/authMiddleWare");
const { createAnswer, GetAnswersByQuestionId } = require("../controller/answer");

router.post("/answers/create", authMiddleware, createAnswer); 
router.get('/answers/all/:question_id', authMiddleware, GetAnswersByQuestionId);

module.exports = router;






