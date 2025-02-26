# Building from GitHub with EAS

This guide explains how to set up your GitHub repository to work with EAS Build for creating APKs and app bundles.

## Prerequisites

1. A GitHub account
2. An Expo account (sign up at https://expo.dev)
3. Git installed on your computer

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

## Step 3: Connect Expo to GitHub

1. Go to https://expo.dev and log in to your account
2. Click on "Projects" in the sidebar
3. Click "Create a new project"
4. Select "Import from GitHub"
5. Choose your GitHub repository from the list
6. Click "Create"

## Step 4: Start a Build from Expo Dashboard

1. In your Expo project dashboard, click on "Build"
2. Choose "Android" as the platform
3. Select "APK" for testing or "AAB" for Google Play Store
4. Click "Start build"

## Step 5: Alternative - Build using EAS CLI with GitHub Integration

You can also build directly from the EAS CLI, which will use your GitHub repo:

1. Install EAS CLI: `npm install -g eas-cli`
2. Log in to Expo: `eas login`
3. Configure your build: `eas build:configure`
4. Start a build: `eas build -p android --profile preview`

## Webhook Integration (Optional)

You can set up webhooks to automatically trigger builds when you push to GitHub:

1. In your Expo project settings, go to "Webhooks"
2. Create a new webhook for your GitHub repository
3. Configure it to trigger on push to main/master branch
4. Copy the webhook URL
5. Add it to your GitHub repository under Settings > Webhooks

This will allow you to automatically build a new version of your app whenever you push changes to your GitHub repository.