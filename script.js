// Set your name and location here
var name = "Joe";
var weatherLocation = {
	'lat': 43.65,
	'long': -79.38
}

// SEARCHBAR
var box = document.getElementById("search_box");

// BACKGROUND
var bg = document.getElementById('background');

// this should catch most URLs, or at least the ones I would type.
var urlPattern = /^(https?:\/\/)?[^ ]+[.][^ ]+([.][^ ]+)*(\/[^ ]+)?$/i;

// add on here with more handy things
var handy = /^(google|gmail|trello|wolframalpha|piaomubnb)$/i;

// Greeting and bg changing - NEW
function updateBG() {
	var d = new Date();
	var n = d.getHours();
	if (n >= 21 || n <= 4){
		message = "Goodnight";
		bg.style.background = "url('./bg/night.jpeg') no-repeat center center fixed";
		bg.style.backgroundSize = "cover";
	} else if ( n >= 5 && n <= 11 ) {
		message = "Good Morning";
		bg.style.background = "url('./bg/morning.jpeg') no-repeat center center fixed";
		bg.style.backgroundSize = "cover";
	} else if ( n >= 12 && n <= 16 ) {
		message = "Good Afternoon";
		bg.style.background = "url('./bg/afternoon.jpeg') no-repeat center center fixed";
		bg.style.backgroundSize = "cover";
	} else if ( n >= 17 && n <= 20 ) {
		message = "Good Evening";
		bg.style.background = "url('./bg/evening.jpeg') no-repeat center center fixed";
		bg.style.backgroundSize = "cover";
	}
}

function updateName(n) {
	document.getElementById('message').innerHTML = message + ", " + n;
}

// search for text in text box
function search() {
	console.log("Googling \"" + box.value + "\"");
	console.log("Encoded query: \n" + encodeURIComponent(box.value));
	document.location.href = "https://www.google.ca/search?q=" + encodeURIComponent(box.value);
}

// if not search, nav to somewhere

function nav(address) {
	document.location.href = "https://google.ca/?q=" + encodeURIComponent(box.value);
	// if the address starts with "https?|ftp ://"
	if (/^(?:(?:https?|ftp):\/\/).*/i.test(address)) {
		document.location.href = address;
	} else {
		document.location.href = "http://" + address;
	}
}

// Handle enter key press in text box
// also handle the command parsing in the event that the text in the box is a command
// TAB unfocuses the searchbar
function searchKeyPress(e) {
	e = e || window.event;
	if (e.keyCode == 13) {
		parseCom(box.value);
	}
	if (e.keyCode == 9) {
		box.blur();
	}
}

// focus the search box on load
window.onload = function() {
	box.focus();
};

// parse the user's command
function parseCom(com) {
	// handle help command
	if (/^h[ea]lp$/i.test(com) || /^commands$/i.test(com)) {
		document.location.href = "commands.txt";
	}

	// handle reddit command
	else if (com.startsWith("rdt") === true) {
		// if any of the custom subreddit commands are matched
		if (/^rdt [A-Za-z]{2,2}$/i.test(com)) {
			var subargs = com.split(" ");
			switch (subargs.pop()) {
				case "df":
					nav("https://www.reddit.com/r/deliciousfails");
					break;
				case "wg":
					nav("https://www.reddit.com/r/weekendgunnit");
					break;
				case "up":
					nav("https://www.reddit.com/r/unixporn");
					break;
				case "sp":
					nav("https://www.reddit.com/r/startpages");
					break;
			}
		}
		// if the subreddit command is matched
		else if (/^rdt -r .*$/i.test(com)) {
			var rargs = com.split(" ");
			nav("https://www.reddit.com/r/" + rargs.pop());
		}
		// if the user command is matched
		else if (/^rdt -u .*$/i.test(com)) {
			var uargs = com.split(" ");
			nav("https://www.reddit.com/u/" + uargs.pop());
		}
		// if the search command is matched
		else if (/^rdt -s .{1,140}$/i.test(com)) {
			query = com.replace(/^rdt -s /i, "");
			nav("https://www.reddit.com/search?q=" + encodeURIComponent(query));
		}
		// if the plain old reddit command is matched
		else if (/^rdt$/i.test(com)) {
			nav("https://www.reddit.com/");
		}
		// if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}
	// handle twt command
	else if (com.startsWith("twt") === true) {
		// if matches the "twt" command
		if (/^twt$/i.test(com)) {
			nav("https://www.twitter.com/");
		}
		// if the twt [@]user_name command
		else if (/^twt @?[A-Za-z0-9_]{1,15}$/i.test(com)) {
			var targs = com.split(" ");
			nav("https://www.twitter.com/" + targs.pop());
		}
		// search twitter for text
		else if (/^twt -s .{1,140}$/i.test(com)) {
			query = com.replace(/^twt -s /i, "");
			nav("https://www.twitter.com/search?q=" + encodeURIComponent(query));
		}
		// search twitter for text from user
		else if (/^twt -su @?[A-Za-z0-9_]{1,15} .{1,140}$/i.test(com)) {
			var qparts = com.split(" ");
			query = com.replace(/^twt -su @?[A-Za-z0-9_]{1,15} /i, "");

			nav("https://www.twitter.com/search?q=" + encodeURIComponent(query + " from:" + qparts[2]));
		}
		// search twitter for tweets with a hashtag
		else if (/^twt -sh " + hashtag + "$/i.test(com)) {
			var tag = com.replace(/^twt -sh #?/i, "");
			nav("https://www.twitter.com/search?q=" + encodeURIComponent("#" + tag));
		}
		// search twitter for hashtags from user
		else if (/^twt -sh @?[A-Za-z0-9_]{1,15} " + hashtag + "$/i.test(com)) {
			var comparts = com.split(" ");
			nav("https://www.twitter.com/search?q=" + encodeURIComponent(comparts[3] + " from:" + comparts[2]));
		}
		// if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}
	// handle twd command
	else if (com.startsWith("twd") === true) {
		if (/^twd$/i.test(com)) {
			nav("https://tweetdeck.twitter.com/");
		}
		// if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}

	// SEARCH COMMANDS

	// handle google search command
	else if (com.startsWith("ggl") === true) {
		if (/^ggl$/i.test(com)) {
			nav("https://www.google.ca/");
		}
		else if (/^ggl .{1,140}$/i.test(com)) {
			query = com.replace(/^ggl /i, "");
			nav("https://www.google.ca/?gws_rd=ssl&q=" + encodeURIComponent(query));
		}
	}
	// handle ig command
	else if (com.startsWith("ig") === true) {
		// just plain old ig
		if (/^ig$/i.test(com)) {
			nav("https://www.instagram.com/");
		}
		// ig [@]username command
		else if (/^ig @?[A-Za-z0-9_.]{1,30}/i.test(com)) {
			var iargs = com.split(" ");
			nav("https://www.instagram.com/" + iargs.pop());
		}
		// if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}
	// handle aliexpress command
	else if (com.startsWith("ali") === true) {
		if (/^ali$/i.test(com)) {
			nav("http://www.aliexpress.com/");
		}
		else if (/^ali .{1,140}$/i.test(com)) {
			query = com.replace(/^ali /i, "");
			nav("http://www.aliexpress.com/wholesale?SearchText=" + encodeURIComponent(query));
		}
	}
	// handle allegro command
	else if (com.startsWith("allegro") === true) {
		if (/^allegro$/i.test(com)) {
			nav("http://www.allegro.pl/");
		}
		else if (/^allegro .{1,140}$/i.test(com)) {
			query = com.replace(/^allegro /i, "");
			nav("http://www.allegro.pl/listing/listing.php?string=" + encodeURIComponent(query));
		}
	}
	// handle olx command
	else if (com.startsWith("olx") === true) {
		if (/^olx$/i.test(com)) {
			nav("https://www.olx.pl");
		}
		else if (/^olx .{1,140}$/i.test(com)) {
			query = com.replace(/^olx /i, "");
			nav("https://olx.pl/oferty/q-" + encodeURIComponent(query));
		}
	}
	// handle imdb command
	else if (com.startsWith("imdb") === true) {
		if (/^imdb$/i.test(com)) {
			nav("https://www.imdb.com/");
		}
		else if (/^imdb .{1,140}$/i.test(com)) {
			query = com.replace(/^imdb /i, "");
			nav("http://www.imdb.com/find?q=" + encodeURIComponent(query));
		}
	}
	// handle metacritic command
	else if (com.startsWith("meta") === true) {
		if (/^meta$/i.test(com)) {
			nav("http://www.metacritic.com/");
		}
		else if (/^meta .{1,140}$/i.test(com)) {
			query = com.replace(/^meta /i, "");
			nav("http://www.metacritic.com/search/all/" + encodeURIComponent(query) + "/results");
		}
	}
	// handle youtube command
	else if (com.startsWith("yt") === true) {
		if (/^yt$/i.test(com)) {
			nav("https://www.youtube.com/");
		}
		else if (/^yt .{1,140}$/i.test(com)) {
			query = com.replace(/^yt /i, "");
			nav("https://www.youtube.com/results?search_query=" + encodeURIComponent(query));
		}
	}
	// handle github command
	else if (com.startsWith("git") === true) {
		if (/^git$/i.test(com)) {
			nav("https://www.github.com");
		}
		else if (/^git .{1,140}$/i.test(com)) {
			query = com.replace(/^git /i, "");
			nav("https://www.github.com/search?q=" + encodeURIComponent(query));
		}
	}
		// handle stackexchange command
	else if (com.startsWith("stack") === true) {
		if (/^stack$/i.test(com)) {
			nav("https://www.stackexchange.com");
		}
		else if (/^stack .{1,140}$/i.test(com)) {
			query = com.replace(/^stack /i, "");
			nav("https://www.stackexchange.com/search?q=" + encodeURIComponent(query));
		}
	}
	// handle tpb command
	else if (com.startsWith("tpb") === true) {
		if (/^tpb$/i.test(com)) {
			nav("https://www.thepiratebay.org");
		}
		else if (/^tpb .{1,140}$/i.test(com)) {
			query = com.replace(/^tpb /i, "");
			nav("https://thepiratebay.org/search/" + encodeURIComponent(query));
		}
	}
		// handle torrentproject command
	else if (com.startsWith("tp") === true) {
		if (/^tp$/i.test(com)) {
			nav("http://torrentproject.se");
		}
		else if (/^tp .{1,140}$/i.test(com)) {
			query = com.replace(/^tp /i, "");
			nav("http://torrentproject.se/?t=" + encodeURIComponent(query));
		}
	}
	else if (com.startsWith("wiki") === true) {
		if (/^wiki$/i.test(com)) {
			nav("https://en.wikipedia.org");
		}
		else if (/^wiki .{1,140}$/i.test(com)) {
			query = com.replace(/^wiki /i, "");
			nav("https://en.wikipedia.org/wiki/" + encodeURIComponent(query));
		}
	}
	// handle duckduckgo / ddg command
	else if (com.startsWith("duckduckgo") === true || com.startsWith("ddg") === true) {
		nav("https://duckduckgo.com/");
	}

	// misc commands
	else if (/^imgur$/i.test(com)) {
		nav("http://www.imgur.com");
	}
	else if (/^inbox$/i.test(com)) {
		nav("http://inbox.google.com");
	}
	else if (/^drive$/i.test(com)) {
		nav("http://drive.google.com");
	}

	else if (/^calendar$/i.test(com)) {
		nav("http://calendar.google.com");
	}

	// Media commands
	else if (/^(twitch|ttv)$/i.test(com)) {
		nav("http://www.twitch.tv/following");
	}
	else if (/^(twitch|ttv) [^ ]+$/i.test(com)) {
		var parts = com.split(" ");
		nav("http://www.twitch.tv/" + parts.pop());
	}
	else if (/^spotify$/i.test(com) || /^sptfy$/i.test(com)) {
		nav("https://play.spotify.com");
	}
	else if (/^soundcloud$/i.test(com) || /^sc$/i.test(com)) {
		nav("https://soundcloud.com/stream");
	}

	// Here are some really handy ones I'll probably have to use
	else if (handy.test(com)) {
		nav("http://www."+com+".com/");
	}
	else if (/^about:[A-Za-z0-9_]+$/i.test(com)) {
		document.location.href = com;
	}
	// These are some commands that are just for fun, and probably won't be added to the list
	else if (/^cout << .*$/i.test(com)) {
		var message = com.replace(/^cout << /i, "");
		alert(message);
	}

	// if it doesn't match any of the commands...
	// ... but is a valid URL
	else if (urlPattern.test(com)) {
		nav(com);
	}
	// ... or should be searched
	else {
		search();
	}
}

// Finds current time and date, formats it properly
function startTime() {
	var now = new Date();
	var hour = ('0' + now.getHours()).slice(-2);
	var mins = now.getMinutes();
	var secs = now.getSeconds();
	var msecs = now.getMilliseconds();
	var ampm = hour >= 12 ? 'PM' : 'AM';
	var day = ('0' + now.getDate()).slice(-2);
	var month = ('0' + (now.getMonth()+1)).slice(-2);
	var year = now.getFullYear();
	// 24/12 h
	//hour = hour % 24;
  	hour = hour ? hour : 12;
	mins = mins < 10 ? '0' + mins : mins;
	secs = secs < 10 ? '0' + secs : secs;
	var timeString = hour + ':' + mins + ':' + secs + '.' + Math.floor(msecs / 100);
	var dateString = month + '/' + day + '/' + year;
	document.getElementById('time').innerHTML = timeString;
	document.getElementById('date').innerHTML = dateString;
	var t = setTimeout(startTime, 100);
}

// Gets weather for requested location, appends to page
function parseWeatherCodes(code) {
	switch (code) {
		case 0: return 'clear'			// not official
		case 1: return 'mainly clear'
		case 2: return 'partly cloudy'
		case 3: return 'overcast'
		case 45: return 'fog'
		case 48: return 'frozen fog'	// not official
		case 51: return 'light drizzle'
		case 53: return 'moderate drizzle'
		case 55: return 'dense drizzle'
		case 56: return 'light freezing drizzle'
		case 57: return 'dense freezing drizzle'
		case 61: return 'slight rain'
		case 63: return 'moderate rain'
		case 65: return 'heavy rain'
		case 66: return 'light freezing rain'
		case 67: return 'heavy freezing rain'
		case 71: return 'slight snow'
		case 73: return 'moderate snow'
		case 75: return 'heavy snow'
		case 77: return 'snow grains'
		case 80: return 'slight showers'
		case 81: return 'moderate showers'
		case 82: return 'violent showers'
		case 85: return 'slight snow showers'
		case 86: return 'heavy snow showers'
		case 95: return 'thunderstorm'
		case 96: return 'thunderstorm with slight hail'
		case 99: return 'thunderstorm with heavy hail'

		default: return 'unknown!'
	}
}
function getWeather(location) {
	var url = "https://api.open-meteo.com/v1/forecast?latitude=" + location.lat + "&longitude=" + location.long + "&current_weather=true&timezone=auto"
	$.getJSON(url, function(data) {
		w = data.current_weather;
		$('.weather').html(parseWeatherCodes(w.weathercode) + '</br>' + w.temperature + '&deg;C' + ', ' + w.windspeed + ' kph');
	});
}

// Initializes keyboard nav
function bindMousetraps() {
	$.each($('.parent'), function(i, val) {
		Mousetrap.bind($(val).children('span').text(), function(e) {
			$('a#' + $(val).attr('id')).toggleClass('active').next().slideToggle(150);
			$.each($(val).parent().find('.tab span'), function(i, val) {
				Mousetrap.bind($(val).text(), function(e) {
					window.location.href = $(val).parent().attr('href');
				});
			});
			Mousetrap.bind($(val).children('span').text(), function(e) {
				resetMousetraps();
			});
		});
	});

	// Resets on ESC or spacebar
	Mousetrap.bind(['esc', 'space'], function(e) {
		resetMousetraps();
	});
	// Binds Weather and GitHub links
	Mousetrap.bind('w', function(e) {
		window.location.href = $('.weatherlink').children().attr('href');
	});
	Mousetrap.bind('g', function(e) {
		window.location.href = $('.github').children().attr('href');
	});
}

// Initializes everything on page load
$(function() {
	startTime();
	bindMousetraps();
	updateBG();
	updateName(name);
	getWeather(weatherLocation);

	// Binds click events for opening tabs and background click to close
	$('li a.parent').click(function() {
		$(this).parent('li').find('ul').slideToggle(150);
		$(this).toggleClass('active');
	});
	$('#background').click(function() {
		resetMousetraps();
	});
});
