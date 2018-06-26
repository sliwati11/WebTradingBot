const nodemailer = require('nodemailer');
const path = require('path');
const ABSPATH = path.dirname(process.mainModule.filename); // Absolute path to our app directory

const Mailer = {
    emailAdress:'',
     fileToSend:'',
    init : function(obj){
        this.emailAdress = obj.email_input;
        this.transporter = nodemailer.createTransport({ // Use an app specific password here
            host: 'mail.hotmail.fr',
            port: 587,
            service: 'hotmail',
                auth: {
                    user: 'zalva@hotmail.fr',//'uu4axvkbuwdxcapx@ethereal.email',
                    pass: 'salyhana82' //'Vxm3wCf4EbStgFCtZF'
                },
        });
    },
    options:{
        from: 'zalva@hotmail.fr',
        to: this.emailAdress, //'uu4axvkbuwdxcapx@ethereal.email',
        subject: 'Test',
        text: 'Hello World',
        attachments: [
            {
                filename : 'ergebnis',
                path: ''
            }
        ]
    },
    sendMail : function(fileToSend){
        console.log('Files: '+fileToSend);
        //this.fileToSend = fileToSend[fileToSend.length-1];
        this.options.to = this.emailAdress;
        this.options.attachments.path = ABSPATH + '\\GeneticTrader\\output\\' +this.fileToSend;
        console.log('this.options.attachments.path: '+this.options.attachments.path);
        this.transporter.sendMail(this.options, function(error){
            console.log('send dta: ', this.emailAdress);
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