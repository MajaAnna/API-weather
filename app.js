const url = 'api.openweathermap.org/data/2.5/weather?q=',
      cityName = $('#city').val(),
      key = '48066df5beb56b726aa679490b0115e4';

      
$(()=>{
    weatherLoading();
})

let weatherLoading = () => {
    $.ajax({
        url: url + cityName + key
    }).done(function(resp){
        console.log(resp);
        weatherInformation(resp)
    }).fail(function(error){
        console.log(error.status)
        errorLoading(error.status)
    })
}

let weatherInformation = (resp) => {
    const errorMessage = $('.error-message'),
          searchingBtn = $('#search');

          console.log(searchingBtn)

    searchingBtn.on('click', function(){
        console.log('click')
        if (cityName == ''){
            errorMessage.text('The field cannot be empty')
        } else {
    
        }
    })
}

let errorLoading = status => {
    const errorLoading = $('.error-loading');
    errorLoading.text("There is an error number: " + status);
}

