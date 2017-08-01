var year = document.getElementById('myseason').value;

if(undefined != year){
    //update the output to show age instead of bday
    document.forms["packages"].elements['attributes'].value = "OVAL    !94!Position Rating  !1! ** / ** !  !          !!^EXP     !97!Experience       !2!** years                !  !          !!^BDAY    !96!Age       !2!** years              !  !          !!^HT      !98!Height           !2!**' **\"       !  !          !!^WT      !99!Weight           !2!**** pounds             !  !          !!^ARM     ! 1!Passing Arm      !1! ** / ** !  !P         !A!^ACC     ! 2!Passing Accuracy !1! ** / ** !  !P         !H!^STR     ! 5!Strength/Size    !1! ** / ** ! X!          !S!^STA     !25!Stamina          !1! ** / ** ! M!          !S!^TGH     !26!Toughness        !1! ** / ** !RX!          !S!^ATHL    !29!Athleticism      !1! ** / ** !RX!          !S!^INT     ! 6!Intelligence     !1! ** / ** !X !          !!^LEAD    ! 7!Leadership       !1! ** / ** !X !PVBDRK    !!^DISC    !14!Discipline       !1! ** / ** !RX!PVBDRK    ! !^CLTC    !12!Clutch           !1! ** / ** !R !PVBDRK    !!^CONS    !27!Consistency      !1! ** / ** ! X!PVBDRK    !!^HSNP    !32!Handle Snap      !1! ** / ** !  !KP        !H!^ESC     ! 3!Escapability     !1! ** / ** ! X!PRV       !L!^SPD     !17!Speed/Size       !1! ** / ** !RX!          !L!^FOOT    !18!Footwork         !1! ** / ** ! X!PVBDRK    !L!^CSKIL   !41!Cover Skills/Size!1! ** / ** ! M!D         !L!^FMBL    !19!Protect ball     !1! ** / ** ! M!PVR       !H!^SHED    !30!Shed Blocker     !1! ** / ** ! M!VRK       !LA!^CTCH    ! 8!Pass Catching    !1! ** / ** ! X!VD        !H!^ROUT    ! 9!Route            !1! ** / ** ! X!V         !L!^FSTP    !13!First Step       !1! ** / ** ! X!PVRDB     !L!^RBLK    !10!Run Blocking     !1! ** / ** ! X!B         !SLA!^PBLK    !11!Pass Blocking    !1! ** / ** ! X!B         !SLA!^SNAP    !31!Snapping         !1! ** / ** !  !B         !H!^MOTOR   ! 4!Motor            !1! ** / ** !RX!          !!^READ    !28!Read Opposition  !1! ** / ** !  !PVBDR     !!^TCK     !15!Tackling         !1! ** / ** ! M!D         !LA!^LEAP    !16!Leaping          !1! ** / ** !RM!          !L!^PRSR    !23!Feel Pressure    !1! ** / ** ! X!PVRK      !!^HOLE    !24!Find Opening     !1! ** / ** ! X!PVR       !!^LACC    !21!FG Accuracy      !1! ** / ** !  !K         !!^LEG     !20!Kicking Strength !1! ** / ** !  !K         !L!^PACC    !22!Punting Accuracy !1! ** / ** !  !K         !!^DIST    !33!Distraction      !1! ** / ** !  !          !!";

    //replace bday with year for each player's data
    year = parseFloat(year);
    $("input[name^='patt']").each(function(){
       txt = this.value;
       bday = txt.substr(380,4);
       age = year - parseFloat(bday);
       this.value = txt.substr(0,380) + age + '00' + txt.substr(384,txt.length);
    });
	
	//$('select[name$=roster]')[0].trigger('change');
	location.href="javascript:updateplayer(1,999,'','Active'); void 0";
}