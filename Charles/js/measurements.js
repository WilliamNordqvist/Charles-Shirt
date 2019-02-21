const outputs = {
    height: new Output(document.getElementsByClassName('js-height-output')[0], 'right center', 'см'),
    weight: new Output(document.getElementsByClassName('js-weight-output')[0], 'center bottom', 'кg'),
    ['chest-girth']: new Output(document.getElementsByClassName('js-chestgirth-output')[0], 'center top', 'см'),
    ['waist-girth']: new Output(document.getElementsByClassName('js-waistgirth-output')[0], 'center top', 'см'),
    ['hip-girth']: new Output(document.getElementsByClassName('js-hipgirth-output')[0], 'center top', 'см')
  };
  
  const measurementIcons = {
    height: new MeasurementIcon(document.getElementsByClassName('js-height-arrow')[0], 'measurement-icon-visible'),
    weight: new MeasurementIcon(document.getElementsByClassName('js-weight-icon')[0], 'measurement-icon-visible'),
    ['chest-girth']: new MeasurementIcon(document.getElementsByClassName('js-chestgirth-arrow')[0], 'measurement-icon-visible'),
    ['waist-girth']: new MeasurementIcon(document.getElementsByClassName('js-waistgirth-arrow')[0], 'measurement-icon-visible'),
    ['hip-girth']: new MeasurementIcon(document.getElementsByClassName('js-hipgirth-arrow')[0], 'measurement-icon-visible')
  };
  
  const inputs = document.getElementsByClassName('js-inputs')[0];
  
  window.addEventListener('scroll', updateOutputPositions);
  window.addEventListener('resize', updateOutputPositions);
  
  inputs.addEventListener('focus', e => {
    const output = outputs[e.target.name];
    const measurementIcon = measurementIcons[e.target.name];
    const value = e.target.value;
  
    if (measurementIcon._isVisible) {
      output.focus();
    } else {
      measurementIcon.show(() => {
        if (output.value()) output.focus();
      });
    }
  }, true);
  
  inputs.addEventListener('blur', e => {
    const target = e.target;
  
    if (target.value === '') {
      measurementIcons[target.name].hide();
    } else {
      outputs[target.name].blur();
    }
  }, true);
  
  inputs.addEventListener('input', e => {
    const target = e.target;
    const output = outputs[target.name];
  
    output.value(target.value);
    output.setPosition(measurementIcons[target.name].el);
  
    if (!measurementIcons[target.name]._isVisible) return;
  
    output.focus();
  });
  
  function updateOutputPositions() {
    const keys = Object.keys(outputs);
    for (let i = 0; i < keys.length; i++) {
      outputs[keys[i]].setPosition(measurementIcons[keys[i]].el);
    }
  }
  
  /**
   * Represents icon which is used to visualize man's body measurements.
   * @constructor
   * @param {SVGElement} el - SVG element of icon.
   * @param {string} visibleClass - class name used to show icon.
  */
  function MeasurementIcon(el, visibleClass) {
    this.el = el;
    this.visibleClass = visibleClass;
    this._isVisible = false;
    this._defaultClass = this.el.className.baseVal;
  }
  
  MeasurementIcon.prototype.hide = function(onComplete) {
    this.el.addEventListener('transitionend', () => {
      this._isVisible = false;
      if (onComplete) onComplete();
    });
  
    this.el.className.baseVal = this._defaultClass;
  };
  
  MeasurementIcon.prototype.show = function(onComplete) {
    this.el.addEventListener('transitionend', () => {
      this._isVisible = true;
      if (onComplete) onComplete();
    });
  
    this.el.className.baseVal = this.el.className.baseVal + ' ' + this.visibleClass;
  };
  
  /**
   * Represents output of measurement.
   * @constructor
   * @param {HTMLElement} el - DOM element of output
   * @param {string} position - Position of output, is used to relatively
                                position to another element
   * @param {string} unit - Measurement unit
  */
  function Output(el, position, unit) {
    this.el = el;
    this.position = position;
    this.unit = unit;
    this._val = undefined;
  }
  
  Output.prototype.focus = function() {
    this.el.style.transform = 'scale(1.5)';
  };
  
  Output.prototype.blur = function() {
    this.el.style.transform = 'scale(1)';
  };
  
  Output.prototype.value = function(val) {
    if (val === undefined) return this._val;
    this.el.innerHTML = val === '' ? val : val + this.unit;
    this._val = val;
  };
  // positions output relative to another element
  Output.prototype.setPosition = function(relEl) {
    let { x, y } = getRelativePosition(this.el, relEl, this.position);
    this.el.style.top = y + 'px';
    this.el.style.left = x + 'px';
  };
  
  /**
    Calculates coordinates for element to position relative to another element,
    using string like 'center top'
  */
  function getRelativePosition(el, relativeEl, posStr) {
    if (!posStr) return;
  
    let [x, y] = posStr.split(' ');
  
    if (!y && x === 'center') y = 'center';
    else if (!y) return;
  
    const {top, left, height, width} = relativeEl.getBoundingClientRect();
  
    const extraOffset = 3;
    let relX = undefined;
    let relY = undefined;
  
    switch (x) {
      case 'left':
        relX = left - el.clientWidth - extraOffset;
        break;
      case 'right':
        relX = left + width + extraOffset;
        break;
      case 'center':
        relX = left + width * 0.5 - el.clientWidth * 0.5;
        break;
    }
  
    switch (y) {
      case 'top':
        relY = top - el.clientHeight - extraOffset;
        break;
      case 'bottom':
        relY = top + height + extraOffset;
        break;
      case 'center':
        relY = top + height / 2 - el.clientHeight / 2;
        break;
    }
  
    return {
      x: relX,
      y: relY
    };
  }

  document.getElementById("click").addEventListener("click", function(){
document.getElementById("popUpBg").style.visibility = "visible";
  })

  document.getElementById("exit").addEventListener("click",function(){
    document.getElementById("popUpBg").style.visibility = "hidden";
  })


  document.getElementById("complete").addEventListener("click", function(){
    document.getElementById("afterOrder").style.visibility = "visible";
      setTimeout(function(){
      document.getElementById("popUpBg").style.visibility = "hidden";
      document.getElementById("afterOrder").style.visibility = "hidden";
      }, 5000);
    })

    document.getElementById("MeasureBand").addEventListener("click", function(){
      document.getElementById("PopUpMeasurement").style.visibility = "visible";
    })

    document.getElementById("PopUpMeasurementExit").addEventListener("click",function(){
      document.getElementById("PopUpMeasurement").style.visibility = "hidden";
    })

    document.getElementById("PopUpMeasurementButton").addEventListener("click",function(){
      document.getElementById("PopUpMeasurement").style.visibility = "hidden";
    })



    

    

