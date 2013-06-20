Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

$(document).ready(function() {  
    var gridWidth = 40;
    var startTime = new Date("2013-01-09T14:45:00Z").getTime()/60000;
    var oneminute = gridWidth / 15;
    var currentTime = new Date().addHours(1).getTime()/60000;
    
    $('#menu').find('li').click(function(e) {
        mobileToggler('#menu',$(this));
        init(parseInt($(this).attr('id').replace('menu-','')));
        e.preventDefault();
    })
    
    // Toggle function
    function mobileToggler(menu,toggler) {
        $(toggler).toggleClass('active');
        $(menu).toggleClass('active');
    }
    
    init();
    
    function init(dayid) {
        var theSelectedDay = 9;
        var zerospace = "";
        switch(dayid) {
            case 9:
                //woe
                            
                break;
                
            case 10:
                //do
                theSelectedDay = 10;
                break
                
            case 11:
                //vr
                theSelectedDay = 11;
                break;
                
            default:
                if (new Date().getTime() > new Date("2013-01-09T14:45:00Z").getTime() &&
                    new Date().getTime() < new Date("2013-01-12T09:00:00Z").getTime()) {
                    theSelectedDay = new Date().getDate();
                }
                break;
                
        }
        
        $('#menu').find('li').removeClass('current');
        $('#menu').find('#menu-' + theSelectedDay).addClass("current");
        
        if (theSelectedDay < 10) zerospace = "0";
        startTime = new Date("2013-01-" + zerospace + theSelectedDay + "T14:45:00Z").getTime()/60000;
        
        $('#venue-holder').empty();
        $.getJSON("timetable-json.php?day=" + (theSelectedDay + 8), function(data){
            draw(data);
        });
                
        // Scroll
        if(currentTime > startTime) {
            $('body').scrollLeft(Math.round(((currentTime - startTime) * oneminute) - 20));
            $('#timetable').append('<div id="current-time" style="left:' + Math.round((currentTime - startTime) * oneminute) + 'px"></div>');
        }
    }
    
    
    function draw(data) {
        for (var i = 0; i < data.length; i++) {
            data = window[data] || data;
            var myLocation = data[i];
            var locations = data[i].locations;
            initializeLocations(locations);
        }
    };
    
    function initializeLocations(data) {
        for (var i = 0; i < data.length; i++) {
            data = window[data] || data;
            var location = data[i];
            var locationHeader = data[i].heading.head;
            var locationHeaderSub = data[i].heading.sub;
            var locationEvents = location.events;
            var element = $('<div/>')
                .addClass('venue')
                .append('<div class="venue-bg" style="background-image: url(http://woutmager.nl/esns/200x2:1/fff/cccccc&text=' + encodeURIComponent(locationHeader + ' ' + locationHeaderSub) + ')"></div>')
                .appendTo($('#venue-holder'));
            eventsByVenue(locationEvents,element);
        }
    }
    
    function eventsByVenue(data,element) {
        for (var i = 0; i < data.length; i++) {
            data = window[data] || data;
            var eventStart = new Date(data[i].start).getTime()/60000;
            var eventEnd = new Date(data[i].end).getTime()/60000;
            $("<a/>")
                .addClass('single-event')
                .append('<span><strong>' + data[i].description + '</strong><br>' + data[i].start_time + ' - ' + data[i].end_time + '</span>')
                .attr("href", data[i].link)
                .data("eventdata", data[i])
                .css({
                    "left" : (eventStart - startTime) * oneminute,
                    'width' : (eventEnd - eventStart) * oneminute
                })
                .appendTo(element);
        }
    }
    
});