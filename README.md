
# Speed Typing Test Application

This web application allows users to test and improve their typing speed and accuracy. Users are presented with a random piece of text fetched from a public API, and they have 60 seconds to type it as accurately and quickly as possible. The application provides real-time feedback on typing accuracy, highlights correctly and incorrectly typed characters, and calculates typing speed (words per minute) and word accuracy at the end of the test. User metrics are stored locally for tracking progress over time

- Try the working version --> https://henriits.github.io/typeSpeedTest/


## Features

- Random Text Generation: Fetches a random piece of text from a public API or a custom collection of English words or text pieces in JSON format.
- Timer: Initiates a 60-second timer when the user starts typing.
- Real-time Feedback: Highlights correctly and incorrectly typed characters in shades of green and red, respectively.
- Current Word Highlighting: Highlights the current word being typed or displays it in a separate area for better focus.
- Backspace Support: Allows users to use the backspace key to undo typed characters.
- Metrics Calculation: Calculates and displays typing speed (WPM) and word accuracy (%) at the end of the test, excluding incorrectly typed words.
- Reset and Restart: Allows users to reset the test and start again with a new piece of text. Supports using the "Enter" key for restarting the current test and the "Esc" key for resetting the test completely and showing a new text prompt.
- User Progress Tracking: Stores and retrieves user metrics (speed and accuracy) using local storage.
- Visual Representation of Progress: Displays user metrics over time in a visually appealing way, such as a table or a chart.
- Improvement Indication: Indicates whether the user has improved over their previous attempts after each test.
- Modular Code Structure: Organizes code using module imports and exports for better maintainability and scalability.
- DOM Interaction: Interacts with DOM elements for displaying text, user input, and results. Utilizes event listeners for user interactions.
- Error Handling: Displays errors for failed API requests and other potential issues.
- Customizable: Structured code allows for easy modification of key features without the need to know the entire codebase.


## Usage



- Open the application in a web browser. 
- Start typing the presented text as accurately and quickly as possible.
- Use the backspace key to correct any errors.
- After 60 seconds, the application will display your typing speed (WPM) and word accuracy (%).
- Use the reset button to start a new test with a different piece of text, or use the "Enter" key to restart the current test and the "Esc" key to reset the test completely.
- Your progress will be tracked and displayed over time.