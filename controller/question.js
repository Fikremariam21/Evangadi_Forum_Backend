// const { StatusCodes } = require("http-status-codes"); 
// const { v4: uuidv4 } = require('uuid');
// const dbConnection = require('../db/config');

// async function createQuestion(req, res) {
//     const { title, user_id, question_description, tag } = req.body;  

//     if (!title || !question_description || !user_id || !tag) {
//         return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please enter all information fully" });
//     }
   
//     const question_id = uuidv4(); 
//     try {
//         const data = "INSERT INTO questionTable (question_id, user_id, title, question_description, tag) VALUES (?,?,?,?,?)"; 
//         const [result] = await dbConnection.query(data, [question_id, user_id, title, question_description, tag]); 

//         return res.status(StatusCodes.CREATED).json({ msg: "Question created successfully", question_id: result.insertId });
//     } catch (error) {
//         console.error("Error creating question:", error.message);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
//     }
// }


// async function allQuestions(req, res) {
//     try {
//         const questionData = `SELECT questionTable.*, userTable.user_name 
//                               FROM questionTable 
//                               JOIN userTable ON questionTable.user_id = userTable.user_id 
//                               ORDER BY questionTable.id DESC`;
//         const [result] = await dbConnection.query(questionData); 

//         if (result.length > 0) {
//             return res.status(StatusCodes.OK).json({ result: result });
//         } else {
//             return res.status(StatusCodes.NOT_FOUND).json({ msg: "No questions found" });
//         }
//     } catch (error) {
//         console.error("Error fetching questions:", error);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
//     }
// }

// async function getQuestionDetail(req, res) {
//     const question_id = req.params.question_id;

//     try {
//         const getQuestion = "SELECT * FROM questionTable WHERE question_id = ?"; 
//         const [result] = await dbConnection.query(getQuestion, [question_id]);

//         if (result.length > 0) { 
//             return res.status(StatusCodes.OK).json({ result: result });
//         } else {
//             return res.status(StatusCodes.NOT_FOUND).json({ msg: "Question not found" });
//         }
//     } catch (error) {
//         console.error("Error fetching question detail:", error);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
//     }
// }

// async function deleteQuestion(req, res) {
// 	const { question_id } = req.params;

// 	if (!question_id) {
// 		return res
// 			.status(StatusCodes.BAD_REQUEST)
// 			.json({ msg: "Please provide question ID" });
// 	}

// 	try {
// 		const query = "DELETE FROM questionTable WHERE question_id=?";
// 		const [result] = await dbConnection.query(query, [question_id]);

// 		if (result.affectedRows > 0) {
// 			return res
// 				.status(StatusCodes.OK)
// 				.json({ msg: "Question deleted successfully" });
// 		} else {
// 			return res
// 				.status(StatusCodes.NOT_FOUND)
// 				.json({ msg: "Question not found" });
// 		}
// 	} catch (error) {
// 		console.error("Error deleting question:", error);
// 		return res
// 			.status(StatusCodes.INTERNAL_SERVER_ERROR)
// 			.json({ msg: "Something went wrong" });
// 	}
// }

// async function updateQuestion(req, res) {
// 	const {title, question_description, tag } = req.body;
//     const {question_id} = req.params;  // Get question_id from URL parameters

// 	if (!question_id || !title || !question_description || !tag) {
// 		return res
// 			.status(StatusCodes.BAD_REQUEST)
// 			.json({ msg: "Please provide all required information" });
// 	}

// 	try {
// 		const query =
// 			"UPDATE questionTable SET title=?, question_description=?, tag=? WHERE question_id=?";
// 		const [result] = await dbConnection.query(query, [
// 			title,
// 			question_description,
// 			tag,
// 			question_id,
// 		]);

// 		if (result.affectedRows > 0) {
// 			return res
// 				.status(StatusCodes.OK)
// 				.json({ msg: "Question updated successfully" });
// 		} else {
// 			return res
// 				.status(StatusCodes.NOT_FOUND)
// 				.json({ msg: "Question not found" });
// 		}
// 	} catch (error) {
// 		console.error("Error updating question:", error);
// 		return res
// 			.status(StatusCodes.INTERNAL_SERVER_ERROR)
// 			.json({ msg: "Something went wrong" });
// 	}
// }


// module.exports = {
//     createQuestion,
//     allQuestions,
//     getQuestionDetail,
//     deleteQuestion,
//     updateQuestion
// }




const { StatusCodes } = require("http-status-codes"); 
const { v4: uuidv4 } = require('uuid');
const dbConnection = require('../db/config');

async function createQuestion(req, res) {
    const { title, user_id, question_description, tag } = req.body;  

    if (!title || !question_description || !user_id || !tag) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please enter all information fully" });
    }
   
    const question_id = uuidv4(); 
    try {
        const data = "INSERT INTO questionTable (question_id, user_id, title, question_description, tag) VALUES (?,?,?,?,?)"; 
        const [result] = await dbConnection.query(data, [question_id, user_id, title, question_description, tag]); 

        return res.status(StatusCodes.CREATED).json({ msg: "Question created successfully", question_id: result.insertId });
    } catch (error) {
        console.error("Error creating question:", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    }
}


async function allQuestions(req, res) {
    try {
        const questionData = `SELECT questionTable.*, userTable.user_name 
                              FROM questionTable 
                              JOIN userTable ON questionTable.user_id = userTable.user_id 
                              ORDER BY questionTable.id DESC`;
        const [result] = await dbConnection.query(questionData); 

        if (result.length > 0) {
            return res.status(StatusCodes.OK).json({ result: result });
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "No questions found" });
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    }
}

async function getQuestionDetail(req, res) {
    const question_id = req.params.question_id;

    try {
        const getQuestion = "SELECT * FROM questionTable WHERE question_id = ?"; 
        const [result] = await dbConnection.query(getQuestion, [question_id]);

        if (result.length > 0) { 
            return res.status(StatusCodes.OK).json({ result: result });
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Question not found" });
        }
    } catch (error) {
        console.error("Error fetching question detail:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    }
}

async function deleteQuestion(req, res) {
	const { question_id } = req.params;

	if (!question_id) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Please provide question ID" });
	}

	try {
		const query = "DELETE FROM questionTable WHERE question_id=?";
		const [result] = await dbConnection.query(query, [question_id]);

		if (result.affectedRows > 0) {
			return res
				.status(StatusCodes.OK)
				.json({ msg: "Question deleted successfully" });
		} else {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ msg: "Question not found" });
		}
	} catch (error) {
		console.error("Error deleting question:", error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong" });
	}
}

async function updateQuestion(req, res) {
	const {title, question_description, tag } = req.body;
    const {question_id} = req.params;  // Get question_id from URL parameters

	if (!question_id || !title || !question_description || !tag) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Please provide all required information" });
	}

	try {
		const query =
			"UPDATE questionTable SET title=?, question_description=?, tag=? WHERE question_id=?";
		const [result] = await dbConnection.query(query, [
			title,
			question_description,
			tag,
			question_id,
		]);

		if (result.affectedRows > 0) {
			return res
				.status(StatusCodes.OK)
				.json({ msg: "Question updated successfully" });
		} else {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ msg: "Question not found" });
		}
	} catch (error) {
		console.error("Error updating question:", error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong" });
	}
}

module.exports = {
    createQuestion,
    allQuestions,
    getQuestionDetail,
    deleteQuestion,
    updateQuestion
}
