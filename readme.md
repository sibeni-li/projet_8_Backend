# Lisa Sibeni Portfolio - Backend

This is the backend server for my portfolio website, handling email functionality for the contact form.

## Features

- Express.js server
- Email sending functionality using Mailjet
- CORS support for cross-origin requests

## Technologies Used

- Node.js (deployed with PM2)
- Express.js
- Mailjet for email services

## Project Structure


```
backend/ 
├── .env 
├── app.js
├── package.json
├── pnpm-lock.yaml
├── readme.md 
└── server.js
```

## Installation

This backend can be deployed to any Linux server (VPS, CSP, ...)

1. Clone the repository:

    ```sh
    git clone https://github.com/sibeni-li/projet_8_Backend.git portfolio-backend
    cd portfolio-backend
    ```

1. Install dependencies:

    ```sh
    pnpm install
    ```

1. Set up environment variables: Create a `.env` file in the root directory and add the following:

    ```
    PORT=your_port 
    MJ_APIKEY_PUBLIC=your_mailjet_public_key
    MJ_APIKEY_PRIVATE=your_mailjet_private_key  
    SENDEREMAIL=your_sender_email@example.com  
    RECEIPTEMAIL=your_receipt_email@example.com  
    ```

1. Start the server:

    ```sh
    npm start
    ```

## Development

To make changes to the project:

1. Modify `app.js` for application logic and route handling.
2. Update `server.js` for server configuration changes.

## API Endpoints

- `POST /send-email`: Sends an email with the contact form data


## Contact

Don't hesitate to open an issue here, use the contact form on the website, or reach out on social media.
