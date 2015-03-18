# stormpath-express-profile-example

*A sample Express-Stormpath project that showcases how to store profile data in
customData.*


## Purpose

This is a small sample application that uses:

- [Express][]
- [Express-Stormpath][]
- [Jade][]

What it does is pretty simple: it's a basic application that allows you to
create new users, and store simple profile information in the user account using
[Stormpath][].

The purpose of this application is to demonstrate how to store additional data
in a Stormpath user account.


## Usage

To get started, you need to clone this project:

```console
$ git clone https://github.com/stormpath/stormpath-express-profile-example.git
```

Next, change into the project directory and install all Node dependencies:

```console
$ cd stormpath-express-profile-example
$ npm install
```

After that, all you need to do is specify your Stormpath API credentials as
environment variables, like so:

```console
$ export STORMPATH_API_KEY_ID=xxx
$ export STORMPATH_API_KEY_SECRET=xxx
$ export STORMPATH_APPLICATION_HREF=https://api.stormpath.com/v1/applications/xxx
```

**NOTE**: You need to have created a Stormpath Application for the above to
work.  You'll then copy the Application href into the proper environment
variable.

Lastly, start up the app and visit `http://localhost:3000` in your browser to
play around with it!

```console
$ npm start
```


## Questions?

If you have any questions or need assistance, please email us!  Our address is:
[support@stormpath.com][].


  [Express]: http://expressjs.com/ "Express"
  [Express-Stormpath]: https://docs.stormpath.com/nodejs/express/ "Express-Stormpath"
  [Jade]: http://jade-lang.com/ "Jade"
  [Stormpath]: https://stormpath.com/ "Stormpath"
  [support@stormpath.com]: mailto:support@stormpath.com "Stormpath Support Email"
