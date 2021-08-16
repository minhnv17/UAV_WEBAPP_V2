const publish_data = require('./clients/publish_data.client')
const map = require('./clients/map.client')
map()

/* Publish data */
$('#btn-publish').on('click', () => {
    node = $('#new-node').val()
    data = { route: node }
    publish_data('https://minh-api.herokuapp.com/api/v1/publish', data)
})

$('#flying').on('click', fly_API)
function fly_API() {
    input_fly = $('.publish-data')
    if (input_fly.is(":visible")) {
        input_fly.hide()
    }
    else if (input_fly.is(":hidden")) {
        input_fly.show()
    }
}



// Navbar
const linkColor = document.querySelectorAll(".nav__link");
function colorLink() {
    linkColor.forEach(l => l.classList.remove("active"))
    this.classList.add("active")
}
linkColor.forEach(l => l.addEventListener("click", colorLink))
