/**
 * Created by biroa on 11/25/2015.
 *
 * Object Literal Design Pattern
 * NameSpace Design Patters
 */

//init Namespace design patters
var eu = eu || {};
eu.adambiro = eu.adambiro || {};
eu.adambiro.JSDP = eu.adambiro.JSDP || {};

//Object Literal Design Pattern start
eu.adambiro.JSDP= {
    leadself: 'Me: ',
    leadcomputer: "PC: ",
    aSaid: ["This is a Cyber Chat"],
    msgYes: "Yes, that's a great idea.",
    msgNo: "No, that must be a mistake.",
    aSassyStuff: [
        "Like mold on books, grow myths on history.",
        "She moved like a poem and smiled like a sphinx.",
        "As long as we don’t die, this is gonna be one hell of a story.",
        "She laughed, and the desert sang.",
        "You’ve got about as much charm as a dead slug."
    ],
    talk: function (msg) {
        this.echo(this.leadself + msg);
    },
    replayYesNo: function () {
        var msg = Math.random() > .5 ? this.msgYes : this.msgNo;
        this.echo(this.leadcomputer + msg);
    },
    saySassyStuff: function () {
        var msg = this.aSassyStuff[Math.floor(Math.random() * this.aSassyStuff.length)];
        this.echo(this.leadcomputer + msg);
    },
    echo: function (msg) {
        this.aSaid.push("<div>" + msg + "</div>");

        var aSaidLength = this.aSaid.length;
        start = Math.max(this.aSaid.length - 6, 0),
            out = "";

        for (var i = start; i < aSaidLength; i++) {
            out += this.aSaid[i];
        }
        $('.advert').html(out);
        $('#talk span').text(msg);
    }
};
//END