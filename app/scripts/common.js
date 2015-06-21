;(function () {

    var steps = [2, 150, 375, 758];
    var stepsText = document.querySelectorAll('.skills-range p');

    var sliderElem = document.getElementsByClassName('skills-range__scale')[0];
    var thumbElem = sliderElem.children[0];

// Обработка клика на подписях
    for (i=0; i<stepsText.length; i++) {
      stepsText[i].onclick = function(i) {

        return function() {
          thumbElem.style.left = steps[i] - thumbElem.offsetWidth/2 + 'px';
        }

      }(i);
    }

// Непосредственно слайдер

    thumbElem.onmousedown = function(e) {
      var thumbCoords = getCoords(thumbElem);
      var shiftX = e.pageX - thumbCoords.left;

      var sliderCoords = getCoords(sliderElem);

      var newLeft;

      document.onmousemove = function(e) {
        newLeft = e.pageX - shiftX - sliderCoords.left - thumbElem.offsetWidth/2;

        // курсор ушёл вне слайдера
        if (newLeft < steps[0]) {
          newLeft = steps[0] - thumbElem.offsetWidth/2;
        }
        var rightEdge = steps[3] - thumbElem.offsetWidth*0.5;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        thumbElem.style.left = newLeft + 'px';
      };

      document.onmouseup = function() {
        // Ступенчатое срабатывание при отпускании указателя,
        // если закаментить - будет обычный плавный слайдер.
        if (newLeft !== undefined) {

          if (newLeft + thumbElem.offsetWidth/2 < (steps[1] - steps[0])/2) {
            thumbElem.style.left = steps[0] - thumbElem.offsetWidth/2 + 'px';

          } else if (newLeft + thumbElem.offsetWidth/2 < steps[1] + (steps[2] - steps[1])/2) {
            thumbElem.style.left = steps[1] - thumbElem.offsetWidth/2 + 'px';

          } else if (newLeft + thumbElem.offsetWidth/2 < steps[2] + (steps[3] - steps[2])/2) {
            thumbElem.style.left = steps[2] - thumbElem.offsetWidth/2 + 'px';
          } else {thumbElem.style.left = steps[3] - thumbElem.offsetWidth/2 + 'px';}

        }

        document.onmousemove = document.onmouseup = null;
      };

      return false; // disable selection start (cursor change)
    };

    thumbElem.ondragstart = function() {
      return false;
    };

    function getCoords(elem) { // кроме IE8-
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };

    }

})();
