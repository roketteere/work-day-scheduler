$(function () {

    loadTask();
    // grab the button using the class and attach an event listener. Get the id and use this to make sure
    // we are referring to the right element and use the split method to split across the - to get the number value. Use dom traversal again and set the description to the appropriate element



    loadTask()


    $(".saveBtn").on("click", function (event) {
        var id = $(this).parent().attr("id").split("-")[1];
        var description = $(this).prev().val();
        console.log("Clicked On: ", event.target);
        console.log("Work Hour -" + id);
        console.log("Description: ", description);
        saveTask(id, description);
        setColor(id);
    });
    // function that will update each tasks background color according to the time of day (ANY), add the proper class to the task, and log our results
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
                console.log("Present Event");
            }
        }
    }

    // function that takes the id and description of the task as parameter and saves it to the local storage. This also has a console.log

    function saveTask(id, description) {
        localStorage.setItem(id, description);
        console.log(id, "Was saved in localStorage", "Description: ", description);
    }

    // function to load saved items from the local storage



    function loadTask() {
        var start = 9;
        var end = 17;

        // use the work start and end times to sort through the total amount available task hours during the work day time
        for (var i = start; i <= end; i++) {
            var description = localStorage.getItem(i);

            $("#hour-" + i).children("textarea").val(description);
            setColor(i);
            console.log("Task Hour: ", i);
            console.log("Task Description: ", description);


        }
 

        // created a variable to get the time place holder and and wrapped it in a setInterval() and set the time to tick every 1000, and lastly update the display
        setInterval(function () {
            var dateElement = $("#currentDay");

            dateElement.text(dayjs().format("MMM DD, YYYY h:mma  ss") + "secs");
        }, 1000);



    }
    var dateElement = $("#currentDay");
    dateElement.text(dayjs().format("MMM DD, YYYY h:mma"));


});
