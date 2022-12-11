_Start of Journal_

10/20/22

- Today I debated inside myself whether to use class or typescript type for the draw helper function parameter. I ultimately decided to use class because it looks cleaner for the caller of the helper function. I can put everything on one line "new ImageProperty(...)".
  - Object destructuring does not look clean in TypeScript.
- I also tried RegEx, which I have not touched on in a while and it is annoying for sure.
- I created a loop for the draw helper function, that certainly reduced the code but I have to make it dynamic so it accepts a multitude of inputs. Maybe I should place the for loop in a ts module.
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

10/22/22

- It is so difficult to use typescript. I have to really balance readability and dynamics.
- Oh another note, make sure to take into account when the template and the number of actual images do not match.
- I refactored a lot of things and moved a bunch of functions in PDF.ts to classes, functions and types folder.
- Now it is time to think about what I am going to expose for my PDF class.

- PDF class is fairly limiting. It is essentially a disposable..
- I have decided to dump everything in createPDF() for now as I have no idea on how exactly I should continue progressing.
  - I really need to plan ahead instead of what I am doing right now where I build from ground up the smaller helper functions first instead of the big "controller" functions first.

10/23/22

- Typescript has been annoying. It is meant to make you feel more secured about the "rightness" of your code, but it has only slowed down my speed due to my fear of writing bad code. The irony.
- I finally got pdf kinda knocked out. I wanted to set up nodejs debugger with webpack and typescript, but realized how much of a pain that was.
- Next I have to confirm if createPDF works with multi-paged templates.
  - Also, we should start thinking about how I can refactor it so I don't rely on fs outside of nodejs (browser side)
- Then I create lines...

- It is a pain to make my code both nodejs and browser friendly. That is why I created a class that will handle that... OpaqueEnv...

- I might want to explore resolve.alias to make imports look more slick.

10/24/22

- Maybe type files should be used as a guide in PDF.ts, then we can implement all the variables in their respective class.

10/25/22

- I believe what I should do is guard against types in the fact that the object assigned a type might NOT contain all the values in the type... and I should absolutely not use the object until I convert it to a class.

10/26/22

- Screw the types, I believe I should treat unknown objects as unknown. We need to implement a way for classes to find out if all the properties of a type exist.
- A lower class can not import from a higher class. Example, LineC can not import TemplateC or PageC

- We should convert types to interfaces first (actually what is the difference firs to of all).
  - Then we need to change the classes (we also need to implement a way to check for errors in object and a way to handle it).
    - Refactor the rest of the codebase

10/27/22

- I need to research the difference between type alias and interface in TypeScript. Does an interface know when an object is missing some properties?
- After a short test to find the difference between type alias and interface, I have come to the conclusion that there is no easy way to check for types in runtime.
  - I will make the decision to only use classes and not types for operations. I am not allowed to rollback on this decision for this project.

10/30/22

- It really is a question on how much knowledge and responsibility a component have when it comes to properties and methods. I don't know if I should create the font outside or inside of TextC...

  - It is more of a question of how much I want to abstract from the outside perspective. Where to do the async call outside or defer it to a method in TextC.
    - I believe it will be in my best interest to give TextC the responsibility.
  - Why don't I just remove the option to choose font family? I feel like I am getting stuck on useless part and giving more choice to a user could be counterproductive.

  11/29 AM

  - We are finally almost done with NodeJS implementation. Last things we need to do is to write up the other templates, and to refactor some of my codes to its functional equivalent, and we also need to source the error checking to another location. Maybe we should also implement a global state called pdfDoc... since it is used everywhere and it is always the same pdfDoc.
  - One of the things I am considering is instead of making my HANDOUT-GENERATOR folder look bloated by having both nodejs and browser code mixed together, I should upload my nodejs code as an npm package, and then install my nodejs package from a separate browser project folder.

10/31/22

- Looks like I am not really "done done". I need to implement TextField, fix some stuff in createPDF and also change things around in defaults because I do not want to manually type everything... less I make changes in the future and make a living hell for myself.
- 1 template down regardless.

11/2/22

- I believe each page should have their own dimensions. If it is not specified in template, we set a default one


11/15/22
- It has been a while since I have written a journal but progress is being made. I wish to finish the nodejs implementation by the end of Thanksgiving Friday night 11:59pm.
- The remaining things to do is to get all of the templates working, add the ability to embed pdf (multi page pdf and multiple pdfs), and to refactor my code to make it more functional, and to adjust my codebase a little bit and then publish it as an npm library.
  - The question is if it would be possible to have both the nodejs interface and the npm library at the same time.

11/24/22
- Almost there, just OneImage and mess around with config

11/25/22
- Unfortunately, I ran out of time to work on it during thanksgiving

12/3/22
- I am currently working on another project so recent development has been a little bit sloppy. Tomorrow, work on piecing the OneImage template together.

12/9/22
- The plan was to create the nodejs version with all of the logics in place, and then work on the browser version, and then finally the backend side. However, after two months, I don't have enough drive for this project to brainstorm on how I can make my project special and be worthwhile for others to use. I will suspend the project after finishing up the nodejs implementation and after writing a documentation for this project.