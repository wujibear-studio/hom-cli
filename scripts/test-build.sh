#!/usr/bin/env bash

# Exit on error and print commands
set -ex

# Function to check directory exists
check_dir() {
    if [ ! -d "$1" ]; then
        echo "Directory $1 does not exist!"
        ls -la $(dirname "$1")
        return 1
    fi
    echo "Directory $1 exists:"
    ls -la "$1"
}

# Clean up any existing artifacts
rm -rf package.tgz

# Ensure we have the latest dependencies
yarn install

# Build the project
yarn build

# Generate oclif manifest
yarn oclif manifest

# Create tarball using yarn pack in current directory
echo "Creating tarball..."
yarn pack
sleep 1  # Add a small delay to ensure file is written

# Show what was created
echo "Files in current directory:"
ls -la package*

# Create dist/tarballs directory
echo "Creating dist/tarballs directory..."
rm -rf dist/tarballs
mkdir -p dist/tarballs
check_dir dist/tarballs

# Copy the package
echo "Copying package.tgz to dist/tarballs/hom-cli.tgz..."
cp -v package.tgz dist/tarballs/hom-cli.tgz
rm package.tgz

# Show final contents
echo "Final contents of dist/tarballs:"
ls -la dist/tarballs

# Verify we have tarballs
if ! find dist/tarballs -name "*.tgz" -type f | grep -q .; then
    echo "No tarballs were created"
    echo "Contents of all relevant directories:"
    find . -name "*.tgz" -type f
    exit 1
fi

echo "Build test completed successfully!" 