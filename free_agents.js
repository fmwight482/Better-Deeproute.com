function loadopt() {
    changeme(1, 1);
    fillemq();
    // updateplayer(1,999,'','Active');
    fillsignedcap();
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
    updateplayer(1, 999, '', 'Active');
}
//

function toggleall() {
    t1 = document.getElementById("viewem").value;
    t2 = "Show All Attributes";
    if (t1 == t2) {
        t2 = "Show Related Attributes Only";
    }
    document.getElementById("viewem").value = t2;
    updateplayer(1, 999, '', 'Active');
}

function addOption(selectObject, optionText, optionValue) {
    var optionObject = new Option(optionText,optionValue)
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
    var theForm = document.forms["packages"];
    contlist = theForm.elements['contlist'].value;

    if (1 == 0) {
        box = theForm.elements['inactiveroster'];
        iar = box.length;
        emq = theForm.elements['oemq'].value;

        for (x = 0; x < iar; x++) {

            z1a = box.options[x].value;
            alert(z1a);
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

}

function rostermove(old1, new1) {
    var theForm = document.forms["packages"]
    document.forms["packages"].spb.disabled = true;
    document.forms["packages"].spb2a.disabled = true;
    document.forms["packages"].spb2b.disabled = true;
    document.forms["packages"].spb2c.disabled = true;
    document.forms["packages"].spb2d.disabled = true;

    old2 = theForm.elements[old1].selectedIndex;
    new2 = theForm.elements[new1].selectedIndex;
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

                x[0].innerHTML = "Available (" + theForm.elements['activeroster'].length + ")";
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
                }
                if (new1 == 'cutroster') {
                    new1a = 'Cut';
                    //alert(1);
                    updatecutsalary(new1a);
                }
                //alert(new1a);
                updateplayer(1, 999, '', new1a)

            }
        }
    }
    document.forms["packages"].spb.disabled = false;
    document.forms["packages"].spb2a.disabled = false;
    document.forms["packages"].spb2b.disabled = false;
    document.forms["packages"].spb2c.disabled = false;
    document.forms["packages"].spb2d.disabled = false;

}

function storethese() {

    var x = document.getElementById('storeme').rows[2].cells;
    document.forms["packages"].spb.disabled = true;
    x[0].innerHTML = "<B>Your offers are saving.. this could take a minute.  Please wait!</b>";
    x[0].bgColor = "#99ee99";
    var theForm = document.forms["packages"]
    document.forms["packages"].submit();

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
    document.getElementById('signover').checked = true;
    document.getElementById('signsame').checked = true;
    document.getElementById('cutype').disabled = false;
    document.getElementById('offerb').disabled = false;
    document.getElementById('cutype').selectedIndex = 0;

    zsent = ozsent + "roster";
    zsent = zsent.toLowerCase();

    xcolor = "#99ff99";
    if (ozsent == "IR") {
        xcolor = "#ff6666"
    }

    if (ozsent == "Inactive") {
        xcolor = "#999999"
    }
    if (ozsent == "Cut") {
        xcolor = "#993333"
    }

    //alert(zsent)
    var theForm = document.forms["packages"];
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

        if (mpos == "*") {
            z2a = trim(z2a.substring(2, z2a.length))
            mposa = z2a.indexOf(' ');
            mpos = trim(z2a.substring(0, mposa))
        }

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
    pcutorder = theForm.elements['pcutorder'].value.split('!');

    madeit = "!" + z1a;
    v1 = 1 + pid.indexOf(madeit) / 9
    pida = pid.split("!");
    //alert(madeit+" "+v1)

    micol = '#eeeeee';
    mifont = 'black';
    //alert(v1);
    ph1 = phealth[v1];
    ph1a = "Healthy"
    if (ph1 < 100) {
        ph1a = "Knicked Up"
        ph1a = "<a target=injy href='?sel=listinjuries&myleagueno=" + document.getElementById('mylgno').value + "#" + document.getElementById('mytmno').value + "' target=oneply style='font-weight:bold; color:yellow; font-size:13px;'>KNICKED UP</a>"
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
        ph1a = "<a target=injy href='?sel=listinjuries&myleagueno=" + document.getElementById('mylgno').value + "#" + document.getElementById('mytmno').value + "' target=oneply style='font-weight:bold; color:yellow; font-size:13px;'>OUT</a>"
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
    x2 = "<table class='table table-condensed' bgcolor=#666666>"
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
            att3 = att3 + "&nbsp;"
            //alert(att3);
            //}

            // alert(att3);
            x2 = x2 + att3;
            x2 = x2 + "</b></td></tr>"

        }
    }
    x2 = x2 + "</table>"

    var x = document.getElementById('bigtable').rows[2].cells;
    x1 = "<table  bgcolor=#666666>"
    backstart = ""

    if (z1 > 11) {
        backstart = ""
    }

    plnamea = plname[v1];

    if (plnamea.indexOf("(") > -1)
    {
        plnamea = plnamea.substr(0, plnamea.indexOf("("))
    }

    x1 = x1 + "<tr><th align=left bgcolor=\"" + xcolor + "\">Status : " + ozsent + "</th></tr>"
    x1 = x1 + "<tr><th align=left size=25 bgcolor=#eeeeee><a href='?js=oneplayer&lookatplayer=" + trim(z1a) + "&myleagueno=" + document.getElementById('mylgno').value + "' target=oneply style='font-weight:bold; font-size:13px;'>" + ppos[v1] + " " + pfname[v1] + " " + plnamea + "</a></th>"
    //x1=x1+"</tr><tr><th  align=left bgcolor=#eeeeee>"+cname[pcollege[v1]]+"</th></tr>"
    x1 = x1 + "</tr><tr><th  colspan=1  align=left bgcolor=#eeeeee>College: " + cname[pcollege[v1]] + "</th></tr>"
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

    //x1=x1+"<tr><th  align=left bgcolor="+micol+"><font color="+mifont+">Health: "+phealth[v1]+"%</th></tr>"
    //x1=x1+"<tr><th  align=left bgcolor="+micol+"><input type=button onclick='toggleall();' value='"+document.getElementById("viewem").value+"'></th></tr>"

    //x1=x1+"<tr><th width=150 align=left>Cutorder</th><td>"
    //x1=x1+'<select size=1 name=docutorder id=docutorderonkeyup="this.blur(); this.focus();" '
    //x1=x1+'onchange="runcutorder('+z1a+');" onclick="runcutorder('+z1a+');">';

    //for (xx=0; xx<100; xx++)
    //{
    //x1=x1+"<option value="+xx
    //if (xx==pcutorder[v1])
    // x1=x1+" selected"
    //x1=x1+">"+xx
    //}
    //x1=x1+"</select></td></tr>
    x1 = x1 + "</table></th></tr>"

    x1 = x1 + "<tr><td align=left valign=top><table width=\"100\%\"><tr><td width=\"100\%\" align=left bgcolor=black valign=top>" + x2 + "</td>"
    x1 = x1 + "</tr></table></td></tr></table>"
    x[1].innerHTML = x1;
    //alert(1);
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
                    x1 = x1 + "<td><table width=\"100%\" bgcolor=white cellpadding=2 cellspacing=1>"
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
                            x1 = x1 + "<td align=center bgcolor=#999999><b>" + mposd[1] + "</b></td>"
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

                    }
                    // checkloopr

                    x1 = x1 + "</table></td>"
                    if ((xloopa / 2) != parseInt(parseFloat(xloopa / 2))) {
                        x1 = x1 + "</tr><tr>"
                    }
                    //alert(x1)
                }
            }
        }
        // mpos
        // x1=x1+"</tr><tr>"

    }
    // xloop
    x1 = x1 + "</tr></table>"

    var x = document.getElementById('bigtable').rows[3].cells;
    x[0].innerHTML = x1;
    //alert(x1)
}

//START FORMATION

function fillformation(z) {

    var theForm = document.forms["packages"]
    var contlist = theForm.elements['contlist'].value

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
    //if parseFloat(pidl > 1000)
    //{
    // alert(pid+"&"+pidl)
    //}

    //s2a=s2.split("!")

    for (xloop = 1; xloop <= 1; xloop++) {
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

            if (pitb[zzi] == itb) {

                //alert(theForm.elements['sentplayer'].value)

                ccont = ""
                myplayera = "000000000" + trim(pidl[zzi]);
                myplayera = myplayera.substring(myplayera.length - 9, myplayera.length);
                if (contlist.indexOf("!" + myplayera + "^") > -1) {
                    ccont = "* "
                }

                addOption(theForm.elements[xname], ccont + ppos[zzi] + ' ' + pfname[zzi] + ' ' + plname[zzi] + "     ", pidl[zzi])
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
                box.options[box.length - 1].style.fontWeight = "normal";
                if (ccont == "* ") {
                    box.options[box.length - 1].style.fontWeight = "bold";
                }

            }

        }

        var x = document.getElementById('rosters').rows[1].cells;
        //alert(1);

        x[0].innerHTML = "Active (" + theForm.elements['activeroster'].length + ")";
        //x[1].innerHTML="Inactive ("+theForm.elements['inactiveroster'].length+")";
        //var x=document.getElementById('rosters').rows[4].cells;
        //x[0].innerHTML="IR ("+theForm.elements['irroster'].length+")";
    }

    //alert(z+" "+yname)
    updateplayer(1, 999, '', 'Active');
    //alert(1)

}

function hideme(z) {
    var spanElm = document.getElementById(z);
    spanElm.style.display = "none";
    spanElm.style.visibility = "hidden";
}

function updateplayersalary(myplayer, fn, ln, posi) {

    var x1 = document.getElementById('salarydemands').rows[0].cells;
    x1[0].innerHTML = fn + " " + ln + " -- " + posi;

    myplayera = "000000000" + trim(myplayer);
    myplayera = myplayera.substring(myplayera.length - 9, myplayera.length);
    acont = false;
    contlist = document.getElementById('contlist').value;
    if (contlist.indexOf("!" + myplayera + "^") > -1) {
        acont = true;
    }
    //alert(acont);

    if (acont == false) {
        mycapcost = 0;
        mysave0 = 0;
        mysave1 = 0;
        mystatus = document.getElementById('mystatus').value;
        yearon = document.getElementById('myseason').value;
        contracts = document.getElementById('contracts').value;
        myplayera = "000000000" + trim(myplayer);
        myplayera = myplayera.substring(myplayera.length - 9, myplayera.length);

        zz9 = 6;
        temp1 = "cont" + trim(myplayer) + "x" + zz9
        while (document.getElementById(temp1) == null) {
            zz9--;
            temp1 = "cont" + trim(myplayer) + "x" + zz9
        }
        // temp1="cont"+trim(myplayer)+"x"+(z1l/15)
        //temp2="contz"+trim(myplayer)
        //alert(temp1.length)
        //document.getElementById(temp1).value=document.getElementById(temp2).value;

        z1 = document.getElementById(temp1).value;
        z1l = z1.length;

        x1a = '<select class="span1" size=1 name=acceptyears id=acceptyears onkeyup="this.blur(); this.focus();" onchange="updatecyears(' + myplayer + ');">'
        //tybona=0;
        //tysala=0;
        //tycapa=0;
        z1l = z1.length;
        tybona = 0;
        tysala = 0;
        tycapa = 0;

        for (xl = 1; xl <= 6; ++xl) {
            var x1 = document.getElementById('salarybyyear').rows[xl].cells;
            for (xla = 0; xla <= 3; ++xla) {

                x1[xla].innerHTML = "";
                x1[xla].bgColor = "#000000";
            }

            if (xl <= (z1l / 15)) {
                x1a = x1a + "<option value='" + xl + "' "
                if (xl == (z1l / 15)) {
                    x1a = x1a + "selected"
                }
                x1a = x1a + ">" + xl

                //var x1=document.getElementById('salarybyyear').rows[xl].cells;
                // x1[0].innerHTML=parseFloat(yearon)+parseFloat((xl-1));
                // x1[0].bgColor="#eeeeee";
                //tybon=parseFloat(z1.substring(0+(xl-1)*15,5+(xl-1)*15));
                // tybona=tybona+tybon;
                // tysal=parseFloat(z1.substring(5+(xl-1)*15,10+(xl-1)*15));
                // tysala=tysala+tysal;
                // tycap=parseFloat(z1.substring(10+(xl-1)*15,15+(xl-1)*15));
                // tycapa=tycapa+tycap;
                // if (tybon > 0)
                // {
                //  x1[1].innerHTML="$"+addCommas(parseFloat(tybon));
                // }
                // if (tybon == 0)
                // {
                //  x1[1].innerHTML="---";
                // }
                // x1[1].bgColor="#ffffff";
                // x1[2].innerHTML="$"+addCommas(parseFloat(tysal)) //+"K"
                // x1[3].innerHTML="$"+addCommas(parseFloat(tycap+tybon))//+"K"
                //x1[2].bgColor="#ffffff";
                // x1[3].bgColor="#ffffff";
                //}
                // var x1=document.getElementById('salarybyyear').rows[7].cells;
                // x1[1].innerHTML="$"+addCommas(parseFloat(tybona)) //+"K"
                // x1[2].innerHTML="$"+addCommas(parseFloat(tysala)) //+"K"
                // x1[3].innerHTML="$"+addCommas(parseFloat(tycapa+tybona)) //+"K"
            }
        }
        x1a = x1a + '</select>'
        //alert(x1a)
        var x1 = document.getElementById('salarydemands').rows[1].cells;
        x1[1].innerHTML = x1a;
        x1[0].innerHTML = "Acceptable Years";
        x1[0].style.background = "#eeeeee";
        x1[0].style.color = "#000000";
        x1[0].style.height = "25px";

        //alert(x1a)

        document.getElementById('signover').disabled = false;
        document.getElementById('signsame').disabled = false;
        document.getElementById('cutype').disabled = false;
        document.getElementById('offerb').disabled = false;
        endiscutype();

        fillcontractunsigned(z1, myplayer);
    }

    if (acont == true) {

        var x1 = document.getElementById('salarydemands').rows[1].cells;
        z1 = contlist.substring(contlist.indexOf("!" + myplayera + "^"), 125 + contlist.indexOf("!" + myplayera + "^"))
        z1a = trim(z1.substring(20, 20 + 90));
        // alert(z1a);
        x1[1].innerHTML = "&nbsp;<b>" + (z1a.length / 15) + " year(s)</b>";
        x1[0].innerHTML = "Offered Years";
        x1[0].style.background = "#333399";
        x1[0].style.height = "25px";
        x1[0].style.color = "#ffffff";

        document.getElementById('cutype').selectedIndex = z1.substring(12, 13);
        document.getElementById('signover').checked = false;
        document.getElementById('signsame').checked = false;
        if (z1.substring(11, 12) == '1') {
            document.getElementById('signover').checked = true;
        }
        if (z1.substring(13, 14) == '1') {
            document.getElementById('signsame').checked = true;
        }
        //alert(z1.substring(12,15));
        endiscutype();
        document.getElementById('signover').disabled = true;
        document.getElementById('signsame').disabled = true;
        document.getElementById('offerb').disabled = true;
        document.getElementById('cutype').disabled = true;

        fillcontract(z1a, myplayer);
        fillsignedcap();
    }

    if (1 == 0) {
        myplayera = "!" + myplayera + "!";
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
                if (document.getElementById(temp1a) != null) {
                    x1[0].style.height = "20px";
                    x1[0].innerHTML = parseFloat(yearon) + x - 2;
                    mysal = document.getElementById(temp1a).value;
                    // alert(mysal);
                    tysal = parseFloat(mysal.substring(1, 6));
                    tycap = parseFloat(mysal.substring(6, 11));
                    tybon = parseFloat(mysal.substring(11, 16));
                    tybona = parseFloat(mysal.substring(16, 21));
                    capcostr = figsave(tybon, tybona, mystatus, x - 2);
                    // alert(capcostr);
                    if ((mystatus == 'N') || (mystatus == 'B') || (mystatus == 'Q')) {
                        tycap = tycap + tybon;
                    }
                    x1[1].innerHTML = "$" + addCommas(1000 * tybon);
                    x1[2].innerHTML = "$" + addCommas(1000 * tysal);
                    x1[3].innerHTML = "$" + addCommas(1000 * tycap);
                    x1[4].innerHTML = "$" + addCommas(1000 * capcostr);
                }
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

function figsave(tybon, tybona, mystatus, xa) {
    var c;
    c = 0;
    if (xa < 2) {
        //0 = current year; 1 = following year

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
                c = tybona;
            }
        }
        if ((mystatus == 'N') || (mystatus == 'B') || (mystatus == 'Q')) {
            c = 0;
        }
    }
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
            tysal = parseFloat(mysal.substring(1, 6));
            tycap = parseFloat(mysal.substring(6, 11));
            tybon = parseFloat(mysal.substring(11, 16));
            tybona = parseFloat(mysal.substring(16, 21));
            yearcap = parseFloat(yearcap) - parseFloat(tycap);

            if ((mystatus == 'N') || (mystatus == 'B') || (mystatus == 'Q')) {
                yearcap = parseFloat(yearcap) - parseFloat(tybon);
            }

            //alert(x1[1].innerHTML);

            tdead0 = 0;
            tdead1 = 0;
            if (x == 0) {
                tdead0 = parseFloat(figsave(tybon, tybona, mystatus, 0));
                yearcap = yearcap + tdead0;
            }
            if (x == 1) {
                tdead1 = parseFloat(figsave(tybon, tybona, mystatus, 1));
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
    //alert(z1a);
    var theForm = document.forms["packages"]
    z1 = theForm.elements['docutorder'].selectedIndex;
    zz1a = pid.indexOf("!" + z1a + " ")
    if (zz1a < 0) {
        zz1a = pid.indexOf("!" + z1a + "!")
    }
    zz1a = zz1a / 9;
    if (zz1a >= 0) {
        zzz1 = theForm.elements['pcutorder'].value;
        z11 = "x" + z1
        z11 = z11.replace(/x/, "0")
        z11 = z11.substring(z11.length - 2, z11.length)
        //  alert(z11+"*"+z11.length);
        zzz1a = zzz1.substring(0, zz1a * 3 + 1) + "" + z11 + "" + zzz1.substring(zz1a * 3 + 3, z1.length) + ""
        theForm.elements['pcutorder'].value = zzz1a;
        // alert(zzz1a+"-"+zzz1a.length);

        zzz1 = theForm.elements['changecuts'].value;
        if (zzz1.indexOf("!" + z1a + "-" + zz1a + "!") == -1) {
            zzz1 = zzz1 + z1a + "-" + zz1a + "!";
            theForm.elements['changecuts'].value = zzz1;
            //alert(zzz1);
            //alert(zzz1a);
        }

    }

}

function fillcontract(z1, myplayer) {

    z1l = z1.length;
    tybona = 0;
    tysala = 0;
    tycapa = 0;

    for (xl = 1; xl <= 6; ++xl) {
        var x1 = document.getElementById('salarybyyear').rows[xl].cells;
        for (xla = 0; xla <= 3; ++xla) {

            x1[xla].innerHTML = "";
            x1[xla].bgColor = "#000000";
        }

        if (xl <= (z1l / 15)) {
            yearon = document.getElementById('myseason').value;
            var x1 = document.getElementById('salarybyyear').rows[xl].cells;
            x1[0].innerHTML = parseFloat(yearon) + parseFloat((xl - 1));
            x1[0].bgColor = "#eeeeee";
            tybon = parseFloat(z1.substring(0 + (xl - 1) * 15, 5 + (xl - 1) * 15));
            tybona = tybona + tybon;
            tysal = parseFloat(z1.substring(5 + (xl - 1) * 15, 10 + (xl - 1) * 15));
            tysala = tysala + tysal;
            tycap = parseFloat(z1.substring(10 + (xl - 1) * 15, 15 + (xl - 1) * 15));
            tycapa = tycapa + tycap;
            if (tybon > 0) {
                x1[1].innerHTML = "$" + addCommas(parseFloat(tybon));
            }
            if (tybon == 0) {
                x1[1].innerHTML = "---";
            }
            x1[1].bgColor = "#ffffff";
            x1[2].innerHTML = "$" + addCommas(parseFloat(tysal))
            //+"K"
            x1[3].innerHTML = "$" + addCommas(parseFloat(tycap + tybon))
            //+"K"
            x1[2].bgColor = "#ffffff";
            x1[3].bgColor = "#ffffff";

        }
        var x1 = document.getElementById('salarybyyear').rows[7].cells;
        x1[1].innerHTML = "$" + addCommas(parseFloat(tybona))
        //+"K"
        x1[2].innerHTML = "$" + addCommas(parseFloat(tysala))
        //+"K"
        x1[3].innerHTML = "$" + addCommas(parseFloat(tycapa + tybona))
        //+"K"
    }
    //x1a=x1a+'</select>'
    //alert(x1a)
    // var x1=document.getElementById('salarydemands').rows[1].cells;
    // x1[1].innerHTML=x1a;

}

function updatecyears(myplayer) {

    z1zz = document.getElementById('acceptyears').value;
    //selectedIndex;
    // alert(1);
    temp1zz = "cont" + myplayer + "x" + z1zz;
    // alert(1);
    z1zz1 = document.getElementById(temp1zz).value;
    document.getElementById('curcont').value = z1zz1;

    // alert(1);

    fillcontractunsigned(z1zz1, myplayer);
}

//END FORMATION

function fillcontractunsigned(z1, myplayer) {
    var tybon, tybona, tysal, tysala, tycap, tycapa;
    document.getElementById('curcont').value = z1;
    bonuser = document.getElementById('bonuser').value;

    z1l = z1.length;
    tybona = 0;
    tysala = 0;
    tycapa = 0;
    cccc = 0;
    for (xl = 1; xl <= 6; ++xl) {
        yct = document.getElementById("yearcap" + (xl - 1)).value;
        //alert(yct);
        var x1 = document.getElementById('yearsal').rows[xl].cells;
        x1[3].innerHTML = "$" + addCommas(parseFloat(yct)) + ",000"
        //+"K"
        var x1 = document.getElementById('salarybyyear').rows[xl].cells;
        for (xla = 0; xla <= 3; ++xla) {

            x1[xla].innerHTML = "";
            x1[xla].bgColor = "#000000";
        }

        if (xl <= (z1l / 15)) {

            var x1 = document.getElementById('salarybyyear').rows[xl].cells;
            x1[0].innerHTML = parseFloat(yearon) + parseFloat((xl - 1));
            x1[0].bgColor = "#eeeeee";
            //alert("*"+z1+"*");
            tybon = parseFloat(z1.substring(0 + (xl - 1) * 15, 5 + (xl - 1) * 15));
            tybona = tybona + tybon;
            tysal = parseFloat(z1.substring(5 + (xl - 1) * 15, 10 + (xl - 1) * 15));
            tysala = tysala + tysal;
            tycap = parseFloat(z1.substring(10 + (xl - 1) * 15, 15 + (xl - 1) * 15));
            tycapa = tycapa + tycap;

            x111 = "";
            //alert(x111);
            if (xl == 1) {
                //alert(x111);
                x111c = "$" + addCommas(parseFloat(tybon));
                if (tybon == 0) {
                    x111c = "---";
                }
                x111 = "<select onkeyup='this.blur(); this.focus();' onchange='rejiggercont(\"" + z1 + "\",\"" + myplayer + "\");' name='signbonus' id='signbonus' size=1 style='font-size : 11px; text-align : right;'>"
                x111 = x111 + "<option value='" + tybon + "' selected>" + x111c + "&nbsp;"
                // alert(x111);
                tybsum = parseFloat(tybon);
                tadd = 10;

                while (tybsum < 15000) {
                    tybsss = "*" + tybsum;
                    if ((tybsum + tadd) > 10000) {
                        tadd = 100;
                        //   tybss1=tybsss.substring(tybsss.length-3,tybsss.length-2);
                        //   if ((tybss1 != "0") && (tybss1 != "5"))
                        //   {
                        //    lastd="0"
                        //    if  (parseFloat(tybss1) > 5)
                        //    {
                        //     lastd="5";
                        //    }
                        //    tybsss =tybsss.substring(1,tybsss.length-3)+"x00";
                        ////if (cccc < 10)
                        ////{++cccc;
                        ////alert(tybss1+"*"+tybsss+"*"+tybsum+"*"+lastd);
                        //  tybsum=parseInt(parseFloat(tybsss.replace(/x/,lastd)));
                        ////alert(tybsss+"*"+tybsum+"*"+lastd);
                        ////}
                    }
                    tybsss = "*" + tybsum;
                    if ((tybsum + tadd) >= 1000 && ((tybsum + tadd) < 10000)) {
                        tadd = 50;
                        tybss1 = tybsss.substring(tybsss.length - 2, tybsss.length - 1);
                        if ((tybss1 != "0") && (tybss1 != "5")) {
                            lastd = "0"
                            if (parseFloat(tybss1) > 5) {
                                lastd = "5";
                            }
                            tybsss = tybsss.substring(1, tybsss.length - 2) + "x0";
                            //if (cccc < 10)
                            //{++cccc;
                            //alert(tybss1+"*"+tybsss+"*"+tybsum+"*"+lastd);
                            tybsum = parseInt(parseFloat(tybsss.replace(/x/, lastd)));
                            //alert(tybsss+"*"+tybsum+"*"+lastd);
                            //}

                        }
                    }

                    tybsss = "*" + tybsum;
                    if (tybsss.substring(tybsss.length - 1, tybsss) != "0") {
                        tybsss = tybsss.substring(1, tybsss.length - 1) + "x";
                        tybsum = parseInt(parseFloat(tybsss.replace(/x/, "0")));
                    }

                    tybsum = tybsum + tadd;
                    if ((tybsum > 1000) && ((tybsum - tadd) < 1000)) {
                        tybsum = 1000;
                    }
                    if ((bonuser != 'N') && (bonuser != '2')) {
                        x111 = x111 + "<option value='" + tybsum + "'>" + "$" + addCommas(parseFloat(tybsum)) + "&nbsp;"
                    }
                }

                //if ((bonuser == 'N') || (bonuser == '2'))
                //{
                // x111=x111+"<option value='0'>N/A&nbsp;"
                // }

                x111 = x111 + "</select>"
                //alert(x111)
            }

            if (xl > 1) {
                x111 = "$" + addCommas(parseFloat(tybon));
                if (tybon == 0) {
                    x111 = "---";
                }
            }
            // if (tybon > 0)
            // {
            //  x1[1].innerHTML="$"+addCommas(parseFloat(tybon));
            // }
            //if (tybon == 0)
            // {
            //  x1[1].innerHTML="---";
            // }
            // alert(x111);
            x1[1].innerHTML = x111;
            x1[1].bgColor = "#ffffff";

            //Stat Contract Years

            x111 = "";
            //alert(x111);
            if (xl != 111) {
                //alert(x111);
                x111c = "$" + addCommas(parseFloat(tysal));
                if (tysal == 0) {
                    x111c = "---";
                }
                x111 = "<select onkeyup='this.blur(); this.focus();' onchange='rejiggercont(\"" + z1 + "\",\"" + (myplayer) + "\");' name='yearsalr" + xl + "' id='yearsalr" + xl + "' size=1 style='font-size : 11px; text-align : right;'>"
                //alert(x111);
                x111 = x111 + "<option value='" + tysal + "' selected>" + x111c + "&nbsp;"
                tybsum = parseFloat(tysal);
                //alert("*"+tybsum+"*")
                tadd = 10;

                while (tybsum < 15000) {
                    tybsss = "*" + tybsum;
                    if ((tybsum + tadd) > 10000) {
                        tadd = 100;
                        //   tybss1=tybsss.substring(tybsss.length-3,tybsss.length-2);
                        //   if ((tybss1 != "0") && (tybss1 != "5"))
                        //   {
                        //    lastd="0"
                        //    if  (parseFloat(tybss1) > 5)
                        //    {
                        //     lastd="5";
                        //    }
                        //    tybsss =tybsss.substring(1,tybsss.length-3)+"x00";
                        ////if (cccc < 10)
                        ////{++cccc;
                        ////alert(tybss1+"*"+tybsss+"*"+tybsum+"*"+lastd);
                        //  tybsum=parseInt(parseFloat(tybsss.replace(/x/,lastd)));
                        ////alert(tybsss+"*"+tybsum+"*"+lastd);
                        ////}
                    }
                    tybsss = "*" + tybsum;
                    if ((tybsum + tadd) >= 1000 && ((tybsum + tadd) < 10000)) {
                        tadd = 50;
                        tybss1 = tybsss.substring(tybsss.length - 2, tybsss.length - 1);
                        if ((tybss1 != "0") && (tybss1 != "5")) {
                            lastd = "0"
                            if (parseFloat(tybss1) > 5) {
                                lastd = "5";
                            }
                            tybsss = tybsss.substring(1, tybsss.length - 2) + "x0";
                            //if (cccc < 10)
                            //{++cccc;
                            //alert(tybss1+"*"+tybsss+"*"+tybsum+"*"+lastd);
                            tybsum = parseInt(parseFloat(tybsss.replace(/x/, lastd)));
                            //alert(tybsss+"*"+tybsum+"*"+lastd);
                            //}

                        }
                    }

                    tybsss = "*" + tybsum;
                    if (tybsss.substring(tybsss.length - 1, tybsss) != "0") {
                        tybsss = tybsss.substring(1, tybsss.length - 1) + "x";
                        tybsum = parseInt(parseFloat(tybsss.replace(/x/, "0")));
                    }

                    tybsum = tybsum + tadd;
                    if ((tybsum > 1000) && ((tybsum - tadd) < 1000)) {
                        tybsum = 1000;
                    }
                    if (bonuser != 'N') {
                        x111 = x111 + "<option value='" + tybsum + "'>" + "$" + addCommas(parseFloat(tybsum)) + "&nbsp;"
                    }
                }
                x111 = x111 + "</select>"
                //alert(x111)
            }

            if (xl > 111) {
                x111 = "$" + addCommas(parseFloat(tybon));
                if (tybon == 0) {
                    x111 = "---";
                }
            }
            // if (tybon > 0)
            // {
            //  x1[1].innerHTML="$"+addCommas(parseFloat(tybon));
            // }
            //if (tybon == 0)
            // {
            //  x1[1].innerHTML="---";
            // }
            // alert(x111);
            x1[2].innerHTML = x111;
            x1[2].bgColor = "#ffffff";

            // x1[2].innerHTML="$"+addCommas(parseFloat(tysal)) //+"K"
            x1[3].innerHTML = "$" + addCommas(parseFloat(tycap + tybon))
            //+"K"
            // x1[2].bgColor="#ffffff";
            x1[3].bgColor = "#ffffff";

            yct = parseFloat(yct) + parseFloat(tycap) + parseFloat(tybon);
            var x1 = document.getElementById('yearsal').rows[xl].cells;
            x1[3].innerHTML = "$" + addCommas(parseFloat(yct)) + ",000"
            //+"K"

        }
        var x1 = document.getElementById('salarybyyear').rows[7].cells;
        x1[1].innerHTML = "$" + addCommas(parseFloat(tybona))
        //+"K"
        x1[2].innerHTML = "$" + addCommas(parseFloat(tysala))
        //+"K"
        x1[3].innerHTML = "$" + addCommas(parseFloat(tycapa + tybona))
        //+"K"
    }
    x1a = x1a + '</select>'
    //alert(x1a)
    // var x1=document.getElementById('salarydemands').rows[1].cells;
    // x1[1].innerHTML=x1a;

}

function rejiggercont(abba, myplayer) {
    var tysal, tycap, psal, yearsal;

    // z1=document.getElementById('signbonus').selectedIndex;
    box = document.getElementById('signbonus');
    bonusamt = box.options[box.selectedIndex].value;
    z1zz = document.getElementById('acceptyears').value;
    temp1zz = "cont" + trim(myplayer) + "x" + z1zz;
    // alert(temp1zz)
    temp1zzz = document.getElementById(temp1zz).value;
    // alert("-"+abba+"-"+temp1zzz)
    bonusa = parseFloat(bonusamt * z1zz);
    bonusadd = 0;
    baseadd = 0;
    capadd = 0;
    accu = "";
    psal = 0;

    for (xl = 1; xl <= z1zz; xl++) {
        tysal = parseInt(parseFloat(temp1zzz.substring(5 + (xl - 1) * 15, 10 + (xl - 1) * 15)));
        tycap = parseInt(parseFloat(temp1zzz.substring(10 + (xl - 1) * 15, 15 + (xl - 1) * 15)));
        // alert(tysal+"&"+tycap)
        if (tysal < psal) {
            tysal = psal;
            tycap = psal;
        }
        //  alert(tysal+"&"+tycap)

        if (bonusa > 50) {
            tycap = tysal;
        }
        //  alert(tysal+"&"+tycap)
        //yearsal=0;
        //alert(tysal+"&"+tycap+"&"+yearsal+"&"+xl+"&")
        boxa = document.getElementById('yearsalr' + xl);
        yearsal = parseFloat(boxa.options[boxa.selectedIndex].value);

        //yearsal=parseInt(parseFloat(document.getElementById('yearsalr'+xl).value));
        // alert(tysal+"&"+tycap+"&"+yearsal+"&"+xl+"&"+boxa.selectedIndex)
        if (yearsal > tysal) {
            tysal = yearsal;
            tycap = yearsal;
        }
        //  alert(tysal+"&"+tycap+"&"+yearsal)

        temp1 = "xxxxx" + bonusamt;
        temp1 = temp1.substring(temp1.length - 5, temp1.length);
        accu = accu + temp1;
        temp1 = "xxxxx" + tysal;
        temp1 = temp1.substring(temp1.length - 5, temp1.length);
        accu = accu + temp1;
        temp1 = "xxxxx" + tycap;
        temp1 = temp1.substring(temp1.length - 5, temp1.length);
        accu = accu + temp1;

        while (accu.indexOf("x") > -1) {
            accu = accu.replace(/x/, "0")
        }
        psal = tysal;
    }
    // alert(abba+"*"+myplayer+"*"+bonusamt+"*"+temp1zzz+"*"+tysal+"*"+tycap+"&"+accu)
    // alert(temp1zzz+"&"+accu)
    document.getElementById('curcont').value = accu;
    // alert(accu);
    fillcontractunsigned(accu, myplayer);
}
function endiscutype() {
    document.getElementById('cutype').disabled = true;
    document.getElementById('cutype').style.visibility = 'hidden';
    document.getElementById('cutmethod').style.visibility = 'hidden';
    if (document.getElementById('signover').checked) {
        document.getElementById('cutype').disabled = false;
        document.getElementById('cutype').style.visibility = 'visible';
        document.getElementById('cutmethod').style.visibility = 'visible';
    }
    //alert(1);
}

function offerme() {
    myplayer = document.getElementById('activeroster').value;
    mycap = parseInt(parseFloat(document.getElementById('mycap').value));
    thisyearcap = parseInt(parseFloat(document.getElementById('yearcap0').value));
    purgatory = (document.getElementById('mypurgatory').value == "Y");
    bonusbase = document.getElementById('curcont').value;
    bonusbaseb = parseInt(parseFloat(bonusbase.substring(0, 5)));
    bonusbasec = parseInt(parseFloat(bonusbase.substring(10, 15)));

    //alert(purgatory+"*"+bonusbaseb+"*"+bonusbasec);

    purgatory = (purgatory && (bonusbaseb > 0))

    if (purgatory) {
        t1 = "Your team is currently in Salary Cap Purgatory.  This is either due to poor cap management "
        t1 = t1 + "on your part during this current season or during last season.  Players were removed from your "
        t1 = t1 + "without counting toward the dead cap, thus putting you at a potential advantage.  To even this "
        t1 = t1 + "out, your team cannot sign any players that have a bonus for the rest of the current year. "
        t1 = t1 + "Since the player you tried to sign included a bonus, the offer has been rejected by the league."
        alert(t1);

    }

    if (thisyearcap > 150000) {
        t1 = "Your team is over $150,000 with this transaction, you cannot sign anyone else as this is the hard cap. Cut some players to make more cap room."
        alert(t1);

        purgatory = "Y"
    }

    if (!(purgatory)) {

        myplayera = "000000000" + trim(myplayer);
        myplayera = myplayera.substring(myplayera.length - 9, myplayera.length);
        accu = "!" + myplayera + "^";

        buttonon = "00";
        if (document.getElementById('signover').checked) {
            buttonon = "1" + document.getElementById('cutype').value;
        }
        accu = accu + buttonon;

        buttonon = "0";
        if (document.getElementById('signsame').checked) {
            buttonon = "1";
        }
        accu = accu + buttonon;
        accu = accu + "      ";
        //16-20
        // yacc=document.getElementById('acceptyears').value; //selectedIndex;
        accu = accu + document.getElementById('curcont').value;
        accu = accu + "                                                                                                         ";
        accu = accu.substring(0, 125);
        //alert(accu);
        allcont = document.getElementById('contlist').value;
        if (allcont.indexOf("!" + myplayera + "^") < 0) {
            allcont = allcont + accu;
            document.getElementById('contlist').value = allcont;
        }

        updateplayer(1, 999, '', 'Active');
        //alert(allcont);
        fillsignedcap();

        box1a = document.getElementById('activeroster');
        t1a = box1a.options[box1a.selectedIndex].text;
        box1a.options[box1a.selectedIndex].style.fontWeight = "bold";
        if (t1a.substring(0, 2) != "* ") {
            box1a.options[box1a.selectedIndex].text = "* " + t1a;
        }
    }
}
function ridcont() {
    myplayer = document.getElementById('activeroster').value;
    myplayera = "000000000" + trim(myplayer);
    myplayera = myplayera.substring(myplayera.length - 9, myplayera.length);
    accu = "!" + myplayera + "^";
    contlist = document.getElementById('contlist').value;

    //alert("*"+contlist);
    if (contlist.indexOf(accu) > -1) {
        box1a = document.getElementById('activeroster');
        t1a = box1a.options[box1a.selectedIndex].text;
        box1a.options[box1a.selectedIndex].style.fontWeight = "normal";
        if (t1a.substring(0, 2) == "* ") {
            box1a.options[box1a.selectedIndex].text = t1a.substring(2, t1a.length);
        }
        cplace = contlist.indexOf(accu);
        // alert(cplace);
        contlist = contlist.substring(0, cplace) + contlist.substring(cplace + 125, contlist.length);
        document.getElementById('contlist').value = contlist;
    }
    //alert("*"+contlist);
    updateplayer(1, 999, '', 'Active');
    fillsignedcap();
    rejiggercont(myplayer, myplayer);
}

function fillsignedcap() {
    alerter = false;
    refill2 = false;

    mywarn = document.getElementById('mywarn').value;

    myplayer = document.getElementById('activeroster').value;
    myplayera = "000000000" + trim(myplayer);
    myplayera = myplayera.substring(myplayera.length - 9, myplayera.length);
    mycap = parseInt(parseFloat(document.getElementById('mycap').value));

    contlist = document.getElementById("contlist").value
    // alert(contlist);
    cll = (contlist.length / 125);
    // alert(cll);
    for (xl = 1; xl <= 6; ++xl) {
        yct = parseFloat(document.getElementById("yearcap" + (xl - 1)).value);
        yct1 = yct

        if (cll > 0) {
            for (xxx = 1; xxx <= cll; ++xxx) {
                z1p = trim(contlist.substring((xxx - 1) * 125, (xxx - 1) * 125 + 11));
                z1 = trim(contlist.substring((xxx - 1) * 125 + 20, (xxx - 1) * 125 + 110));
                zz1 = (z1.length / 15);
                yyy = xl;
                if (yyy <= zz1) {
                    tybon = parseFloat(z1.substring(0 + (yyy - 1) * 15, 5 + (yyy - 1) * 15));
                    //tysal=parseFloat(z1.substring(5+(yyy-1)*15,10+(yyy-1)*15));
                    tycap = parseFloat(z1.substring(10 + (yyy - 1) * 15, 15 + (yyy - 1) * 15));
                    // alert(yct+"*"+tycap+"*"+tybon);
                    yct = yct + tycap + tybon;
                    //alert(z1p);
                    if (z1p == ("!" + myplayera + "^")) {
                        refill2 = true;
                        yct1 = yct1 + tycap + tybon;
                    }
                }
            }
        }
        var x1 = document.getElementById('yearsal').rows[xl].cells;
        x1[2].innerHTML = "$" + addCommas(yct) + ",000";
        if (yct > mycap) {
            alerter = true;
        }
        if (refill2) {

            x1[3].innerHTML = "$" + addCommas(yct1) + ",000";
        }
        //alert(xl);
    }

    if ((alerter) && (mywarn == "N")) {
        //alert(mywarn);
        document.getElementById('mywarn').value = "Y";
        // alert(document.getElementById('mywarn').value);
        t1 = "Please note that you are requesting to go over the salary cap.  If this is the last spin before the "
        t1 = t1 + "season begins or later, or it is preseason and you are 150% or more over the cap and this player is signed, "
        t1 = t1 + "the game will make cuts on your behalf to attempt to get under the cap.  "
        t1 = t1 + "To avoid this, you can cut players yourself or set the cut order of the players you wish to be cut first on the Roster Moves screen. "
        t1 = t1 + "  Please note that going over the cap between spins is fine, as long as the situation "
        t1 = t1 + "is rectified the same week (until the lastday of preseason, you can be as high as 150% over the cap). "
        t1 = t1 + "If the game has to make cuts for you and goes below 40 players, the remaining cuts will not count against your dead cap "
        t1 = t1 + "but you will be placed in Salary Cap Purgatory.  This means you will not be able to sign players with "
        t1 = t1 + "bonus amounts for the rest of the current season. "
        alert(t1);

    }

}

// ==UserScript==
// @name          Deeproute.com Free Agent Filter
// @description   Allows you to filter free agents base on multiple attributes.
// @namespace     http://deeproute.com
// @include       http://deeproute.com/deeproute/*js=freeagents*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version       2012.7.18
// @updateURL     https://userscripts.org/scripts/source/138306.meta.js
// @downloadURL   https://userscripts.org/scripts/source/138306.user.js
// ==/UserScript==

/*
==Changelog==
2012.7.18
-added "salary cap hit" and "bonus" filters for 1 year contracts

2012.7.17
-created one filter on startup (previously none were created)

2012.7.14
-fixed bug that cause problems in greasemonkey version
-added experience, height, and weight filters

2012.7.13
-initial version
*/

var fullroster;

var addFilter = function() {
    //get attribute list
    attribute_list = document.forms['packages'].elements['attributes'].value.split('^');
    attribute_list[2] = '!100!1yr Cap Hit ($K)';
    //replace birthday with salary
    attribute_list.splice(2, 0, '!101!1yr Bonus ($K)');
    //insert an additional filter for bonuses

    //create an option list
    $select = $('<select></select>');
    for (i = 0; i < attribute_list.length; i++) {
        v = attribute_list[i];
        $select.append($('<option></option>').val(parseInt(v.split('!')[1])).html(v.split('!')[2]));
    }

    $tr = $('<tr class="filter_row"></tr>');
    $tr.append($('<td></td>').append($select));

    $tr.append($('<td><input type="text" size="2" maxlength="2" style="width:auto; height:98%" value="0"/></td>'));

    $tr.append($('<td><input type="text" size="2" maxlength="2" style="width:auto; height:98%" value="99"/></td>'));

    $tr.append($('<td><input type="text" size="2" maxlength="2" style="width:auto; height:98%" value="0"/></td>'));

    $tr.append($('<td><input type="text" size="2" maxlength="2" style="width:auto; height:98%" value="99"/></td>'));

    $tr.append($('<td><button type="button" class="removeFilter">Remove Filter</button></td>'));

    $tr.insertBefore('#filter_buttons');

    //fix even handlers
    $('.removeFilter').on('click', function() {
        removeFilter(this);
    });
    $('.filter_row select').on('change', function() {
        $('td:gt(2) input', this.parentNode.parentNode).show();
        $('td:lt(3) input', this.parentNode.parentNode).attr('maxlength', '2');
        $('td:eq(2) input', this.parentNode.parentNode).val(99);
        v = $(this).val();

        if (v == 97 || v == 98 || v == 99) {
            $('td:gt(2) input', this.parentNode.parentNode).hide();
            $('td:lt(3) input', this.parentNode.parentNode).attr('maxlength', '3');
            $('td:eq(2) input', this.parentNode.parentNode).val(999);
        } else if (v == 100 || v == 101) {
            $('td:gt(2) input', this.parentNode.parentNode).hide();
            $('td:lt(3) input', this.parentNode.parentNode).attr('maxlength', '5');
            $('td:eq(2) input', this.parentNode.parentNode).val(99999);
        }
    });
}

var applyFilter = function(button) {
    //deactivate button
    $(button).attr('disabled', 'true');

    //populate the fullroster the first time //moved here to fix greasemonkey issues
    if (!fullroster) {
        fullroster = $('#activeroster').clone();
    }

    //make a clone of the active roster
    new_roster = $(fullroster).clone();

    //go through each player in the new roster
    $('option', new_roster).each(function() {
        //assume visible to start
        visible = true;

        //grab player id, raw attributes, and 1 year salary
        id = $(this).val().trim();
        att = $('input[name="pattnoinj' + id + '"]').val();
        cont = $('#cont' + id + 'x1').val();

        //go through each filter
        $('.filter_row').each(function() {
            //gather input values for this filter
            input = new Array();
            $(':input', this).each(function() {
                input.push(parseFloat($(this).val()));
            });

            //get the value for current row
            v = $('select', this).val();

            if (v == 97) {
                //grab relevant attribute values
                index = (parseFloat(input[0]) - 1) * 4;
                cur = parseFloat(att.substring(index, index + 2));

                //compare values and indicate any player that fails
                if (input[1] > cur || input[2] < cur) {
                    visible = false;
                }
            } else if (v == 98 || v == 99) {
                //grab relevant attribute values
                index = (parseFloat(input[0]) - 1) * 4;
                cur = parseFloat(att.substring(index, index + 4));

                //compare values and indicate any player that fails
                if (input[1] > cur || input[2] < cur) {
                    visible = false;
                }
            } else if (v == 100) {
                //grab relevant attribute values
                cur = parseFloat(cont.substr(0, 5)) + parseFloat(cont.substr(5, 5));

                //compare salary to values
                if (input[1] > cur || input[2] < cur) {
                    visible = false;
                }
            } else if (v == 101) {
                //grab relevant attribute values
                cur = parseFloat(cont.substr(0, 5));

                //compare salary to values
                if (input[1] > cur || input[2] < cur) {
                    visible = false;
                }
            } else {
                //grab relevant attribute values
                index = (parseFloat(input[0]) - 1) * 4;
                cur = parseFloat(att.substring(index, index + 2));
                pot = parseFloat(att.substring(index + 2, index + 4));

                //compare values and indicate any player that fails
                if (input[1] > cur || input[2] < cur || input[3] > pot || input[4] < pot) {
                    visible = false;
                }
            }

            if (!visible) {
                return;
            }
        });

        if (!visible) {
            $(this).remove();
        }
    });

    //display results
    $('#activeroster').html($(new_roster).html());

    //re-activate button
    $(button).removeAttr('disabled');
}

var removeFilter = function(button) {
    $(button).parent().parent().remove();
}

$(document).ready(function() {
    //create an interface
    $table = $('<table id="free_agent_filter" width="100%" style="background-color:#EEEEE0;"></table>').html('<tr><th></th><th colspan="2">Current</th><th colspan="2">Potential</th><th></th></tr>' + '<tr><th>Attribute</th><th>Min</th><th>Max</th><th>Min</th><th>Max</th><th></th>' + '<tr id="filter_buttons"><td><button type="button" class="addFilter">Add Filter</button></td>' + '<td colspan="4">' + '</td><td><button type="button" class="applyFilter">Apply Filter</button></td>' + '<tr><td style="font-size: 75%;" colspan="6"><i>Note: Height is input as a three digit number.' + ' For example 6\'2" would be input as 602.</i></td></tr>');
    $table.insertBefore('#bigtable');

    addFilter();

    //attach event handlers
    $('.addFilter').click(addFilter);
    $('.applyFilter').click(function() {
        applyFilter(this)
    });
});
