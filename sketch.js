let table;

function preload() {
  //loading the dataset from assignment 1
  table = loadTable ("assets/dataset.csv", "csv", "header")
  //loading font for the header
  avanderFont = loadFont ("assets/Avander.ttf");
  futuraFont = loadFont ("assets/FuturaPTBook.otf");
}

function setup() {
  //proving if the dataset has loaded
  console.log(table); //if you go to Inspeccionarr in Chrome you can se inside Console that the table is loaded

  //setting up variables for organizing the website
  let outerPadding = 20;
  let padding = 10;
  let itemSize = 45;

  //calculating the number of columns
  let cols = floor((windowWidth - outerPadding * 2)/(itemSize + padding));

  //seeing if the columns have printed right
  console.log ('columns',cols);

  //calculating the number of rows
  let totalItems = table.getRowCount();
  let rows = ceil(totalItems / cols);
  console.log ('rows',rows);

  let totalHeight = outerPadding * 2 + rows * itemSize + (rows -1) * padding + 60; //+60 for bottom padding

  //create the canvas
  createCanvas(windowWidth, totalHeight);
  background ("black");

  //drawing a header
  push();
    noStroke();
    fill("black");
    rect(0, 0, width, 60);
    fill("white");
    textAlign(CENTER, CENTER);
    textSize(36);
    textFont(avanderFont);
    text("ASSIGNMENT 2", width / 2, 26);
    //subtitle
    textSize(12);
    textFont(futuraFont);
    text("generating a glyph family from a dataset", width / 2, 48);
  pop();

  let colCount = 0;
  let rowCount = 0;

  //rows advance 1 by 1
  for(let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++){
    //drawing the rows
    //seeing if we did the rows correctly  in the let
    console.log ('row number',rowNumber);

    let data = table.getRow(rowNumber).obj;
    console.log(data); //see the data

    //first variable from column0 TO DETERMINE dimension
    let myValue = data["column0"];
    let allValues = table.getColumn("column0"); //calculating minimum and maximum
    let minValue = min(allValues);
    let maxValue = max(allValues);

    let scaledValue = map(myValue,minValue,maxValue, 1, itemSize);

    //second variable from colum2 TO DETERMINE color
    let value2 = data["column2"];
    let allValues2 = table.getColumn("column2");
    let minValue2 = min(allValues2);
    let maxValue2 = max(allValues2);
    let value2mapped = map(value2, minValue2, maxValue2, 0, 1) //generate a value that goes from 0 to 1 using the max and min of the color

    let color1 = color('#ff3366');
    let color2 = color('#33ccff');
    
    let mappedColor = lerpColor(color1, color2, value2mapped);
    fill (mappedColor);

    //third variable from column1 TO DETERMINE rotation
    let value3 = data["column1"];
    let allValues3 = table.getColumn("column1");
    let minValue3 = min(allValues3);
    let maxValue3 = max(allValues3); 
    let value3mapped = map(value3, minValue3, maxValue3, 0, 1);

    //fourth variable from column3 TO DETERMINE flower center 
    let value4 = data["column3"];
    let allValues4 = table.getColumn("column3");
    let minValue4 = min(allValues4);
    let maxValue4 = max(allValues4);
    let value4mapped = map(value4, minValue4, maxValue4, 0, 1);

    //position of squares/objects
    let xPos = outerPadding + colCount * (itemSize + padding);
    let yPos = outerPadding + rowCount * (itemSize + padding) + 60; //+60 for the header

    drawFlower(xPos, yPos, scaledValue, mappedColor, value3mapped, value4mapped);
    
    //for every cicle the column count should augmentate
    colCount++;

    //when we get to the last item, change row
    if (colCount == cols){
      colCount = 0;
      rowCount++;
    } 
  }
}

function drawFlower(x, y, size, valueColor, valueRotation, valueCenter) {
  //each variable here is gonna be replaced by the data prepared before when the function is recalled
  //size = scaledValue (data from column0)
  //valueColor = mappedColor (data from column2)
  //valueRotation = value3mapped (data from column1)
  //valueCenter = value4mapped (data from column3)
  push();
    //drawing the size of the flower
    translate(x + size / 2, y + size / 2);

    //drawing the color of the flower
    fill(valueColor);
    noStroke();

    //drawing the number of petals of the flower
    let numPetals = int(map(valueRotation, 0, 1, 4, 10));

    //drawing the rotation of the flower
    rotate(valueRotation * TWO_PI);

    for (let i = 0; i < numPetals; i++) {
      push();
        rotate((TWO_PI / numPetals) * i);

        //drawing each petal
        ellipse(size * 0.2, 0, size * 0.5, size * 0.15);

      pop();
    }

    //drawing the center of the flower
    fill(255, 220);
    ellipse(0, 0, size * 0.2 * (0.5 + valueCenter * 1.2));
  pop();
}