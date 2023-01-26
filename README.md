
Package on npm -> https://www.npmjs.com/package/handgen

Will update readme for better documentation later (for library, executable and how the code works)

<br>

<hr style="border: 2px solid hsla(0, 0%, 25%, 1); background-color: hsla(0, 0%, 25%, 1)">

## How to install:
<ul>
  <li>Library: npm i handgen</li>
  <li>Executable: npm i -g handgen</li>
</ul>

<br>
<hr style="border: 1px solid hsla(0, 0%, 25%, 1); background-color: hsla(0, 0%, 25%, 1)">

## Instructions on Executable:

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

<br>

### Default Template IDs:

#### **One Image Per Page**
  - OneTraitNothing
    - A portrait mode template with only one giant [picture](./documentation/definition.md) in the center.
  - OneTraitLine
    - A portrait mode template with one giant picture and some [lines](./documentation/definition.md).
  - OneTraitField
    - A portrait mode template with one giant picture and a [textfield](./documentation/definition.md).
  - OneScapeNothing
    - A landscape mode template with only one giant picture in the center. 

#### **Two Image Per Page**
  - TwoTraitNothing
    - A portrait mode template with two pictures, one picture on top and one picture on bottom.
  - TwoScapeLine
    - A landscape mode template with two pictures, one picture to the left and one picture to the right, and contain lines below each picture.
  - TwoScapeField
    - A landscape mode template with two pictures, one picture to the left and one picture to the right, and contain a field below each picture.

#### **Three Image Per Page**
  - ThreeTraitLine **[DEFAULT]**
    - A portrait mode template with three pictures to the left and lines to the right of each picture.
  - ThreeTraitField
    - A portrait mode template with three pictures to the left and a textfield to the right of each picture.
  - ThreeScapeLine
    - A landscape mode template with three pictures and lines below each picture.
  - ThreeScapeField
    - A landscape mode template with three pictures and a textfield below each picture.

#### **Four Image Per Page**
  - FourTraitNothing
    - A portrait mode template with only four pictures evenly spaced.
  - FourScapeNothing
    - A landscape mode template with only four pictures evenly spaced.

<br>
