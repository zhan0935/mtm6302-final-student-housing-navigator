# Student Housing Navigator

A Vanilla JavaScript final project designed to help students search, compare, and save off-campus housing options in a simple and student-friendly web app.

## Project Overview

Student Housing Navigator is a multi-page housing discovery website built with HTML, CSS, and Vanilla JavaScript. The project focuses on features that are especially useful for students, such as filtering by school, commute distance, furnished options, utilities included, and saving favorite residences for later review.

The goal of this project is to create a complete front-end web application that demonstrates DOM manipulation, event handling, forms, data handling, local storage, and user interaction design.

## Pages Included

- **Home** – search, filtering, sorting, featured listing, and residence cards
- **Detail** – full residence information, gallery, amenities, commute details, and review form
- **Compare** – side-by-side comparison of up to 2 saved residences
- **Profile / Dashboard** – favorites, compare list, recently viewed items, and student preference settings

## Features

- Search by school name
- 5 km and 10 km radius filtering
- Sorting by price, distance, and rating
- Student-focused filters:
  - Furnished
  - No deposit
  - Utilities included
  - Pets allowed
- Save favorites with localStorage
- Compare up to 2 residences
- Residence detail page with:
  - gallery
  - amenities
  - student score
  - nearby places
  - commute information
- Student review form with localStorage-based review saving
- Dashboard showing:
  - favorites
  - compare list
  - recently viewed residences
  - profile and housing preference summary
- Shared header search that redirects users back to the home page search flow

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- localStorage

## Data and Storage

This project uses local static data instead of a live API.

User interactions are stored in the browser using localStorage, including:

- favorites
- compare selections
- recently viewed residences
- user-added reviews

This allows the project to simulate real app behavior without requiring a backend.

## Development Notes

- Built as a multi-page front-end application using only Vanilla JavaScript
- Used JavaScript array methods and DOM rendering for filtering and sorting
- Used event listeners for search, form submission, compare, favorites, and review interactions
- Used localStorage to persist user actions across pages
- Organized the project into separate files for each page script:
  - `main.js`
  - `detail.js`
  - `compare.js`
  - `profile.js`

## How to Run

1. Open the project folder in VS Code.
2. Run the project with Live Server.
3. Open `index.html`.
4. Use the navigation bar to browse between pages.

## Repository Contents

The repository includes:

- source code
- README
- project assets
- prototypes / mockups (image or PDF, if included in the repository)

## Notes

- This version uses static data for listing content.
- The project is focused on front-end interaction and user experience.
- The design is optimized to feel like a student-friendly housing app.

## Author

Final Project – Student Housing Navigator