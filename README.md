# marvel-searchable-select-list
create a searchable select list that retrieves characters from [Marvel API](https://developer.marvel.com/docs#!/public/getCreatorCollection_get_0)

## Assumptions
* Used create-react-app for quicker bootstrapping.
* Dependent server is running on `localhost:1111` & responds to `http://localhost:1111/characters?nameStartsWith=`
* The app does not check for `window.navigator` property to detect device width. So, the layout changes on screen resize.

## Running the app
```bash
$ cd app
$ npm install
$ npm start
```

## Run Tests
```bash
$ cd app
$ npm test
```
