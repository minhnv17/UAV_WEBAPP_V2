$('#btn-publish').on('click', ()=>{
    var data = $('#new-node').val()
    data = JSON.stringify(data)
    fetch('https://minh-api.herokuapp.com/api/v1/publish', {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})
