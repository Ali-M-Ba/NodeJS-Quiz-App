Node.js Quiz API
Overview
The Node.js Quiz API is a dynamic quiz application built using Node.js and Express. It fetches trivia questions from a public API, presents them to the user, and evaluates the user's answers. The app also integrates with the Colormind API to generate color schemes that enhance the user interface.

Features
Color Scheme Generation:

Fetches color schemes from the Colormind API to style the quiz interface.
Quiz Question Handling:

Fetches multiple-choice quiz questions from the Open Trivia Database (OpenTDB) API.
Decodes HTML entities in questions and answers for better readability.
Randomly shuffles answers to make the quiz challenging.
Quiz Evaluation:

Evaluates user answers and provides a score along with a motivational message.
Stores questions, user answers, and session data to ensure a smooth quiz experience.
User Feedback:

Provides a range of personalized messages based on the user's quiz performance.
Technologies Used
Node.js: JavaScript runtime environment.
Express.js: Web framework for Node.js.
Axios: Promise-based HTTP client for the browser and Node.js.
EJS: Templating engine to render dynamic HTML content.
Session Management: Using express-session to handle user sessions.
Getting Started
Prerequisites
Ensure you have the following installed on your local development environment:

Node.js (v14 or later recommended)
npm (comes with Node.js)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/quiz-api.git
cd quiz-api
Install dependencies:

bash
Copy code
npm install
Run the application:

bash
Copy code
npm start
The API should now be running on http://localhost:3000.

API Routes
GET /
Fetches a color scheme from the Colormind API and renders the homepage.
If the request limit to Colormind is exceeded, an error message is displayed.
GET /questions
Fetches 10 multiple-choice questions from the OpenTDB API.
Decodes and shuffles answers before rendering the quiz page.
POST /score
Evaluates user-submitted answers and calculates the score.
Displays the score along with a motivational message.
GET /result
Displays the questions, user answers, and the correct answers after the quiz is completed.
Example Usage
Start the server:

bash
Copy code
npm start
Access the homepage:

Navigate to http://localhost:3000/ to start the quiz.

Take the quiz:

Answer the questions and submit to see your score and receive feedback.

Session Management
Session Timeout:
The session lasts for 20 minutes and resets with each request to keep the user logged in as long as they are active.
Session Storage:
User answers and quiz questions are stored in the session to maintain the quiz state across different routes.
Error Handling
If the API request limit is reached or any other error occurs during data fetching, the app gracefully handles it by displaying an appropriate error message.
Contributing
To contribute:

Fork the repository
Create a new branch (git checkout -b feature-branch)
Commit your changes (git commit -m 'Add new feature')
Push to the branch (git push origin feature-branch)
Open a pull request
License
This project is licensed under the MIT License. See the LICENSE file for more information.

Acknowledgements
Colormind API: Colormind Documentation
Open Trivia Database: OpenTDB Documentation
Express.js: Express Documentation
Node.js: Node.js Documentation
