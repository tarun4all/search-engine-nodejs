#!/usr/bin/env bash

# Build
npm i
npm run build

# Deploy
firebase deploy
