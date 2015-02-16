// Settings
var currentFont = "georgia";
var allowance = 0;
var skew = 0;
var controlXheightMin = 0.4375;
var controlXheightMax = 0.5375;
var minWidthConstant = 1.592920354;
var maxWidthConstant = 2.831858407;
var minLineConstant = 0.6;
var maxLineConstant = 1.4;
var mMinAdjust = 1;
var mMaxAdjust = 1;
var lMinAdjust = 1;
var lMaxAdjust = 1;

function updateFont(font) {

  // Make font the current font
  currentFont = font;

  // Identify elements to be manipulated
  var containers = document.getElementsByClassName("container");
  for (var i = 0; i < containers.length; i++) {

    // Change the font of every paragraph in every container
    var textSamples = containers[i].getElementsByTagName("p");
    for (var j = 0; j < textSamples.length; j++) {

      // Make the text samples use the font
      textSamples[j].style.fontFamily = currentFont;
    }
  }

  // Get the metrics of currentFont
  if (currentFont == "minion-pro") {
    thisXheight = 0.4125;
    thisLength = 11.8125;
    thisContrast = 0;
    thisFontName = "Minion";
  } else if (currentFont == "ff-basic-gothic-web-pro") {
    thisXheight = 0.45;
    thisLength = 14.125;
    thisContrast = 0;
    thisFontName = "FF Basic Gothic";
  } else if (currentFont == "ff-meta-web-pro") {
    thisXheight = 0.5;
    thisLength = 12.5;
    thisContrast = 0;
    thisFontName = "FF Meta";
  } else if (currentFont == "myriad-pro") {
    thisXheight = 0.4625;
    thisLength = 12.5;
    thisContrast = 0;
    thisFontName = "Myriad";
  } else if (currentFont == "prenton") {
    thisXheight = 0.475;
    thisLength = 12.6875;
    thisContrast = 0;
    thisFontName = "Prenton";
  } else if (currentFont == "abril-text") {
    thisXheight = 0.475;
    thisLength = 13.375;
    thisContrast = 0;
    thisFontName = "Abril Text";
  } else { // Georgia
    thisXheight = 0.4625;
    thisLength = 13.0625;
    thisContrast = 0;
    thisFontName = "Georgia";
  }

  // Generate recommendations based on font metrics
  var fontSizeTickMin = ((controlXheightMin * 0.9)/thisXheight+skew+(allowance/2*-1)).toFixed(2);
  var fontSizeTickMax = ((controlXheightMax * 1.1)/thisXheight+skew+(allowance/2)).toFixed(2);
  var measureTickMin = thisLength * minWidthConstant * mMinAdjust;
  var measureTickMax = thisLength * maxWidthConstant * mMaxAdjust;
  var lineheightTickMin = Math.sqrt(Math.pow(thisXheight,2)+Math.pow((thisLength/26),2))+minLineConstant;
  var lineheightTickMax = ((lineheightTickMin*(thisLength*maxWidthConstant))/(thisLength*minWidthConstant))/maxLineConstant;

  // Show the recommended ranges as colored fields
  var recSRange = document.getElementById('rec-size');
  var recMRange = document.getElementById('rec-measure');
  var recLRange = document.getElementById('rec-lineheight');

  recSRange.style.width = (fontSizeTickMax - fontSizeTickMin)/(fsize.max-fsize.min)*100 + '%';
  recMRange.style.width = (measureTickMax - measureTickMin)/(fmeasure.max-fmeasure.min)*100 + '%';
  recLRange.style.width = (lineheightTickMax - lineheightTickMin)/(flineheight.max/flineheight.min)*100 + '%';

  recSRange.style.marginLeft = (((fontSizeTickMin-fsize.min/fsize.max)/fsize.max)*100 + '%');
  recMRange.style.marginLeft = (((measureTickMin-fmeasure.min/fmeasure.max)/fmeasure.max)*100 + '%');
  recLRange.style.marginLeft = (((lineheightTickMin-flineheight.min/flineheight.max)/flineheight.max)*100 + '%');


  // Update font name in all calculations
  var calculations = document.getElementsByClassName("calculations");
  for (var i = 0; i < calculations.length; i++) {

    calculatedFont = calculations[i].getElementsByClassName("calculated-font");
    calculatedFont[0].innerHTML = thisFontName;

  }

  updateTypesetting(document.getElementById("fsize"));
  updateTypesetting(document.getElementById("fmeasure"));
  updateTypesetting(document.getElementById("flineheight"));


  // Show the data
  document.getElementById('metrics-xheight').innerHTML = thisXheight;
  document.getElementById('metrics-avgwidth').innerHTML = (thisLength/26).toFixed(5);

}


/* Typesetting
-------------------------------------*/
function updateTypesetting() {

  // Identify all containers
  var containers = document.getElementsByClassName("container");

  for (var i = 0; i < containers.length; i++) {

    // Change the value of every paragraph in every container
    var textSamples = containers[i].children;

    for (var j = 0; j < textSamples.length; j++) {

      if (this.id == "fsize") {

        // Update the font size
        textSamples[j].style.fontSize = this.value + "em";

        // Show the value in the label
        var labelData = this.parentNode.getElementsByClassName("data");
        for (var k = 0; k < labelData.length; k++) {
          labelData[k].innerHTML = this.value + "em";
        }

      } else if (this.id == "fmeasure") {

        // Update the measure
        textSamples[j].style.maxWidth = this.value + "em";

        // Show the value in the label
        var labelData = this.parentNode.getElementsByClassName("data");
        for (var k = 0; k < labelData.length; k++) {
          labelData[k].innerHTML = this.value + "em";
        }
      } else if (this.id == "flineheight") {

        // Update the line height
        textSamples[j].style.lineHeight = this.value;

        // Show the value in the label
        var labelData = this.parentNode.getElementsByClassName("data");
        for (var k = 0; k < labelData.length; k++) {
          labelData[k].innerHTML = this.value;
        }
      } else if (this.id == "fmargins") {

        // Update the "margins" (padding)
        textSamples[j].style.paddingLeft = this.value + "em";
        textSamples[j].style.paddingRight = this.value + "em";

        // Show the value in the label
        var labelData = this.parentNode.getElementsByClassName("data");
        for (var k = 0; k < labelData.length; k++) {
          labelData[k].innerHTML = this.value + "em";
        }
      } else {
        // No value to change.
      }
    }
  }
  updateCalculations();
}


/* Context
-------------------------------------*/
function updateContext() {

  // Identify relevant context & calculations
  var context = this.parentNode.parentNode.parentNode.parentNode.children[1];
  var calculation = this.parentNode.parentNode.parentNode.parentNode.children[2];

  if (this.className == "userfsize") {

    // Update the default font size
    context.style.fontSize = (this.value/16)*100 + "%";

    // Show the value in the label
    var labelData = this.parentNode.getElementsByClassName("data");
    for (var k = 0; k < labelData.length; k++) {
      labelData[k].innerHTML = (this.value/16)*100 + "%";
    }

    // Show the value in the calculation & update the rendered value
    calculatedSizeRoot = calculation.getElementsByClassName("calculated-size-root");
    calculatedSizeRootValue = (this.value/16)*100 + "%";
    calculatedSizeRoot[0].innerHTML = calculatedSizeRootValue;

    // Grab the existing intended font size
    calculatedSize = calculation.getElementsByClassName("calculated-size");
    calculatedSizeValue = parseFloat(calculatedSize[0].innerHTML);

    // Recalculate the rendered size
    calculatedSizeRendered = calculation.getElementsByClassName("calculated-size-rendered");
    calculatedSizeRenderedValue = (this.value/16) * calculatedSizeValue;
    calculatedSizeRendered[0].innerHTML = calculatedSizeRenderedValue.toFixed(3) + "em";

  } else if (this.className == "containerwidth") {

    // Update the container width
    context.style.maxWidth = this.value + "px";

    // Show the value in the label
    var labelData = this.parentNode.getElementsByClassName("data");
    for (var k = 0; k < labelData.length; k++) {
      labelData[k].innerHTML = this.value + "px";
    }

  } else {
    alert("Oops. No context?");
  }

  updateCalculations();
}


/* Calculations
-------------------------------------*/
function updateCalculations(x) {

  // Identify all containers & calculations
  var containers = document.getElementsByClassName("container");
  var calculations = document.getElementsByClassName("calculations");

  // Change the value of every calculation
  for (var i = 0; i < calculations.length; i++) {

    // Identify existing calculation elements
    calculatedSize = calculations[i].getElementsByClassName("calculated-size");
    calculatedSizeRoot = calculations[i].getElementsByClassName("calculated-size-root");
    calculatedSizeRendered = calculations[i].getElementsByClassName("calculated-size-rendered");
    calculatedMeasure = calculations[i].getElementsByClassName("calculated-measure");
    calculatedWidth = calculations[i].getElementsByClassName("calculated-width");
    widthContained = calculations[i].getElementsByClassName("width-contained");
    calculatedLeading = calculations[i].getElementsByClassName("calculated-leading");

    // Identify settings & contexts
    size = document.getElementById("fsize");
    measure = document.getElementById("fmeasure");
    leading = document.getElementById("flineheight");
    margins = document.getElementById("fmargins");

      // Use the updated font size
      calculatedSize[0].innerHTML = size.value + "em";

      // Grab the existing root font size
      calculatedSizeRootValue = parseFloat(calculatedSizeRoot[0].innerHTML)/100;

      // Recalculate the rendered size
      calculatedSizeRenderedValue = size.value * calculatedSizeRootValue;
      calculatedSizeRendered[0].innerHTML = calculatedSizeRenderedValue.toFixed(3) + "em";


      // Use the updated measure
      calculatedMeasure[0].innerHTML = measure.value + "em";

      // Grab the existing container width by...
      // Adding the width of the element to its right/left padding ("margins" per tool labels)
      // And multiplying by the rendered font size (because the width is relative, in ems)
      var actualWidth = (parseFloat(containers[i].style.maxWidth)/16 - (margins.value * 2));

      // If the existing container width is less than the updated measure, show it
      if (actualWidth < measure.value) {

        widthContained[0].style.visibility = "visible";
        calculatedWidthValue = parseFloat(calculatedWidth[0].innerHTML)/16;
        calculatedWidth[0].innerHTML = actualWidth + "em";

      } else {

        widthContained[0].style.visibility = "hidden";

      }

      // Convert the leading to a number, so we can always show 3 decimal places
      var showLeading = parseFloat(leading.value);

      // Use the updated leading
      calculatedLeading[0].innerHTML = showLeading.toFixed(3);

  }

}


function instantiateContext() {

  // Identify the latest context
  var contexts = document.getElementsByClassName("context");
  var latestContext = contexts[contexts.length - 1];

  // Clone the latest context and its child nodes
  var clone = latestContext.cloneNode(true);

  // Append the cloned context to the existing contexts
  document.getElementById("contexts").insertBefore(clone, latestContext);

  initialize();
}



function updateMargins(value) {
  sampleText.style.paddingLeft = value + "em";
  sampleText.style.paddingRight = value + "em";
  //document.querySelector('#data-lineheight').innerHTML = value;
  document.querySelector('#fmargins').value = value;
}


/* Preferences
-------------------------------------*/
function updateAllowance(value) {
  allowance = parseFloat(value);
  //document.querySelector('#data-allowance').innerHTML = value;
  updateFont(currentFont);
}

function updateSkew(value) {
  skew = parseFloat(value);
  //document.querySelector('#data-skew').innerHTML = value;
  updateFont(currentFont);
}

function updateMminAdjust(value) {
  mMinAdjust = parseFloat(value);
  //document.querySelector('#data-mMinAdjust').innerHTML = value;
  updateFont(currentFont);
}

function updateMmaxAdjust(value) {
  mMaxAdjust = parseFloat(value);
  //document.querySelector('#data-mMaxAdjust').innerHTML = value;
  updateFont(currentFont);
}

function updateLminAdjust(value) {
  lMinAdjust = parseFloat(value);
  //document.querySelector('#data-lMinAdjust').innerHTML = value;
  updateFont(currentFont);
}

function updateLmaxAdjust(value) {
  lMaxAdjust = parseFloat(value);
  //document.querySelector('#data-lMaxAdjust').innerHTML = value;
  updateFont(currentFont);
}



/* Events
-------------------------------------*/

function initialize() {
  // Add tool listeners
  var size = document.getElementById("fsize");
  var measure = document.getElementById("fmeasure");
  var leading = document.getElementById("flineheight");
  var margins = document.getElementById("fmargins");
  size.addEventListener("input", updateTypesetting, false);
  measure.addEventListener("input", updateTypesetting, false);
  leading.addEventListener("input", updateTypesetting, false);
  margins.addEventListener("input", updateTypesetting, false);

  // Add context listeners
  var conditions = document.getElementsByClassName("conditions");
  for (var i = 0; i < conditions.length; i++) {
    var factors = conditions[i].getElementsByTagName("input");
    for (var j = 0; j < factors.length; j++) {
      factors[j].addEventListener("input", updateContext, false);
    }
  }

  var instantiate = document.getElementById("instantiate-context");
  instantiate.addEventListener("click", instantiateContext, false);

  updateFont(currentFont);
}

/* Kickoff
-------------------------------------*/
initialize();
