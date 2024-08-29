import express from "express";
import axios from "axios";
import { decode } from 'entities';
import { shuffleArray, evaluateAnswers } from "./functions.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const response = await axios.post('http://colormind.io/api/', {
			model: 'default',
		});
		const results = response.data.result;
		req.session.colors = results;
		
		res.render("index.ejs", { 
			colors: req.session.colors
		});
		
	} catch (error) {
		if (error.response && error.response.status === 429) {
			res.render("index.ejs", {
				error: "Too many requests. Please try again later.",
				colors: req.session.colors
			});
		} else {
			console.error(error);
			res.render("index.ejs", {
				error: "An error occurred while fetching the questions.",
				colors: req.session.colors
			});
		}
	}
});
	
	router.get("/questions", async (req, res) => {
		try {
			const category = req.query.category || "9";
			
			const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`);
			const results = response.data.results;
			results.forEach(question => {
				question.question = decode(question.question);
				question.correct_answer = decode(question.correct_answer);
				question.incorrect_answers = question.incorrect_answers.map(answer => decode(answer));
				const allAnswers = [question.correct_answer, ...question.incorrect_answers];
				question.shuffledAnswers = shuffleArray(allAnswers);
			});
			
			req.session.questions = results;  // Store questions in session
			
			res.render("questions.ejs", {
			data: req.session.questions,
			colors: req.session.colors
			});
		} catch (error) {
			if (error.response && error.response.status === 429) {
				res.render("index.ejs", {
					error: "Too many requests. Please try again later.",
					colors: req.session.colors
				});
			} else {
				console.error(error);
				res.render("index.ejs", {
					error: "An error occurred while fetching the questions.",
					colors: req.session.colors
				});
			}
		}
});

router.post('/score', (req, res) => {
	try {
		if (!req.session.questions) {
			res.render("index.ejs", {
				error: "No questions found in session",
				colors: req.session.colors
			})
		}
		const scoreMessages = [
			"🙌 Fantastic! You're a genius! 10/10! 🧠✨",
			"🎉 Amazing! Almost perfect! 9/10! So close! 🚀",
			"👏 Great job! You really know your stuff! 8/10! Keep it up! 🌟",
			"💪 Well done! You scored 7/10! A solid effort! 🏅",
			"🙂 Nice work! You got 6/10! You're getting there! Keep going! 💡",
			"😎 Not bad! You scored 5/10! Room for improvement, but good job! 🕶️",
			"🤔 You scored 4/10. Not your best, but you've got potential! 📘",
			"😅 You got 3/10. Keep practicing, and you'll do better next time! 🔧",
			"😬 Oops! You scored 2/10. Don’t give up! You can always try again! 🛠️",
			"😢 You scored 1/10. It’s okay, learning is a journey! 📚 Try again!",
			"🥴 God! You scored 0/10. You are a damn dumb! Try again!"
		];
		
		req.session.userAnswers = req.body;
		const userAnswers = req.body;
		const results = req.session.questions;

		
		// return the number of correct, incorrect answers, and the correctAnswers, incorrectAnswers
		const evaluatedAnswers = evaluateAnswers(results, userAnswers);
		
		res.render("score.ejs", {
			data: evaluatedAnswers,
			msg: scoreMessages[results.length - evaluatedAnswers.correct],
			colors: req.session.colors
		});
	} catch (error) {
		console.error(error);
		res.render("index.ejs", {
			error: "No questions found in session",
			colors: req.session.colors
    });
	}
});

router.get("/result", (req, res) => {
	try {
		if (!req.session.questions) {
			res.render("index.ejs", {
				error: "No questions found in session",
				colors: req.session.colors
			})
		}
		
		const userAnswers = req.session.userAnswers;

		res.render("result.ejs", { 
			data: req.session.questions, 
			userAnswers: userAnswers, 
			colors: req.session.colors
		});
	} catch (error) {
		console.error(error);
		res.render("index.ejs", {
      error: "No questions found in session",
			colors: req.session.colors
    });
	}
});

export default router