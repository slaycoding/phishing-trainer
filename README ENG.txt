Phishing Trainer

An interactive trainer that helps you learn to distinguish between phishing messages and safe ones. 
The project works completely in the browser and does not require the installation of a server part.


The project's goals are:

- To train the skill of recognizing phishing emails and messages.
- To show typical signs of phishing (suspicious links, urgent demands, errors, etc.).

How it works

1. The text of the message (email) is displayed on the screen.
2. The user selects one of the options:
	- "This is phishing" - this is a phishing message;
	- "This is safe" - this is a safe message.
3. The app displays:
	- whether the selection is correct;
	- an explanation of why the message is considered phishing or safe.
4. At the end, the app displays the final statistics:
	- the number of correct answers;
	- the percentage of correct decisions;
	- a list of all tasks with their results.

Technologies

- "HTML" - page structure.
- "CSS" - design, dark theme, and custom fonts.
- "JavaScript" - message switching logic, response validation, and result calculation.
- "GitHub Pages" - static site hosting (launch from a browser link).


Project structure

├── index.html      # Application home page
├── style.css       # Styles (colors, fonts, element layout)
├── script.js       # Trainer logic (questions, validation, results)
└── fonts/          # Local fonts
    └── Gothic60.otf 