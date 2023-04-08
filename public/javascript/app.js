$('button[type="add-cart"]').on('click', function(e){
    const productId = $(this).data('id')
    $.ajax({
        url: '/order/cart',
        method : 'POST',
        data : {
            productId
        }
    }).then(function(){
        console.log('call made')
    }).catch(function(){
        console.log('call failed')
    })
})

$('button[type="remove-cart"]').on('click', function(e){
    const productId = $(this).data('id')
    $.ajax({
        url:'/order/cart',
        method : 'DELETE',
        data : {
            productId
        }
    }).then(function(){
        console.log('deleted')
    }).catch(function(){
        console.log('call failed')
    })
})