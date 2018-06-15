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
                weatherInformation(resp, resp.weather, resp.main)
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

    for (let i = 0; i < weather.length; i++){
        const newIcon = $('<img>').attr('src', `http://openweathermap.org/img/w/${weather[i].icon}.png`),
              newMainInfo = $('<p>').text(weather[i].name),
              newMainDescription = $('<p>').text(weather[i].description);

        icon.append(newIcon);
        mainInfo.append(newMainInfo);
        mainDescription.append(newMainDescription);
    }
    // icon.html(weather[n].icon);
    // mainInfo.text(weather[n].main);
    // mainDescription.text(weather[n].description);
    city.text(resp.name);
    temp.text(main.temp);


    console.log(weather[0].icon)
}

let errorLoading = status => {
    const errorLoading = $('.error-loading');
    errorLoading.text("There is an error number: " + status);
}

