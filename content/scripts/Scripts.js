$(document).ready(function() {
    var today = new Date();

    initializeMonth(today);

    $("#navigate-left").on("click", function() {
        if ($(this).data("prev-month") >= 0) {
            var newDate = $("#nav-head-text").data("this-month");
            initializeMonth(new Date(newDate.getFullYear(), newDate.getMonth() - 1, 1));
        }
    });

    $("#navigate-right").on("click", function() {
        if ($(this).data("next-month") <= 11) {
            var newDate = $("#nav-head-text").data("this-month");
            initializeMonth(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1));
        }
    });
});

function initializeMonth (date) {
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
    var foundFirst = false;
    var dayOneIdx = firstDayIndex;

    $("#calendar-body").empty(); // clear calendar body

    while(dayIter <= daysInMonth) {
        var week = "<tr>";
        for (var i = 0; i <= 6; i++) {
            if (foundFirst || dayOneIdx == i) {
                // add day;
                week += "<td>"+dayIter+"</td>";
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