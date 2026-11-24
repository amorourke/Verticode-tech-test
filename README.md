# Verticode Take-Home Task

This project is a front-end only react typescript application. The objective and requirements are outlined below.

## Objective

Your task is to build a form to set up a project in a project management platform, then display that information on a project details page. You should design a typescript interface for the project data and place it in src/models/Project.ts.

Your form should allow the user to set up a project, and should include at a minimum the project name, description, and start date.

Once the user has submitted the form the application should display the information they entered in a project details page.

As a bonus task you can also add a status to the form and allow the user to mark the project as complete from the project details page.

This task is front end only, which means you don't need a database and don't need to store or persist the data.

## Typescript

This task uses typescript. You can find information about the basics of typescript and a typescript cheat sheet below.

https://www.typescriptlang.org/docs/handbook/2/basic-types.html

https://devhints.io/typescript

## Project Requirements

- **Styling**: This project uses TailwindCSS. While we recommend using TailwindCSS to style your components, you're welcome to use any styling approach you're comfortable with.
- **Code Quality**: Aim for clean, maintainable, and efficient code. Your approach to solving the tasks should reflect best practices in software development.
- **React Components**: Develop a form to capture project information and a details page to display it
  
  - The form should include **at least one select field**, **one date field**, and implement **some level of form validation**.
  - Upon form submission, hide the form and display the project details.

## Running the Application

1. Install the necessary packages using:
   ```
   npm install
   ```
2. To start the application, run:
   ```
   npm run start
   ```

## Submission Guidelines

- **Code Organization**: Ensure your code is well-organized and documented where necessary.
- **Git Repository**: Initialize a git repository in your project directory, commit your changes as you would in a real project environment. It's important to include the `.git` folder with your submission.
- **Submit Your Work**: Once completed, zip the source code (excluding any `build` files and `node_modules`) and return it following the instructions provided by the recruiting team.

## Evaluation Criteria

These criteria are designed to reflect our company's everyday work style.

1. **Functionality**: The application works as described.
2. **UI/UX Design**: The application should be user-friendly and visually appealing.
3. **Code Quality**: Code readability, maintainability, and efficiency.

---

## Implementation (Adele)

### Features

- **Create, edit and delete projects.** One shared form for create and edit, with validation. Delete asks for confirmation.
- **Project list**
  - Grouped into **In progress**, **Not started** and **Complete**, each sorted by due date.
  - Cards are colour-coded by status, and overdue cards have a red border.
  - Each section shows 3 cards, with a faded preview of the rest and a **Show all** button.
- **Filtering:** status count tiles, name search and a due date filter, all kept in the URL.
- **Due date pills:** "Due in 5 days", "Due today", "4 days overdue" and so on, coloured by urgency.
- **Project details:** status-coloured card, readable dates, and icon buttons for edit and delete.
- **Status actions:** **Start project**, and **Mark as complete** (the bonus task) with an animated confirmation and **Undo**.
- **Accessibility:** labelled inputs, `aria` attributes on icon buttons and toggles, and keyboard focus rings.

### Stretch goal: project tasks and completion bar!

- An optional checklist on each project: add, tick off and delete tasks.
- A progress bar on the details page and the list cards.
- `tasks` is optional, so existing projects work unchanged.
- `ProjectForm` passes tasks through, so editing a project doesn't wipe them.
- Status stays manual: finishing every task doesn't complete the project.

### Validation

- Name, description and start date are required.
- The due date can't be before the start date.
- Due date is optional

### Key decisions

- **Logic in utils** (`src/utils/`): filtering, sorting, dates and tasks are separate from the components. 
- **One source for status order and colours:** `STATUS_DISPLAY_ORDER` and `styles/statusStyles.ts`, typed as `Record<ProjectStatus, …>` so a missing status is a type error.
- **Immutable updates:** state is always replaced with new arrays and objects, never modified.
- **Status tiles instead of a dropdown:** one click to filter, and the counts are visible.
- I decided on **stacked sections instead of kanban columns,** so the cards stay readable.
- **Edit mode and Undo are tied to a project id** so they reset when you move to another project.
- **One `renderCard` function** renders both the real cards and the faded preview. The preview is hidden from screen readers and can't be focused.

### UI screenshots

| Before | After |
|---|---|
| ![Filters before](public/ui_screenshots/filters%20before.png) | ![List page after](public/ui_screenshots/list%20page%20after%20ui%20branch.png) |
| ![Details before](public/ui_screenshots/details%20before.png) | ![Details after](public/ui_screenshots/details%20after.png) |


### Final Project List
![List Final](public/ui_screenshots/final%20list%20projects.png)

### Considerations and future

- **Id formats differ.** Mock data uses readable ids (`"1"`, `"1-1"`); the app uses `Date.now()` for projects and `crypto.randomUUID()` for tasks. Ids are only compared for equality, so this doesn't affect behaviour.
- Date helpers are overlapping and could be collected into one util. 
- Styling the delete popup rather than having it drawn by the browser.