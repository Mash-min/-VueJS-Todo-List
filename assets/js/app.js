const url = location.protocol+'//'+location.host;

$(document).ready(function() {
    $('#logout-form').on('submit', function(e) {
        e.preventDefault();     
        let logoutData = new FormData(this);
        $.ajax({
            type:'post',
            url: `${url}/user/logout`,
            data: logoutData,
            cache: false,
            contentType: false,
            processData: false
        }).done(() => {
            window.location.assign('/');
        }).fail((err) => {
            console.log(err);
        })
    });
});

const messageCount = document.getElementById('message-count');
function getNotification() {
    messageCount.innerText = 100;
}

function getReactionsCount(id) {
    const reactions = 300;
    const reactionCount = document.getElementById(`reaction-count-${id}`);
    reactionCount.innerHTML = `<i class="fa fa-heart-o"></i> ${reactions}`
}