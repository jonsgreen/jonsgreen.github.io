$(function () {

  $('#splash-slideshow').cycle('fade');

  $("#zipcode-form :input[name='zipcode'],input.signup").focus(function () {
    $(this).val('');
  });

});
