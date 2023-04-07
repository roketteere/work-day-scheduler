$(function () {
    loadTask();

    $(".saveBtn").on("click", function (event) {
        var id = $(this).parent().attr("id").split("-")[1];
        var description = $(this).prev().val();
        console.log("Clicked On: ", event.target);
        console.log("Work Hour -" + id);
        console.log("Description: ", description);
        saveTask(id, description);
        setColor(id);
    });

    function setColor(id) {
        var currentHour = parseInt(dayjs().format("H"));
        console.log("Current Hour", currentHour);
        if (currentHour < 9) {
            $("#hour-" + id).addClass("beforeWork");
        } else if (currentHour > 17) {
            $("#hour-" + id).addClass("afterWork");
        } else {
            if (currentHour > id) {
                $("#hour-" + id).addClass("past");
                console.log("Past Event");
            } else if (currentHour < id) {
                $("#hour-" + id).addClass("future");
                console.log("Future Event");
            } else if (currentHour == id) {
                $("#hour-" + id).addClass("present");
                console.log("");
            }
        }
    }

    function loadTask() {
        var start = 9;
        var end = 17;

        if (localStorage.getItem(start) !== null) {
            var description = localStorage.getItem(start);
            for (start; start <= end; start++) {
                $("Hour-" + start).children("textarea").val(description);
                console.log("Task Hour: ", start);
                console.log("Task Description: ", description);
            }
        } else 
            console.log("Nothing in local storage");
        


    }
    function saveTask(id, description) {
        localStorage.setItem(id, description);
        console.log(id, "Was saved in localStorage", "Description: ", description);
    }
    var dateElement = $("#currentDay");
    dateElement.text(dayjs().format("MMM DD, YYYY h:mma"));


});
