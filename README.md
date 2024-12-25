# Project Overview

This project is a Next.js application that showcases a review list page. The page displays a list of reviews with their authors, titles, ratings, and content. The project utilizes Jest and React Testing Library for testing.

## From developer

I am very grateful for the opportunity to complete the test and appreciate the requirements, yet I dared to make some changes to the project:

1. I used the approach of using the URL as a state manager because it is better to work with during server requests to the backend and it allows users to share links with the current state of the page.
2. I didn't cache data in state manager because Next.js has a built-in cache system that is more efficient and easier to manage.
3. I added a custom hook to fetch authors and cache them in the state manager to reuse them in the AuthorSelect component.
4. I used the features slice pattern to structure the code and make it more modular and easier to maintain.

## Features

* Displays a list of reviews with their details
* Supports pagination
* Includes a link to add new reviews
* Filter reviews by rating and author
* Search reviews by title

## Technologies Used

* Next.js for server-side rendering and static site generation
* React for building the user interface
* Jest and React Testing Library for testing
* TypeScript for type safety and better code maintainability
* DaisyUI for styling
* Zustand for state management
* React Hook Form for form validation
* Zod for schema validation

## Running the Project

To run the project, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install`.
3. Start the development server by running `npm run dev`.
4. Open your web browser and navigate to `http://localhost:3000`.

## Testing the Project

To run the tests, execute the following command in your terminal:

`npm run test` 

This will run all the tests and display the results in your terminal.

