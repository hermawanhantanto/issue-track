#!/bin/bash

# Stop PM2 and any running applications
pm2 stop all || true
