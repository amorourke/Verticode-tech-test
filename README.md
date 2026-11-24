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

- **Create a project.** The form has a name, description, start date, optional due date and a status select. On submit, the form is replaced by the new project's details page. Cancel returns to the list.
- **Project list.**
  - Projects are grouped into sections: **In progress**, **Not started**, then **Complete**. Each section has a coloured heading and a count, and empty sections are hidden.
  - Within each section, projects are sorted by due date, most urgent first. Projects without a due date go last.
  - Each card shows the name, a two-line description, the due date ("Due 21 Dec 2026"), a status pill and a due date pill.
  - Cards are colour-coded by status, and overdue cards have a red border.
- **Status tiles.** Tiles at the top show the number of projects in each status. Clicking a tile filters the list to that status.
- **Search and due date filter.** Search matches project names, ignoring case. The due date filter offers overdue, due in the next 7 or 30 days, and no due date.
- **Filters are kept in the URL** (e.g. `?status=In+progress&dueDate=overdue`), so they survive opening a project and pressing back, and a filtered view can be shared as a link.
- **Due date pills.** These show "Due in 5 days", "Due tomorrow", "Due today" or "4 days overdue", coloured grey, amber or red by urgency. Completed projects and projects without a due date show no pill.
- **Project details.**
  - The card takes its status colour.
  - Dates are formatted for reading (e.g. "24 November 2026").
  - Edit and delete are icon buttons.
- **Edit a project.** The edit button swaps the details for the same form, pre-filled, with Save and Cancel. Cancel throws away the changes.
- **Status actions.**
  - Not-started projects have a **Start project** button.
  - In-progress projects have **Mark as complete** (the bonus task). It shows an animated confirmation and an **Undo** button.
- **Delete a project.** Asks for confirmation first, then returns to the list.
- **Mock data.** Twelve sample projects cover every case: overdue, due today, due tomorrow, due soon, due in months, complete, and no due date.
- **Accessibility.**
  - Every input has a label.
  - Icon buttons have `aria-label`s.
  - Selected status tiles use `aria-pressed`.
  - Keyboard users get a visible green focus ring (`focus-visible`).


  ### Stretch goal: project tasks

- Projects can have an optional checklist of tasks. Tasks can be added, ticked off and deleted on the details page.
- A progress bar shows how many tasks are done, on both the details page and the list cards.
- **Tasks are optional** (`tasks?: ITask[]`), so existing projects work unchanged. Projects without tasks show no bar.
- **Edits keep tasks.** `ProjectForm` passes `initialValues.tasks` through, so saving a project edit can't wipe its tasks.
- **Task logic lives in pure utils** (`src/utils/tasks.ts`): create, toggle, remove and progress all return new arrays without modifying the original.
- **Status stays manual.** Completing every task doesn't change the project's status, so the user stays in control and Undo still makes sense.

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
- **Logic separated in utils.** Filtering, sorting, due date labels and date formatting are plain functions in `src/utils/`, separate from the components. The date-based ones take an optional `today` parameter, so they can be tested with a fixed date.
- **Status filter moved from a dropdown to tiles.** The status `<select>` was replaced by clickable count tiles, so filtering takes one click instead of two and the counts are visible at a glance.
- **Stacked sections instead of columns.** I considered kanban-style columns, but chose stacked sections so the cards keep a comfortable width.
- **One source for status order and colours.**
  - `STATUS_DISPLAY_ORDER` drives both the sorting and the section order.
  - `src/styles/statusStyles.ts` holds the colours for each status, shared by the list and details pages.
  - Both are typed as `Record<ProjectStatus, …>`, so adding a status without colours is a type error.
- **Sorting copies the array first.** `.sort()` changes an array in place, so `sortProjects` sorts a copy and never modifies props.
- **The Manrope font from the Tailwind config is now applied.** It was defined in the config but never loaded or used.
- **Mark as complete has Undo.** The details page remembers which project was just completed, the same pattern as edit mode, so Undo only appears straight after completing.

### UI screenshots

| Before | After |
|---|---|
| ![Filters before](public/ui_screenshots/filters%20before.png) | ![List page after](public/ui_screenshots/list%20page%20after%20ui%20branch.png) |
| ![Details before](public/ui_screenshots/details%20before.png) | ![Details after](public/ui_screenshots/details%20after.png) |


### Notes

Id generation is inconsistent with created projects and mock projects. Created in app with Date.now().toString(). Task ids are also marked as 1-1, 1-2 but are generated with crypto.randomUUID()