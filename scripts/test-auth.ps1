# This script tests authentication-related functionality in the Fuchsiu Academy platform
# It performs basic API calls to check authentication endpoints

Write-Host "==== Fuchsiu Academy Authentication Test ====" -ForegroundColor Cyan

# Define endpoint URLs (assuming local development server)
$baseUrl = "http://localhost:3000"
$registerUrl = "$baseUrl/api/auth/register"
$csrfUrl = "$baseUrl/api/auth/csrf"

Write-Host "`nStep 1: Checking if development server is running..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $baseUrl -Method GET -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Development server is running" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Development server is not running. Please start it with 'npm run dev'" -ForegroundColor Red
    exit
}

Write-Host "`nStep 2: Testing CSRF token endpoint..." -ForegroundColor Yellow
try {
    $csrfResponse = Invoke-WebRequest -Uri $csrfUrl -Method GET -ErrorAction Stop
    $csrfData = $csrfResponse.Content | ConvertFrom-Json
    if ($csrfData.csrfToken) {
        Write-Host "✅ Successfully retrieved CSRF token" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to get CSRF token" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Failed to access CSRF endpoint: $_" -ForegroundColor Red
}

Write-Host "`nStep 3: Testing admin registration endpoint..." -ForegroundColor Yellow
try {
    $adminUserData = @{
        name = "Test Admin"
        email = "admin-test@fuchsiu-academy.com"
        password = "AdminTest@123"
    }
    
    $form = New-Object System.Collections.Specialized.NameValueCollection
    $adminUserData.GetEnumerator() | ForEach-Object { $form.Add($_.Key, $_.Value) }
    
    $registerResponse = Invoke-WebRequest -Uri $registerUrl -Method POST -Body $form -ErrorAction Stop
    $registerData = $registerResponse.Content | ConvertFrom-Json
    
    if ($registerData.success) {
        Write-Host "✅ Admin user registered or already exists" -ForegroundColor Green
        Write-Host "   User ID: $($registerData.userId)" -ForegroundColor Gray
    } else {
        Write-Host "❌ Failed to register admin user: $($registerData.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Failed to access registration endpoint: $_" -ForegroundColor Red
}

Write-Host "`n==== Authentication Test Complete ====" -ForegroundColor Cyan
Write-Host "To complete testing, manually verify these flows in the browser:" -ForegroundColor Yellow
Write-Host "1. Login with admin credentials (admin@fuchsiu-academy.com / Admin@123)" -ForegroundColor White
Write-Host "2. Verify redirect to admin panel" -ForegroundColor White  
Write-Host "3. Logout and login with student credentials" -ForegroundColor White
Write-Host "4. Verify redirect to student dashboard" -ForegroundColor White
Write-Host "5. Check debug info components in both interfaces" -ForegroundColor White
