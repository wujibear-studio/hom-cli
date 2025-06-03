#!/usr/bin/env bash

# Exit on error
set -e

# Echo commands
set -x

# Create dist directory
mkdir -p dist

# Ensure we have the latest dependencies
yarn install

# Build the project
yarn build

# Install oclif globally if needed
if ! command -v oclif &> /dev/null; then
    echo "Installing @oclif/cli globally..."
    yarn global add @oclif/cli
fi

# Add global yarn bin to PATH
export PATH="$(yarn global bin):$PATH"

# Run the pack command
echo "Running oclif pack..."
oclif pack tarballs

# Show what was created
echo "Contents of dist directory:"
ls -R dist

# Check for tarballs
if ! find dist -name "*.tar.gz" -type f | grep -q .; then
    echo "No tarballs were created"
    exit 1
fi

echo "Build test completed successfully!" 