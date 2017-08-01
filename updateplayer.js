function loadopt() {
    changeme(1, 1);
    fillemq();
}


//080322
function runiview() {
    if (document.getElementById('injno').value == "I") {
        document.getElementById('injno').value = "J"
    }
    if (document.getElementById('injno').value == "H") {
        document.getElementById('injno').value = "I"
    }
    if (document.getElementById('injno').value == "J") {
        document.getElementById('injno').value = "H"
    }
    updateplayer(1, 999, '', document.getElementById('lastone').value);
}
//

function toggleall() {
    t1 = document.getElementById("viewem").value;
    t2 = "Show Related Attributes Only";
    if (t1 == t2) {
        t2 = "Show All Attributes";
    }
    document.getElementById("viewem").value = t2;
    updateplayer(1, 999, '', document.getElementById('lastone').value);
}


function addOption(selectObject, optionText, optionValue) {
    var optionObject = new Option(optionText, optionValue)
    var optionRank = selectObject.options.length
    selectObject.options[optionRank] = optionObject
}

function deleteOption(selectObject, optionRank) {
    if (selectObject.options.length != 0) {
        selectObject.options[optionRank] = null
    }
}


function LTrim(value) {

    var re = /\s*((\S+\s*)*)/;
    return value.replace(re, "$1");

}


function RTrim(value) {

    var re = /((\s*\S+)*)\s*/;
    return value.replace(re, "$1");

}


function trim(value) {

    return LTrim(RTrim(value));

}

function fillemq() {
    var theForm = document.forms["packages"]
    box = theForm.elements['inactiveroster'];
    iar = box.length;
    emq = theForm.elements['oemq'].value;

    for (x = 0; x < iar; x++) {

        z1a = box.options[x].value;
        z2a = box.options[x].text;
        addOption(theForm.elements['emq'], z2a, z1a)

        xco1 = box.options[x].style.color;
        xbg1 = box.options[x].style.background;

        boxa = theForm.elements['emq'];
        boxa.options[boxa.length - 1].style.color = xco1;
        boxa.options[boxa.length - 1].style.background = xbg1;

        if (parseInt(parseFloat(z1a)) == parseInt(parseFloat(emq))) {
            boxa.selectedIndex = boxa.length - 1;
            // alert(emq)
        }

    }


}

function rostermove(old1, new1) {
    var theForm = document.forms["packages"]
    document.forms["packages"].spb.disabled = true;
    document.forms["packages"].spb2a.disabled = true;
    document.forms["packages"].spb2b.disabled = true;
    document.forms["packages"].spb2c.disabled = true;
    document.forms["packages"].spb2d.disabled = true;
    document.forms["packages"].spb2e.disabled = true;
    document.forms["packages"].spb2f.disabled = true;

    old2 = theForm.elements[old1].selectedIndex;
    new2 = theForm.elements[new1].selectedIndex;

    icango = true;
    ph1 = theForm.elements['lookathealth'].value;


    if ((ph1 > 50) && (new1 == 'irroster')) {
        icango = false;
        ax1 = "You are not allowed to put healthy players on IR. "
        ax1 = ax1 + "Injury reserve is for players that are seriously injured. A player must have the status 'out'"
        alert(ax1);
    }

    if ((old1 == 'activeroster') && (theForm.elements[old1].length <= 40)) {
        icango = false;
        ax1 = "You are down to the minimum limit of 40 active players.  You must add more players "
        ax1 = ax1 + "to your roster before you are allowed to inactivate, cut, or send players to the IR."
        alert(ax1);
    }


    if ((new1 == 'activeroster') && (theForm.elements[new1].length >= 46)) {
        icango = false;
        ax1 = "You can not activate more than 46 players to your active roster. "
        // ax1=ax1+"to your roster before you are allowed to inactivate, cut, or send players to the IR."
        alert(ax1);
    }

    if (icango) {

        //alert(old2+" "+new2)
        if (old2 > -1) {
            if ((old1 != 'activeroster') || (theForm.elements[old1].length > 40)) {
                if ((new1 != 'activeroster') || (theForm.elements[new1].length < 46)) {
                    box = theForm.elements[old1];
                    z1a = box.options[old2].value;
                    z2a = box.options[old2].text;
                    // mposa=z2a.indexOf(' ');
                    // mpos=trim(z2a.substring(0,mposa))
                    addOption(theForm.elements[new1], z2a, z1a)

                    xco1 = box.options[old2].style.color;
                    xbg1 = box.options[old2].style.background;

                    boxa = theForm.elements[new1];
                    boxa.options[boxa.length - 1].style.color = xco1;
                    //alert(xco1);
                    boxa.options[boxa.length - 1].style.background = xbg1;
                    //alert(xbg1);
                    //alert(boxa.options[boxa.length-1].text)

                    if (new1 == 'inactiveroster')

                    {
                        addOption(theForm.elements['emq'], z2a, z1a)
                        boxa = theForm.elements['emq'];
                        boxa.options[boxa.length - 1].style.color = xco1;
                        boxa.options[boxa.length - 1].style.background = xbg1;
                    }



                    deleteOption(theForm.elements[old1], old2)

                    if (old1 == 'inactiveroster')

                    {
                        iselected = theForm.elements['emq'].selectedIndex;
                        deleteOption(theForm.elements['emq'], old2 + 1)
                        if ((old2 + 1) == iselected) {
                            theForm.elements['emq'].selectedIndex = 0;
                        }
                    }


                    var x = document.getElementById('rosters').rows[1].cells;

                    x[0].innerHTML = "Active (" + theForm.elements['activeroster'].length + ")";
                    x[1].innerHTML = "Inactive (" + theForm.elements['inactiveroster'].length + ")";
                    var x = document.getElementById('rosters').rows[4].cells;
                    x[0].innerHTML = "IR (" + theForm.elements['irroster'].length + ")";

                    var x = document.getElementById('cutcount').rows[0].cells;
                    x[1].innerHTML = "(" + theForm.elements['cutroster'].length + ")";


                    //alert('ok')

                    theForm.elements[new1].selectedIndex = theForm.elements[new1].length - 1;
                    new1a = 'Active'
                    //alert(new1);
                    if (new1 == 'inactiveroster') {
                        new1a = 'Inactive';
                    }
                    if (new1 == 'irroster') {
                        new1a = 'IR';
                        theForm.elements['warnir'].value = 'Y';
                    }

                    //icango = true;

                    if (new1 == 'cutroster') {
                        theForm.elements['warncut'].value = 'Y';
                        new1a = 'Cut';
                        //alert(1);


                        if (icango) {
                            updatecutsalary(new1a);
                        }
                    }
                    //alert(new1a);
                    if (icango) {
                        updateplayer(1, 999, '', new1a)
                    }

                }
            }
        }
    }
    document.forms["packages"].spb.disabled = false;
    document.forms["packages"].spb2a.disabled = false;
    document.forms["packages"].spb2b.disabled = false;
    document.forms["packages"].spb2c.disabled = false;
    document.forms["packages"].spb2d.disabled = false;
    document.forms["packages"].spb2e.disabled = false;
    document.forms["packages"].spb2f.disabled = false;
}




function storethese() {
    var theForm = document.forms["packages"];

    okgo = true;
    //alert(theForm.elements['warncut'].value);
    //alert(theForm.elements['warnir'].value);

    if ((theForm.elements['cutroster'].length > 0) && (theForm.elements['warncut'].value == 'Y')) {
        theForm.elements['warncut'].value = 'OK';
        ax1 = "You have decided to cut one or more players from your team.  Once cut, a player "
        ax1 = ax1 + "is NO LONGER on your team.  Also, while his contract is removed from your contracts due, "
        ax1 = ax1 + "any bonuses the player was set to receive are still counted against you and accellerated (with the"
        ax1 = ax1 + " exception of rookies cut before the first preseason game).  This can lead to "
        ax1 = ax1 + "excess dead cap, which can make future transaction difficult.  If you do not understand this process, "
        ax1 = ax1 + "now would be a good time to read the documentation available on the site. If this is ok with you, simply click 'Save Changes' "
        ax1 = ax1 + "button again, and your action will be processed. If you do NOT wish this to take place, simply "
        ax1 = ax1 + "exit this screen without hitting the button again.  One way to do this is to choose the 'All My Teams' "
        ax1 = ax1 + "option. "
        alert(ax1);
        okgo = false;
    }
    if ((theForm.elements['irroster'].length > 0) && (theForm.elements['warnir'].value == 'Y')) {
        theForm.elements['warnir'].value = 'OK';
        okgo = false;
        ax1 = "You have placed players on the injured reserve.  Once placed on the injured reserve, a player "
        ax1 = ax1 + "CANNOT be activated again until next season.  If this is ok with you, simply click 'Save Changes' "
        ax1 = ax1 + "button again, and your action will be processed. If you do NOT wish this to take place, simply "
        ax1 = ax1 + "exit this screen without hitting the button again.  One way to do this is to choose the 'All My Teams' "
        ax1 = ax1 + "option. "
        alert(ax1);
    }


    if (okgo) {

        lloo = '';
        //alert('ops')
        var x = document.getElementById('storeme').rows[2].cells;
        document.forms["packages"].spb.disabled = true;
        x[0].innerHTML = "<B>Your rosters are saving.. this could take a minute.  Please wait!</b>";
        x[0].bgColor = "#99ee99";


        pid = theForm.elements['pid'].value;
        pexper = theForm.elements['pexper'].value.split("!");
        pitb = theForm.elements['pitb'].value.split("!");

        box = theForm.elements['emq'];
        emq = trim(box.options[box.selectedIndex].value);

        for (loop = 1; loop <= 4; loop++) {
            lookat = 'activeroster';
            lookata1 = 'Y';
            if (loop == 2) {
                lookat = 'inactiveroster';
                lookata1 = 'N';
            }
            if (loop == 3) {
                lookat = 'irroster';
                lookata1 = 'I';
            }
            if (loop == 4) {
                lookat = 'cutroster';
                lookata1 = 'C';
            }
            //alert(pid)


            if (theForm.elements[lookat].length > 0) {

                box = theForm.elements[lookat];
                for (x = 0; x < box.length; x++) {
                    lookata = lookata1;
                    x1 = box.options[x].value;
                    madeit = "!" + trim(x1) + " ";
                    v1 = 1 + pid.indexOf(madeit) / 9
                    lookatb = pitb[v1];


                    if (trim(theForm.elements['oemq'].value) == trim(x1)) {
                        lookatb = 'E'
                    }
                    if (emq == trim(x1)) {
                        //alert(emq+" "+x1)
                        lookata = 'E';
                    }
                    if (lookatb != lookata) {
                        // alert(lookata+"-"+lookatb+"-"+madeit)
                        lloo = lloo + trim(x1) + "^" + trim(lookata) + "^" + pexper[v1] + "!"
                        //alert(lloo);
                    }
                }
            }

        }
        if (lloo != '') {
            //alert(lloo)
            theForm.elements['rosterswap'].value = lloo.substring(0, lloo.length - 1)
        }
        document.forms["packages"].submit();
    }
}


function repopstep() {
    //alert(1)
    var theForm = document.forms["packages"]
    box = theForm.elements['packagesel'];
    d1 = box.options[box.selectedIndex].value;
    //  alert(d1)
    fillformation(d1);
}

function changeme(z, z1) {

    var theForm = document.forms["packages"]

    z2 = theForm.elements['lselect0'].value;
    bg1 = '#ffffff'
    z1a = parseInt((z2 - 1) / 2)

    if ((z1a / 2) == parseInt(z1a / 2)) {
        bg1 = '#eeeeee'
    }

    if (z2 > 0) {
        z2a = parseInt(z2 / 2 + .5)
        z2b = 0;
        if (z2 / 2 == z2a) {
            z2b = 1;
        }
        // var x=document.getElementById('packageform').rows[z2a+1].cells;
        // x[z2b+0].bgColor=bg1;

    }


    z2a = parseInt(z1 / 2 + .5)
    z2b = 0;
    if (z1 / 2 == z2a) {
        z2b = 1;
    }

    //var x=document.getElementById('packageform').rows[z2a+1].cells;
    //x[z2b+0].bgColor="#99ee99";

    theForm.elements['lselect0'].value = z1;
    fillformation(z);
}

function updateplayer(z, z1, mpos, ozsent) {
    var theForm = document.forms["packages"];
    document.getElementById('lastone').value = ozsent;

    zsent = ozsent + "roster";
    zsent = zsent.toLowerCase();


    xcolor = "#99ff99";
    if (ozsent == "IR") {
        xcolor = "#ff6666";
        theForm.elements["inactiveroster"].selectedIndex = -1;
    }

    if (ozsent == "Inactive") {
        xcolor = "#999999";
    }

    if (ozsent == "Active") {
        theForm.elements["inactiveroster"].selectedIndex = -1;
    }

    if (ozsent == "Cut") {
        xcolor = "#993333";
        theForm.elements["inactiveroster"].selectedIndex = -1;
    }


    //alert(zsent)

    if (parseInt(parseFloat(z1)) == 999) {
        //alert(zsent);
        z1 = theForm.elements[zsent].selectedIndex;
        //alert(z1);

        if (z1 == -1) {
            theForm.elements[zsent].selectedIndex = 0;
            // alert(zsent);
            z1 = 0;
        }
        box = theForm.elements[zsent];
        z1a = box.options[box.selectedIndex].value;
        //alert(z1a);
        //insert salary cap HERE

        z2a = box.options[box.selectedIndex].text;
        //alert(z1a+" "+z2a)
        mposa = z2a.indexOf(' ');
        mpos = trim(z2a.substring(0, mposa))
        //alert(mpos)
    }

    //  alert(z+" "+z1)
    // alert(z+" "+z1+" "+mpos+" "+zsent)

    box = theForm.elements[trim(zsent)];
    //  alert(box.selectedIndex)
    d1 = box.options[box.selectedIndex].value;
    //alert(d1)
    //box.style.color=box.options[box.selectedIndex].style.color;
    //box.style.background=box.options[box.selectedIndex].style.background;



    //  alert(d1)
    //  temp=theForm.elements['PLAYERPACK'+z].value;
    //alert(temp+"-"+temp.length)
    //  madeit="!"+d1+"          "
    //  madeit=madeit.substring(0,9)
    //alert(madeit+"-"+temp+"-"+temp.length)
    //  temp=temp.substring(0,(z1-1)*9)+madeit+temp.substring((z1)*9,25*9)
    //  temp=temp.substring(0,22*9)
    //alert(temp+"-"+temp.length)
    //theForm.elements['PLAYERPACK'+z].value=temp;
    theForm.elements['sentplayer'].value = z1;

    lookatt = "^" + theForm.elements['poz' + trim(mpos)].value + "^";


    pfname = theForm.elements['pfname'].value.split('!');
    plname = theForm.elements['plname'].value.split('!');
    ppos = theForm.elements['ppos'].value.split('!');
    phealth = theForm.elements['phealth'].value.split('!');
    pid = theForm.elements['pid'].value;
    cname = theForm.elements['cname'].value.split('!');
    pcollege = theForm.elements['pcollege'].value.split('!');
    pranking = theForm.elements['pranking'].value.split('!');
    pcutorder = theForm.elements['pcutorder'].value.split('!');

    madeit = "!" + z1a;
    v1 = 1 + pid.indexOf(madeit) / 9
    pida = pid.split("!");
    //alert(madeit+" "+v1)


    micol = '#eeeeee';
    mifont = 'black';
    //alert(v1);
    ph1 = phealth[v1];
    theForm.elements['lookathealth'].value = ph1;

    ph1a = "Healthy"
    if (ph1 < 100) {
        ph1a = "Knicked Up"
        ph1a = "<a rel=\"tooltip\" title=\"A knicked up player will perform and heal as normal. You can play a knicked up player with no issues.\" target=injy href='?sel=listinjuries&myleagueno=" + document.getElementById('mylgno').value + "#" + document.getElementById('mytmno').value + "' target=oneply style='font-weight:bold; color:yellow; font-size:13px;'>KNICKED UP</a>"
        micol = '#ffbbbb';
        mifont = 'black';
    }
    if (ph1 < 80) {
        ph1a = "Rest To Heal"
        ph1a = "<a target=injy href='?sel=listinjuries&myleagueno=" + document.getElementById('mylgno').value + "#" + document.getElementById('mytmno').value + "' target=oneply style='font-weight:bold; color:yellow; font-size:13px;'>REST TO HEAL</a>"
        micol = '#bb3333';
        mifont = 'white';
    }
    if (ph1 < 50) {
        ph1a = "<a rel=\"tooltip\" title=\"OUT means the player is unable to play for you. You should move the player to the inactive list and bring a new healthy player to be active. If the injured player is OUT all season, you should move them to the IR - Injury Reserve\" target=injy href='?sel=listinjuries&myleagueno=" + document.getElementById('mylgno').value + "#" + document.getElementById('mytmno').value + "' target=oneply style='font-weight:bold; color:yellow; font-size:13px;'>OUT</a>"
        //ph1a="Out"
        micol = '#660000';
        mifont = 'white';
    }

    //080322
    patt = theForm.elements['patt' + trim(pida[v1])].value;

    if (document.getElementById('injno').value == "H") {
        patt = theForm.elements['pattnoinj' + trim(pida[v1])].value;
    }
    //080322


    att = theForm.elements['attributes'].value.split("^");
    x2 = "<table bgcolor=#666666 cellpadding=1 cellspacing=1>"
    loopon0 = 0;
    viewem = document.getElementById("viewem").value;
    for (loopon = 0; loopon < att.length; loopon++) {
        att2 = att[loopon].split("!");
        ach1 = "^" + trim(att2[0]) + "^"
        if ((lookatt.indexOf(ach1) > -1) || (trim(att2[0]) == "OVAL") || (viewem != 'Show All Attributes')) {
            bgco = "#ffffff";
            if ((loopon0 / 2) == parseInt(loopon0 / 2)) {
                bgco = "#eeeeee"
            }


            x2 = x2 + "<tr><td align=left bgcolor=" + bgco + "><b>"
            x2 = x2 + att2[2];

            x2 = x2 + "</b></td>"
            att3 = trim(att2[4]);
            att3a = (parseInt(att2[1]) - 1) * 4;
            att3b = patt.substring(att3a, att3a + 1);

            if (att2[3] == "1") {
                loopon0 = loopon0 + 1;
                x2 = x2 + "<td width=120 bgcolor=" + bgco + " align=left><table width=111 bgcolor=#336633 cellpadding=0 cellspacing=1>"
                x2 = x2 + "<tr>"
                xx2 = parseFloat(patt.substring(att3a, att3a + 2));
                xx2a = parseFloat(patt.substring(att3a + 2, att3a + 4));
                loop9 = 0;
                while (loop9 < 100) //xx2a
                {


                    gn = "rr";

                    loop99 = xx2 - loop9;
                    loop99a = xx2a - loop9;


                    if ((loop99a > 2) && (loop99a < 8) && (loop99 < 3)) {
                        gn = "hr";
                    }

                    if ((loop99a > 2) && (loop99a < 8) && (loop99 > 2) && (loop99a < 8)) {
                        gn = "gr";
                    }

                    if ((loop99a > 7) && (loop99 < 3)) {
                        gn = "hh";
                    }


                    if ((loop99a > 7) && (loop99 > 2)) {
                        gn = "gh";
                    }

                    if ((loop99a > 7) && (loop99 > 7)) {

                        gn = "gg";

                    }




                    loop9 = loop9 + 10;
                    l11 = parseInt(loop9 / 10);
                    if (l11 == 10) {
                        l11 = "0";
                    }
                    // gn="gg"


                    x2 = x2 + "<td align=center width='10%' height=8 background=./images/" + gn + ".gif><font color=#c0c0c0>" + l11 + "</font></td>"
                }
                x2 = x2 + "</tr></table>"
                x2 = x2 + "</td>"
            }
            x2 = x2 + "<td align=right bgcolor=" + bgco + " colspan=" + att2[3] + "><b>"
            // alert(att3b);
            while (att3.indexOf("*") > -1) {
                att3 = att3.replace(/\*/, att3b)
                att3a = att3a + 1;
                att3b = patt.substring(att3a, att3a + 1);
            }
            att3 = " " + att3;
            for (loop2 = 0; loop2 < 3; loop2++) {
                if (att3 != " 0") {
                    att3 = att3.replace(/ 0/g, " ")
                }



            }

            if (trim(att3) == "years") {
                att3 = "Rookie";
            }
            if (trim(att3) == "1 years") {
                att3 = "1 year";
            }

            //if (trim(att2[2])=="Experience")
            //{
            att3 = att3 + "&nbsp;" //alert(att3);
            //}


            // alert(att3);
            x2 = x2 + att3;
            x2 = x2 + "</b></td></tr>"

        }
    }
    x2 = x2 + "</table>"

    var x = document.getElementById('bigtable').rows[2].cells;
    x1 = "<table bgcolor=#666666>"
    backstart = ""

    if (z1 > 11) {
        backstart = ""
    }

    x1 = x1 + "<tr><th align=left bgcolor=\"" + xcolor + "\">Status : " + ozsent + "</th></tr>"
    x1 = x1 + "<tr><th align=left size=25 bgcolor=#eeeeee><a href='?js=oneplayer&lookatplayer=" + trim(z1a) + "&myleagueno=" + document.getElementById('mylgno').value + "' target=oneply style='font-weight:bold; font-size:13px;'>" + ppos[v1] + " " + pfname[v1] + " " + plname[v1] + "</a></th>"

    //x1=x1+"<tr><th align=left size=25 bgcolor=#eeeeee>"+ppos[v1]+" "+pfname[v1]+" "+plname[v1]+"</th>"
    x1 = x1 + "</tr><tr><th  align=left bgcolor=#eeeeee>" + cname[pcollege[v1]] + "</th></tr>"
    x1 = x1 + "<tr><th  align=left bgcolor=#eeeeee><table cellpadding=0 cellspacing=0>"
    //just modded these 080322
    x1 = x1 + "<tr><th  align=left bgcolor=" + micol + "><font color=" + mifont + ">Health: " + ph1a + "</font></th>"
    x1 = x1 + "<th align=left bgcolor=" + micol + "><font color=" + mifont + ">Health View :</font></th>"
    x1 = x1 + "</tr>"

    x1 = x1 + "<tr><th  align=left bgcolor=" + micol + "><input type=button onclick='toggleall();' value='" + document.getElementById("viewem").value + "'></th>"
    x1 = x1 + "<th align=left bgcolor=" + micol + ">"

    x1 = x1 + '<select size=1 name=runiviewa id=runiviewa onkeyup="this.blur(); this.focus();" '
    x1 = x1 + 'onchange="runiview();" onclick="runiview();">';
    x1 = x1 + "<option value='I'"
    if (document.getElementById('injno').value == "I") {
        x1 = x1 + "selected"
    }
    x1 = x1 + ">Current View</option>";
    x1 = x1 + "<option value='H'"
    if (document.getElementById('injno').value == "H") {
        x1 = x1 + "selected"
    }
    x1 = x1 + ">Uninjured View</option>";
    x1 = x1 + "</select>"

    x1 = x1 + "</th>"
    x1 = x1 + "</tr>"
    //end mod
    //alert("1");

    if (document.getElementById('thisisme').value == "True") {
        x1 = x1 + "<tr><th rel=\"tooltip\" title=\"You want to set the players you want to keep to high numbers, and the players you're prefer to cut to low numbers. The lowest cut order player is the one to be cut if there is a roster issue.\" width=150 align=left>Cutorder</th><td>"
        x1 = x1 + '<select size=1 name=docutorder id=docutorder onkeyup="this.blur(); this.focus();" '
        x1 = x1 + 'onchange="runcutorder(' + z1a + ');" onclick="runcutorder(' + z1a + ');">';
        nolook = 0;
        for (xx = 0; xx < 100; xx++) {
            x1 = x1 + "<option value=" + xx
            if (parseFloat(xx) == parseFloat(pcutorder[v1])) {
                x1 = x1 + " selected"
                nolook = xx;
                // alert(xx);
            }
            x1 = x1 + ">" + xx
        }
        x1 = x1 + "</select></td></tr></table></th></tr>"
        // alert(parseFloat(pcutorder[v1])+"-"+v1+"-"+nolook+"-"+pcutorder+"-"+x1);
    }
    x1 = x1 + "<tr><td align=left valign=top><table width=\"100\%\"><tr><td width=\"100\%\" align=left bgcolor=black valign=top>" + x2 + "</td>"
    x1 = x1 + "</tr></table></td></tr></table>"
    x[1].innerHTML = x1;
    //alert(z1a);
    updateplayersalary(z1a, pfname[v1], plname[v1], ppos[v1]);

    statxaccum = "^";
    x1 = "<table width=\"100%\" bgcolor=black cellpadding=0 cellspacing=1><tr>"
    xloop = 0;
    xloopa = -1;

    for (xloop = 0; xloop <= 1; xloop++) {
        mposa1 = theForm.elements['statz' + mpos].value;
        //alert(mposa1)
        if (xloop == 1) {
            mposa1 = theForm.elements['allstatsx'].value;
            //alert(mposa1)
        }

        if (mposa1.length > 0) {
            mposa = mposa1.split("^")
            for (x = 0; x < mposa.length; x++) {
                if (statxaccum.indexOf("^" + trim(mposa[x]) + "^") < 0) {
                    xloopa = xloopa + 1;
                    x1 = x1 + "<td><table class='table table-striped table-bordered table-condensed table-hover dataTable' width=\"100%\" bgcolor=white cellpadding=2 cellspacing=1>"
                    statxaccum = statxaccum + trim(mposa[x]) + "^"
                    mposb = theForm.elements['statsx' + trim(mposa[x])].value.split("!")
                    if (mposb.length > -1) {
                        mposc = mposb[2].split("*")
                        x1 = x1 + "<tr><td align=left colspan=5 nowrap><B><u>" + mposb[1] + "</u></b></td></tr>"
                        x1 = x1 + "<tr>"
                        tposi = "";
                        for (xx = 0; xx < mposc.length; xx++) {
                            mposd = mposc[xx].split("^");
                            fieldz = theForm.elements['fields'].value.toLowerCase();
                            mpose = fieldz.indexOf("^" + trim(mposd[0].toLowerCase())) / 25 + 1;
                            //alert(mpose+" "+mposd[0]+" "+mposd[1])
                            tposi = tposi + mpose + "!"
                            x1 = x1 + "<td align=center "
                            if ((xx < 2) && (1 == 0)) {
                                x1 = x1 + "width=25px "
                            }
                            x1 = x1 + "bgcolor=#999999><b>" + mposd[1] + "</b></td>"
                        }
                        x1 = x1 + "</tr>"
                    }


                    loopr = 'playerstatcount' + trim(pida[v1]);

                    if (document.getElementsByName(loopr).length > 0) //checkloopr
                    {
                        loopra = theForm.elements[loopr].value;
                        mposf = tposi.split("!");
                        for (xxx = 1; xxx <= loopra; xxx++) {
                            x1 = x1 + "<tr>"
                            mystats = theForm.elements['playerstats' + trim(pida[v1]) + "x" + xxx].value.split("!");
                            bgc = "#e6e6e6"
                            if ((xxx / 2) == parseInt(parseFloat(xxx / 2))) {
                                bgc = "#ffffff"
                            }
                            for (xxxx = 0; xxxx < mposc.length; xxxx++) {
                                mposg = mposf[xxxx];
                                x1 = x1 + "<td align=right bgcolor=" + bgc + "><b>" + mystats[mposg] + "</b></td>"
                            }
                            x1 = x1 + "</tr>"
                        }




                    } // checkloopr

                    x1 = x1 + "</table></td>"
                    if ((xloopa / 2) != parseInt(parseFloat(xloopa / 2))) {
                        x1 = x1 + "</tr><tr>"
                    }
                    //alert(x1)
                }
            }
        } // mpos
        // x1=x1+"</tr><tr>"

    } // xloop
    x1 = x1 + "</tr></table>"


    var x = document.getElementById('bigtable').rows[3].cells;
    x[0].innerHTML = x1;
    //alert(x1)
}

//START FORMATION

function fillformation(z) {


    var theForm = document.forms["packages"]


    //z2='^'+theForm.elements['PLAYERS'+z].value;
    //z3=z2.split("^")

    //s1="!"+theForm.elements['posorder'].value;
    //s2="!"+theForm.elements['possort'].value;
    //pp=theForm.elements['PLAYERPACK'+z].value.split('!');



    pfname = theForm.elements['pfname'].value.split('!');
    plname = theForm.elements['plname'].value.split('!');
    ppos = theForm.elements['ppos'].value.split('!');
    phealth = theForm.elements['phealth'].value.split('!');
    pitb = theForm.elements['pitb'].value.split('!');
    pid = theForm.elements['pid'].value;
    pidl = pid.split("!")
    pranking = theForm.elements['pranking'].value.split('!');


    //s2a=s2.split("!")

    for (xloop = 1; xloop <= 3; xloop++) {
        //alert(xloop)
        xtop = 2;
        xside = 0;
        xname1 = "Active"
        itb = 'Y';
        xcolor = "#99ff99";

        if (xloop == 2) {
            xside = 1;
            xname1 = "Inactive"
            itb = 'N';
            xcolor = "#999999";
        }

        if (xloop == 3) {
            xname1 = "IR";
            xtop = 5;
            itb = 'I';
            xcolor = "#ff6666";
        }


        xname = xname1 + "roster";
        xname = xname.toLowerCase();


        //for (xx=1; xx < s2a.length; xx++)
        //{

        //theForm.elements['temp'+trim(s2a[xx])].value='!';
        //}



        x1 = '<table bgcolor=black cellpadding=3 cellspacing=1 id=\'lineups\'>';
        //alert(x1)

        for (zzz = 1; zzz < pid.split("!").length; zzz++) {

            zzi = zzz;

            ph1 = phealth[zzi]
            micol = 'background:white; color:black'
            xco1 = 'black';
            xbg1 = 'white';
            xx2 = micol;
            if (ph1 < 100) {
                micol = 'background:#ffbbbb; color:black'
                xco1 = 'black';
                xbg1 = '#ffbbbb';
            }
            if (ph1 < 80) {
                micol = 'background:#bb3333; color:white'
                xco1 = 'white';
                xbg1 = '#bb3333';
            }
            if (ph1 < 50) {
                micol = 'background:#660000; color:white'
                xco1 = 'white';
                xbg1 = '#660000';
            }


            yname = 'Active';

            rankingstars = "&#xf005; &#xf005; &#xf005; &#xf005; &#xf005;"

            if (pitb[zzi] == itb) {

                //alert(theForm.elements['sentplayer'].value)

                if (pranking[zzi] < 0) {
                    addOption(theForm.elements[xname], ppos[zzi] + ' ' + pfname[zzi] + ' ' + plname[zzi] + ' ' + rankingstars + "     ", pidl[zzi])
                } else {
                    addOption(theForm.elements[xname], ppos[zzi] + ' ' + pfname[zzi] + ' ' + plname[zzi] + "     ", pidl[zzi])
                }

                //alert(zzi)
                if (parseInt(parseFloat(theForm.elements['sentplayer'].value)) == 0) {
                    //alert(1)
                    theForm.elements['sentplayer'].value = zzi;
                    //alert(zi)
                    theForm.elements[xname].selectedIndex = 0;
                    yname = xname1;
                }


                box = theForm.elements[xname];
                //alert(box.options[box.length-1]);
                box.options[box.length - 1].style.color = xco1;
                box.options[box.length - 1].style.background = xbg1;
            }



        }




        var x = document.getElementById('rosters').rows[1].cells;
        //alert(1);

        x[0].innerHTML = "Active (" + theForm.elements['activeroster'].length + ")";
        x[1].innerHTML = "Inactive (" + theForm.elements['inactiveroster'].length + ")";
        var x = document.getElementById('rosters').rows[4].cells;
        x[0].innerHTML = "IR (" + theForm.elements['irroster'].length + ")";
    }




    //alert(z+" "+yname)
    updateplayer(1, 999, '', yname);
    //alert(1)


}


function hideme(z) {
    var spanElm = document.getElementById(z);
    spanElm.style.display = "none";
    spanElm.style.visibility = "hidden";
}

function updateplayersalary(myplayer, fn, ln, posi) {
    var x1 = document.getElementById('playersalary').rows[0].cells;
    x1[0].innerHTML = fn + " " + ln + " -- " + posi;
    mycapcost = 0;
    mysave0 = 0;
    mysave1 = 0;
    mystatus = document.getElementById('mystatus').value;
    yearon = document.getElementById('myseason').value;
    contracts = document.getElementById('contracts').value;
    myplayera = "000000000" + trim(myplayer);

    myplayera = myplayera.substring(myplayera.length - 9, myplayera.length);
    myplayera = "!" + myplayera + "!";
    //alert(myplayera);
    // alert(myplayera);
    myplno = 1 + parseInt(parseFloat(contracts.indexOf(myplayera) / 10));
    temp1 = "cx" + myplno + "x"
    // alert(temp1);
    for (x = 8; x >= 2; x--) {

        temp1a = temp1 + (parseFloat(yearon) + x - 2);
        //  alert(temp1a);

        var x1 = document.getElementById('playersalary').rows[x].cells;
        //alert(x);
        x1[1].innerHTML = "";
        x1[2].innerHTML = "";
        x1[3].innerHTML = "";
        x1[4].innerHTML = "";
        if (x < 9) {
            x1[0].innerHTML = "";
            x1[0].style.height = "1px";
            x1[2].innerHTML = "";
            //alert(document.getElementById(temp1a));


            //  if (document.getElementById(temp1a) != null)

            if (document.getElementById(temp1a) != null) {
                x1[0].style.height = "20px";
                x1[0].innerHTML = parseFloat(yearon) + x - 2;

                mysal = document.getElementById(temp1a).value;
                mysalz = mysal.split(",");
                myexpera = mysalz[2];

                //    alert(mysalz);
                mysal = mysalz[0];
                // alert(mysal);
                tysal = parseFloat(mysal.substring(1, 6));
                tycap = parseFloat(mysal.substring(6, 11));
                tybon = parseFloat(mysal.substring(11, 16));
                tybona = parseFloat(mysal.substring(16, 21));
                capcostr = figsave(tybon, tybona, mystatus, x - 2, myexpera);
                // alert(capcostr);
                //if ((mystatus=='N') || (mystatus=='B') || (mystatus=='Q'))
                //alert(tycap+'-'+tybon+'-'+tybona+'-'+mystatus+'-'+myexpera)
                if ((mystatus == 'N') || (mystatus == 'B') || (mystatus == 'Q') || (((mystatus == 'P') || (mystatus == 'O')) && (myexpera == 0))) {
                    tycap = tycap + tybon;
                }
                x1[1].innerHTML = "$" + addCommas(1000 * tybon);
                x1[2].innerHTML = "$" + addCommas(1000 * tysal);
                //    x1[3].innerHTML="$"+addCommas(1000*tycap);
                x1[3].innerHTML = "$" + addCommas(1000 * (tysal + tybon));
                x1[4].innerHTML = "$" + addCommas(1000 * capcostr);
            }


        }
    }
}

function addCommas(nStr) {
    var x, x1, x2, rgx;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function figsave(tybon, tybona, mystatus, xa, myexper) {
    var c;
    c = 0;
    myspin = document.getElementById("myspin").value;
    //
    myexperb = parseFloat(myexper);

    if (xa < 2) { //0 = current year; 1 = following year

        if (xa == 1) {
            c = tybona;
        }
        if (xa == 0) {
            c = tybon;
        }

        if ((mystatus == 'Z') || (mystatus == 'D') || (mystatus == 'P')) {
            if (xa == 1) {
                c = 0;
            }
            if (xa == 0) {
                c = tybona; // +tybon;
            }
        }
        if ((mystatus == 'N') || (mystatus == 'B') || (mystatus == 'Q') || (((mystatus == 'P') || (mystatus == 'O')) && (myexperb == 0))) {
            c = 0;
        }

        if ((mystatus == 'R') && (myspin == '1') && (myexperb == 0)) {
            c = 0;
        }

    }
    //alert(mystatus+"-"+myexperb)
    return c;

}


function updatecutsalary(ozsent) {
    //alert(1);
    zsent = ozsent + "roster";
    zsent = zsent.toLowerCase();
    z1 = document.getElementById(zsent).selectedIndex;
    box = document.getElementById(zsent);
    myplayer = box.options[box.selectedIndex].value;
    mystatus = document.getElementById('mystatus').value;
    yearon = document.getElementById('myseason').value;
    contracts = document.getElementById('contracts').value;
    myplayera = "000000000" + trim(myplayer);
    myplayera = myplayera.substring(myplayera.length - 9, myplayera.length);
    myplayera = "!" + myplayera + "!";
    myplno = 1 + parseInt(parseFloat(contracts.indexOf(myplayera) / 10));
    temp1 = "cx" + myplno + "x"

    //alert(temp1);
    deadcap0 = document.getElementById('deadcap0').value;
    deadcap1 = document.getElementById('deadcap1').value;
    for (x = 0; x <= 7; x++) {
        temp1a = temp1 + (parseFloat(yearon) + x);
        if (document.getElementById(temp1a) != null) {
            yearcap = document.getElementById('yearcap' + x).value;


            mysal = document.getElementById(temp1a).value;
            mysalz = mysal.split(",");
            myexpera = mysalz[2];
            mysal = mysalz[0];

            //document.getElementById(temp1a).value;
            tysal = parseFloat(mysal.substring(1, 6));
            tycap = parseFloat(mysal.substring(6, 11));
            tybon = parseFloat(mysal.substring(11, 16));
            tybona = parseFloat(mysal.substring(16, 21));
            yearcap = parseFloat(yearcap) - parseFloat(tycap);

            //   if ((mystatus=='N') || (mystatus=='B') || (mystatus=='Q') || (((mystatus =='P') || (mystatus=='O')) && (myexpera==0)))

            ////   if ((mystatus=='N') || (mystatus=='B') || (mystatus=='Q'))
            //   {
            yearcap = parseFloat(yearcap) - parseFloat(tybon);
            //   }


            //alert(x1[1].innerHTML);

            tdead0 = 0;
            tdead1 = 0;
            if (x == 0) {
                tdead0 = parseFloat(figsave(tybon, tybona, mystatus, 0, myexpera));
                yearcap = yearcap + tdead0;
            }
            if (x == 1) {
                tdead1 = parseFloat(figsave(tybon, tybona, mystatus, 1, myexpera));
                yearcap = yearcap + tdead1;
            }
            document.getElementById('yearcap' + x).value = yearcap;
            var x1 = document.getElementById('yearsal').rows[x].cells;
            x1[1].innerHTML = "$" + addCommas(1000 * yearcap);

            // alert(tybon+"*"+tybona+"*"+mystatus+"*"+tdead0+"*"+tdead1);
            deadcap0 = parseFloat(deadcap0) + tdead0;
            deadcap1 = parseFloat(deadcap1) + tdead1;

        }
    }
    var x1 = document.getElementById('deadcapsalary').rows[0].cells;
    x1[1].innerHTML = "$" + addCommas(1000 * deadcap0);
    var x1 = document.getElementById('deadcapsalary').rows[1].cells;
    x1[1].innerHTML = "$" + addCommas(1000 * deadcap1);
    document.getElementById('deadcap1').value = deadcap1;
    document.getElementById('deadcap0').value = deadcap0;
    //   alert('done');
}

function runcutorder(z1a) {
    //alert("Running Cut Order")
    //alert(z1a);
    var theForm = document.forms["packages"]
    z1 = document.getElementById("docutorder").selectedIndex;
    //z1=theForm.elements['docutorder'].selectedIndex;
    zz1a = pid.indexOf("!" + z1a + " ")
    if (zz1a < 0) {
        zz1a = pid.indexOf("!" + z1a + "!")
    }
    zz1a = zz1a / 9;
    // alert(zz1a);
    if (zz1a >= 0) {
        zzz1 = theForm.elements['pcutorder'].value;
        z11 = "x" + z1
        z11 = z11.replace(/x/, "0")
        z11 = z11.substring(z11.length - 2, z11.length)
        zzz1a = zzz1.substr(0, zz1a * 3 + 1) + "" + z11 + "" + zzz1.substr(zz1a * 3 + 3, zzz1.length) + ""
        theForm.elements['pcutorder'].value = zzz1a;
        zzz1 = theForm.elements['changecuts'].value;
        if (zzz1.indexOf("!" + z1a + "-" + zz1a + "!") == -1) {
            zzz1 = zzz1 + z1a + "-" + zz1a + "!";
            theForm.elements['changecuts'].value = zzz1;
        }
    }
}
//END FORMATION