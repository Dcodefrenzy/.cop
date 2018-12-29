const nodemailer = require("nodemailer");
var sgTransport = require('nodemailer-sendgrid-transport');


	var options = {
	 auth: {
		api_user: "Frenzykul",
		api_key: "Frenzykul01",
	},
}

var mailer = nodemailer.createTransport(sgTransport(options));
var recipient = ['fakunlejulius@yahoo.com', 'ayodejisamuelfakunle@gmail.com'];
const mailOption = {
	from:'ayodejisamuelfakunle@gmail.com',
	to: recipient,
  subject: 'Testing Corporative Email Platform',
  text: 'This is a test, we are trying to send a mail via sendGrid using node mailer',
  html: '<p><b>Hello</b>, we are trying to send a mail via sendGrid using node mailer.</p><p>Welcome to NDE corporative mail we are testing presently but through this medium you will be able to receive mails concerning your coporative account such as</p><ol><li>Savings</li> <li>Emergency Loan</li><li>Shop Loan</li></ol>',
};


mailer.sendMail(mailOption, (error, info)=>{
	if (error) {
		console.log(error);
	}else{
		console.log('Message sent');
	}
	
});