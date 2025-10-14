let table;

function preload() {
  //loading the dataset from assignment 1
  table = loadTable ("assets/dataset.csv", "csv", "header")
}

function setup() {
  //proving if the dataset has loaded
  console.log(table); //if you go to Inspeccionarr in Chrome you can se inside Console that the table is loaded

  //setting up variables for organizing the website
  let outerPadding = 20;
  let padding = 10;
  let itemSize = 30;

  //calculating the number of columns
  let cols = floor((windowWidth - outerPadding * 2)/(itemSize + padding));

  //seeing if the columns have printed right
  console.log ('columns',cols);

  //calculating the number of rows
  let rows = table.getRowCount();
  console.log ('rows',rows);

  let totalHeight = outerPadding * 2 + rows * itemSize + (rows -1) * padding;

  //create the canvas
  createCanvas(windowWidth, totalHeight);
  background ("orange");

  let colCount = 0;
  let rowCount = 0;

  //rows advance 1 by 1
  for(let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++){
    //drawing the rows
    //seeing if we did the rows correctly  in the let
    console.log ('row number',rowNumber);

    let data = table.getRow(rowNumber).obj;
    console.log(data); //see the data

    //getting the value for the dimensions
    let myValue = data["column0"];

    //calculating minimum and maximum
    let allValues = table.getColumn("column0");
    let minValue = min(allValues);
    let maxValue = max(allValues);

    let scaledValue = map(myValue,minValue,maxValue,1, itemSize);

    //second variable
    let value2 = data["column2"];
    let allValues2 = table.getColumn("column2");
    let minValue2 = min(allValues2);
    let maxValue2 = max(allValues2);
    let value2mapped = map(value2, minValue2, maxValue2, 0, 1) //generate a value that goes from 0 to 1 using the max and min of the color

    let color1 = color('red');
    let color2 = color('blue');
    
    let mappedColor = lerpColor(color1, color2, value2mapped);
    fill (mappedColor);

    //position of squares/objects
    let xPos = outerPadding + colCount * (itemSize + padding);
    let yPos = outerPadding + rowCount * (itemSize + padding);

    rect (xPos, yPos, scaledValue, scaledValue);

    //for every cicle the column count should augmentate
    colCount++;

    //when we get to the last item, change row
    if (colCount == cols){
      colCount = 0;
      rowCount++;
    } 
  }
}

function draw() {
  // put drawing code here
}