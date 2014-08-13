
(function ($) {

	var
	
	data_name = 'eb-slide-show',	
	
	defaults = {
		width: 100,
		height: 100,
		time: 6,
		duration: 2,
		suspended: false,
		loading_html: '<div class="eb-slide-show-loading"><div class="eb-slide-show-loading-background"></div><div class="eb-slide-show-loading-animation"></div><div class="eb-slide-show-loading-overlay"></div></div>',
		linkTitle: 'View Details'
	},
	
	methods = {
		init: function(options){
			var settings = $.extend( {}, defaults, options || {} );
			
			settings.time = settings.time * 1000;
			settings.duration = settings.duration * 1000;
			
			return this.each(function(){
				var data = $(this).data( data_name );
	    		if( ! data )
	    		{
	    			var data_settings = {
	    					status: 0, //0 - stopped, 1 - running
	    					activeDirection: 1,
	    					activeIndex: -1,
	    					nextIndex: -1,
	    					isAnimation: false,
	    					isLoading: false,
	    					isFirstLoad: true,
	    					isFirstAnimate: true,
	    					timeoutId: undefined,
	    					showLoadingTimeoutId: undefined,
	    					settings: {},
	    					images: [],
	    					imagesCount: 0,
	    					settings: settings,
	    					width: 0,
	    					height: 0,
	    					topFade: 0,
	    					bottomFade: 0,
	    					fullscreenMode: 0,
	    					show_title: false,
	    					show_html: false,
	    					time: 0
	    					
	    				};
	    			
	    			
	    			data_settings.time = data_settings.settings.time; 
	    			
	    			data_settings.width = parseInt( $(".slide-show-width", $(this)).text() );
	    			data_settings.height = parseInt( $(".slide-show-height", $(this)).text() );
	    			
	    			data_settings.topFade = parseInt( $(".slide-show-top-fade", $(this)).text() );
	    			data_settings.bottomFade = parseInt( $(".slide-show-bottom-fade", $(this)).text() );
	    			data_settings.fullscreenMode = parseInt( $(".slide-show-fullscreen-mode", $(this)).text() );
	    			
	    			if( $(".slide-show-time", $(this)).length && parseFloat( $(".slide-show-time", $(this)).text() ) )
	    			{
	    				data_settings.time = parseFloat( $(".slide-show-time", $(this)).text() ) * 1000;	
	    			}
	    			
	    			if( $(".slide-show-link-title", $(this)).length && $(".slide-show-link-title", $(this)).text() )
	    			{
	    				data_settings.settings.linkTitle = $(".slide-show-link-title", $(this)).text();	
	    			}
	    			
	    			if( $(".slide-show-duration", $(this)).length && parseFloat( $(".slide-show-duration", $(this)).text() ) )
	    			{	    			
	    				data_settings.settings.duration = parseFloat( $(".slide-show-duration", $(this)).text() ) * 1000;
	    			}
	    			
	    			if( $(".slide-show-title-visible", $(this)).length && parseInt( $(".slide-show-title-visible", $(this)).text() ) )
	    			{	    			
	    				data_settings.show_title = true;
	    			}
	    			
	    			if( $(".slide-show-html-visible", $(this)).length && parseInt( $(".slide-show-html-visible", $(this)).text() ) )
	    			{	    			
	    				data_settings.show_html = true;
	    			}
	    			
	    			$(".eb-slide-show-images li", $(this)).each(function(){
		    			var image = {id:'', image:'', href:'', title:'', href_target:'_self', html:''};
		    			$("b", $(this)).each(function(){
		    				image[ $(this).attr('class') ] = $(this).html();
		    			});		    			
		    			data_settings.images.push( image );		    			
		    		});		    			
		    			
	    			data_settings.imagesCount = data_settings.images.length; 
	    			
	    			//if( ! data_settings.settings.suspended )
	    			//{
	    			//$(this).eb_slideshow('start');
	    			//}

	    			var $o = $(this);
	    			
	    			$(".eb-slide-show-btn-next, .eb-slide-show-btn-prev", $o).hide();
	    			
	    			$(".eb-slide-show-btn-next", $o).hover(function(){$(this).css({opacity: 1});},function(){$(this).css({opacity: 0.6});}).click(function(){
	    				$o.eb_slideshow("next");
	    			});
	    			
	    			$(".eb-slide-show-btn-prev", $o).hover(function(){$(this).css({opacity: 1});},function(){$(this).css({opacity: 0.6});}).click(function(){
	    				$o.eb_slideshow("prev");
	    			});
	    			
	    			$(".eb-slide-show-dots li", $o).click(function(){
	    				$o.eb_slideshow("showidx", $(".eb-slide-show-dots li", $o).index(this) );
	    			});
	    			 
	    			
	    			
	    			data_settings.status = 1;
	    			
	    			$(this).data( data_name, data_settings );
	    			
	    			slide_switch( $(this), 1 );
	    			
	    			//$o.eb_slideshow("next");
	    				    			
	    		}
	    	});			
		},
		
			
	    start: function(){
	    	
	    	return this.each(function(){
	    		var data = $(this).data( data_name );	    		
	    		if( data && ! data.status )
	    		{
	    			var $o = $(this);
	    			data.status = 1;
	    			//slide_switch( $(this), 1 );
	    			data.timeoutId = setTimeout(function(){ slide_switch( $o, 1 ); }, data.time );
	    		}
	    	});
	    },
	    
	    stop: function(){
	    	return this.each(function(){
	    		var data = $(this).data( data_name );
	    		if( data && data.status )
	    		{
	    			data.status = 0;
	    			clearTimeout( data.timeoutId );
	    		}
	    	});	    
	    },
	    
	    manual: function(){
	    	return this.each(function(){
	    		var data = $(this).data( data_name );
	    		if( data && data.status )
	    		{
	    			data.status = -1;
	    		}
	    	});	    
	    },
	    
	    next: function(){
	    	return this.each(function(){
	    		var data = $(this).data( data_name );
	    		if( data )
	    		{
	    			_switch_manually( $(this), 1, -1 );
	    		}
	    	});	    
	    },
	    
	    prev: function(){
	    	return this.each(function(){
	    		var data = $(this).data( data_name );
	    		if( data  )
	    		{
	    			_switch_manually( $(this), -1, -1 );	    			
	    		}
	    	});	    
	    },
	    
	    showidx: function(idx){
	    	return this.each(function(){
	    		var data = $(this).data( data_name );
	    		if( data  )
	    		{
	    			_switch_manually( $(this), -1, idx );	    			
	    		}
	    	});	    
	    },
	    
	    adjust: function(){
	    	return this.each(function(){
	    		_adjust( $(this) );
	    	});		
		}

	};
	
	$.fn.eb_slideshow = function(method){
		if ( methods[method] )
		{
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));	 
		}
		else if ( typeof method === 'object' || ! method )
		{
	      return methods.init.apply( this, arguments );
	    } 
	    else
	    {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.eb_slideshow' );
	    }    
		return this;
	};
	
	function _adjust( $o )
	{
		if( $o.length )
		{
			var data = $o.data( data_name );
			if( ! data ) return;
			
			
			var $wr = $(".slide-show-image-wrapper:first", $o);
			
			var c1 = data.width / data.height;
			var w1 = $wr.width();
			var h1 = $wr.height();
		
			var w = 0;
			var h = 0;
			var t=0;
			var l=0;
				    	
			
			if( w1 / h1 >= c1 )
			{
				w = w1;
				h = w / c1;
				t = -(h - h1 + data.topFade + data.bottomFade ) / 2;
				l = 0;
				
				$(".slide-show-clip-rect img", $o).css({left: l, top: t, width: w, height: h });
				
				$(".slide-show-top-fade-wrapper", $o).each(function(){
					$("div", $(this)).each(function(i){
						$(this).css({ 
							backgroundPosition: l + "px " + (t - i + data.topFade) + "px", 
							backgroundSize: w + "px " + h + "px",
						});
					});
				});
				
				$(".slide-show-bottom-fade-wrapper", $o).each(function(){
					$("div", $(this)).each(function(i){
						$(this).css({
							backgroundPosition: l + "px " + ( -h - t - i) + "px", 
							backgroundSize: w + "px " + h + "px"
						 });
					});
				});
				
			}
			else
			{
				h = h1;
				w = h * c1;
				var t = 0;
				var l = -(w - w1)/2;
				$(".slide-show-clip-rect img", $o).css({left: l, top: 0, width: w, height: h });
				
				$(".slide-show-top-fade-wrapper", $o).each(function(){
					$("img", $(this)).each(function(i){
						$(this).css({ left: l, top: - i , width: w, height: h });
					});
				});
				
				$(".slide-show-bottom-fade-wrapper", $o).each(function(){
					$("img", $(this)).each(function(i){
						$(this).css({ left: l, bottom: - data.bottomFade + i + 1, width: w, height: h });
					});
				});
			}
			
				
		}
	}
	
	function _get_current_idx( $o ) {
		var $cur = $(".slide-show-image-wrapper.is-active:first", $o );
		var ret = -1;
		if( $cur.length )
		{
			var exp = /.*[\s]+idx-([0-9]+).*/i;
	        var ar = exp.exec($cur.attr("class"));
	        ret = parseInt( ar[1] );
		}
		return ret;
	}
	
	function _animate( $o, duration ) {
		var data = $o.data( data_name );
		data.isAnimation = true;		
		var zIndex = $(".slide-show-image-wrapper", $o).length + 3;
		
		$(".slide-show-image-wrapper", $o).removeClass("is-active").addClass("to-remove");
		var $cur = $(".slide-show-image-wrapper:first", $o ).addClass("is-active").removeClass("to-remove");
		
		if( -1 == data.status ){
			$cur.dequeue();
		}
		
		var idx = _get_current_idx( $o );            
        $(".eb-slide-show-dots li", $o).removeClass("selected");
        $(".eb-slide-show-dots li:eq("+idx+")", $o).addClass("selected");
		
		$cur.css({zIndex: zIndex}).animate({opacity: 1.0}, duration, function(){
			$(".to-remove", $o).hide().remove();
			$(this).css({zIndex: 1});			
            $(".eb-slide-show-btn-next, .eb-slide-show-btn-prev", $o).fadeIn();
            data.isAnimation = false;
            $o.trigger("after_animation");
        });
	}
	
	function slide_switch( $o ) {
		
		if( $o.length )
		{
			var data = $o.data( data_name );			
			if( ! data || data.isLoading ) return;
			
			var duration = data.isFirstAnimate ? 300 : data.settings.duration;
			
			if( data.isFirstLoad )
			{
				_show_loading( $o, true, 100 );	
			}
			else
			{
				_animate( $o, duration );
			}
			
			var next_run_time = new Date().getTime() + ( data.isFirstLoad ? 0 : duration + data.time );
			
			$o.off("image_loaded").on("image_loaded", function(){
				if( new Date().getTime() >= next_run_time && ! data.isAnimation && -1 != data.status )
				{
					setTimeout(function(){ slide_switch( $o ); }, 10);
				}
				$o.off("image_loaded");				
			});
			
			if( data.isFirstLoad )
			{
				load_image( $o, 0 );	
			}
			else
			{
				if(data.images.length > 1 && data.status == 1)
				{
					data.timeoutId = setTimeout(function(){ slide_switch( $o ); }, duration + data.time);
					$o.off("after_animation").on("after_animation", function(){
						data.isFirstAnimate = false;
						if( -1 != data.status )
						{
							var idx = _get_current_idx( $o );
							
							idx++;
							if( idx >= data.imagesCount )
							{
								idx = 0;
							}
							
							load_image( $o, idx );
						}
						$o.off("after_animation");				
					});					
					
				}
				
				
			}
			
						
			
			data.isFirstLoad = false;
			
						
			
			
		}
	}	
	
	function _show_loading( $o, show, timeout )
	{
		var data = $o.data( data_name );
		if( ! data ) return;
		clearTimeout( data.showLoadingTimeoutId );
		
		if( show )
		{
			if( timeout )
			{
				data.showLoadingTimeoutId = setTimeout(function(){ _show_loading( $o, show, 0 ); }, timeout);  	
			}
			else
			{
				$o.append( data.settings.loading_html );	
			}			
		}
		else
		{
			$(".eb-slide-show-loading", $o).remove();
		}
	}
	
	function _switch_manually( $o, direction, idx )
	{
		if( $o.length )
		{
			var data = $o.data( data_name );
			if( ! data ) return;
			
			data.status = -1;
			clearTimeout( data.timeoutId );			
			$o.off("after_animation");
			$o.off("image_loaded");
			
			_show_loading( $o, true, 100 );			
			
			if( -1 == idx )
			{
				idx = _get_current_idx( $o );			
				if( direction == -1 )
				{
					idx--;				
					if( idx < 0 )
					{
						idx = data.imagesCount - 1;
					}	
					
				}
				else
				{
					idx++;
					if( idx >= data.imagesCount )
					{
						idx = 0;
					}				
				}	
			}
			
			
			
			$o.on("image_loaded", function(){
				_animate( $o, 400 );
				$o.off("image_loaded");
			});
			
			load_image( $o, idx );

		}		
		
	}
	
	function load_image( $o, idx )
	{
		if( $o.length )
		{
			var data = $o.data( data_name );
			if( ! data ) return;
			
			var img = data.images[idx];
			
			var cur_img = new Image;
			
			data.isLoading = true;
			
			
			$(cur_img).load(function(){
				data.isLoading = false;
				var $imageWrapper = $("<div/>").addClass("slide-show-image-wrapper").addClass("idx-"+idx);
				
				if( "" !=  img.href )
				{
					var $wr1 = $("<div/>").addClass("eb-slide-show-link-title-wrapper").appendTo( $imageWrapper );
					var $link1 = $("<a/>").attr("href", img.href).attr("target", img.href_target).html(data.settings.linkTitle).appendTo( $wr1 );
				}
				
				if( data.fullscreenMode ){
					$imageWrapper.css({position: "absolute", zIndex: 1, left: 0, top: 0, right: 0, bottom: 0, opacity: 0});
				}
				else{
					$imageWrapper.css({position: "absolute", zIndex: 1, left: 0, top: 0, width: data.width, height: data.height, opacity: 0});	
				}
								
				
				var $clipRect = $("<div/>").addClass("slide-show-clip-rect").css({position: "absolute", zIndex: 1, left: 0, right: 0, top: data.topFade, bottom: data.bottomFade, overflow: "hidden" });
				$imageWrapper.append( $clipRect );
				
				var opStep;
				var op;
				var i;
				var $stripe;
				
				if( data.topFade )
				{
					var $topFade = $("<div/>").addClass("slide-show-top-fade-wrapper").css({position: "absolute", zIndex: 2, left: 0, right: 0, top: 0, height: data.topFade});
					opStep = (1 - 0) / data.topFade;
					op = 0;
					for(i=0; i<data.topFade; i++)
					{			
						$stripe = $("<div/>").css({
							margin: 0,
							padding: 0,
							opacity: op,
							height: "1px",
							overflow: "hidden",
							background: "url("+img.image+") 0px "+(-i)+"px no-repeat",
							backgroundSize: data.width +"px "+ data.height +"px",
						}).appendTo( $topFade );
						op += opStep; 
					}
					$imageWrapper.append( $topFade );
				}
				
				if( data.bottomFade )
				{
					var $bottomFade = $("<div/>").addClass("slide-show-bottom-fade-wrapper").css({position: "absolute", zIndex: 2, left: 0, right: 0, bottom: 0, height: data.bottomFade});
					opStep = (1 - 0) / data.bottomFade;
					op = 1;
					for(i=0; i<data.bottomFade; i++)
					{						
						$stripe = $("<div/>").css({
							margin: 0,
							padding: 0,
							opacity: op, 
							height: "1px", overflow: "hidden",
							background: "url("+img.image+") 0px "+(-data.height+data.bottomFade-i)+"px no-repeat",
							backgroundSize: data.width +"px "+ data.height +"px",	
						}).appendTo( $bottomFade );
						op -= opStep; 
					}
					$imageWrapper.append( $bottomFade );
				}
				
				$clipRect.append( $(this) );
			
				$imageWrapper.prependTo( $o );
				
	            if( data.show_title &&  "" != img.title )
	            {
	            	var $wr = $("<div/>").addClass("eb-slide-show-title-wrapper").addClass("eb-slide-show-title-wrapper-"+img.id).appendTo( $imageWrapper );
	            	var $title = $("<div/>").addClass("eb-slide-show-title").html(img.title).appendTo( $wr );
	            }

	            if( data.show_html )
	            {
	            	var $wr2 = $("<div/>").addClass("eb-slide-show-html-wrapper").appendTo( $imageWrapper );
	            	var $html2 = $("<div/>").addClass("eb-slide-show-html").append(img.html).appendTo( $wr2 );
	            }
	            
				
				if( data.fullscreenMode )
				{
					_adjust( $o );	
				}				
				
				$o.trigger("image_loaded");
				
				_show_loading( $o, false, 0 );
				
			})
			.css({ position: "absolute", top: -data.topFade, left: 0, width: data.width, height: data.height, zIndex: 1})		
			.attr("id", img.id)
			.attr("src", img.image)
			.attr("alt", img.title);	
		}
			
	}
	

}(jQuery));
