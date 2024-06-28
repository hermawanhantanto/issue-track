#!/bin/bash

# Navigate to application directory
cd /var/www/html

# Start PM2 and run Next.js application
pm2 start npm --name "nextjs-app" -- start
