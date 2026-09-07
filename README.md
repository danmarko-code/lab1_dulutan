# Developer Portfolio - Git Workflow

This repository contains my personal portfolio website, built with HTML, CSS, and JavaScript. 
It demonstrates branching by maintaining a raw HTML version and a fully styled interactive version.

## Step-by-Step Git Commands Used

Here are the Git commands I used to manage this project locally:

### 1. Configure Git Identity
Set up my name and email for the commits:
```bash
git config --global user.name "Dan Marko Dulutan"
git config --global user.email "your-email@example.com"
```

### 2. Initialize the Repository
Initialize the folder as a Git repository and set the default branch to `main`:
```bash
git init -b main
```

### 3. Stage and Commit Initial HTML
Save the first snapshot of the pure HTML file:
```bash
git add index.html
git commit -m "feat: initial semantic html portfolio structure"
```

### 4. Create the `no-style` Branch
Create a separate branch to permanently preserve the raw HTML version:
```bash
git branch no-style
```

### 5. Work on `main` (CSS & JS)
After adding `style.css` and `script.js`, stage and commit all the new files to `main`:
```bash
git add .
git commit -m "feat: finalize 6 projects, 8 animations, and responsive styling"
```

### 6. Checking Status
Verify what files are changed or staged:
```bash
git status
git diff --staged
```

### 7. Switching Between Branches
To view the raw HTML version:
```bash
git switch no-style
```
To return to the fully styled and animated version:
```bash
git switch main
```
