Welcome to [Error Management System (EMS)](https://nextjs.org/) developed by
Johnmark. This project is build on NextJs, Mongo DB and Typescript. Below are
simple instructions to get you setup and running.

## Getting Started

First, download/clone this repository to your system. Navigate to the root
folder of the project then:

### Setup Environment Variables

Create a .env.local file at the root of the project folder with the following
compulsory keys. Read more about Clerk user management API here
[https://clerk.com](https://clerk.com). For the values of the keys below, use
your own:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="--- Your Clerk Public Key ---"
CLERK_SECRET_KEY="--- Your Clerk Secret Key ---"
MONGO_DB_URL="--- Your Mongo Database Connection String ---"

```

For the rest of the evironment variables below, use the values provided below as
is:

```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

```

#### I wish you all the best!

On the terminal, run the following steps:

### Step 1

Install npm packages by running:

```bash
npm install

```

### Step 2

To start the development server, run:

```bash
npm run dev

```

### Step 3

To generate a production build, run:

```bash
npm run build

```

### Step 4

To start the production build, run:

```bash
npm run start

```

The development and production builds will be served at
[http://localhost:3000](http://localhost:3000). Open the link with your
favourite browser to access the application.
