## Variable Names

The variable naming convention used in this project is as follows:

`element{a?}_{x|y|w|h}{b?}`

Here,

- `element` can be `img`, `line` or `field`.
- `a` is an optional element ID that can take any value from the set of all elements.
- `x` and `y` are the coordinates.
- `w` and `h` represent the width and height of the element.
- `b` can be 1 or 2 depending on whether an element requires two sets of x/y coordinates, such as a line.

## Elements

There are three types of elements used in this project:

1. `ln` (line)
2. `img` (image)
3. `fd` (field)

## Line Generation

There are two TODO items related to line generation:

1. The lines are currently generated from bottom to top. This needs to be changed to generate lines from top to bottom.
2. Once the first TODO item is completed, all default templates need to be checked and updated as needed.