const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

//send mail from test account
const signUp = async (req, res) => {
  /*testing account*/
  let testAccount = await nodemailer.createTestAccount();

  //create resuable transporter object using the default SMTP transport
  let nodemailer = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user, //generate ethereal user
      pass: testAccount.pass, //generate ethereal password
    },
  });

  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: `You've successfully registered for Seraph Festival 2024`, // plain text body
    html: `<b>You've successfully registered for Seraph Festival 2024</b>`, // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      console.log(info);

      // Send response after sending the email
      res.status(201).json({
        msg: "Congrats, You've successfully registered for Seraph festivals, you should receive a confirmation email soon. Event venue - Tafawa Balewa Square, Awolowo Rd, Onikan, Lagos Island. Event Date - 10th, November, 2024",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
};

//send mail from real gmail account
const register = (req, res) => {
  const { firstname, lastname, email } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);
  let Mailgenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Seraph Festival",

      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: lastname + " " + firstname,
      intro: `Congrats, you've successfully registered for Seraph festivals, your entry number is ${Math.floor(
        Math.random() * 100000
      )}
      Event venue - Tafawa Balewa Square, Awolowo Rd, Onikan, Lagos Island. Event Date - 10th, November, 2024`,
    },
  };

  let mail = Mailgenerator.generate(response);
  let message = {
    from: "seraphfestival@gmail.com",
    to: email,
    subject: "Seraph Festival registration",
    html: mail,
  };

  transporter.sendMail(message).then(() => {
    return res.status(201).json({
      msg: "Congrats, You've successfully registered for Seraph festivals, you should receive a confirmation email soon.",
    });
  });
};

module.exports = { signUp, register };
