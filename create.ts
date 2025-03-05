#!/usr/bin/env ts-node
import fs from "fs";
import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";

interface SiteConfig {
  sitename: string;
  port: string;
  description: string;
  color: string;
}

async function promptForSiteInfo(): Promise<SiteConfig> {
  return inquirer.prompt([
    {
      type: "input",
      name: "sitename",
      message: "Enter the site name (e.g. store, board, trade):",
      validate: (input) => input.trim() !== "" || "Site name is required",
    },
    {
      type: "input",
      name: "port",
      message: "Enter a port number for the new site to run on:",
      validate: (input) => {
        const port = parseInt(input);
        return (!isNaN(port) && port > 0) || "Please enter a valid port number";
      },
    },
    {
      type: "input",
      name: "description",
      message: "Enter a brief description for the site:",
    },
    {
      type: "input",
      name: "color",
      message: "Enter a color for the site link (e.g. red, yellow, pink):",
      default: "indigo",
    },
  ]);
}

function createEnvironmentFiles(config: SiteConfig): void {
  console.log(chalk.blue("Creating environment files..."));

  const { sitename } = config;
  const sitenameLC = sitename.toLowerCase();
  const displayName = sitenameLC.charAt(0).toUpperCase() + sitenameLC.slice(1);
  const sitenameUC = sitenameLC.toUpperCase();

  // Main env file (simpler version for development)
  const mainEnvContent = `NEXT_PUBLIC_APP_NAME=${displayName}
NEXT_PUBLIC_API_URL=https://api.${sitenameLC}.localhost:3000

# ${displayName}-specific variables
${sitenameUC}_WEBSOCKET_URL=wss://ws.${sitenameLC}.localhost:3000
${sitenameUC}_API_KEY=your_${sitenameLC}_api_key_here
${sitenameUC}_API_SECRET=your_${sitenameLC}_api_secret_here
`;

  // Example env file (more comprehensive for documentation)
  const exampleEnvContent = `# App Configuration
NEXT_PUBLIC_APP_NAME=${displayName}
NEXT_PUBLIC_API_URL=https://api.${sitenameLC}.yourdomain.com

# ${displayName}-specific variables
${sitenameUC}_WEBSOCKET_URL=wss://ws.${sitenameLC}.yourdomain.com
${sitenameUC}_API_KEY=your_${sitenameLC}_api_key_here
${sitenameUC}_API_SECRET=your_${sitenameLC}_api_secret_here

# Service Configuration
${sitenameUC}_MAX_USERS=100
${sitenameUC}_STORAGE_PROVIDER=s3

# Storage Configuration
${sitenameUC}_S3_BUCKET=your-${sitenameLC}-bucket
${sitenameUC}_S3_REGION=us-east-1
${sitenameUC}_AWS_ACCESS_KEY=your_aws_access_key
${sitenameUC}_AWS_SECRET_KEY=your_aws_secret_key
`;

  fs.writeFileSync(`.env.${sitenameLC}`, mainEnvContent);
  fs.writeFileSync(`.env.${sitenameLC}.example`, exampleEnvContent);

  console.log(chalk.green("✅ Environment files created successfully!"));
}

function updateMiddleware(config: SiteConfig): void {
  console.log(chalk.blue("Updating middleware configuration..."));

  const { sitename, port } = config;
  const sitenameLC = sitename.toLowerCase();
  const middlewarePath = "src/middleware.ts";

  if (!fs.existsSync(middlewarePath)) {
    console.log(
      chalk.yellow(
        `Warning: ${middlewarePath} not found. Skipping middleware update.`
      )
    );
    return;
  }

  let middlewareContent = fs.readFileSync(middlewarePath, "utf8");

  // Check if the site is already in the SiteConfigs type
  if (!middlewareContent.includes(`${sitenameLC}: SiteConfig;`)) {
    middlewareContent = middlewareContent.replace(
      /type SiteConfigs = {/,
      `type SiteConfigs = {\n  ${sitenameLC}: SiteConfig;`
    );
  }

  // Check if the site is already in the SITE_CONFIGS object
  if (!middlewareContent.includes(`${sitenameLC}: {`)) {
    middlewareContent = middlewareContent.replace(
      /const SITE_CONFIGS: SiteConfigs = {/,
      `const SITE_CONFIGS: SiteConfigs = {\n  ${sitenameLC}: {\n    hostname: \`${sitenameLC}.\${process.env.NEXT_PUBLIC_ROOT_DOMAIN}\`,\n    basePath: "/${sitenameLC}",\n    port: ${port},\n  },`
    );
  }

  fs.writeFileSync(middlewarePath, middlewareContent);
  console.log(chalk.green("✅ Middleware configuration updated!"));
}

function updateHomePage(config: SiteConfig): void {
  console.log(chalk.blue("Updating home page links..."));

  const { sitename, port, color } = config;
  const sitenameLC = sitename.toLowerCase();
  const displayName = sitenameLC.charAt(0).toUpperCase() + sitenameLC.slice(1);
  const homePagePath = "src/app/home/page.tsx";

  if (!fs.existsSync(homePagePath)) {
    console.log(
      chalk.yellow(
        `Warning: ${homePagePath} not found. Skipping home page update.`
      )
    );
    return;
  }

  let homePageContent = fs.readFileSync(homePagePath, "utf8");

  // Check if the site is already in the links array
  if (!homePageContent.includes(`name: "${displayName}",`)) {
    const newLink = `    {
      name: "${displayName}",
      href: isDevelopment
        ? "http://localhost:${port}"
        : "https://${sitenameLC}.yourdomain.com",
      className: "bg-${color}-500 hover:bg-${color}-600",
    },`;

    homePageContent = homePageContent.replace(
      /const links = \[/,
      `const links = [\n${newLink}`
    );

    fs.writeFileSync(homePagePath, homePageContent);
  }

  console.log(chalk.green("✅ Home page links updated!"));
}

function createSitePage(config: SiteConfig): void {
  console.log(chalk.blue("Creating site directory and page..."));

  const { sitename, port, description, color } = config;
  const sitenameLC = sitename.toLowerCase();
  const displayName = sitenameLC.charAt(0).toUpperCase() + sitenameLC.slice(1);
  const siteDir = `src/app/${sitenameLC}`;

  // Create directory if it doesn't exist
  if (!fs.existsSync(siteDir)) {
    fs.mkdirSync(siteDir, { recursive: true });
  }

  // Create page.tsx
  const pageContent = `import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "${displayName} Platform",
  description: "${description}",
};

export default function Page() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">${displayName} Platform</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-4">
          Welcome to the ${displayName} platform. ${description}
        </p>
        <div className="grid gap-4 mt-6">
          <div className="bg-${color}-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-${color}-500 text-white rounded hover:bg-${color}-600">
                Action Button
              </button>
              <button className="px-4 py-2 bg-${color}-500 text-white rounded hover:bg-${color}-600">
                Another Action
              </button>
            </div>
          </div>
          <div className="bg-${color}-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-600">
              This is the ${sitenameLC} platform running on port ${port}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  fs.writeFileSync(`${siteDir}/page.tsx`, pageContent);
  console.log(chalk.green("✅ Site page created successfully!"));
}

function updatePackageJson(config: SiteConfig): void {
  console.log(chalk.blue("Updating package.json with new scripts..."));

  const { sitename, port } = config;
  const sitenameLC = sitename.toLowerCase();
  const displayName = sitenameLC.charAt(0).toUpperCase() + sitenameLC.slice(1);
  const packagePath = "package.json";

  if (!fs.existsSync(packagePath)) {
    console.log(
      chalk.yellow(
        `Warning: ${packagePath} not found. Skipping package.json update.`
      )
    );
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  // Add new scripts if they don't exist
  if (!packageJson.scripts[`dev:${sitenameLC}`]) {
    packageJson.scripts[`dev:${sitenameLC}`] =
      `cp .env.${sitenameLC} .env.local && next dev --turbopack --port ${port}`;
    packageJson.scripts[`build:${sitenameLC}`] =
      `cp .env.${sitenameLC} .env.local && NEXT_PUBLIC_APP_NAME=${displayName} next build`;
    packageJson.scripts[`start:${sitenameLC}`] =
      `NEXT_PUBLIC_APP_NAME=${displayName} next start --port ${port}`;

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  }

  console.log(chalk.green("✅ Package.json updated with new scripts!"));
}

async function main() {
  const program = new Command();

  program
    .name("create-site")
    .description("Create a new site in the multi-site Next.js template")
    .version("1.0.0")
    .option("-n, --name <name>", "Site name")
    .option("-p, --port <port>", "Port number")
    .option("-d, --description <description>", "Site description")
    .option("-c, --color <color>", "Link color");

  program.parse();

  const options = program.opts();
  let config: SiteConfig;

  // Use command line arguments if provided, otherwise prompt
  if (options.name && options.port) {
    config = {
      sitename: options.name,
      port: options.port,
      description: options.description || "",
      color: options.color || "indigo",
    };
  } else {
    config = await promptForSiteInfo();
  }

  console.log(
    chalk.blue(`Creating new site: ${config.sitename} (Port: ${config.port})`)
  );
  console.log(chalk.blue("-----------------------------------"));

  try {
    // Execute site creation steps
    createEnvironmentFiles(config);
    updateMiddleware(config);
    updateHomePage(config);
    createSitePage(config);
    updatePackageJson(config);

    console.log(
      "\n" +
        chalk.green(`🎉 Site '${config.sitename}' created successfully!`) +
        "\n"
    );
    console.log(`To start developing your new site, run:`);
    console.log(chalk.cyan(`npm run dev:${config.sitename.toLowerCase()}`));
    console.log(
      `\nThis will start the development server on port ${config.port}.`
    );
  } catch (error) {
    console.error(chalk.red("Error creating site:"), error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(chalk.red("Unexpected error:"), error);
  process.exit(1);
});
