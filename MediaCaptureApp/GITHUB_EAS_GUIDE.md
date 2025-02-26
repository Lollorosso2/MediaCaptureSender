# Building from GitHub with EAS

This guide explains how to set up your GitHub repository to work with EAS Build for creating APKs and app bundles.

## Prerequisites

1. A GitHub account
2. An Expo account (sign up at https://expo.dev)
3. Git installed on your computer
4. Node.js 18+ installed

## Step 1: Create a GitHub Repository

1. Go to GitHub.com and log in to your account
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., "media-capture-app")
4. Choose whether to make it public or private
5. Click "Create repository"

## Step 2: Push Your Code to GitHub

After extracting the Media Capture App package, run these commands:

```bash
# Initialize Git repository
git init

# Add all files to Git
git add .

# Commit the files
git commit -m "Initial commit"

# Add your GitHub repository as the remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repository name.

## Step 3: Set Up GitHub Secrets

You need to add your Expo token as a secret in your GitHub repository:

1. Go to your Expo account settings: https://expo.dev/accounts/[your-username]/settings/access-tokens
2. Create a new access token with a descriptive name (e.g., "GitHub Actions")
3. Copy the token
4. Go to your GitHub repository
5. Click on "Settings" > "Secrets and variables" > "Actions"
6. Click "New repository secret"
7. Name: `EXPO_TOKEN`
8. Value: Paste your Expo token
9. Click "Add secret"

## Step 4: Connect Expo to GitHub

1. Go to https://expo.dev and log in to your account
2. Click on "Projects" in the sidebar
3. Click "Create a new project"
4. Select "Import from GitHub"
5. Choose your GitHub repository from the list
6. Click "Create"

## Step 5: Automatic Builds with GitHub Actions

The repository includes a GitHub Actions workflow file (`.github/workflows/eas-build.yml`) that will automatically build your app when you push to the main/master branch:

```yaml
name: EAS Build
on:
  workflow_dispatch:
  push:
    branches:
      - main
      - master
jobs:
  build:
    name: Install and build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18.x
          cache: npm
          
      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
          
      - name: Install dependencies
        run: npm ci
      
      - name: Build Android APK
        run: eas build -p android --profile github --non-interactive
```

This will:
- Run automatically when you push to the main/master branch
- Can also be triggered manually from the "Actions" tab in your repository
- Build an Android APK using the "github" profile from your eas.json

## Step 6: Start a Build Manually

You can start a build manually:

1. Go to your GitHub repository
2. Click on the "Actions" tab
3. Select the "EAS Build" workflow
4. Click "Run workflow"
5. Select the branch to build from (usually main/master)
6. Click "Run workflow"

## Step 7: Download Your Build

Once the build is complete:

1. Go to https://expo.dev and log in
2. Go to your project
3. Click on "Builds"
4. Find your build and click "Download"

## Advanced: Customizing the Build

You can customize the build by:

1. Editing the `.github/workflows/eas-build.yml` file
2. Modifying the "github" profile in your `eas.json` file

### Example: Building for both Android and iOS

```yaml
- name: Build Android APK
  run: eas build -p android --profile github --non-interactive
  
- name: Build iOS
  run: eas build -p ios --profile github --non-interactive
```

### Example: Building for Production

```yaml
- name: Build Android Production
  run: eas build -p android --profile production --non-interactive
```

## Troubleshooting

- If your build fails with credential errors, add the `--non-interactive` flag
- For iOS builds, you'll need to add Apple credentials to your Expo account
- If the GitHub Action fails with permission errors, check that your EXPO_TOKEN has the correct permissions
- For authentication errors, regenerate your Expo token and update the GitHub secret