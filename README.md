# Interest_webApp
A web application allowing users to send interest messages to other users. Recipients can accept or reject the interest. If accepted, both users can chat with each other. Built with Angular for the frontend and Django for the backend.
### Table of Contents
* Features
* Tech Stack
* Installation
* Usage
* API Documentation
* Frontend
* Backend
* Contributing
### Features
1. User Authentication:
User registration and login.
2. Sending Interests:
Browse users and send interest messages.
3. Accepting/Rejecting Interests:
View and respond to received interest messages.
4. Chat System:
Real-time chat interface if interest is accepted.
### Tech Stack
#### Frontend:
* Angular 18.2.1
#### Backend:
* Django
* Django REST Framework
#### Database:
* Default dsqlite database
## Installation
### Frontend Setup
#### Clone the Repository:
* git clone https://github.com/Sairam0088/Interest_webApp/
* cd interest_frontend
* install node package
* npm install primeng, primeflex, primeicons
* ng serve
### Backend Setup
#### Clone the Repository:
* git clone https://github.com/Sairam0088/Interest_webApp/
* cd interest_backend
* pip install django, djangorestframework, channels, corsheaders
* python manage.py migrate
* python manage.py runserver

### Usage
#### Frontend
* Accessing the Application: Open your browser and go to http://localhost:4200.
* Login/Registration: Use the registration and login forms to create and access your account.
* Sending Interests: Browse users and send interest messages.
* Chat Interface: Chat with users if your interest is accepted.
### Backend
#### API Endpoints:
* GET /api/users - List the users
* POST /api/users/register/ - Register a new user.
* POST /api/users/login/ - Login and receive a token.
* GET /api/interests/received/ - Display received interests
* PUT /api/interests/respond/$id - accept/reject received interests
* POST /api/interests/send/ - Send interests
* POST /api/chats/ - Create a new chat.
* GET /api/chats/<chat_id>/messages/ - Get messages for a chat.
* POST /api/chats/<chat_id>/messages/ - Send a message in a chat.

### Contributing
#### Fork the Repository

##### Create a New Branch:
* git checkout -b feature/your-feature
* git add .
* git commit -m "Add your feature"
* Go to the repository on GitHub and create a pull request from your branch to the main branch.
