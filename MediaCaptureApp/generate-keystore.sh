#!/bin/bash

# Generate Android Keystore Script for Media Capture App
# This script creates a keystore file for signing Android APKs

echo "=== Media Capture App - Android Keystore Generator ==="
echo "This script will create a keystore file for signing your Android APKs."
echo

# Check if keytool is available (part of Java JDK)
if ! command -v keytool &> /dev/null; then
    echo "Error: keytool not found. Please install Java JDK."
    exit 1
fi

# Set default values
DEFAULT_KEYSTORE_NAME="media-capture-keystore.jks"
DEFAULT_KEYSTORE_ALIAS="mediacapture"
DEFAULT_KEYSTORE_PASSWORD="mediacapture"
DEFAULT_KEY_PASSWORD="mediacapture"
DEFAULT_VALIDITY_YEARS=25

# Initialize variables with defaults
KEYSTORE_NAME=$DEFAULT_KEYSTORE_NAME
KEYSTORE_ALIAS=$DEFAULT_KEYSTORE_ALIAS
KEYSTORE_PASSWORD=$DEFAULT_KEYSTORE_PASSWORD
KEY_PASSWORD=$DEFAULT_KEY_PASSWORD
VALIDITY_YEARS=$DEFAULT_VALIDITY_YEARS

# Parse command line options
while getopts "n:a:p:k:y:h" opt; do
  case $opt in
    n) KEYSTORE_NAME="$OPTARG" ;;
    a) KEYSTORE_ALIAS="$OPTARG" ;;
    p) KEYSTORE_PASSWORD="$OPTARG" ;;
    k) KEY_PASSWORD="$OPTARG" ;;
    y) VALIDITY_YEARS="$OPTARG" ;;
    h) 
      echo "Usage: $0 [options]"
      echo "Options:"
      echo "  -n NAME    Keystore filename (default: $DEFAULT_KEYSTORE_NAME)"
      echo "  -a ALIAS   Key alias (default: $DEFAULT_KEYSTORE_ALIAS)"
      echo "  -p PASS    Keystore password (default: $DEFAULT_KEYSTORE_PASSWORD)"
      echo "  -k PASS    Key password (default: $DEFAULT_KEY_PASSWORD)"
      echo "  -y YEARS   Validity in years (default: $DEFAULT_VALIDITY_YEARS)"
      echo "  -h         Show this help"
      exit 0
      ;;
    \?) echo "Invalid option: -$OPTARG" >&2; exit 1 ;;
  esac
done

# Security warning for default passwords
if [ "$KEYSTORE_PASSWORD" == "$DEFAULT_KEYSTORE_PASSWORD" ] || [ "$KEY_PASSWORD" == "$DEFAULT_KEY_PASSWORD" ]; then
    echo "WARNING: You are using the default password."
    echo "It is highly recommended to use a custom password for production keystores."
    echo "You can specify a custom password using the -p and -k options."
    echo
fi

# Show keystore generation details
echo "Keystore details:"
echo "  Filename: $KEYSTORE_NAME"
echo "  Key alias: $KEYSTORE_ALIAS"
echo "  Validity: $VALIDITY_YEARS years"
echo

# Ask for confirmation
read -p "Continue with these settings? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Cancelled."
    exit 0
fi

echo "Please provide information for your keystore certificate:"
read -p "What is your first and last name? " NAME
read -p "What is the name of your organizational unit? " ORG_UNIT
read -p "What is the name of your organization? " ORG
read -p "What is the name of your City or Locality? " CITY
read -p "What is the name of your State or Province? " STATE
read -p "What is the two-letter country code for this unit? " COUNTRY

# Generate the keystore
echo "Generating keystore..."
keytool -genkeypair \
  -dname "CN=$NAME, OU=$ORG_UNIT, O=$ORG, L=$CITY, ST=$STATE, C=$COUNTRY" \
  -alias $KEYSTORE_ALIAS \
  -keyalg RSA \
  -keysize 2048 \
  -validity $(($VALIDITY_YEARS * 365)) \
  -keystore $KEYSTORE_NAME \
  -storepass $KEYSTORE_PASSWORD \
  -keypass $KEY_PASSWORD

# Check if generation was successful
if [ $? -eq 0 ]; then
    echo
    echo "Keystore generated successfully: $KEYSTORE_NAME"
    echo
    echo "To use this keystore with your project:"
    echo "1. Copy $KEYSTORE_NAME to your project's android/app directory"
    echo "2. Add the following to your gradle.properties file:"
    echo
    echo "MYAPP_UPLOAD_STORE_FILE=$KEYSTORE_NAME"
    echo "MYAPP_UPLOAD_KEY_ALIAS=$KEYSTORE_ALIAS"
    echo "MYAPP_UPLOAD_STORE_PASSWORD=$KEYSTORE_PASSWORD"
    echo "MYAPP_UPLOAD_KEY_PASSWORD=$KEY_PASSWORD"
    echo
    echo "3. For EAS builds, add this information to your eas.json file"
    echo
    echo "IMPORTANT: Keep your keystore file and passwords secure. If you lose them,"
    echo "you will not be able to update your app on the Google Play Store."
    
    # Create a backup of the keystore info
    INFO_FILE="keystore-info.txt"
    echo "Keystore Information (KEEP SECURE)" > $INFO_FILE
    echo "Filename: $KEYSTORE_NAME" >> $INFO_FILE
    echo "Alias: $KEYSTORE_ALIAS" >> $INFO_FILE
    echo "Keystore Password: $KEYSTORE_PASSWORD" >> $INFO_FILE
    echo "Key Password: $KEY_PASSWORD" >> $INFO_FILE
    echo "Validity: $VALIDITY_YEARS years" >> $INFO_FILE
    echo "Created: $(date)" >> $INFO_FILE
    echo >> $INFO_FILE
    echo "Certificate Details:" >> $INFO_FILE
    echo "Name: $NAME" >> $INFO_FILE
    echo "Organization Unit: $ORG_UNIT" >> $INFO_FILE
    echo "Organization: $ORG" >> $INFO_FILE
    echo "City/Locality: $CITY" >> $INFO_FILE
    echo "State/Province: $STATE" >> $INFO_FILE
    echo "Country: $COUNTRY" >> $INFO_FILE
    
    echo "Keystore information saved to $INFO_FILE"
else
    echo "Failed to generate keystore."
fi