(function($) {
    window.validate = function() {
       var emailInput = document.querySelector('input[name=email]'),
       valid = true;
 
       if (!isValidEmail(emailInput.value)) {
          valid = false;
          $(emailInput)
             .parent()
             .addClass('has-error')
             .append('<p class="error-message">Måste vara en korrekt epost adress</p>')
             .closest('.panel-body')
             .addClass('highlight-flash');
       }
 
       return valid;
    };
 
    function isValidEmail(value) {
       var reg = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9][.-]?)+[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
       return reg.test(value);
    }
 }(jQuery));