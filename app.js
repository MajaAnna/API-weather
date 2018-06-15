const url = 'https://api.openweathermap.org/data/2.5/weather?q=',
      cityName = $('#city').val(),
      key = '&appid=48066df5beb56b726aa679490b0115e4';

const weatherInfo = $('.weather-information');

      
$(()=>{
    weatherLoading();
})

let weatherLoading = () => {
    const errorMessage = $('.error-message'),
          searchingBtn = $('#search');
    
    errorMessage.hide();
    weatherInfo.hide();
    searchingBtn.on('click', function(){
        if (cityName !== ''){
            $.ajax({
                url: url + cityName + '&units=metric' + key,
                dataType: 'jsonp'
            }).done(function(resp){
                console.log(resp.main);
                weatherInformation(resp, resp.weather[0], resp.main)
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

let weatherInformation = (resp, weather, main) => {
    weatherInfo.show();

    const icon = $('.weather-icon'),
          city = $('.city-name')
          mainInfo = $('.main-info'),
          mainDescription = $('.main-description'),
          temp = $('.temperature');

    icon.html(weather.icon);
    city.text(resp.name);
    mainInfo.text(weather.main);
    mainDescription.text(weather.description);
    temp.text(main.temp);


    console.log(wind.speed)
}

let errorLoading = status => {
    const errorLoading = $('.error-loading');
    errorLoading.text("There is an error number: " + status);
}

