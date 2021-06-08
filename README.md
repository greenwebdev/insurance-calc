# InsuranceCalc

Monthly premium calculator, based on personal details and occupation.

## Assumptions

* Since Date of Birth is on the form, we do not require the user to enter their age. Instead we display their age in the results section for clarity.
* Age should be limited to 18 and older. As I ran out of time, there is no validation for this at present.
* Death Cover Amount in the calculation is the same as Death - Sum Insured.

### Notes
* As this is for a front end role, I have created a JSON server to simulate the initial config data, but the calculation itself is done inside the component. This would be done via the real API in a real world environment.
* There are some unit tests covering functionality. With more time, there would ideally be more coverage.
* The calculation appears to be incorrect to me, as the monthly premiums do not resemble quotes I have seen online. Nevertheless, the formula has been followed as instructed.

## App

You will need to start both the API and the development server to test this application. If you run the development server without the API, an error message will be displayed and the form cannot be used.

### Install after Clone

Run `npm install` to get everything setup.

### API server

Run `npx json-server --watch db.json --port 4242` to start the simple API. Without this the app will not load data.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Other Notes

Colour palette generated for this project: [coolors.co](https://coolors.co/d6ead9-87bba2-55828b-f2f7f7-364958).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.
