# Handout Generator

## Bugs:
- Some pdf pages come out with the wrong orientation in the final handout.pdf
  - I am unable to find a smooth solution. The pdf-lib library I use has not been maintained for 2 years. If a slide is in the wrong rotation, only way is to rotate every single slide/page of the powerpoint/pdf manually or by using a program.

## To Add:
- Support for pptx

<hr style="border: 2px solid hsla(0, 0%, 25%, 1); background-color: hsla(0, 0%, 25%, 1)">

**(README WIP)**

Handout Generator was created to give more options to creating a handout like the ability to create a handout from the command line (TUI) and the ability to customize the template of the handout (ex. # of images, # of lines, # of textfields, their positions, their size and etc.). 

However, as of now, only the TUI portion of the feature has been implemented. Customizability will be added after the frontend is finished.

<br>

**Major Goals**
1. Create a website that will allow people to create custom templates and generate handouts using a GUI (also allow people to download the custom templates as JSON and allow the templates to be imported into the TUI version: handgen)
   1. Reason on the focus for a GUI to create templates is because the only way I can think of to create a custom template without a GUI is to create a JSON file from scratch and importing that into the program via a flag, but that can be really annoying and frustrating to debug for the end user if something goes wrong.
2. Create the backend with user authentication & database for storing custom templates.




<hr style="border: 2px solid hsla(0, 0%, 25%, 1); background-color: hsla(0, 0%, 25%, 1)">

## Table Of Contents:
- [Handout Generator](#handout-generator)
  - [Bugs:](#bugs)
  - [To Add:](#to-add)
  - [Table Of Contents:](#table-of-contents)
  - [How To install:](#how-to-install)
  - [Instructions for Global Installation:](#instructions-for-global-installation)
    - [Default Template IDs:](#default-template-ids)
      - [**One Image Per Page**](#one-image-per-page)
      - [**Two Image Per Page**](#two-image-per-page)
      - [**Three Image Per Page**](#three-image-per-page)
      - [**Four Image Per Page**](#four-image-per-page)
  - [Fundamentals - How It Works](#fundamentals---how-it-works)
    - [What is a template?](#what-is-a-template)
    - [Page Template](#page-template)
    - [Pictures](#pictures)
    - [Lines](#lines)
    - [Textfield](#textfield)
    - [Page Number](#page-number)
  - [Explanation for Handout Class](#explanation-for-handout-class)

<hr style="border: 2px solid hsla(0, 0%, 25%, 1); background-color: hsla(0, 0%, 25%, 1)">

## How To install:
<ul>
  <li>Library: npm i handgen</li>
  <li>Executable: npm i -g handgen</li>
</ul>

<br>
<hr style="border: 2px solid hsla(0, 0%, 25%, 1); background-color: hsla(0, 0%, 25%, 1)">

## Instructions for Global Installation:

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
  - [OneTraitNothing](./examples/OneTraitNothing.pdf)
    - A portrait mode template with only one giant [picture](./documentation/definition.md) in the center.
  - [OneTraitLine](./examples/OneTraitLine.pdf)
    - A portrait mode template with one giant picture and some [lines](./documentation/definition.md).
  - [OneTraitField](./examples/OneTraitField.pdf)
    - A portrait mode template with one giant picture and a [textfield](./documentation/definition.md).
  - [OneScapeNothing](./examples/OneScapeNothing.pdf)
    - A landscape mode template with only one giant picture in the center. 

#### **Two Image Per Page**
  - [TwoTraitNothing](./examples/TwoTraitNothing.pdf)
    - A portrait mode template with two pictures, one picture on top and one picture on bottom.
  - [TwoScapeLine](./examples/TwoScapeLine.pdf)
    - A landscape mode template with two pictures, one picture to the left and one picture to the right, and contain lines below each picture.
  - [TwoScapeField](./examples/TwoScapeField.pdf)
    - A landscape mode template with two pictures, one picture to the left and one picture to the right, and contain a field below each picture.

#### **Three Image Per Page**
  - [ThreeTraitLine](./examples/ThreeTraitLine.pdf) **[DEFAULT]**
    - A portrait mode template with three pictures to the left and lines to the right of each picture.
  - [ThreeTraitField](./examples/ThreeTraitField.pdf)
    - A portrait mode template with three pictures to the left and a textfield to the right of each picture.
  - [ThreeScapeLine](./examples/ThreeScapeLine.pdf)
    - A landscape mode template with three pictures and lines below each picture.
  - [ThreeScapeField](./examples/ThreeScapeField.pdf)
    - A landscape mode template with three pictures and a textfield below each picture.

#### **Four Image Per Page**
  - [FourTraitNothing](./examples/FourTraitNothing.pdf)
    - A portrait mode template with only four pictures evenly spaced.
  - [FourScapeNothing](./examples/FourScapeNothing.pdf)
    - A landscape mode template with only four pictures evenly spaced.

<br>
<hr style="border: 2px solid hsla(0, 0%, 25%, 1); background-color: hsla(0, 0%, 25%, 1)">


## Fundamentals - How It Works

Before we delve into how to use handgen in a JS project, we first have to go over the components and the structures that a handout template use to create a handout pdf:
- Page
- Pictures
- Lines
- Textfield
- Text

### What is a template?
- A template is the building block used to build a component (the actual page/picture/line/etc.)
- A template specifies the attributes of of a component.
  - For example, for a line component, you might specify the width and height of a picture component.
- All templates comes from JSON objects.

### Page Template

- A page template contains the following components: pictures, lines, textfield and page number. It is also possible to tweak the width or height of a page template.
- There can be more than one page template in a handout template. For example, on one page, you might want three pictures, and on another page, you might want one picture instead. 

### Pictures

- A picture template can be an image (png, jpg, jpeg) or a pdf. 
  - This means that both images and pdf can be crammed (embedded and/or minified) into the handout pdf.
- The type for a picture contains the following properties (or attributes): width, height, x and y coordinates.

### Lines

- A line template is a straight line with the color black.
- The type for a line contains the following properties: x1, y1, x2, y2 coordinates.

### Textfield

- A textfield template is a rectangular box where the inside of the box is writeable with a keyboard.
- The type for a textfield contains the following properties: width, height, x and y coordinates.

### Page Number
- A page number template specifies the location where a page number is located on a page.
- The type for a page number is called a Label, and a Label contains the following properties: size, x and y coordinates.
- Planned on being optional




<br>
<hr style="border: 2px solid hsla(0, 0%, 25%, 1); background-color: hsla(0, 0%, 25%, 1)">

## Explanation for Handout Class

To use the Handout class. First, you need to instantiate a handout
``` Typescript
import { Asset, TemplateRepo, Handout } from 'handgen';

const handout = new Handout();
```

There is only 1 method exposed from Handout, and that is createHandout(assets, templateID, repo).
- `assets: Asset[]` -> Contains an array of assets, which are the images, pdf and/or pptx that you would like to insert into the resulting handout pdf.
  - Type Asset is a type that specifies that an object must contain two properties: "type" and "bytes".
    - type is a string property that holds the extension of the asset that got turned into a byte.
    - bytes is the buffer of the asset (image or pdf file).
- `templateID: string` -> Currently only supports default provided template ID.
- `repo: TemplateRepo` -> Specifies if the template is coming from local (default templates) or from remote (online templates)
  - Type TemplateRepo is a string of either "default" or "online";
