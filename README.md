# Design System MVP

This repo is a shell for the main design system the FEC will be building with the UCD team. It uses an nginx server on port 80. Run the commands below to get the Docker image up and running locally.

`docker build -t my-local-html-image .`

`docker run -d -p 8080:80 --name my-html-container my-local-html-image`

`http://localhost:8080`

[current repo name is temporary and subject to change at time of setting up repo]

`npx eleventy --serve`
