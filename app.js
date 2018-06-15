const url = 'https://api.openweathermap.org/data/2.5/weather?q=',
      cityName = $('#city').val(),
      key = '&48066df5beb56b726aa679490b0115e4';

      
$(()=>{
    weatherLoading();
})

let weatherLoading = () => {
    const errorMessage = $('.error-message'),
          searchingBtn = $('#search');
    
    errorMessage.hide()
    searchingBtn.on('click', function(){
        if (cityName !== ''){
            $.ajax({
                url: url + cityName + '&units=metric' + key,
                dataType: 'jsonp'
            }).done(function(resp){
                console.log(resp);
                weatherInformation(resp.weather)
            }).fail(function(error){
                console.log(error.status)
                errorLoading(error.status)
            })
            
        } else {
            errorMessage.show();
            errorMessage.text('There is a wrong input, try one more time!')
        }
    })

    
}

let weatherInformation = (resp) => {
    

          console.log(searchingBtn)

    
}

let errorLoading = status => {
    const errorLoading = $('.error-loading');
    errorLoading.text("There is an error number: " + status);
}

