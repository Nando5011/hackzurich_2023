<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Nando5011/hackzurich_2023">
    <img src="images/logos/logo_512_transparent.png" alt="Logo" width="100" height="100">
  </a>
<h3 align="center">BreakWise</h3>
  <p align="center">
    Smart Breaks. Productive Days.
    <br />
    <br />

</div>




<!-- ABOUT THE PROJECT -->
## About The Project

By analyzing keylogger data, we can detect how productive a user is at any given time. Based on this data we can suggest breaks to the user, which will help them to stay productive troughout the day. 

Additionaly we can detect how much time any appliocation is used and therefore simplify the task of time tracking.

In order to protect the users privacy, all the keylogger data is stored locally on the users device and is only used to extract metrics about the users state of productivity. The only data that is sent to servers is the resulting metrics.

### Built With
BreakWise can be split in two parts: The Software on the users working device and the webapp, which is used to display the metrics. 

#### Backend
[![Python3][python.org]][python-url]

The logging software is written in python3 using [pynput](https://pypi.org/project/pynput/)

#### Frontend
[![React][React.js]][React-url]
[![Framework 7][framework7.io]][Framework-Url]
[![Vite][vitejs.dev]][vite-url]
[![Firebase][firebase.google.com]][firebase-url]

The webapp is written in [React.js](https://reactjs.org/) using [Framework7](https://framework7.io/) and [Vite](https://vitejs.dev/). The data is stored in a [Firebase](https://firebase.google.com/) database.

<!-- GETTING STARTED -->
## Getting Started

In order to use BreakWise you only need to install the logging software on your device and create an account on the webapp.

### Unix

1. Create python3 virtual environment
  ```sh
  python3 -m venv venv
  ```

2. Activate virtual environment
  ```sh
  source venv/bin/activate
  ```

3. Install requirements
  ```sh
  pip install -r SWA/requirements.txt
  ```

4. Run the app
  ```sh
  python3 main.py
  ```

### Windows
1. Create python3 virtual environment
  ```sh
  python3 -m venv venv
  ```

2. Activate virtual environment
  ```sh
  venv\Scripts\activate.bat
  ```
3. Install requirements
  ```sh
  pip install -r SWA/requirements.txt
  ```

4. Run the app
  ```sh
  python3 main.py
  ```


<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_


![Product Name Screen Shot][product-screenshot]



<!-- ROADMAP -->
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/Nando5011/hackzurich_2023/issues) for a full list of proposed features (and known issues).





<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* Jerry ...
* Nando Imboden (@Nando5011)
* Florian Thiévent (@0x49b)
* Leo Hofer ([leohofer.dev](https://leohofer.dev))





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Nando5011/hackzurich_2023.svg?style=for-the-badge
[contributors-url]: https://github.com/Nando5011/hackzurich_2023/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Nando5011/hackzurich_2023.svg?style=for-the-badge
[forks-url]: https://github.com/Nando5011/hackzurich_2023/network/members
[stars-shield]: https://img.shields.io/github/stars/Nando5011/hackzurich_2023.svg?style=for-the-badge
[stars-url]: https://github.com/Nando5011/hackzurich_2023/stargazers
[issues-shield]: https://img.shields.io/github/issues/Nando5011/hackzurich_2023.svg?style=for-the-badge
[issues-url]: https://github.com/Nando5011/hackzurich_2023/issues
[license-shield]: https://img.shields.io/github/license/Nando5011/hackzurich_2023.svg?style=for-the-badge
[license-url]: https://github.com/Nando5011/hackzurich_2023/blob/master/LICENSE.txt
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[framework7.io]: https://img.shields.io/badge/Framework7-000000?style=for-the-badge&logo=framework7&logoColor=white
[Framework-Url]: https://framework7.io/
[vitejs.dev]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[vite-url]: https://vitejs.dev/

[firebase.google.com]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black

[firebase-url]: https://firebase.google.com/

[python.org]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[python-url]: https://www.python.org/

[product-screenshot]: images/screenshot.png