@echo off
setlocal
set MSG=%~1
if "%MSG%"=="" set MSG=Team collaboration update on %date% at %time%

echo ========================================================
echo [DharaRevive AI] Syncing and pushing to GitHub...
echo ========================================================

git status
echo.
echo [1/3] Pulling latest changes from teammates...
git pull --rebase origin main

echo.
echo [2/3] Staging and committing changes: "%MSG%"
git add .
git commit -m "%MSG%"

echo.
echo [3/3] Pushing to GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo [SUCCESS] Successfully synced and pushed to GitHub!
    echo ========================================================
) else (
    echo.
    echo [NOTE] If this is your first push, link your remote repository first:
    echo        git remote add origin https://github.com/^<username^>/^<repo^>.git
    echo        git push -u origin main
)
endlocal
