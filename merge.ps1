git add .
git commit -m "docs: update repository name and links to shadcn-modern-date-picker"
git remote add origin https://github.com/sunderlldev/shadcn-modern-date-picker.git
git fetch
git merge origin/main --allow-unrelated-histories -m "chore: merge LICENSE from remote repository"
