let allOrdersURL = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders/'

$.get(allOrdersURL,getAll)

function getAll(order){
    $('#displayAllOrders').html('')
    let array = order
    for (x in array){
        let displayAll = `<li class="listStyle"><strong>email:</strong> ${order[x].emailAddress} <strong>order:</strong> ${order[x].coffee} <button id="deleteButton" value=${order[x].emailAddress} class="buttonStyle btn btn-sm">Delete</button></li><br>`
        $('#displayAllOrders').append(displayAll)
    }
}

$('#buttonView').click(function(){
    $.get(allOrdersURL,getAll)
})

//searchButton, searchBox

$('#searchButton').click(function(){
    let emailFromUser = $('#searchBox').val()
    let filteredURL = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${emailFromUser}`
    if (emailFromUser===''){
        alert("enter your email")
    }else{
    $.get(filteredURL,function(order){
                console.log(order)
                $('#displayAllOrders').html('')
                let displayCoffee = `<li class="listStyle"><strong>email:</strong> ${order.emailAddress} <strong>order:</strong> ${order.coffee}</li><br>`
                $('#displayAllOrders').append(displayCoffee)
            })}     
})


$('#submitOrder').click(function(){
    let newOrderEmail = $('#newOrderEmail').val()
    let newOrder = $('#newOrderUser').val()
    
    let data = {emailAddress:newOrderEmail,coffee :newOrder}
    
    $.post(allOrdersURL,data,function(response){
        console.log(response)
    })
    
    $.get(allOrdersURL,getAll)
    
})


$("#allOrdersCard").on('click','button',function(){
    let button = $(this)
    let email = button.val()
    let deleteURL = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${email}`

    $.ajax({
    url: deleteURL,
    type: 'DELETE',
    success: function(result) {
        console.log("yes")
    }
})
    $.get(allOrdersURL,getAll)
})

