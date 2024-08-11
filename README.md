Welcome to [Error Management System (EMS)](https://ems-inky.vercel.app) software
built in NextJs, Mongo DB and Typescript to track system errors. Browse the live
deployment of the application here
[https://ems-inky.vercel.app/](https://ems-inky.vercel.app)

## Feature Overview

It works by allowing software users to log errors encountered and allocate them
to different engineers for resolution.

Engineers are categorised by role from junior engineer to tech lead. Errors are
assigned to users basing on complexity level and work load of the engineer.

Errors logged are labelled by two states as follows:

- Pending. This is the default state of an error. It means the error has not
  been resolved yet.
- Resolved. This is an error that has been addressed to a satisfactory
  conclusion.

Both the users and roles are dynamic and more can be created and deleted at
will. Users self sign up then proceed to complete their profile at the
onboarding stage after which they are redirected to the home page.

A user can have one role at a time and a role can be assumed by multiple users.
An error can be assigned to one user at a go and a user can be assigned many
errors to resolve.

## Getting Started

First, download/clone this repository to your system. Navigate to the root
folder of the project then:

### Setup Environment Variables

Create a .env.local file at the root of the project folder. Clerk is used to
manage user authentication, more about it here
[https://clerk.com](https://clerk.com). Sign-up at clerk to acquire API keys
before filling in the values below.

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=Your_Clerk_Public_Key
CLERK_SECRET_KEY=Your_Clerk_Secret_Key

```

You will also need to signup at
[https://www.mongodb.com/](https://www.mongodb.com/) to host the mongo database
and get the connection string to be filled in below

```bash
MONGO_DB_URL=Your_Mongo_Database_Connection_String

```

For the rest of the evironment variables, use the values provided below as is:

```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

```

Open a terminal at the root folder of the project where package.json and
package-lock.json files are located to execute the commands outlined in the
steps below:

### Step 1

Install project dependencies using npm package manager by executing:

```bash
npm install

```

### Step 2

To start the application in development mode, execute:

```bash
npm run dev

```

To generate a production build, execute:

```bash
npm run build

```

To start the application in production mode, execute the command below after
generating a production build using the previous command above:

```bash
npm run start

```

Both the development and production applications will be served at
[http://localhost:3000](http://localhost:3000). Open the link in your favourite
browser to access the application's graphical user interface.

#### Enjoy the EMS by Johnmark!
