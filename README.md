# Tobicord

<div align="center">
  <img src="https://user-images.githubusercontent.com/108926305/222359934-7bfeb8ad-57d1-4606-8841-f5847ffe679f.png" alt="Tobicord" style="width: 250px">
</div>  <br>

Tobicord provides individuals and groups with browser tab management, classification, and editing. Tabs can be easily and quickly dragged to different collections and save in the online database. Tobicord also provides multi-user collaborative editing and group chat rooms, making it easier for teams to communicate and collaborate.

🖥️ Website URL : https://moonightowl.com/

🧰 Chrome Extension : https://chrome.google.com/webstore/detail/tobicord/elclbdojjgnbooalpmbpjiadbeoigdca?hl=zh-TW

📃 API Doc : https://app.swaggerhub.com/apis-docs/TOM54699_1/Tobicord/1.0.0

Test account and password : test@gmail.com / 123456

## Demo

### Chrome Extension![image](https://user-images.githubusercontent.com/108926305/222872302-cb6a86ee-6ca1-4802-be41-a7d13a2e9f23.png) and Organize Browser Tabs Feature

-   Get all browser tabs by extension and easily organize、save、edit browser tabs by drag and drop. Users can create a URL and share their bookmark collection with others.

<div align="center">
  <img src="/README/Tobicord-Readme-1.gif" alt="Tobicord-Readme-1" style="width: 800px">
</div>  <br>

### Multi-users Online Interaction

-   Invitation system, Permission system and Chat-room system. Invite friends or team-members to collaborative organizing browser tabs.

<div align="center">
  <img src="/README/Tobicord-Readme-2.gif" alt="Tobicord-Readme-2" style="width: 800px">
</div>  <br>

## Table of Contents

-   [Main Features](#main-features)
-   [Backend Technique](#backend-technique)
    -   [Deployment](#deployment)
    -   [Environment](#environment)
    -   [Cloud Service](#cloud-service)
    -   [Database](#database)
    -   [Networking](#networking)
    -   [Third Party Library](#third-party-library)
    -   [Version Control](#version-control)
    -   [Key Points](#key-points)
-   [Architecture](#architecture)
    -   [Server Architecture](#server-architecture)
    -   [Socket Architecture](#socket-architecture)
    -   [Extension Architecture](#extension-architecture)
-   [Database Schema](#database-schema)
-   [Frontend Technique](#frontend-technique)
-   [API Doc](#api-doc)
-   [Contact](#contact)

## Main Features

-   Setup CI/CD with GitHub Actions, Docker Hub and AWS CodeDeploy.
-   Member System
    -   User authentication with JWT.
    -   Automatically refresh access token with axios-interceptors.
    -   Redis is used to block attempts to refresh tokens by logged out users.
-   Build my own chrome extension and push it to the Chrome Web Store.
    -   When the extension is activated, it can detect changes in the browser tabs at any time, retrieve tabs information and send it to Redis.
-   Organize the tabs from the extension.
    -   Users are able to create various organizations, spaces, and collections to classify, edit, and store different tabs.
-   Invitation system and Permission System.
    -   User can invite other members to organization and owner can grant different permissions to members.
-   Use socket.io for real-time invitation notification and organization chat-room.
-   Shared system and export function.
    -   Users can create a URL and share their bookmark collections with others.
    -   User can export collections with different format(json、html、txt).
-   Tutorial system with step-by-step guidance and beginner guideline cards.
-   Using the MVC design pattern and normalize MySQL database in 3NF.

## Backend Technique

### Deployment

-   Docker
-   docker-compose

### Environment

-   Node.js/Express.js

### Cloud Service

-   EC2
-   RDS
-   Cloudflare R2
-   CodeDeploy

### Database

-   MySQL
-   Redis

### Networking

-   HTTP & HTTPS
-   DNS (Route 53)
-   NGINX
-   SSL (Let's Encrypt)

### Third Party Library

-   Socket.IO
-   bcrypt
-   helmet (Prevent XSS attacks)
-   sequelize
-   aws-sdk
-   jsonwebtoken
-   cors

### Version Control

-   Git/GitHub

### Key Points

-   socket.io
-   MVC Pattern

## Architecture

### Server Architecture

<img src="/README/Architecture.drawio.png" alt="server-architecture" style="width: 700px">
<br>

### Socket Architecture

-   Real-time invitation

<img src="/README/Socket Architecture - Inivatation.drawio.png" alt="socket-architecture" style="width: 700px">
<br>

-   Chat-room

<img src="/README/Socket Architecture - ChatRoom.drawio.png" alt="socket-architecture" style="width: 700px">
<br>

### Extension Architecture

<img src="/README/Extension Architecture.drawio.png" alt="socket-architecture" style="width: 700px">
<br>

### Database Schema

<img src="/README/tobicord-mysql.png" alt="database-schema " style="width: 700px">
<br>

## Frontend Technique

-   HTML
-   JavaScript
-   CSS
-   Third Party Library
    -   axios
    -   vanta.js
    -   bootstrap
    -   driver.js
    -   sortable.js

## API Doc

[API Doc](https://app.swaggerhub.com/apis-docs/TOM54699_1/Tobicord/1.0.0)

## Contact

👨‍💻 廖梓兆 ZIH-JHAO LIAO

📪 Email : tom54699@gmail.com
