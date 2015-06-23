jQuery(document).ready(function(){
  jQuery("body").spin().unspin(); // Weird "image not showing" bug. :-( Need a better solution
})
if (typeof jQuery == 'undefined') throw("jQuery could not be found.");
 
(function(jQuery){
  jQuery.extend({
    Spinner: {
      debug: false, // should print log messages?
      unspinOthers: true, // should unspin all spinners before spinning new ones?
      className: "spinner", // spinner class; if an element is spun using a custom class, the "unspinOthers" will not pick it up. Such elements has to be unspun explicitly.
      spinnerID: "_spinner_div", // spinner divs have random IDs prefixed with this
      hasFirebug: "console" in window && "firebug" in window.console,
      logger: function(msg){
                      if(this.debug){
                        msg = "Spinner: " + msg;
                        this.hasFirebug ? console.log(msg) : alert(msg);
                      }
                    },
      unspin: function(reset) {
                      if(reset){
                        this.logger("Hard reset. Removing all spinning spinners.");
                        jQuery("."+this.className).remove();
                      }
                      else{
                        this.logger("Soft reset. Hiding all spinners");
                        jQuery("."+this.className).hide();
                      }
                    }
      }
    });
    
  jQuery.fn.spin = function(){
    var defaults = {
      className: jQuery.Spinner.className,
      unspinOthers: jQuery.Spinner.unspinOthers,
      spinnerID: jQuery.Spinner.spinnerID
      }
    var settings = jQuery.extend(defaults, arguments.length != 0 ? arguments[0] : {});
 
    (settings.unspinOthers && jQuery.Spinner.unspin());
    
    return this.each(function(){
      var spun = jQuery(this);
      if((spinner = jQuery("#"+spun.attr("spinner"))) && spinner.get(0)){
        spinner.show();
        jQuery.Spinner.logger("Already spinning.");
        return jQuery;
      }
        
      var spinnerID = jQuery.Spinner.spinnerID + String(Math.random()).substring(2);
      jQuery("body")
        .append(
          jQuery('<div id="'+spinnerID+'" class="'+settings.className+'"></div"')
          .css({
            position: "absolute",
            top: spun.offset().top,
            left: spun.offset().left,
            width: spun.outerWidth(),
            height: spun.outerHeight()
          })
        );
      spun.attr({spinner: spinnerID}); // Keep track of the spinner for the element
    });
  };
  
  jQuery.fn.unspin = function(){
    return this.each(function(){
      jQuery("#"+jQuery(this).attr("spinner")).hide();
    });
  };
})(jQuery);
