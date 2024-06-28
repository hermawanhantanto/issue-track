#!/bin/bash

# Stop PM2 (if already running)
pm2 stop all || true

# Clean up previous deployment files or directories if necessary
# Example: Remove old files from /var/www/html
rm -rf /var/www/html/*
