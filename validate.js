function validation() {
  var user_name = document.myform.name.value;
  var user_email = document.myform.email.value;
  var user_address = document.myform.address.value;
  var user_mobile = document.myform.mobile.value;
  var user_paymode = document.myform.mode.value;

  var exp_phoneno = /^\d{10}$/;
  var exp_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (user_name == "") {
    alert("please enter your name");
  } else if (exp_email.test(user_email) == false) {
    alert("please enter your correct email address");
  } else if (user_address == "") {
    alert("please enter your address");
  } else if (exp_phoneno.test(user_mobile) == false) {
    alert("please enter your correct mobile number");
  } else if (user_paymode == "") {
    alert("please enter your payment mode");
  } else {
    alert("Thank you for visiting our website...Visit Again!!");
  }
}
