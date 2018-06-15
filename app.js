const url = 'https://api.openweathermap.org/data/2.5/weather?q=',
      cityName = $('#city').val(),
      key = '&appid=753a3c48264ad65dd778fb0a6a33720e';

const weatherInfo = $('.weather-information'),
      errorMessage = $('.error-message'),
      searchingBtn = $('#search');
  
$(()=>{
    weatherLoading();
})

let weatherLoading = () => {
    errorMessage.hide();
    weatherInfo.hide();
    
    searchingBtn.on('click', function(e){
        e.preventDefault();
        if(cityName !== ''){
            $.ajax({
                url: url + cityName + '&units=metric' + key,
                dataType: 'jsonp'
            }).done(function(resp){
                // console.log(resp.main);
                weatherInformation(resp.name, resp.weather, resp.main);
            }).fail(function(error){
                console.log(error.status)
                errorLoading(error.status)
                return true;
            })
        } else {
            errorMessage.show();
            errorMessage.text('There is a wrong input, try one more time!')
            setTimeout(function(){ location.reload(); }, 1500)
            return true;
        }
        return true;
    })  
}

let weatherInformation = (resp, weather, main) => {
    weatherInfo.show();
    
    const icon = $('.weather-icon'),
          city = $('.city-name')
          mainInfo = $('.main-info'),
          mainDescription = $('.main-description'),
          temp = $('.temperature'),
          tempMin = $('.temp-min'),
          tempMax = $('.temp-max'),
          number = weather.length;

    for (let i = 0; i < number; i++){
        const newIcon = $('<img class="icon">').attr('src', `http://openweathermap.org/img/w/${weather[i].icon}.png`),
              newMainInfo = $('<span>').text(weather[i].main),
              newMainDescription = $('<span>').text(weather[i].description);

        icon.append(newIcon);
        mainInfo.append(newMainInfo);
        mainDescription.append(newMainDescription);
    }
    
    city.text(resp);
    temp.text('temperature: ' + main.temp + '°C');
    tempMin.text('min temperature: ' + main.temp_min + '°C');
    tempMax.text('max temperature: ' + main.temp_max + '°C');
    
    $('#city').val('');
}

let errorLoading = status => {
    const errorLoading = $('.error-loading');
    errorLoading.text("There is an error number: " + status);
}

