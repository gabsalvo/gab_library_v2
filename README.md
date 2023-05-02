GAB LIBRARY

1. Clone the Git repository: First, make sure you've got Git installed on the other laptop. Then, open up the terminal and run git clone <your-repo-url> to clone your project repository. This will create a local copy of your project, including the Dockerfile, docker-compose.yml, and all the other necessary files.

2. Install Docker and Docker Compose: Next, you need to check if Docker and Docker Compose are installed on the other laptop. If not, go ahead and follow the official installation guides for Docker and Docker Compose.

3. Navigate to the project directory: Once everything's installed, use the terminal to navigate to the directory where you cloned your project. It should be something like cd <your-project-folder>.

4. Build and run the containers: Now, all you have to do is run sudo docker-compose up --build. This command will use the Dockerfile and docker-compose.yml files to build the images and create the necessary containers. Make sure any environment variables or configurations your app needs are set up on this laptop as well.

5. Test the app: When the containers are up and running, you can access your app in a browser or use any other method you usually use to interact with it. Give it a test run and make sure everything's working as expected. If you run into any issues, you'll need to debug them.

upgrade to the latest npm version
In the root folder touch .env and micro .env, REACT_APP_API_BASE_URL=http://localhost:3001
