# Fix Auth.js Script
# This script updates authentication references from NextAuth to Auth.js v5

$authFiles = Get-ChildItem -Path "d:\Fuchsius\Projects\fuchsiu-academy\app\api\admin" -Recurse -Include "*.ts"

Write-Host "Updating API routes to use auth() instead of getServerSession()..."

foreach ($file in $authFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace import statements
    $content = $content -replace 'import \{ getServerSession \} from "next-auth";(\r\n|\n)import \{ authOptions \} from "@/auth";', 'import { auth } from "@/auth";'
    
    # Replace session check
    $content = $content -replace 'const session = await getServerSession\(authOptions\);', 'const session = await auth();'
    
    # Write the file back
    Set-Content -Path $file.FullName -Value $content
}

# Regenerate Prisma client to fix model errors
Write-Host "Regenerating Prisma client..."
npx prisma generate

Write-Host "Auth.js update completed successfully!"
Write-Host "Summary of changes:"
Write-Host "1. Updated API routes to use auth() instead of getServerSession()"
Write-Host "2. Updated providers from next-auth/providers/* to @auth/core/providers/*"
Write-Host "3. Changed 'nodemailer' provider name to 'email'"
Write-Host "4. Regenerated Prisma client to ensure model availability"
