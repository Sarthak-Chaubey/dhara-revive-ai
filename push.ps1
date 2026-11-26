# push.ps1 - Automated GitHub Sync & Push for Team Collaborators
param(
    [string]$Message = ""
)

if ([string]::IsNullOrWhiteSpace($Message)) {
    $Message = "Team update on $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
}

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " [DharaRevive AI] Syncing and Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

# Step 1: Pull latest updates from teammates
Write-Host "`n[1/3] Pulling latest changes from teammates to avoid conflicts..." -ForegroundColor Yellow
git pull --rebase origin main

# Step 2: Stage and commit
Write-Host "`n[2/3] Staging all files and committing: `"$Message`"" -ForegroundColor Yellow
git add .
git commit -m "$Message"

# Step 3: Push
Write-Host "`n[3/3] Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n========================================================" -ForegroundColor Green
    Write-Host " [SUCCESS] Pushed to GitHub successfully! Teammates can now pull." -ForegroundColor Green
    Write-Host "========================================================" -ForegroundColor Green
} else {
    Write-Host "`n[NOTE] If remote is not yet linked, run:" -ForegroundColor Red
    Write-Host "  git remote add origin https://github.com/<username>/<repo>.git" -ForegroundColor White
    Write-Host "  git push -u origin main" -ForegroundColor White
}
