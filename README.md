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

- **Create a project.** The form has a name, description, start date, optional due date and a status select. On submit, the form is replaced by the new project's details page.
- **Project list.** The home page lists every project with its status and links to each one.
- **Project details.** Shows all fields, with dates formatted for reading (e.g. "24 November 2026"). Projects without a due date show "No due date".
- **Edit a project.** "Edit project" swaps the details for the same form, pre-filled, with Save and Cancel. Cancel throws away the changes.
- **Mark as complete** (bonus task). A one-click button on the details page. It is hidden once the project is complete.
- **Delete a project.** Asks for confirmation first, then returns to the list.
- **Mock data.** The app starts with four sample projects so the list and details pages have content straight away.

### Validation

`validateProject` checks that:

- name, description and start date are filled in, ignoring surrounding whitespace
- the due date is not before the start date

Errors appear under each field. The same validation runs when creating and when editing.

### Decisions and changes along the way

- **`id` added to the interface.** This supports multiple projects and per-project URLs. `NewProject` (`Omit<IProject, "id">`) is used for form data before an id is assigned.
- **Status as an enum.** The select options are generated from `ProjectStatus`, so adding a status needs no form changes.
- **Simplified the form.** The form was reduced to plain controlled inputs with shared Tailwind class constants.
- **Navigation.** An "← All projects" back link was added to the form and details pages.
- **Due date wording.** "Due date: No due date" was shortened to "No due date".
- **The edit form reuses `ProjectForm`.** I first implemented a separate draft state in the details page. I then made the existing form take `initialValues`, `submitLabel` and an optional `onCancel`, so creating and editing share one set of fields and one validation path.
- **Edit mode is tied to a project id.** The details page stores *which* project is being edited, not a plain true/false. Moving to another project (for example with the browser's back button) automatically leaves edit mode.
- **Updates create new arrays.** Updating uses `.map()` to replace only the edited project, so React sees new state and re-renders.
- **Dates are parsed as local time.** `formatDate` builds the `Date` from its year, month and day parts `new Date("YYYY-MM-DD")` 

### Possible next steps

-
