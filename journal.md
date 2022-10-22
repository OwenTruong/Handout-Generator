*Start of Journal*

10/20/22
- Today I debated inside myself whether to use class or typescript type for the drawImage helper function parameter. I ultimately decided to use class because it looks cleaner for the caller of the helper function. I can put everything on one line "new ImageProperty(...)".
  - Object destructuring does not look clean in TypeScript.
- I also tried RegEx, which I have not touched on in a while and it is annoying for sure.
- I created a loop for the drawImage helper function, that certainly reduced the code but I have to make it dynamic so it accepts a multitude of inputs. Maybe I should place the for loop in a ts module.
- What I should do next is figure out how to search for jpg, png and pdf formats dynamcially instead of me statically typing out "asset1.png".
- Also figure out how I can incorporate both functional and object oriented design in my code.
  - functional -> currying, composition, pure functions
  - object -> prototype class, typescript interface, delegation (not inheritance), extend by Object.create(superclass) 
    - Screw trying to mimic traditional oop, just do prototype oop


10/21/22
- How am I actually going to format my pages?
  - Leave pdf size as-is (default size). 
    - Portrait: width x height = 595 x 842 pt
    - Landscape: width x height = 842 x 595 pt
