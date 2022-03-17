# Telemarketing files validator

It’s a browser based debugging application that inspects files to be uploaded in Salesforce and returns error messages. Agencies are supposed to use it before uploading files. Greenpeace Spain will maintain it.

## History

This application was started in September 2016 as a temporary solution to solve the problem of frequent issues with files to be uploaded in Salesforce. It was supposed to be abandoned in 2021, but it had a revival in 2022 as we are updating the file formats with 3 agencies.

## Hosted validator

* [Production](https://colabora.greenpeace.es/validador-nuevas-tipificaciones/) - Shared with agencies and used often.
* [Development](https://colabora-dev.greenpeace.es/validador-nueva-tipificacion/) - Internal to Greenpeace to test.

## Host it locally for development

It's just static web pages without database or API.

**Requirements:**

* [Node, npm](https://nodejs.org/)
* [Gulp](https://gulpjs.com/)

First, clone this repository. Then run in the repository's root:

```bash
npm install
gulp
```

## Launch a local server

Run on the repository's root:

```bash
python3 -m http.server
```

And go to [localhost:8000](http://localhost:8000/)

## Edit the validators rules

The folder `validators` contain the file specific validators rules.

The file `src/js/tlmkValidator.js` is a general library with an object that's inherited by all specific file validators. This object is inherited and can be overwriten.

Other code is in the `src` folder.

## License and use

This software is fit-for-purpose but you can modify it for your own needs under the GPLv3 license. Due to it's nature we will not accept pull requests.

The Greenpeace logo on top of each page is trademarked by Greenpeace and can't be used outside Greenpeace.
