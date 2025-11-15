# YBT Connect Pro

This is a personal brand engagement platform for subscribers, freelancers, and brands, built with Next.js, Firebase, and Tailwind CSS. It provides dedicated portals for different user types to connect and collaborate.

## Features

-   **Subscriber Portal:** A dedicated page for your audience to send messages, feedback, and questions directly.
-   **Freelancer Portal:** A streamlined application form for freelancers to apply for work with detailed skill and experience sections.
-   **Brand Portal:** A professional landing page for brands to submit detailed collaboration and sponsorship inquiries.
-   **Automated Email System:** Instantly sends notification emails for every form submission to the admin and confirmation emails to users.
-   **Modern & Responsive UI:** Built with shadcn/ui and Tailwind CSS, featuring a theme selector for light and dark modes.

## Prerequisites

Before you begin, ensure you have the following installed:
-   **Node.js**: Version 18.x or later
-   **Package Manager**: npm, yarn, or pnpm

## Environment Variables

This project requires environment variables for the email notification system to function. Create a `.env` file in the root of your project and add the following variables:

```.env
# SMTP Configuration for Nodemailer
SMTP_HOST="your-smtp-host.com"
SMTP_PORT=587
SMTP_USER="your-smtp-username"
SMTP_PASS="your-smtp-password"
SMTP_SENDER="sender-email@your-domain.com"
```

Replace the placeholder values with your actual SMTP server details.

## Installation

Follow these steps to get your development environment set up:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

## Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```

2.  **Open your browser:**
    Navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.

## Building for Production

To create a production-ready build of the application, run:
```bash
npm run build
```

This will create an optimized build in the `.next` directory, which can be deployed to any Node.js hosting environment.
