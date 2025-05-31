#!/bin/bash

# Get the latest version from package.json
VERSION=$(node -p "require('./package.json').version")
TARBALL_URL="https://github.com/wujibear/hom-cli/releases/download/v$VERSION/hom-cli-$VERSION-darwin-x64.tar.gz"

# Download the tarball and calculate its SHA
curl -L -o hom-cli.tar.gz "$TARBALL_URL"
SHA=$(shasum -a 256 hom-cli.tar.gz | cut -d ' ' -f 1)
rm hom-cli.tar.gz

# Create the formula from template
sed -e "s/\${VERSION}/$VERSION/g" \
    -e "s/\${SHA}/$SHA/g" \
    homebrew-formula.rb.template > Formula/hom-cli.rb

echo "Updated Homebrew formula for version $VERSION" 