
Package on npm -> https://www.npmjs.com/package/handgen

Will update readme for better documentation later (for library, executable and how the code works)

<br>

<hr style="border: 2px solid hsla(0, 0%, 25%, 1); background-color: hsla(0, 0%, 25%, 1)">

### How to install:
<ul>
  <li>Library: npm i handgen</li>
  <li>Executable: npm i -g handgen</li>
</ul>

<br>
<hr style="border: 1px solid hsla(0, 0%, 25%, 1); background-color: hsla(0, 0%, 25%, 1)">

### Instructions on Executable:

- handgen uses 4 flags: -i, -o, -default, -online
  - -i (required)
    - Specifies the path to the **asset directory** where all of the source images & pdfs are going to be at.
  - -o (optional)
    - Specifies the path of the **pdf file** produced by handgen
    - When flag is not specified, the default path is in the same directory handgen is executed, and the pdf name will be called "handout.pdf".
  - -default (optional)
    - Specifies the id of one of the default handout templates
    - When flag is not specified, the default ID will be "ThreeTraitLine".
  - -online (optional)
    - Not available yet, but it also specifies the id of a handout template from cloud.
    - When flag is not specified, the program will use the default template specified above in "-default".
    - <mark style="background-color: hsla(0, 100%, 80%, 0.7)">-default and -online may not be used as flags at the same time.</mark>
  



#### Default Template IDs (more explanation coming later):

<br>

  - OneTraitNothing
  - OneTraitLine
  - OneTraitField
  - OneScapeNothing

<br>

  - TwoTraitNothing
  - TwoScapeLine
  - TwoScapeField

<br>

  - ThreeTraitLine
  - ThreeTraitField
  - ThreeScapeLine
  - ThreeScapeField

<br>

  - FourTraitLine
  - FourScapeLine

<br>
