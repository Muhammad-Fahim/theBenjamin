
(function ($) {

	var
	
	initialized = false,
	
	loading_html = '<div class="ajax-loading"><div class="ajax-loading-background"></div><div class="ajax-loading-animation"></div><div class="ajax-loading-overlay"></div></div>',
	
	defaults = {
		show: true,	
		opacity: 0.7
	},
	
	methods = {
		
	    show : function(){
	    	
	    	return this.each(function(){
	    		var $ald = $(this).data('ajaxLoading');
	    		if( ! $ald )
	    		{
	    			$ald = $(loading_html);
	    			$(this).data('ajaxLoading', $ald);
	    			$("body").prepend($ald);
	    			$ald.find(".ajax-loading-overlay").css({opacity: defaults["opacity"]});
	    			$ald.find(".ajax-loading-background").css({opacity: 1});	    			
	    			$ald.data('ctrl', $(this));
	    			set_position($ald);
	    		}
	    		$ald.show();
	    	});
	    },
	    
	    hide : function(){
	    	return this.each(function(){
	    		var $ald = $(this).data('ajaxLoading');
	    		if( $ald )
	    		{
	    			$ald.hide();
	    			$ald.removeData('ctrl');
	    			$(this).removeData('ajaxLoading');
	    			$ald.remove();
	    		}
	    	});	    
	    }

	};
	
	$.fn.ajax_loading = function(method){

		if( ! initialized )
		{
			initialize();
			initialized = true;
		}		
		
		if ( methods[method] )
		{
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    }
	    else
	    {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.ajax_loading' );
	    }    
		return this;
	};
	
	
	function initialize()
	{
		$(window).resize(function() {
			$(".ajax-loading:visible").each(function(){
				set_position($(this));
	    	});	
		});	
	}
	
	
	function set_position($ajax_loading)
	{
		var $cont = $ajax_loading.data('ctrl');
		var $bg = $(".ajax-loading-background", $ajax_loading);
		var $an = $(".ajax-loading-animation", $ajax_loading);
		
		var offset = $cont.offset();
		
		$ajax_loading.css({top: offset.top, left: offset.left});
		//offset( offset );
		$ajax_loading.width($cont.outerWidth());
		$ajax_loading.height($cont.outerHeight());
		
		$bg.css({left: ($ajax_loading.width() - $bg.width()) / 2, top: ($ajax_loading.height() - $bg.height()) / 2 });
		$an.css({left: ($ajax_loading.width() - $an.width()) / 2, top: ($ajax_loading.height() - $an.height()) / 2 });
		
	}

}(jQuery));
