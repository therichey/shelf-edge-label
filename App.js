/*



MAIN APP HERE



*/

function App(args) {

    $.window = $(window);
    $.body = $("body");
    $.ww = $.window.width();
    $.wh = $.window.height();
    $.mobile = Utils.checkMobile();
	$.tablet = Utils.checkTablet();
	if($.mobile || $.tablet){
		 $.body.removeClass("desktop");
	}
    
    $.useCssAnim = Modernizr.csstransforms3d;

    this.overlay = $("#overlay");
    this.main = $("#main-content");

    this.init(args);

}

droppables = $("#love-hate div");

App.prototype = {

    init:function(args){
        $("[data-target]").on("tap", jQuery.proxy(this, "openOverlay"));
        $(this.overlay).on("tap", jQuery.proxy(this, "closeOverlay"));
        

        $.window.resize(jQuery.proxy(this, "resizeElements"));
        this.resizeElements();

        TweenMax.set(this.overlay, {display: "none", x: $.ww});
        TweenMax.set("#overlay li", {autoAlpha: 0, x: 100, display: "none"});
    },

    openOverlay: function(event){
        var elem = $(event.currentTarget);
        this.target = $(elem.data("target"));

        var easer = Power3.easeInOut;
        TweenMax.to(this.main, 0.7, {x: -150, ease: easer});
        TweenMax.to(this.overlay, 0.5, {x: 0, display: "block", ease: easer});
        TweenMax.to(this.target, 0.7, {autoAlpha: 1, x: 0, display: "block", ease: easer});
    },

    closeOverlay: function(event){
        var easer = Power3.easeInOut;
        TweenMax.to(this.main, 0.5, {x: 0, ease: easer});
        TweenMax.to(this.overlay, 0.7, {x: $.ww, display: "none", ease: easer});
        TweenMax.to(this.target, 0.5, {x: 100, autoAlpha: 0, display: "none", ease: easer});
    },

    resizeElements: function(event){
        $.ww = $.window.width();
        $.wh = $.window.height();
    }

}
