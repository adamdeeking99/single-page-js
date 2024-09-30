const rootDiv = document.getElementById('root');


let usersDatabase = [];

// Function to render the sign-up form
function renderSignUp() {
    rootDiv.innerHTML = `

    <style>
            h1{
               text-align: center; 
               font-size: 48px;
            }

            label{
            font-size: 20px;
           padding-left: 370px;
           width: 240px;
           display: inline-block;
           text-align: right;
           padding-bottom: 10px;
            }

            #border{
            border-style: solid;
            border-color: rgb(52, 152, 246); 
            background-color: rgb(52, 152, 246);
            
            }
            
            
            button{
           display: block;
    margin-left: auto;
    margin-right: auto;

            
            }

            p{
            text-align: center;
            
            }
    </style>

            <div id="border">
        <h1>Sign Up</h1>
        <form id="signupForm">
            <label id="sabo" for="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name"><br>
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email"><br>
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password"><br>
            <button type="button" onclick="handleSignUp()">Sign Up</button>
            <p>Already have an account? <a href="#" onclick="renderLogin()">Login</a></p>
        </form>
        </div>
    `;
}

// Initial render of the sign-up form
renderSignUp();

let userName = ''; // To store the logged-in user's name

// Function to handle the sign-up process
function handleSignUp() {
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    if (nameInput && emailInput && passwordInput) {
        // Check if the user already exists in the "database"
        const existingUser = usersDatabase.find(user => user.email === emailInput);
        
        if (!existingUser) {
            // Add new user to the "database"
            usersDatabase.push({
                name: nameInput,
                email: emailInput,
                password: passwordInput
            });
            userName = nameInput; // Store the signed-up user's name
            renderHomePage(); // Move to the home page
        } else {
            alert('A user with this email already exists. Please log in.');
        }
    } else {
        alert('Please fill out all fields');
    }
}

// Function to render the login form
function renderLogin() {
    rootDiv.innerHTML = `
     <style>
            h1{
               text-align: center; 
               font-size: 48px;
            }

            label{
            font-size: 20px;
           padding-left: 370px;
           width: 240px;
           display: inline-block;
           text-align: right;
           padding-bottom: 10px;
            }

            #border{
            border-style: solid;
            border-color: rgb(52, 152, 246); 
            background-color: rgb(52, 152, 246);
            
            }
            
            
            button{
           display: block;
    margin-left: auto;
    margin-right: auto;

            
            }

            p{
            text-align: center;
            
            }
    </style>
    <div id="border">
        <h1>Login</h1>
        <form id="loginForm">
            <label for="email">Email:</label>
            <input type="email" id="loginEmail" placeholder="Enter your email"><br>
            <label for="password">Password:</label>
            <input type="password" id="loginPassword" placeholder="Enter your password"><br>
            <button type="button" onclick="handleLogin()">Login</button>
            <p>Don't have an account? <a href="#" onclick="renderSignUp()">Sign Up</a></p>
        </form>
        </div>
    `;
}

// Function to handle the login process
function handleLogin() {
    const emailInput = document.getElementById('loginEmail').value;
    const passwordInput = document.getElementById('loginPassword').value;

    if (emailInput && passwordInput) {
        // Check if user exists in the "database"
        const user = usersDatabase.find(user => user.email === emailInput && user.password === passwordInput);

        if (user) {
            userName = user.name; // Store the logged-in user's name
            renderHomePage(); // Move to the home page
        } else {
            alert('Invalid email or password.');
        }
    } else {
        alert('Please fill out all fields.');
    }
}

// Function to render the home page after successful login or sign-up
function renderHomePage() {
    rootDiv.innerHTML = `
        
    <style>

    h1{
    text-align: center;
    
    }
    #border{
            border-style: solid;
            border-color: rgb(52, 152, 246); 
            background-color: rgb(52, 152, 246);
            
            }

            </style>
        <div id="border">
        <h1>Welcome, ${userName}!</h1>
        <h2>Create a Post</h2>
        <textarea id="postContent" placeholder="What's on your mind?"></textarea><br>
        <button type="button" onclick="handleCreatePost()">Post</button>
        <h3>Your Posts</h3>
        <ul id="postList"></ul>
        <button type="button" onclick="logout()">Logout</button>
        </div>
    `;
}

// Array to store posts
let posts = [];

// Function to handle post creation
function handleCreatePost() {
    const postContent = document.getElementById('postContent').value;

    if (postContent) {
        posts.push(postContent); // Add the new post to the posts array
        renderPostList(); // Update the displayed post list
    } else {
        alert('Post content cannot be empty');
    }
}

// Function to render the list of posts
function renderPostList() {
    const postListElement = document.getElementById('postList');
    postListElement.innerHTML = ''; // Clear the current list

    posts.forEach((post) => {
        const postItem = document.createElement('li');
        postItem.textContent = post;
        postListElement.appendChild(postItem);
    });
}

// Function to handle logout
function logout() {
    userName = ''; // Clear the logged-in user's name
    renderLogin(); // Go back to the login page
}

// Function to render the list of posts with Edit and Delete buttons
function renderPostList() {
    const postListElement = document.getElementById('postList');
    postListElement.innerHTML = ''; // Clear the current list

    posts.forEach((post, index) => {
        const postItem = document.createElement('li');
        postItem.innerHTML = `
            ${post}
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
        `;
        postListElement.appendChild(postItem);
    });
}

// Function to handle post deletion
function deletePost(index) {
    posts.splice(index, 1); // Remove the post at the given index
    renderPostList(); // Update the displayed post list
}

// Function to handle post editing
function editPost(index) {
    const newContent = prompt("Edit your post:", posts[index]); // Get new content via prompt
    if (newContent !== null) { // If the user didn't cancel the prompt
        posts[index] = newContent; // Update the post content
        renderPostList(); // Update the displayed post list
    }
}
