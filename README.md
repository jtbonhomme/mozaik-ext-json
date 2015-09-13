# Mozaïk JSON widget

This widget display data from JSON file in your [Mozaik](http://mozaik.rocks/) dashboard.

![json](https://raw.githubusercontent.com/jtbonhomme/mozaik-ext-json/master/preview/mozaik-ext-json.png)

## Installation

To install mozaik-ext-json from npm, run:

```bash
npm install --save mozaik-ext-json
```

## Configuration

Let's say you want to display two set of data from a file you host on your Dropbox public directory.

```javascript
{
  "obj1": {    
    "name": "Mozaik stock exchange",
    "value": 123,
    "unit": "USD"
  },
  "obj2": {    
    "name": "Mozaik last info",
    "value": "MOZAIK REALLY ROCKS !",
    "unit": null
  }
}
```

### api

In your Mozaik dashboard's config.js file, add the JSON file url in the <code>api</code> section. The <code>url</code> key shall contains the full URL where your JSON file is hosted:

```javascript
    // clients configs
    api: {
        json: {
            url: 'https://dl.dropboxusercontent.com/u/21352749/mozaik.json'
        }
    }
```

### parameters

key       | required | description
----------|----------|------------------------------------------------------------------------------
`type`    | yes      | *Always equal to 'json.data'*
`title`   | yes      | *The key path of the object value to be displayed in the header as a title.*
`value`   | yes      | *The key path of the object value to be displayed in the widget body.*
`unit`    | yes      | *Unit to be displayed after the data. Set to null if not needed.*

### usage

```javascript
  {
      type:  'json.data',
      title: 'obj1.name',
      value: 'obj1.value',
      unit:  'obj1.unit',
      columns: 1, rows: 1,
      x: 1, y: 1
  },
  {
      type:  'json.data',
      title: 'obj2.name',
      value: 'obj2.value',
      unit:  'obj2.unit',
      columns: 1, rows: 1,
      x: 2, y: 1
  }
```

