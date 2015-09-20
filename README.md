# Mozaïk JSON widget

This widget display data from JSON file in your [Mozaik](http://mozaik.rocks/) dashboard.
This JSON file may be either a static hosted file or a JSON object fetched from a REST API.

![json](https://raw.githubusercontent.com/jtbonhomme/mozaik-ext-json/master/preview/mozaik-ext-json.png)

## Installation

To install mozaik-ext-json from npm, run:

```bash
npm install --save mozaik-ext-json
```

## Configuration

### Static hosted file

Let's say you want to display two set of data from a file you host on your Dropbox public directory.

#### JSON file

```javascript
  {
      type:  'json.data',
      title: '${obj2.name}',
      value: '${obj2.value}',
      unit:  null,
      columns: 1, rows: 1,
      x: 1, y: 1
  },
  {
      type:  'json.data',
      title: 'WIDGET TITLE',
      value: '${obj1.value}',
      unit:  '${obj1.unit}',
          columns: 1, rows: 1,
      x: 2, y: 1
  },
```

#### api

In your Mozaik dashboard's config.js file, add the JSON file url in the <code>api</code> section. The <code>url</code> key shall contains the full URL where your JSON file is hosted:

```javascript
    // clients configs
    api: {
        json: {
            url: 'https://dl.dropboxusercontent.com/u/21352749/mozaik.json'
        }
    }
```

### JSON data fetched from REST API

In your Mozaik dashboard's config.js file, add the webservice url in the <code>api</code> section. The <code>url</code> key shall contains the full URL where your webservice is hosted. An optionnal headers key can be added (to add authentication information for example):

```javascript
    // clients configs
    api: {
        json: {
            url: 'http://mywebservice/rest/api/2/resource/id',
            headers: [{name: 'Authorization', value: 'Basic aKjs6LK8ijkSfT'}, {name: 'Content-type', value: 'applicatin/json'}]
        }
    }
```

### parameters

<code>title</code>, <code>value</code> and <code>unit</code> parameters can be either a String or a property path to be retrieve in the JSON data.

key       | required | description
----------|----------|-------------------------------------------------------------------
`type`    | yes      | *Always equal to 'json.data'*
`title`   | yes      | *The title to be displayed in the header.*
`value`   | yes      | *The value to be displayed in the widget body.*
`unit`    | yes      | *Unit to be displayed after the data. Set to null if not needed.*

### usage

```javascript
  {
      type:  'json.data',
      title: 'THIS IS A TITLE',
      value: '${obj1.value}',
      unit:  '${obj1.unit}',
      columns: 1, rows: 1,
      x: 1, y: 1
  },
  {
      type:  'json.data',
      title: '${obj2.name}',
      value: '${obj2.value}',
      unit:  null,
      columns: 1, rows: 1,
      x: 2, y: 1
  }
```

