## This project is test project with Playwright. 

Tests possible run locally or in the Docker container.
Setup make to run tests only on chromium.
Test object : https://demo.saas-3.veriff.me/

In order to set browser any other browser see the `playwright.config.js` file and update part of projects.

## Getting Started

Follow steps to execute test locally.

1. Clone this project

```bash
$ git clone --depth 1 https://github.com/Shyam-Chen/Playwright-Starter.git <PROJECT_NAME>
$ cd <PROJECT_NAME>
$ git clone https://github.com/
$ cd playwright-docker-test
$ docker-compose run playwright bash
```

2. Install dependencies. [Playwright install docs](https://playwright.dev/docs/intro)

```bash
$ npm init playwright@latest
```

3. Run test locally. [Playwright test run docs](https://playwright.dev/docs/intro#command-line)

```bash
$ npx playwright test
```

4. Open last report

```bash
$ npx playwright show-report test-report
```

## Test plan

As plan was check:
- [x] Test without selected document type, language
- [x] Tests with context, redirect type view
- [x] Test with manually input of name
- [x] Test with selected document type
- [x] Test with selected language
- [x] Test with browser local check
- [] Test with changed geo positions
- [] Test link on legal/data processing
- [] Test to check API session token 