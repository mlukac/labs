import $ from 'jquery';
import { getCookie, setCookie } from '@netgen/javascript-cookie-control/js/helpers';

export default class FlyoutComponent {
  constructor() {

    this.FlyoutInit();

  }

  FlyoutInit() {

    var FlyoutBox = function(el){
      this.$el = $(el);
      this.shown = false;
      this.dont_show = false;
      this.$flyout = this.$el.find('.flyout');
      this.$body = this.$el.find('.flyout-body');
      this.category = this.$flyout.data('category');
      this.name = this.$flyout.data('name');

      this.init();
    }
    FlyoutBox.prototype.init = function(){
        this.setIsMobile();
        this.setupEvents();
    }
    FlyoutBox.prototype.setupEvents = function(){

        /* BEHAVIOUR 1: show flyout some time after first scroll and hide it if on top of the page *****************************************************/
        var prevPos = window.pageYOffset || document.documentElement.scrollTop,
            nextPos = 0,
            delta = 5,
            isFirstScrolled = false,
            isScrolling = false,
            content = document.getElementById('page'),
            showAfterTimePeriod = function() {
              this.showMe();
            }.bind(this),
            showHideOnScroll = function() {
                nextPos = window.pageYOffset || document.documentElement.scrollTop;
                if (this.dont_show || Math.abs(prevPos - nextPos) <= delta) return;
                content.offsetHeight * 0.1 + content.offsetTop < nextPos + window.outerHeight * 0.5 ? this.showMe() : this.hideMe();
                prevPos = nextPos;
            }.bind(this);
        window.addEventListener('scroll', function ( event ) {
          if(!isFirstScrolled){
            isFirstScrolled = true;
            setTimeout(function(){
              showAfterTimePeriod();
              setInterval(function() {
                if(isScrolling) {
                    showHideOnScroll();
                    isScrolling = false;
                }
              }, 200);
            }, 20000);
          }
          isScrolling = true;
        }, false);
        /* /BEHAVIOUR 1 */

        /* BEHAVIOUR 2: show flyout after some page scroll  ************************************************************************/
        // var prevPos = window.pageYOffset || document.documentElement.scrollTop,
        //     nextPos = 0,
        //     delta = 5,
        //     didScroll = false,
        //     content = document.getElementById('page'),
        //     showHideOnScroll = function() {
        //         nextPos = window.pageYOffset || document.documentElement.scrollTop;
        //         if (this.dont_show || Math.abs(prevPos - nextPos) <= delta) return;

        //         content.offsetHeight * 0.3 + content.offsetTop < nextPos + window.outerHeight * 0.5 ? this.showMe() : this.hideMe();
        //         prevPos = nextPos;
        //     }.bind(this);
        // $(window).on('scroll', function(){
        //     didScroll = true;
        // });
        // setInterval(function() {
        //     if(didScroll) {
        //         showHideOnScroll();
        //         didScroll = false;
        //     }
        // }, 200);
        /* /BEHAVIOUR 2 */

        this.$el.on('click', '.remove', function(e){
            e.preventDefault();
            this.hideMe();
            $('.flyout-wrapper').removeClass('flyout-ready');
            dataLayerPush("flyout-closed");
            this.dont_show = true;

            setCookie("ngFlyout", "closed", 90);
        }.bind(this));

        this.$el.on('click', '.flyout-action', function(e){
          e.preventDefault();
          this.hideMe();
          this.dont_show = true;
        }.bind(this));

        this.$el.on('click', '.flyout-modal-trigger', function(e){
          /* send gtm event on flyout button clicked */
          dataLayerPush("flyout-clicked");
        }.bind(this));

        this.$body.on('click', 'a', function(){
        }.bind(this));

        window.onresize = function(){
            clearTimeout(window.resizedFinished);
            window.resizedFinished = setTimeout(this.setIsMobile.bind(this), 250);
        }.bind(this);
    };
    FlyoutBox.prototype.showMe = function(){
        if (this.shown) return;
        $('.flyout-wrapper').addClass('flyout-active');
        dataLayerPush("flyout-shown");
        this.shown = true;
    };
    FlyoutBox.prototype.hideMe = function(){
        if (!this.shown) return;
        $('.flyout-wrapper').removeClass('flyout-active');
        this.shown = false;
    };
    FlyoutBox.prototype.setIsMobile = function(){
        this.is_mobile = (window.innerWidth || document.documentElement.clientWidth) <= 768;
    };
    $.fn.flyoutBox = function () {
        return this.each(function(){
            if ($(this).data('flyout')) return;
            var instance = new FlyoutBox(this);
            $(this).data('flyout', instance);
        });
    };
    var ngFlyoutCookie = getCookie("ngFlyout");
    if( ngFlyoutCookie == "active"){
      setCookie("ngFlyout", false, 365);
    }

    if( !(ngFlyoutCookie == "closed") ){
      if( $('.flyout-wrapper').length > 0 ) {
        setTimeout(function() { // prevent flyout style glitches by allowing visibility only after 2s
          $('.flyout-wrapper').flyoutBox();
          $('.flyout-wrapper').addClass('flyout-ready');
          setCookie("ngFlyout", "active", 365);
        }, 2000);
      }
    }

  }
}
