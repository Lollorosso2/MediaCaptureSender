# Expo Account Setup for EAS Builds

Before you can build the Media Capture App using EAS (Expo Application Services), you need to set up your Expo account.

## Create and Configure Your Expo Account

1. **Create an Expo account**

   Visit [https://expo.dev/signup](https://expo.dev/signup) to create a free Expo account.

2. **Install the EAS CLI**

   ```bash
   npm install -g eas-cli
   ```

3. **Log in to your Expo account**

   ```bash
   eas login
   ```

   Follow the prompts to log in using your email and password.

4. **Configure your project**

   Open the `app.json` file and update the following fields:

   ```json
   {
     "expo": {
       "owner": "your-expo-username",
       "extra": {
         "eas": {
           "projectId": "your-project-id"
         }
       }
     }
   }
   ```

   Replace `your-expo-username` with your actual Expo username.

5. **Initialize your EAS project**

   ```bash
   eas build:configure
   ```

   This will create/update the `eas.json` file in your project with the correct build profiles.

## Next Steps

After setting up your account, you can:

- Follow the `EAS_BUILD_GUIDE.md` to build your app
- Initialize a Git repository (required for EAS builds) as described in `EAS_GIT_INSTRUCTIONS.md`

## Troubleshooting

- **"Owner does not match project ID owner"**: Make sure the owner field in app.json matches your Expo account username
- **Account verification**: You may need to verify your email address before using EAS builds
- **Billing information**: Building for iOS requires a paid Apple Developer account and may require payment information in your Expo account