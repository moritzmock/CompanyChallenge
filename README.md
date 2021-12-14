# Company Challenge

Automatically generated test cases for web pages
using Selenium and JavaScript to verify that all URLs are usable.
## Table of content

- [Usage](#usage)
- [Learn more](#learn-more)
- [Development](#development)
- [Information](#information)

## Usage

### Prerequisites

- [NPM](https://www.npmjs.com)
- [Selenium WebDriver](https://www.selenium.dev/documentation/webdriver/)

### Setup

Install all dependencies by executing the following command:

```bash
npm ci
```

By adding webpages of interest modify the file "websites.properties".

Next, you can start the application:

```bash
npm start

or 

npm run testCC
```

The project will load all URL and crawl the URLs in use based on the defines settings file (settings/HTMLTags.properties).

The second command will generate testcases based on the file "websites.properties".

## Learn more

To learn more about Selenium, take a look at the following resource:

- [Selenium](https://www.selenium.dev/)


## Development

For linting the source files, execute the following command:

```bash
npm run lint

# or

npm run lint:fix
```

For running the tests, execute the following command:

```bash
npm run testSetup
```

## Information

This repository is the outcome of the company challenge of the
lecture Advanced Software Design Techniques with the professor 
Eduardo Martins Guerra at the Free University of Bolzano. 
The project was implemented for the company
[Catch Solve](https://www.catch-solve.tech/en/home).

### License

The MIT License (MIT). Please see the [license file](license.md) for more information.