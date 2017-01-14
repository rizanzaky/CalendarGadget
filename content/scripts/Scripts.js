$(document).ready(function() {
    // var today = new Date(2017, 04, 23);
    var today = new Date();

    var leaveList = 
    [
        /* 1*/ [{id:12, type:1, text:'Duruthu Poya', colour:'yellow'}, {id:14, type:1, text:'Thai Pongal', colour:'orange'}],
        /* 2*/ [{id:4, type:1, text:'National Day', colour:'red'}, {id:10, type:1, text:'Navam Poya', colour:'yellow'}, {id:24, type:2, text:'Mahasivarathri', colour:'orange'}],
        /* 3*/ [{id:12, type:1, text:'Medin Poya', colour:'yellow'}],
        /* 4*/ [{id:10, type:1, text:'Bak Poya', colour:'yellow'}, {id:13, type:1, text:'Bef\' S&T New Year', colour:'red'}, {id:14, type:1, text:'S&T New Year,Good Friday', colour:'red'}],
        /* 5*/ [{id:1, type:1, text:'May Day', colour:'red'}, {id:10, type:1, text:'Vesak Poya', colour:'yellow'}, {id:11, type:1, text:'After Vesak Poya', colour:'red'}],
        /* 6*/ [{id:8, type:1, text:'Poson Poya', colour:'yellow'}, {id:26, type:2, text:'Eid Fitr', colour:'green'}],
        /* 7*/ [{id:8, type:1, text:'Esala Poya', colour:'yellow'}],
        /* 8*/ [{id:7, type:1, text:'Nikini Poya', colour:'yellow'}],
        /* 9*/ [{id:1, type:2, text:'Eid Adha', colour:'green'}, {id:5, type:1, text:'Binara Poya', colour:'yellow'}],
        /*10*/ [{id:5, type:1, text:'Vap Poya', colour:'yellow'}, {id:18, type:2, text:'Deepavali', colour:'orange'}],
        /*11*/ [{id:3, type:1, text:'Ill Poya', colour:'yellow'}],
        /*12*/ [{id:1, type:1, text:'Milad-Un-Nabi', colour:'green'}, {id:3, type:1, text:'Unduvap Poya', colour:'yellow'}, {id:25, type:1, text:'Christmas', colour:'purple'}],
    ];

    var leaves = leaveList[today.getMonth()].sort(SortById);
    initializeMonth(today, leaves);

    $("#navigate-left").on("click", function() {
    // $(".nav-left").on("click", function() {
        if ($(this).data("prev-month") >= 0) {
            var newDate = $("#nav-head-text").data("this-month");
            var leaves = leaveList[newDate.getMonth() - 1].sort(SortById);
            initializeMonth(new Date(newDate.getFullYear(), newDate.getMonth() - 1, 1), leaves);
        }
    });

    $("#navigate-right").on("click", function() {
    // $(".nav-right").on("click", function() {
        if ($(this).data("next-month") <= 11) {
            var newDate = $("#nav-head-text").data("this-month");
            var leaves = leaveList[newDate.getMonth() + 1].sort(SortById);
            initializeMonth(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1), leaves);
        }
    });
});

function initializeMonth (date, leaves) {
    var today = new Date();
    var months = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
                   "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    
    var firstDayIndex = firstDay.getDay();
    var daysInMonth = monthDays[date.getMonth()];

    // set month and year text on nav header
    $("#nav-head-text").text("2017 " + months[date.getMonth()]); // handle error
    $("#navigate-left").data("prev-month", date.getMonth() - 1);
    $("#navigate-right").data("next-month", date.getMonth() + 1);
    $("#nav-head-text").data("this-month", date);

    var dayIter = 1;
    var numOfLvs = 0;
    var foundFirst = false;
    var dayOneIdx = firstDayIndex;

    $("#calendar-body").empty(); // clear calendar body
    while(dayIter <= daysInMonth) {
        // $("#debugger").append("c:" + count + ",\n");
        var week = "<tr>";

        for (var i = 0; i <= 6; i++) {
            // $("#debugger").append("i:" + i + ", ");
            var todayCls = (today.getMonth() == date.getMonth() && today.getDate() == dayIter) ? 'current-day' : '';
            if (foundFirst || dayOneIdx == i) {
                // leaves check
                if (numOfLvs < leaves.length && leaves[numOfLvs].id == dayIter) {
                    // create tooltip
                    // var toolZ = ' tool-z-' + (30 - numOfLvs);
                    var tipPlace = (i == 0 || i == 1) ? 'tooltip-right' : (i == 5 || i == 6) ? 'tooltip-left' : 'tooltip-top';
                    var leaveType = (leaves[numOfLvs].type == 1) ? '<span class="leave-types"><i yellow>• </i>Pub <i blue>• </i>Bank <i red>• </i>Merc</span>' : '<span class="leave-types"><i yellow>• </i>Pub <i blue>• </i>Bank</span>';
                    var toolTip = "<span class='tooltiptext "+tipPlace+"'>"+leaves[numOfLvs].text+leaveType+"</span>";
                    
                    // add day;
                    // week += "<td class='special-day tooltip colour-"+leaves[numOfLvs].colour+" sun-"+ i +" "+todayCls+"' style='z-index:"+(30 - numOfLvs)+"'>"+dayIter+toolTip+"</td>";
                    week += "<td class='special-day tooltip colour-"+leaves[numOfLvs].colour+" sun-"+ i +" "+todayCls+"'>"+dayIter+toolTip+"</td>";
                    numOfLvs++;
                } else {
                    // add day;
                    week += "<td class='sun-"+ i +" "+todayCls+"'>"+dayIter+"</td>";
                }
                
                dayOneIdx = -1; // avoid further interference
                foundFirst = true; // keep on entering until last day of month
                dayIter++;
            } else {
                // add blank
                week += "<td></td>";
            }
            if (dayIter > daysInMonth)
                foundFirst = false; // stop adding days
        } 
        // append week row to calendar
        week += "</tr>";

        $("#calendar-body").append(week);
    }
}

function SortById(a, b){
    var aId = a.id;
    var bId = b.id;
    return ((aId < bId) ? -1 : ((aId > bId) ? 1 : 0));
}