/**
 * Created by ianshinbrot on 11/18/15.
 */
function sendEmail(emailAddress) {
    //TODO Send API call to send a password to an email address
    alert("This to be implemented in the future for" + emailAddress);
}
function disable(element) {
    // enable/disable buttons for added fun :)
    element.addClass("mdl-button--disabled");

}
function enable(element) {
    // enable/disable buttons for added fun :)
    if (element.hasClass("mdl-button--disabled")) {
        element.removeClass("mdl-button--disabled");
    }
}



function pageSetup() {

    var sendEmailbtn = $("#EmailMe");
    $("#emailAddress").change(function () {
        if ($(this).val()=="") {
            disable(sendEmailbtn);
        }
        else {
            enable(sendEmailbtn);
        }
    })

    disable(sendEmailbtn)
}