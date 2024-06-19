# 📚 APP Library NY Times API
<a href="https://sergiolm7.github.io/biblioteca-nytimes/" target="_blank"> <img src="./images/banner-readme.jpg"/></a> 


This project allows users to search for books (from the NY Times API), filter them, and mark their favorites using Firebase as the backend for authentication, data and cloud storage. Favorite books are displayed in the user's profile section beside his/her profile picture. It also gives the chance to go directly to Amazon to buy your favorites books. The application is responsive, mobile first and designed to work well on both mobile and desktop devices.

## Features
* Search and filter NY Times best seller's categories.
* Search and filter NY Times best seller's books.
* User authentication with Firebase.
* Mark books as favorites.
* View favorite books in the profile section.
* Responsive design.

## Technologies used
* HTML5
* CSS3
* JavaScript (ES6+)
* Firebase (Authentication, Firestore & Cloud) [https://firebase.google.com/]
* API NY Times [https://developer.nytimes.com/apis]
* Postman
* Git & Git Hub

## Project structure
* index.html: Main file of the user interface.
* style.css: CSS styles for the application.
* script.js: Main logic of the application and Firebase configuration.

## Access
You can see the web working here: https://sergiolm7.github.io/biblioteca-nytimes

## Usage

* You do not need to register for searching and filtering categories and books.
* The filter section allows searching for categories by:
    - From A to Z and Z to A (title or author)
    - By newest/oldest.
    - By category name (multiple).
    - By update.
* The filter section allows searching for books by:
    - From A to Z and Z to A.
    - By author.
    - By title.
      
### In action
![Example1](https://github.com/SergioLM7/biblioteca-nytimes/blob/main/images/gif1.gif)

* Users can sign up and log in using the authentication form.
* Once authenticated, users can view their profile and the books they have marked as favorites.
  
### In action
![Example2](https://github.com/SergioLM7/biblioteca-nytimes/blob/main/images/gif2.gif)

* Users can mark books as favorites by clicking on the heart button.

### In action
![Example3](https://github.com/SergioLM7/biblioteca-nytimes/blob/main/images/gif3.gif)

* Favorite books are saved in Firestore under the user's document.
* By clicking on "My Profile," users can view all the books they have marked as favorites.

### In action
![Example4](https://github.com/SergioLM7/biblioteca-nytimes/blob/main/images/gif4.gif)

* Favorite books are displayed with a filled heart button when user is login.

## Setup

1. Clone the repository:

```bash
cd your-repository
git clone https://github.com/SergioLM7/biblioteca-nytimes.git
```

2. Install dependencies:

```
npm install -g firebase-tools
```

3. Make sure to have firebase installed. If not, install it globally:

```bash
npm install -g firebase-tools
```

4. Configure Firebase:

* Go to Firebase Console.
* Create a new project.
* Set up Firestore and Authentication (Email/Password).
* Copy the Firebase configuration and paste it into firebase-config.js.

```javascript
// firebase-config.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
```
## Author
**Sergio Lillo, Full Stack Student in The Bridge**
<a href="https://www.linkedin.com/in/lillosergio/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1200px-LinkedIn_icon.svg.png" width=30px, height=30px/></a> 


## Useful resources
Fontawesome: https://fontawesome.com
<br>
<a target="_blank" href="https://icons8.com/icon/LRNHSg8YnQRx/close-window">Close Window</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
