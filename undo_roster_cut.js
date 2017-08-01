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

function figsave(tybon, tybona, mystatus, xa, myexper) {
    var c;
    c = 0;
    myspin = document.getElementById("myspin").value;
    //
    myexperb = parseFloat(myexper);

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
                // +tybon;
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

function undocutsalary() {
    box = $('select[name="inactiveroster"]')[0];
    z1 = box.selectedIndex;
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
            yearcap = parseFloat(yearcap) + parseFloat(tycap);

            //   if ((mystatus=='N') || (mystatus=='B') || (mystatus=='Q') || (((mystatus =='P') || (mystatus=='O')) && (myexpera==0)))

            ////   if ((mystatus=='N') || (mystatus=='B') || (mystatus=='Q'))
            //   {
            yearcap = parseFloat(yearcap) + parseFloat(tybon);
            //   }

            //alert(x1[1].innerHTML);

            tdead0 = 0;
            tdead1 = 0;
            if (x == 0) {
                tdead0 = -1*parseFloat(figsave(tybon, tybona, mystatus, 0, myexpera));
                yearcap = yearcap + tdead0;
            }
            if (x == 1) {
                tdead1 = -1*parseFloat(figsave(tybon, tybona, mystatus, 1, myexpera));
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

$('#cutcount').after('<button id="undo-cut" onclick=\"rostermove(\'cutroster\',\'inactiveroster\');\">Undo Cut Player</button>');
$('#undo-cut').click(undocutsalary);