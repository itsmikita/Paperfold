/**
 * @file: paperfold.js
 *
 * Author: Mikita Stankiewicz
 * URL: http://designed.bymikita.com/paperfold/
 * Version: 0.1
 */

;( function( $, window, document, undefined ) {
	/**
	 * Constructor
	 *
	 * @param object select - jQuery selector
	 * @param object options - Options
	 */
	var Paperfold = function( selector, options ) {
		this.selector = selector;
		this.options = options;
	};
	
	/**
	 * Prototype
	 */
	Paperfold.prototype = {
		defaults: {
			speed: 1000,
			folds: 5,
			complete: null
		},
		options: {},
		config: {},
		
		/**
		 * Init
		 */
		init: function() {
			// config
			this.config = $.extend( {}, this.defaults, this.options );
			
			return this;
		},
		
		/**
		 * Create fold
		 *
		 * @param int n - Fold index
		 * TODO: Add all CSS
		 */
		createFold: function( n ) {
			var height = Math.round( this.selector.height() / this.config.folds ),
				offsetTop = n * height
				offsetBottom = ( n + 1 ) * height - this.selector.height();
			
			return jQuery( '<div />' ).addClass( 'fold' ).css( {
				'height': height,
				'position': 'relative'
			} ).append( 
				$( '<div />' ).addClass( 'fold-top' ).css( 'height', height / 2 ).append(
					$( '<div />' ).addClass( 'fold-inner' ).append(
						$( '<div />' ).addClass( 'fold-shading' ).add(
							$( '<div />' ).addClass( 'fold-content' ).css( 'top', offsetTop ).html(
								this.content.clone()
							)
						)
					)
				).add(
					$( '<div />' ).addClass( 'fold-bottom' ).css( 'height', height / 2 ).append(
						$( '<div />' ).addClass( 'fold-inner' ).append(
							$( '<div />' ).addClass( 'fold-shading' ).add(
								$( '<div />' ).addClass( 'fold-content' ).css( 'bottom', offsetBottom ).html(
									this.content.clone()
								)
							)
						)
					)
				)
			);
		},
		
		/**
		 * Prepare
		 */
		prepare: function( type ) {
			this.content = this.selector.children().detach();
			
			for( var n = 0; n < this.config.folds; n++ )
				this.selector.append( this.createFold( n ) );
			
			if( 'open' == type ) {
				var easing_height = 'cubic-bezier(0.10, 0, 0.75, 1)';
				var easing_rotate = 'cubic-bezier(0.15, 0, 1, 0.95)';
			}
			
			if( 'close' == type ) {
				var easing_height = 'cubic-bezier(0.2, 0, 0.95, 1)';
				var easing_rotate = 'cubic-bezier(0, 0.15, 0.95, 1)';
			}
			
			// TODO: simplify this
			$( '.folded .fold' ).css( {
				'-webkit-transition': 'height ' + this.config.speed + 'ms ' + easing_height,
				'-moz-transition': 'height ' + this.config.speed + 'ms ' + easing_height,
				'-o-transition': 'height ' + this.config.speed + 'ms ' + easing_height,
				'-ms-transition': 'height ' + this.config.speed + 'ms ' + easing_height,
				'transition': 'height ' + this.config.speed + 'ms ' + easing_height
			} );
			$( '.folded .fold-top, .folded .fold-bottom' ).css( {
				'-webkit-transition': '-webkit-transform ' + this.config.speed + 'ms ' + easing_rotate,
				'-moz-transition': '-moz-transform ' + this.config.speed + 'ms ' + easing_rotate,
				'-o-transition': '-o-transform ' + this.config.speed + 'ms ' + easing_rotate,
				'-ms-transition': '-ms-transform ' + this.config.speed + 'ms ' + easing_rotate,
				'transition': 'transform ' + this.config.speed + 'ms ' + easing_rotate,
			} );
			$( '.folded .fold-shading' ).css( {
				'-webkit-transition': 'opacity ' + this.config.speed + 'ms linear',
				'-moz-transition': 'opacity ' + this.config.speed + 'ms linear',
				'-o-transition': 'opacity ' + this.config.speed + 'ms linear',
				'-ms-transition': 'opacity ' + this.config.speed + 'ms linear',
				'transition': 'opacity ' + this.config.speed + 'ms linear',
			} );
		},
		
		/**
		 * Open
		 */
		open: function() {
			this.prepare( 'open' );
			
			var PF = this;
			
			// add CSS here
			
			setTimeout( function() {
				PF.selector.html( PF.content.clone() );
				
				console.log( PF.config );
				
				if( null !== PF.config.complete )
					PF.config.complete();
			}, this.config.speed );
		},
		
		/**
		 * Close
		 */
		close: function() {
			this.prepare( 'close' );
			
			var PF = this;
			
			// add CSS here
			
			setTimeout( function() {
				PF.selector.html( PF.content.clone() );
				
				console.log( PF.config );
				
				if( null !== PF.config.complete )
					PF.config.complete();
			}, this.config.speed );
		},
		
		/**
		 * Toggle
		 */
		toggle: function() {
			if( this.selector.hasClass( 'paperfold-closed' ) )
				this.open();
			else
				this.close();
		}
	};
	
	/**
	 * jQuery open handler
	 *
	 * @param object options - Options
	 */
	$.fn.paperfoldShow = function( options ) {
		new Paperfold( this, options ).init().open();
		
		return this;
	};
	
	/**
	 * jQuery open handler
	 *
	 * @param object options - Options
	 */
	$.fn.paperfoldClose = function( options ) {
		new Paperfold( this, options ).init().close();
		
		return this;
	};
	
	/**
	 * jQuery toggle handler
	 *
	 * @param object options - Options
	 */
	$.fn.paperfoldToggle = function( options ) {
		new Paperfold( this, options ).init().toggle();
		
		return this;
	};
} )( jQuery, window, document );