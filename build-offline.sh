#!/bin/bash
# Build script for completely offline version

echo "Building offline version of Forward Focus Elevation..."

# Use the offline vite config
echo "Building with offline configuration..."
npx vite build --config vite.config.offline.ts

# Create the offline package directory
echo "Creating offline package..."
mkdir -p offline-package
cp -r dist/* offline-package/

# Copy any additional offline assets
echo "Copying offline assets..."

# Create a simple offline indicator file
echo "offline" > offline-package/OFFLINE_MODE

# Create offline deployment instructions
cat > offline-package/README.md << 'EOF'
# Forward Focus Elevation - Offline Package

This is a completely offline version of the Forward Focus Elevation application.

## Deployment Instructions

1. Extract all files to your web server directory
2. Serve the files using any static web server
3. No internet connection required after deployment

## Running Locally

You can serve this locally using:
- Python: `python -m http.server 8080`
- Node: `npx serve .`
- PHP: `php -S localhost:8080`

## Features in Offline Mode

✅ Full UI and navigation
✅ Local fonts (no external CDN)
✅ All static content and images
✅ Basic form validation
❌ Real-time data and external APIs
❌ Interactive maps (replaced with static representations)
❌ External service integrations

## Security

All external dependencies have been removed for complete offline operation.
The app includes comprehensive security headers and offline-friendly configurations.

EOF

echo "Creating downloadable package..."
cd offline-package
zip -r ../forward-focus-elevation-offline.zip .
cd ..

echo "✅ Offline build complete!"
echo "📦 Package created: forward-focus-elevation-offline.zip"
echo "🚀 Ready for deployment anywhere - no internet required!"