<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Vitta API</h3>

  <p align="center">
    The Vitta project RESTFul API
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is the RESTFul API for the Vitta project.

Details:
* This is designed for the mobile application
* It also support web or desktop applications

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

You should have aknowledge of the next tools to support this project:

* [NodeJS](https://nodejs.dev/)
* [expressjs](https://expressjs.com/)
* [Docker](https://www.docker.com/)
* [AWS EC2](https://aws.amazon.com/es/ec2/?trk=58ace84c-cd27-448f-9f64-ec1187db737b&sc_channel=ps&sc_campaign=acquisition&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Compute|EC2|LATAMO|ES|Text&s_kwcid=AL!4422!3!590500029739!e!!g!!cloud%20aws%20ec2&ef_id=Cj0KCQjw2MWVBhCQARIsAIjbwoMTFygY9m1RXpdl3KYxVSSYl-8AgTJO-wHdiftKskFtUkp-xu4VQpoaAqJGEALw_wcB:G:s&s_kwcid=AL!4422!3!590500029739!e!!g!!cloud%20aws%20ec2)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
This project is dockerized, you only need to buid, run and fork, it was made to avoid installing tools and get in troubble across the different operating systems.

### Prerequisites

This project requires NodeJS and Docker
* npm
  ```sh
  npm install npm@latest -g
  ```
* nodemon
  ```sh
  npm install nodemon -g
  ```

### Installation

_Follow the next steps to run the api_

1. Get a free API Key with the project admin
2. Clone the repo
   ```sh
   git clone https://github.com/Ventoqipa/vitta-backend
   ```
3. Enter your API in `.ENV`
   ```js
   const API_KEY = 'DUMMY_API_KEY';
   ```
4. Launch your docker desktop
5. Build the container
   ```sh
   docker-compose build
   ```
6. Run the app
   ```sh
   docker-compose up -d
   ```
7. Its done, now app is running at port 3000
8. To change from development mode, modify the port on `.ENV`
   ```js
   const APP_PORT = 9000;
   ```
   Install local packages:
   ```sh
   npm install
   ```
   Run with nodemon
   ```sh
   npm run dev
   ```
   And its done, now you can develop and follow the versioning section.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

@TODO connect with swagger

_swagger.io_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap
@TODO

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Versioning

Please follow the next development pipeline:
**You MUST NEVER commit to main, master, dev, neither stg branches**.

1. Clone the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing-feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact
@TODO

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Here you are interesting info to support the project!

* [Choose an Open Source License](https://choosealicense.com)

<p align="right">(<a href="#top">back to top</a>)</p>