# Git Setup for EAS Build

This guide explains how to set up Git for your Media Capture App project. EAS Build requires a Git repository for versioning and building your app.

## Why Git is Required

Expo Application Services (EAS) requires your project to be initialized as a Git repository because:

1. It uses Git to track changes and determine versions
2. It helps with caching dependencies between builds
3. It enables better error reporting and debugging
4. It's required for GitHub integration and automated builds

## Step 1: Initialize Git Repository

Run the following commands in your project directory:

```bash
# Initialize a new Git repository
git init

# Add all files to the staging area
git add .

# Create an initial commit
git commit -m "Initial commit"
```

## Step 2: Configure Git User (First-time setup)

If this is your first time using Git, you'll need to configure your user information:

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"
```

## Step 3: Create .gitignore File

Create a `.gitignore` file to exclude unnecessary files from your repository:

```bash
# Create .gitignore file
cat > .gitignore << EOL
node_modules/
.expo/
dist/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
.DS_Store
*.log
EOL
```

## Step 4: Verify Git Setup

Check that your repository is properly initialized:

```bash
# Check Git status
git status
```

You should see a message indicating that your repository is up to date.

## Step 5: Connect to a Remote Repository (Optional)

If you want to push your code to GitHub or another remote repository:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to remote repository
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repository name.

## Troubleshooting

### Error: fatal: not a git repository

If you see this error when running EAS build, it means your project is not initialized as a Git repository. Run the initialization command:

```bash
git init
git add .
git commit -m "Initial commit"
```

### Error: fatal: refusing to merge unrelated histories

If you get this error when pulling from a remote repository:

```bash
git pull origin main --allow-unrelated-histories
```

### Error: failed to push some refs

If you're unable to push to your remote repository:

```bash
git pull origin main
git push origin main
```

## Next Steps

After setting up Git, you can proceed with building your app using EAS:

```bash
eas build -p android --profile preview
```

For more detailed instructions on EAS Build, refer to our [EAS Build Guide](./EAS_BUILD_GUIDE.md).