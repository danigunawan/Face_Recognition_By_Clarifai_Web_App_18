# Face Recognition App
https://face-web-app.herokuapp.com/ </br> </br>
Face recognition (using Clarifai API) project. </br> 
Front-end: CSS, CSS Grid, React, Tachyons. </br>
Back-end: Node.js, Express.js. </br>
Database: PostgreSQL.

This is a web application that recognizes the face in a photo. To recognize the face, we must be logged in. If we don't have an account, we can register. After registration, our data is added to the PostgreSQL database. Each account has an individual face counter, which is increment after face detection. We can't register two users with the same email. We also can't log in with data that doesn't exist in the database.
