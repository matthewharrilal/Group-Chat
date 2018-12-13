$(document).ready(function() {
    console.log("ENtering>>>>>>")
    $(".clap").submit(function(e) {
        e.preventDefault();
        e.data = $(this).data("id")
        console.log(document.getElementById("output") )


        // $.ajax({
        //     type: "GET",
        //     url: "/messages",
        //     success: function(data) {
        //         console.log('DATA', data);
        //     },
        //     error: function(err) {
        //         console.log(err.message);
        //     }
        // });
    });
});


