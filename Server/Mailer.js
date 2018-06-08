const nodemailer = require('nodemailer');
const path = require('path');
const ABSPATH = path.dirname(process.mainModule.filename); // Absolute path to our app directory


const Mailer = {
    transporter: '',
    init : function(){
        this.transporter = nodemailer.createTransport({ // Use an app specific password here
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'uu4axvkbuwdxcapx@ethereal.email',
                    pass: 'Vxm3wCf4EbStgFCtZF'
                },
        });
    },
    options:{
        from: 'uu4axvkbuwdxcapx@ethereal.email',
        to: 'v3kuou2e6ahchesh@ethereal.email',
        subject: 'Test',
        text: 'Hello World',
        attachments: [
            {
                filename : 'ergebnis',
                path: ABSPATH + '\\GeneticTrader\\output\\out149'

            }
        ]
    },
    sendMail : function(){
        this.transporter.sendMail(this.options, function(error){
            console.log('Senden erfolgreich!!');
            if (error) {
                console.log('Error beim Senden', error);
            } else {
                return
            }
        });
    },
};

module.exports = Mailer;