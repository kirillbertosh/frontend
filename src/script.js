$(function() {
    console.log("test");
    $('form').submit(function(e) {
        e.preventDefault();
        var actionURL = e.currentTarget.action;
        console.log(actionURL);
        var obj = $('form').serializeJSON();
        console.log(JSON.stringify(obj));
        $.ajax({
            type: 'POST',
            url: 'http://load-balancer-1-2025090123.us-east-2.elb.amazonaws.com/api/v1/backend/save',
            headers: {'Access-Control-Allow-Origin': '*'},
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType : 'application/json',
            crossDomain: true,
            success: function(data) {
                return;
            }
        });
    });
});

