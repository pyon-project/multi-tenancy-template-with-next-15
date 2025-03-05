#!/bin/bash

# Prompt the user for site information
read -p "Enter the site name (e.g. store, board, trade): " sitename
read -p "Enter a port number for the new site to run on: " port
read -p "Enter a brief description for the site: " description
read -p "Enter a color for the site link (e.g. red, yellow, pink): " color

# Ensure a site name is provided
if [[ -z "$sitename" ]]; then
    echo "Error: No site name provided."
    exit 1
fi

# Ensure a port number is provided
if [[ -z "$port" ]]; then
    echo "Error: No port number provided."
    exit 1
fi

# Default color if not provided
if [[ -z "$color" ]]; then
    color="indigo"
fi

# Convert site name to lowercase
sitename=$(echo "$sitename" | tr '[:upper:]' '[:lower:]')
# Capitalize first letter for display name
display_name="$(tr '[:lower:]' '[:upper:]' <<< ${sitename:0:1})${sitename:1}"
# Convert site name to uppercase for environment variables
sitename_upper=$(echo "$sitename" | tr '[:lower:]' '[:upper:]')

echo "Creating new site: $sitename (Port: $port)"
echo "-----------------------------------"

# 1. Create environment files
echo "Creating environment files..."

# Create main env file (simpler version for development)
envFilePath=".env.${sitename}"
cat <<EOL > "$envFilePath"
NEXT_PUBLIC_APP_NAME=$display_name
NEXT_PUBLIC_API_URL=https://api.$sitename.localhost:3000

# ${display_name}-specific variables
${sitename_upper}_WEBSOCKET_URL=wss://ws.$sitename.localhost:3000
${sitename_upper}_API_KEY=your_${sitename}_api_key_here
${sitename_upper}_API_SECRET=your_${sitename}_api_secret_here
EOL

# Create example env file (more comprehensive for documentation)
cat <<EOL > "$envFilePath.example"
# App Configuration
NEXT_PUBLIC_APP_NAME=$display_name
NEXT_PUBLIC_API_URL=https://api.$sitename.yourdomain.com

# ${display_name}-specific variables
${sitename_upper}_WEBSOCKET_URL=wss://ws.$sitename.yourdomain.com
${sitename_upper}_API_KEY=your_${sitename}_api_key_here
${sitename_upper}_API_SECRET=your_${sitename}_api_secret_here

# Service Configuration
${sitename_upper}_MAX_USERS=100
${sitename_upper}_STORAGE_PROVIDER=s3

# Storage Configuration
${sitename_upper}_S3_BUCKET=your-${sitename}-bucket
${sitename_upper}_S3_REGION=us-east-1
${sitename_upper}_AWS_ACCESS_KEY=your_aws_access_key
${sitename_upper}_AWS_SECRET_KEY=your_aws_secret_key
EOL

echo "✅ Environment files created successfully!"

# 2. Update middleware.ts to include the new site
echo "Updating middleware configuration..."

middlewarePath="src/middleware.ts"

# Create temporary files for the updates
middlewareTmp=$(mktemp)

# Read the middleware file
cat "$middlewarePath" > "$middlewareTmp"

# Check if the site is already in the SiteConfigs type
if ! grep -q "${sitename}: SiteConfig;" "$middlewareTmp"; then
    # Find the line with "type SiteConfigs = {"
    typeLineNum=$(grep -n "type SiteConfigs = {" "$middlewareTmp" | cut -d: -f1)
    
    # Create a new file with the updated content
    head -n "$typeLineNum" "$middlewareTmp" > "$middlewarePath"
    echo "  ${sitename}: SiteConfig;" >> "$middlewarePath"
    tail -n +$((typeLineNum + 1)) "$middlewareTmp" >> "$middlewarePath"
    
    # Update the temporary file for the next operation
    cat "$middlewarePath" > "$middlewareTmp"
fi

# Check if the site is already in the SITE_CONFIGS object
if ! grep -q "${sitename}: {" "$middlewareTmp"; then
    # Find the line with "const SITE_CONFIGS: SiteConfigs = {"
    configLineNum=$(grep -n "const SITE_CONFIGS: SiteConfigs = {" "$middlewareTmp" | cut -d: -f1)
    
    # Create a new file with the updated content
    head -n "$configLineNum" "$middlewareTmp" > "$middlewarePath"
    echo "  ${sitename}: {" >> "$middlewarePath"
    echo "    hostname: \`${sitename}.\${process.env.NEXT_PUBLIC_ROOT_DOMAIN}\`," >> "$middlewarePath"
    echo "    basePath: \"/${sitename}\"," >> "$middlewarePath"
    echo "    port: ${port}," >> "$middlewarePath"
    echo "  }," >> "$middlewarePath"
    tail -n +$((configLineNum + 1)) "$middlewareTmp" >> "$middlewarePath"
fi

# Clean up temporary file
rm "$middlewareTmp"

echo "✅ Middleware configuration updated!"

# 3. Update home/page.tsx to include the new site in the links array
echo "Updating home page links..."

homePagePath="src/app/home/page.tsx"
homePageTmp=$(mktemp)

# Read the home page file
cat "$homePagePath" > "$homePageTmp"

# Check if the site is already in the links array
if ! grep -q "name: \"$display_name\"," "$homePageTmp"; then
    # Find the line with "const links = ["
    linksLineNum=$(grep -n "const links = \[" "$homePageTmp" | cut -d: -f1)
    
    # Create a new file with the updated content
    head -n "$linksLineNum" "$homePageTmp" > "$homePagePath"
    echo "    {" >> "$homePagePath"
    echo "      name: \"$display_name\"," >> "$homePagePath"
    echo "      href: isDevelopment" >> "$homePagePath"
    echo "        ? \"http://localhost:$port\"" >> "$homePagePath"
    echo "        : \"https://$sitename.yourdomain.com\"," >> "$homePagePath"
    echo "      className: \"bg-$color-500 hover:bg-$color-600\"," >> "$homePagePath"
    echo "    }," >> "$homePagePath"
    tail -n +$((linksLineNum + 1)) "$homePageTmp" >> "$homePagePath"
fi

# Clean up temporary file
rm "$homePageTmp"

echo "✅ Home page links updated!"

# 4. Create site-specific directory and page.tsx
echo "Creating site directory and page..."

# Create main site directory
mkdir -p "src/app/$sitename"

# Create page.tsx for the site
cat <<EOL > "src/app/$sitename/page.tsx"
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "$display_name Platform",
  description: "$description",
};

export default function Page() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">$display_name Platform</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-4">
          Welcome to the $display_name platform. $description
        </p>
        <div className="grid gap-4 mt-6">
          <div className="bg-$color-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-$color-500 text-white rounded hover:bg-$color-600">
                Action Button
              </button>
              <button className="px-4 py-2 bg-$color-500 text-white rounded hover:bg-$color-600">
                Another Action
              </button>
            </div>
          </div>
          <div className="bg-$color-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-600">
              This is the $sitename platform running on port $port.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
EOL

echo "✅ Site page created successfully!"

# 5. Update package.json with new scripts
echo "Updating package.json with new scripts..."

packagePath="package.json"
packageTmp=$(mktemp)

# Read the package.json file
cat "$packagePath" > "$packageTmp"

# Check if the scripts already exist
if ! grep -q "\"dev:$sitename\":" "$packageTmp"; then
    # Find the line with "scripts": {
    scriptsLineNum=$(grep -n "\"scripts\": {" "$packageTmp" | cut -d: -f1)
    
    # Create a new file with the updated content
    head -n "$scriptsLineNum" "$packageTmp" > "$packagePath"
    echo "    \"dev:$sitename\": \"cp .env.$sitename .env.local && next dev --turbopack --port $port\"," >> "$packagePath"
    echo "    \"build:$sitename\": \"cp .env.$sitename .env.local && NEXT_PUBLIC_APP_NAME=$display_name next build\"," >> "$packagePath"
    echo "    \"start:$sitename\": \"NEXT_PUBLIC_APP_NAME=$display_name next start --port $port\"," >> "$packagePath"
    tail -n +$((scriptsLineNum + 1)) "$packageTmp" >> "$packagePath"
fi

# Clean up temporary file
rm "$packageTmp"

echo "✅ Package.json updated with new scripts!"

# Confirm completion
echo ""
echo "🎉 Site '$sitename' created successfully!"
echo ""
echo "To start developing your new site, run:"
echo "npm run dev:$sitename"
echo ""
echo "This will start the development server on port $port."

