
[![Header](https://user-images.githubusercontent.com/22147116/235910240-79ed7e10-865a-4517-9830-b3109448bf52.png)](https://user-images.githubusercontent.com)

<h2>Overview</h2>
OtterBeat is a new music platform that allows people to search for their favorite artists’ songs catalog <br><br>

| Home Page | Songs List Page | Top Charts Page | Navbar |
| ------------- | ------------- | ------------- | ------------- |
| <p align="center"><img width="250" alt="Screen Shot 2023-01-06 at 11 00 23" src="https://github.com/LiorAtiya/OtterBeat/assets/22147116/0ace0790-4e0a-4223-bdcf-54134f37a3ee"></p>  | <p align="center"><img width="250" alt="Screen Shot 2023-01-06 at 11 00 43" src="https://github.com/LiorAtiya/OtterBeat/assets/22147116/e327ae29-00f1-4cf1-8f11-e7d58c1f87b2"></p>  | <p align="center"><img width="250" alt="Screen Shot 2023-01-06 at 11 00 23" src="https://github.com/LiorAtiya/OtterBeat/assets/22147116/a2c08d5c-170e-4379-a087-ec761a646bf8"></p>  | <p align="center"><img width="250" alt="Screen Shot 2023-01-06 at 11 00 43" src="https://github.com/LiorAtiya/OtterBeat/assets/22147116/cb27dc43-2633-4c25-a7fd-1435cf1570f5"></p>  |

<h2>SQL Tables Diagrams</h2>
<p align="center"><img width="600" alt="Screenshot 2023-10-13 at 12 37 18" src="https://github.com/LiorAtiya/OtterBeat/assets/22147116/db36aba6-ef95-4fb4-8fea-2d21c43de599"></p>

<h2>Getting Started</h2>

Clone the repository
   ```sh
   git clone https://github.com/LiorAtiya/OtterBeat.git
   ```
Install NPM packages (main folder, Back-end folder, Front-end folder
   ```sh
   npm install
   ```
Go to Front-end -> src -> api -> routes.js <br>
change route in constructor to
   ```sh
   route: 'http://localhost:3010'
   ```
Go to Back-end -> Models -> connections.js <br>
   change to
  ```sh
   const postgresConnect = new Pool({
    user: YOUR_USER,
    host: YOUR_HOST,
    database: YOUR_DATABASE,
    password: YOUR_PASSWORD,
    port: YOUR_PORT,
   });
  ```
<h3> For Localhost: </h3>
1. Download postgreSQL & Redis

<h3> For Docker: </h3>
1. Download Docker <br>
2. Go to back-end folder -> Running for the first time:

  ```sh
  docker-compose up --build -d
   ```

3. The runner after the first time:

  ```sh
   docker-compose up -d
   ```

<h3> For All: </h3>

1. Run the project
 ```sh
 npm run dev
 ```

2. To create the SQL tables and insert the information into them, Go to the site in a browser
  ```sh
   http://localhost:3010/create
   ```

<h2>Technologies</h2>

<span>
  <img src="https://user-images.githubusercontent.com/68508896/192110139-17516596-8625-46be-8f8a-1f75f5f11a50.png" title="Java Script" alt="js" height="80"/>
  <img src="https://user-images.githubusercontent.com/68508896/192110164-3cc0735d-a0b6-4b74-a3cc-dd29f730b34b.png" title="CSS" alt="css" height="80"/>
  <img src="https://user-images.githubusercontent.com/68508896/192110177-06b7c17a-0317-40d7-9ba2-d5f1d8f708dc.png" title="Html" alt="html" height="80"/>
  <img src="https://user-images.githubusercontent.com/68508896/192110208-46336dc4-59cf-486a-8cab-21d0990aee04.png" title="NodeJS" alt="nodejs" height="80"/>
  <img src="https://user-images.githubusercontent.com/68508896/192110399-78e8e720-449d-433e-aed0-9b48257cbb87.png" title="ExpressJS" alt="expressjs" height="80"/>
  <img src="https://user-images.githubusercontent.com/22147116/210971066-a21c5364-df69-4ec4-8b02-1ed5545cd9a0.png" title="React" alt="react" height="80"/>
  <img src="https://user-images.githubusercontent.com/22147116/219132005-9231b0b1-6524-4693-97bb-bebf5efa343d.png" title="postgreSQL" alt="postgreSQL" height="80"/>
  <img src="https://github.com/LiorAtiya/OtterBeat/assets/22147116/fa9d74ad-2d8a-4eae-8475-8dcc90f9566a.png" title="Docker" alt="Docker" height="80"/>
  <img src="https://github.com/LiorAtiya/OtterBeat/assets/22147116/3bfea55a-6482-4a17-a85e-3ef460f7f182.png" title="Redis" alt="Redis" height="80"/>
  <img src="https://github.com/LiorAtiya/OtterBeat/assets/22147116/a70a0df7-570c-44f4-a647-a5ab9d5ea8bf" title="vite" alt="vite" height="80"/>
  <img src="https://github.com/LiorAtiya/OtterBeat/assets/22147116/bdc9007f-b223-4119-9932-bca6b6d77cb7" title="tailwind" alt="tailwind" height="80"/>

</span>
