***Deployed at: [https://j0e.ca/startpage](https://j0e.ca/startpage)***

# Changelog (ish)

**v1.0 - lavventura's original start (see readme below)**

**v1.1 - added time-based dynamic greetings and background.**

**v1.2a - added experimental progress bar ("it looks cool")**

**v1.2.1 - added basic responsive CSS for background image**

**v1.2.3 - fixed some code errors | added updateName(), function updates name on the fly**

**v1.2.4 - code cleaning, removed useless stuff**

**v1.2.5 - see below**

**v1.2.5 changes:**

Code is now licensed under the MIT Public License. See [LICENSE](./LICENSE) for more details.

Styles for links within text fixed.

Fixed NProgress progress bar. Now shows actual page loading status.

Update copyright.

Added deciseconds (one-tenths of a second) to the clock. Now shows time as: `h:m:s.ds`

Due to deprecation of jQuery SimpleWeather, switched to Open-Meteo API

____________________________________________________________

90% pulled from lavventura's start! here's the original readme (TODO: make commands list!):

    # ~start [https://lavventura.github.io/start/](https://lavventura.github.io/start/)

    ![https://lavventura.github.io/start/](screen.png)

    ##New tab page with powerful searchbar, ~~bookmarks~~, weather, and nice image backgrounds which can replace your browser's adress bar completely.



    Search bar is set to focus on page load.

    ~~In order to use the keyboard controls, you need to unfocus search bar - [TAB].~~

    ~~Each category is openable by keyboard and click, press escape to close all.~~

    Click on city's name to get detailed weather information for your location from Yahoo! Weather.

    Currently bookmarks are set to 'display: none' as I don't use them.

    ##Search bar

    Search bar script from [@WillEccles](https://github.com/WillEccles) allows this start page work as a complete replacement to your browser's adress bar.

    I've added search engines and removed stuff I don't use.

    Type 'help' to get the list of commands and search engines.

    ##Examples:0 - 'search query' navigates you to duckduckgo's result page for your search query.
    - 'some.webpage.com', well, navigates to that webpage.
    - 'meta [search query]' searches metacritic.
    - 'yt [search query]' searches youtube.
    - 'reddit -r startpages' navigates to [/r/startpages](https://reddit.com/r/startpages)

    ##Contents:
    - Heavily modified version of [pschfr/start](https://github.com/pschfr/start)
    - Searchbar script is taken from [WillEccles/startpage](https://github.com/WillEccles/startpage)
    - Background image randomizes on page load, from [Unsplash Source](https://source.unsplash.com/) which pulls from [this collection](https://unsplash.com/collections/304263/)
    - Weather is from [monkeecreate/jquery.simpleWeather](https://github.com/monkeecreate/jquery.simpleWeather)
    - Favicon is from [iconarchive](http://www.iconarchive.com/show/outline-icons-by-iconsmind/Home-2-2-icon.html)
    - ~~Keyboard navigation is thanks to [ccampbell/mousetrap](https://github.com/ccampbell/mousetrap)!~~

    ##You need extensions for most browsers to use this as your new tab page:
    - [New Tab Redirect for Chrome](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna)
    - [New Tab Override for Firefox](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/)
    - [Custom New Tab Page for Opera](https://addons.opera.com/en/extensions/details/custom-new-tab-page/)
    - Safari - just set it as your homepage in settings.

    ~~BTW, it's super fast. DOMContentLoaded of ~225ms (~150ms as an extension!!) :D~~

    Not so sure about that as it's now poorly hacked together, but hey, who cares since it works?

    But yeah, for now the code is a mess.
