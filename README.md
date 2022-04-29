### Prerequisites
1. Node.js
2. Docker (optional)

### Installation
1. Start by cloning this repo.
```bash
git clone https://github.com/Sharleyovsky/movies-api-express.git
```
2. Enter the project's directory in a terminal choose the way you want to start the app and enter the commands provided below.

#### Running app locally
1. ``npm i``
2. ``npm start``

#### Running app with a docker
1. ``docker build -t movies-api-express``
2. ``docker run -d --name movies-api-express -p 3000:3000 movies-api-express``
3. To stop the container run ``docker stop movies-api-express``.

#### Checking server's status
1. Use the command below to check if you are getting back ``Server is running!`` message.
```bash
    curl http://localhost:3000/healthCheck
```


