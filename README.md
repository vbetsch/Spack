<img src="public/img/spack.png" alt="Agilo logo" style="width: 500px;">

Social Network for developpers

## Asserts

-   [Mockup](docs/Maquette.pdf)

## Dependencies

-   [NodeJS](https://nodejs.org/en/download)
-   [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

# MacOS & Linux

## Installation

1. Install dependencies
2. Please run the following command.
    ```bash
    make init
    ```
3. The following message should appear
    > [ OK ] The application is ready to start
4. You should now have the `.env` file created at the root of the project. Modify the information entered so that you can access your database.
    ```dotenv
    VITE_API_KEY="your_api_key"
    VITE_AUTH_DOMAIN="your_auth_domain"
    VITE_PROJECT_ID="your_project_id"
    VITE_STORAGE_BUCKET="your_storage_bucket"
    VITE_MESSAGING_SENDER_ID="your_messaging_sender_id"
    VITE_APP_ID="your_app_id"
    ```

## Getting Started

```bash
make run
```

# Windows

## Installation

1. Install dependencies
2. Install Node modules
    ```bash
    npm install
    ```
3. Copy `.env.example` file from root of the project, paste to same place, fill each field and named it `.env`

    ```dotenv
    VITE_API_KEY="your_api_key"
    VITE_AUTH_DOMAIN="your_auth_domain"
    VITE_PROJECT_ID="your_project_id"
    VITE_STORAGE_BUCKET="your_storage_bucket"
    VITE_MESSAGING_SENDER_ID="your_messaging_sender_id"
    VITE_APP_ID="your_app_id"
    ```

## Getting Started

```bash
npm run dev
```
