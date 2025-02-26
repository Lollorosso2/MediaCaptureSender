# EAS Build Git Instructions

When using EAS Build, Git is required for the build process. If you're seeing errors related to Git, follow these steps before running EAS build:

## Initialize Git Repository

Run these commands in your project directory after extracting the ZIP file:

```bash
# Initialize a new Git repository
git init

# Add all files to Git
git add .

# Commit the files
git commit -m "Initial commit"
```

## Then Run EAS Build

After initializing the Git repository, you can run the EAS build command:

```bash
eas build -p android --profile production
```

## Troubleshooting

If you still encounter Git-related errors:

1. Make sure Git is properly installed on your system
2. Verify that you're running the commands from the root directory of the project
3. Try using the `--non-interactive` flag: `eas build -p android --profile production --non-interactive`
4. Check that your Git user is configured: 
   ```
   git config --global user.email "you@example.com"
   git config --global user.name "Your Name"
   ```

These steps should resolve the Git-related issues with EAS build.