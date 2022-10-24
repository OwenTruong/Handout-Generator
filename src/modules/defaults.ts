export const d3_print_portrait = {
  "name": "Default 3 Portrait Print",

  "pages": [
    {
      "lines": [
        {
          "x1": 300,
          "y1": 200,
          "x2": 400,
          "y2": 200
        },
        {
          "x1": 300,
          "y1": 300,
          "x2": 400,
          "y2": 300
        },
        {
          "x1": 300,
          "y1": 300,
          "x2": 400,
          "y2": 300
        }
      ],

      "images": [
        {
          "x": 50,
          "y": 582,
          "width": 240,
          "height": 180
        },
        { // [(y1 - [y3 + height]) / 2] + [y3 + height]
          // (y1)/2 + [y3 + height]/2 = [y1 + y3 + height] / 2
          "x": 50,
          "y": 331,
          "width": 240,
          "height": 180
        },
        {
          "x": 50,
          "y": 80,
          "width": 240,
          "height": 180
        }
      ],
    }
  ]
}

export const testD = {
  "name": "test",

  "pages": [
    {
      "lines": [
        {
          "x1": 300,
          "y1": 200,
        },
        {
          "x1": 300,
          "y1": 300,
          "x2": 400,
          "y2": 300
        },
        {
          "x1": 300,
          "y1": 300,
          "x2": 400,
          "y2": 300
        }
      ],

      "images": [
        {
          "x": 50,
          "y": 582,
          "width": 240,
          "height": 180
        },
        {
          "x": 50,
          "y": 331,
          "width": 240,
          "height": 180
        },
        {
          "x": 50,
          "y": 80,
          "width": 240,
          "height": 180
        }
      ],
    },
    {
      "lines": [],

      "images": [
        {
          "x": 300,
          "y": 582,
          "width": 240,
          "height": 180
        },
        {
          "x": 300,
          "y": 331,
          "width": 240,
          "height": 180
        },
        {
          "x": 300,
          "y": 80,
          "width": 240,
          "height": 180
        }
      ],
    }
  ]
}