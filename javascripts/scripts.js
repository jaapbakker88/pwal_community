//  ///////////////////////////////////////////////
//  /////////Hide Header on on scroll down/////////
//  ///////////////////////////////////////////////

var didScroll
var lastScrollTop = 0
var delta = 5
var navbarHeight = $('header').outerHeight()

$(window).scroll(function (event) {
  didScroll = true
})

setInterval(function () {
  if (didScroll) {
    hasScrolled()
    didScroll = false
  }
}, 250)

function hasScrolled () {
  var st = $(this).scrollTop()

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta) {
    return
  }
  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
    $('header').removeClass('nav-down').addClass('nav-up')
  } else {
      // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $('header').removeClass('nav-up').addClass('nav-down')
    }
  }

  lastScrollTop = st
}

//  ///////////////////////////////////////////////
//  /////////list users from data.js///////////////
//  ///////////////////////////////////////////////

function listProfiles (data) {
  var html = ''
  for (var i = 0; i < data.length; i += 1) {
    html += '<div class="col-sm-4"><div class="profile"><div class="img"><div class="city">' + data[i].location + '</div><img src="images/users/' + data[i].image + '" class="img-responsive"/><div class="overlay"><p>' + data[i].review + '</p></div><div class="name">Meet ' + data[i].name + '</div></div></div></div>'
  }
  return html
}

function getProfile (index) {
  var user = users[index]
  return user
}

var $profiles = $(listProfiles(users))
$('#profiles .container .row').prepend($profiles)

//  ///////////////////////////////////////////////
//  /////////lightbox for profile of person////////
//  ///////////////////////////////////////////////

var $overlay = $('<div class="lightbox"></div>')
$('body').append($overlay)

// if someone click on an image
$('#profiles .img').click(function ( event ) {
  event.preventDefault()
  // get the index corresponding with the array index number ;)
  var index = $('#profiles .img').index(this)
  // store the user in a variable
  var user = getProfile(index)

  // create profile and append profile in overlay
  var $profile = $('<div class="container"><div class="row"><div class="col-sm-8 col-sm-offset-2"><div class="featured"><div class="row"><h2 class="text-center introducing">Introducing ' + user.name + '</h2><div class="col-sm-4 profile-image"><img src="images/users/' + user.image + '" class="img-responsive img-circle"></div><div class="col-sm-8 profile-content"><p>' + user.bio + '</p><h3>Download the app and chat directly to ' + user.name + '</h3><div class="btn-group" data-toggle="buttons-checkbox"><a href="https://itunes.apple.com/app/party-with-a-local/id562560874" target="_blank" class="btn btn-primary btn-lg"><i class="fa fa-apple"></i> App Store</a><a  href="https://play.google.com/store/apps/details?id=com.pwal" target="_blank" class="btn btn-primary btn-lg"><i class="fa fa-play"></i> Play Store</a></div> </div></div></div></div><!--  Profile COL-SM-8--></div></div>')
  $('.lightbox').append($profile)
  // show overlay(lighbox) and set the height to the documents height
  $('.lightbox').css('height', $(document).height())
  $('.lightbox').fadeIn()

  // hide lightbox
  $('.lightbox').click(function (){
    $('.lightbox').fadeOut()
    $('.lightbox .container').delay(100).fadeOut(300, function () {
      $(this).remove()
    })
  })
})
