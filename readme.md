creating instagram clone --- using html css js and express and mysql

1) first create a home route for page where show all posts 
at home page list of all posts of igdata table in DB
posts are store into 2 table :- 
1: igdata where all posts are saved   2: selfposts where stored only self uploaded posts



2) challange in storing posts images into backend 
for this we use multer package :-
Multer simplifies the process of handling file uploads. It allows you to receive files from client-side forms and handle them on the server.

3) at home page we have a button for create new post 
that button goes to create route and create route render a create.ejs on that page we borrow a details from user like image and caption .username was same and id will genrate automatically  and this post will store into igdata as well as selfpost table in DB.

4) on home page we have another button called your posts 
where we show the list of selfposts table in DB 