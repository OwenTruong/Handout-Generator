# Handout Generator

**(README WIP)**

Handout Generator was created to give more options to creating a handout like the ability to create a handout from the command line (TUI) and the ability to customize the template of the handout (ex. # of images, # of lines, # of textfields, their positions, their size and etc.). 

However, as of now, only the TUI portion of the feature has been implemented. Customizability will be added after the frontend is finished.

<br>

**Major Goals**
1. Create a website that will allow people to create custom templates and generate handouts using a GUI (also allow people to download the custom templates as JSON and allow the templates to be imported into the TUI version: handgen)
   1. Reason for the focus on a GUI for creating a template is because the only way to create a custom template without a GUI is to create a JSON file from scratch and importing that into the program via a flag, but that can be really annoying and frustrating to debug for the end user if something goes wrong.
2. Create the backend with user authentication & database for storing custom templates.




<hr style="border: 2px solid hsla(0, 0%, 25%, 1); background-color: hsla(0, 0%, 25%, 1)">

## Table Of Contents:
- [How To Install](#how-to-install)
- [Instructions on Executable](#instructions-on-executable)

<hr style="border: 2px solid hsla(0, 0%, 25%, 1); background-color: hsla(0, 0%, 25%, 1)">

## How To install:
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
