# Check and fix admin user role
Write-Host "Checking admin user role in the database..." -ForegroundColor Cyan
npx ts-node scripts/check-admin-role.ts
