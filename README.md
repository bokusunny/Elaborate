<!-- statusの読み取り専用tokenなのでベタ書きで大丈夫-->
# Elaborate
[![CircleCI](https://circleci.com/gh/bokusunny/Elaborate/tree/master.svg?style=svg&circle-token=8d7544d8acf5f6087de4c29987d454e2a9957357)](https://circleci.com/gh/bokusunny/Elaborate/tree/master)

A hosting, version controll service of documents. 

## Description
`Elaborate` is created by diverting the idea of Git into document development. It enables to host their documents centralizedly and to control their versions. In the progress is enabling you to collaborate on the same documents simultaneously and without overriding each other’s work. This application is for not only writers and coders but everyone who'd like to "elaborate" their documents.
## Demo
> TODO: β版完成時にここにDemoのgifを貼る.

## Requirement
- React 16.8+
- Redux 4.0+
- Webpack 4.29+
- Typescript 3.4+
- Firebase 5.9+

## Set up

### .env
Firebase config keys like below are required. But the config keys are NOT currently published. Please contact the author to get the keys.

```
FIREBASE_API_KEY=
FIREBASE_MESSAGING_SENDER_ID=
```
 
### building
```sh
$ git clone git@github.com:bokusunny/elaborate.git
$ npm install
$ npm run watch
```

## Author
- [Shota Yamazaki](https://github.com/sy-tencho)
- [Taishi Murakami](https://github.com/bokusunny)

## Content Strategist
- [Yuta Tsurusaki](https://github.com/yuta-tsurusaki)

## License
[MIT](http://b4b4r07.mit-license.org)
