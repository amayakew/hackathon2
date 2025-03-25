# Formula 1 Race Calendar

My project displays a countdown to the next F1 race, allows users to subscribe and receive email notifications, and shows the full season's race calendar.

## Key Features
- Race data is fetched from a public F1 API.
- The main page displays a countdown to the next race.
- Submitting the subscription form sends a confirmation message to a specified email.
- Emails are sent using the Brevo API.
- Flags are displayed using the Flagpedia API.

To run this project on your computer:
1. Make sure all the packages are installed (npm i)
2. Create .env file in the root of the project with the following variables:
* BREVO_SENDER = <sender email address>
* BREVO_API = <you can ask me for mine>

3. **Start server.js using Node :)**