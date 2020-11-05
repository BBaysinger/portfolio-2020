var MinigamesPage = function () {

  this.name = 'minigames';
  this.trackingName = 'Minigames';

  var ua = window.navigator.userAgent;
  this.isIE = /*@cc_on!@*/false || !!document.documentMode; // Internet Explorer 6-11
  this.isEdge = !this.isIE && !!window.StyleMedia; // Edge (app version) 20+
  this.isMS = this.isIE || this.isEdge;
  this.isAndroid = ua.indexOf('Android') >= 0;
  // this.isIE = /MSIE|Trident/.test(ua);

  console.log(this.isIE, this.isAndroid, this.isMS, this.isEdge);

  // Call superclass constructor. Assigns instance to window._page.
  Page.call(this);
}

MinigamesPage.prototype = Object.create(Page.prototype);
MinigamesPage.prototype.constructor = MinigamesPage;

MinigamesPage.modes = {
  singleVid: 'single-vid-mode',
  normal: 'normal-mode',
  viewCheck: 'view-check-mode',
}

MinigamesPage.prototype.docReady = function () {

  var self = this;
  var modes = MinigamesPage.modes;

  this.mode = (this.isMS || this.isAndroid) ? modes.singleVid : modes.normal;
  this.mode = modes.singleVid;

  if (this.mode === modes.normal || this.mode === modes.singleVid) {
    $('.inline-vid').removeClass('view-check');
  }

  //LISTENERS
  $('#filters .btn').on("click", this.handleFilterClick.bind(this));

  var list = $('.inline-vid');

  this.initVideoHover();

  if (this.mode === modes.viewCheck) {

    $("#hero").on(InViewChecker.EXITED_VIEW, function (e) {
      $("#hero .vid-wrapper").find('video').remove();
      $("#hero").removeClass("playing");
    });

    $("#hero").on(InViewChecker.ENTERED_VIEW, function (e) {
      self.addHero();
    });

    list.on(InViewChecker.EXITED_VIEW, function (e) {
      self.disposeVideo.call($(e.currentTarget).find('video')[0]);
    });

    list.on(InViewChecker.ENTERED_VIEW, function (e) {
      self.addVid(this);
    });

  } else if (this.mode === modes.singleVid) {

    if (this.isMS) {
      // Chrome on Galaxy S8 had issues with adding/removing.
      $("#hero").on(InViewChecker.EXITED_VIEW, function (e) {
        $("#hero .vid-wrapper").find('video').remove();
        $("#hero").removeClass("playing");
      });
      $("#hero").on(InViewChecker.ENTERED_VIEW, function (e) {
        self.addHero();
      });
    } else {
      self.addHero();
    }

  } else if (this.mode === modes.normal) {

    self.addHero();

  }

  for (var i = 0; i < list.length; i++) {

    $(list[i]).attr("data-vid-id", i);
    this.vidContainers.push(list[i]);

    this.vidElemProps.push({
      'poster': list[i].dataset.poster,
    });

    this.sourceElemProps.push({
      'src': list[i].dataset.src,
    });

    if (this.mode !== modes.viewCheck) {
      if (!this.isIE) {
        self.addVid(list[i]);
      }
    }
  }

  if (this.mode === modes.viewCheck) {
    _ivc.setAutoUpdateElems(false);
    // TODO: If we do this, we need to build a way for non-video '.view-check' elements to function without latency.
    _ivc.setLatency(50000);
  }

}

MinigamesPage.prototype.addHero = function () {
  var video = $('<video id="bg-vid" loop autoplay playsinline muted />');
  $(video).addClass("page-video").append("<source src='" + _assetPath + "video/minigames-bg.mp4' type='video/mp4'>");
  $("#hero .vid-wrapper").append(video);
  $(video).on('playing', function () {
    $("#hero").addClass("playing");
  });
}

MinigamesPage.prototype.addVid = function (container) {

  MinigamesPage.numVids++;

  var index = this.vidContainers.indexOf(container);

  var $container = $(container);

  var src = (this.mode !== MinigamesPage.modes.singleVid) ? this.sourceElemProps[index].src : '';

  var srcStr = '<video loop autoplay playsinline muted poster="' + this.vidElemProps[index].poster + '"/>';

  var video = $(srcStr);
  $(video).append("<source src='" + src + "' type='video/mp4'>");
  $(container).append(video);

  // console.info('Adding vid:', $container.attr("data-vid-id"), container.dataset, "Total vids on page:", MinigamesPage.numVids);

  $(video).on('playing', function () {
    // TODO: This listener may be (have been) causing videos to get stuck in memory.
    $(container).addClass("playing");
  });
}

MinigamesPage.prototype.vidContainers = [];
MinigamesPage.prototype.vidElemProps = [];
MinigamesPage.prototype.sourceElemProps = [];

MinigamesPage.prototype.winLoaded = function () {
  // IN-VIEW CHECK
  if (window.matchMedia("(max-width: 767px)").matches) {
    $("#char-turtles").removeClass('view-check');
    $("#char-turtles").addClass('in-view');
  }

  $(".hand").addClass("buildin")


	if (window.location.hash === '#online-minigames') 
	{
    var onlineY = $("#online.section").offset().top - 100;
    $("html,body").animate({scrollTop: onlineY}, 800);
	}

}

MinigamesPage.prototype.initVideoHover = function () {

  var modes = MinigamesPage.modes;
  var self = this;

  if (this.mode === modes.normal || this.mode === modes.viewCheck) {

    $(".inline-vid").hover(playVideo, function (e) {

      var $vid = $(e.currentTarget).find('video');
      // Elements may not contain videos at the moment of hover, so check first.
      if ($vid.length) {
        pauseVideo.call($vid.get(0), e);
      }
    });

    function playVideo(e) {
      if ($('video', this).get(0) && $('video', this).get(0).play) {
        var $vid = $('video', this);
        var vid = $vid.get(0);
        $vid.on('canplay', function () {
          vid.play.bind(vid)();
        });

      }
    }

    function pauseVideo(e) {
      this.pause();
      $(this).removeClass('playing');
    }
  } else if (this.mode === modes.singleVid) {

    $(".inline-vid").on('mouseenter', playVideo);
    $(".inline-vid").on('mouseleave', pauseVideo);

    function playVideo(e) {
      if (self.isIE) {
        self.addVid(this, true);
      }
      var $video = $('video', this);
      $('source', this).attr('src', self.sourceElemProps[self.vidContainers.indexOf(this)].src);
      var vid = $video.get(0);

      vid.load();
      $video.on('canplay', function () {
        console.log('canplay');

        $video.get(0).play.bind($video[0])();
      });
    }

    function pauseVideo(e) {
      console.log('pauseVideo');

      if (self.isIE) {
        self.disposeVideo.call($('video', this)[0]);
      } else {
        var $video = $('video', this);
        $video.get(0).pause();
        $('source', $video).get(0).removeAttribute('src');
        $video.get(0).load();
      }

      $(this).removeClass('playing');

    }
  }
}

MinigamesPage.numVids = 0;
MinigamesPage.prototype.disposeVideo = function () {
  // Pause, remove, and garbage collect videos not in view.
  MinigamesPage.numVids--;

  // console.info('Removed vid:', $(this).parent().attr("data-vid-id"), "Total vids on page:", MinigamesPage.numVids);

  this.pause();
  $(this).remove();
  delete (this); // HACK: https://stackoverflow.com/questions/3258587/how-to-properly-unload-destroy-a-video-element

}

MinigamesPage.prototype.handleFilterClick = function (e) {
  var self = this;

  $("#filters .btn").removeClass('active');
  $(e.target).addClass('active');

  $(".section").css("display", "none");

  if ($(e.target).attr('data-filter') == 'mode') {
    $(".section.mode").css("display", "block");
    self.filterModeGames();
  }
  else if ($(e.target).attr('data-filter') == 'style') {
    $(".section.style").css("display", "block");
    self.filterStyleGames();
  }

}

MinigamesPage.prototype.filterStyleGames = function () {
  $(".game[data-style='free']").appendTo($("#free .games"));
  $(".game[data-style='two']").appendTo($("#two .games"));
  $(".game[data-style='one']").appendTo($("#one .games"));
  $(".game[data-style='team']").appendTo($("#team .games"));
  $(".game[data-style='rhythm']").appendTo($("#rhythm .games"));
  $(".game[data-style='coop']").appendTo($("#coop .games"));

  _ivc.updateElems();
  _ivc.viewCheck();
}

MinigamesPage.prototype.filterModeGames = function () {
  $(".game[data-mode='original']").appendTo($("#original .games"));
  $(".game[data-mode='new']").appendTo($("#new .games"));
  $(".game[data-mode='toad']").appendTo($("#toad .games"));
  $(".game[data-mode='online']").appendTo($("#online .games"));
  $(".game[data-mode='river']").appendTo($("#river .games"));
  $(".game[data-mode='sound']").appendTo($("#sound .games"));
  $(".game[data-mode='challenge']").appendTo($("#challenge .games"));

  _ivc.updateElems();
  _ivc.viewCheck();
}

new MinigamesPage();
