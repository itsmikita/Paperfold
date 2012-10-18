/**
 * @file: fold.js
 */

/**
 * Paperfold
 *
 * Idea by: Felix Niklas. https://developer.mozilla.org/en-US/demosdetail/paperfold-css/launch
 * Author: Mikita Stankiewicz http://miketoss.com/taxes.
 *
 * Supports browsers with CSS3-support (Safari, Chrome, FF, Opera and latest IE).
 *
 * How to implement:
 * 1. Add paperfold styles (see style.css).
 * 2. Run Paperfold.init( ( string ) element, ( int ) folds, ( int ) speed [ms] ) on document load.
 * 3. Add Paperfold.toggle( ( function ) callback ) on a trigger button.
 */
var Paperfold = {
	/**
	 * Initialize
	 *
	 * ( string ) element - jQuery() selector string
	 * ( int ) folds - fold count
	 * ( int ) speed - animation speed in miliseconds
	 */
	init: function( element, folds, speed ) {
		this.element = jQuery( element );
		this.folds = folds;
		this.speed = speed;
		this.max_height = $( this.element ).height();
		this.fold_height = this.max_height / this.folds;
	},
	
	/**
	 * Create fold
	 *
	 * ( int ) n - fold index
	 * ( float ) fold_height - initial fold height
	 */
	create_fold: function( n, fold_height ) {
		var half_height = this.fold_height / 2;
		var offset_top = n * this.fold_height * -1;
		var offset_bottom = ( n + 1 ) * this.fold_height - this.max_height;
				
		return jQuery( '<div />' ).addClass( 'fold' ).css( 'height', fold_height ).append( 
			jQuery( '<div />' ).addClass( 'fold-top' ).css( 'height', half_height ).append(
				jQuery( '<div />' ).addClass( 'fold-inner' ).append(
					jQuery( '<div />' ).addClass( 'fold-shading' ).add(
						jQuery( '<div />' ).addClass( 'fold-content' ).css( 'top', offset_top ).html(
							this.content.clone()
						)
					)
				)
			).add(
				jQuery( '<div />' ).addClass( 'fold-bottom' ).css( 'height', half_height ).append(
					jQuery( '<div />' ).addClass( 'fold-inner' ).append(
						jQuery( '<div />' ).addClass( 'fold-shading' ).add(
							jQuery( '<div />' ).addClass( 'fold-content' ).css( 'bottom', offset_bottom ).html(
								this.content.clone()
							)
						)
					)
				)
			)
		);
	},
	
	/**
	 * Prepare folds
	 *
	 * ( float ) fold_height - initial fold height
	 */
	prepare: function( fold_height, speed, inverse ) {
		this.content = this.element.removeClass( 'hidden' ).children().detach();
		
		for( var i = 0; i < this.folds; i++ )
			this.element.append( this.create_fold( i, fold_height ) );
		
		// close
		if( inverse ) {
			var easing_height = 'cubic-bezier(0.2, 0, 0.95, 1)';
			var easing_rotate = 'cubic-bezier(0, 0.15, 0.95, 1)';
		}
		// open
		else {
			var easing_height = 'cubic-bezier(0.10, 0, 0.75, 1)';
			var easing_rotate = 'cubic-bezier(0.15, 0, 1, 0.95)';
		}
		
		// set speed and easing
		jQuery( '.folded .fold' ).css( {
			'-webkit-transition': 'height ' + speed + 'ms ' + easing_height,
			'-moz-transition': 'height ' + speed + 'ms ' + easing_height,
			'-o-transition': 'height ' + speed + 'ms ' + easing_height,
			'-ms-transition': 'height ' + speed + 'ms ' + easing_height,
			'transition': 'height ' + speed + 'ms ' + easing_height
		} );
		jQuery( '.folded .fold-top, .folded .fold-bottom' ).css( {
			'-webkit-transition': '-webkit-transform ' + speed + 'ms ' + easing_rotate,
			'-moz-transition': '-moz-transform ' + speed + 'ms ' + easing_rotate,
			'-o-transition': '-o-transform ' + speed + 'ms ' + easing_rotate,
			'-ms-transition': '-ms-transform ' + speed + 'ms ' + easing_rotate,
			'transition': 'transform ' + speed + 'ms ' + easing_rotate,
		} );
		jQuery( '.folded .fold-shading' ).css( {
			'-webkit-transition': 'opacity ' + speed + 'ms linear',
			'-moz-transition': 'opacity ' + speed + 'ms linear',
			'-o-transition': 'opacity ' + speed + 'ms linear',
			'-ms-transition': 'opacity ' + speed + 'ms linear',
			'transition': 'opacity ' + speed + 'ms linear',
		} );
	},
	
	/**
	 * Open folds
	 *
	 * ( function ) callback - fires when animation is completed
	 */
	open: function( callback ) {
		this.prepare( 0, this.speed );
		
		var that = this;
		
		setTimeout( function() {
			that.element.removeClass( 'closed' ).find( '.fold' ).css( 'height', that.fold_height );
		}, 10 );
		
		setTimeout( function() {
			that.element.html( that.content.clone() );
			callback( 'open' );
		}, this.speed );
	},
	
	/**
	 * Close folds
	 *
	 * ( function ) callback - fires when animation is completed
	 */
	close: function( callback ) {
		this.prepare( this.fold_height, this.speed, true );
		
		var that = this;
		
		setTimeout( function() {
			that.element.addClass( 'closed' ).find( '.fold' ).height( 0 );
		}, 10 );
		
		setTimeout( function() {
			that.element.addClass( 'hidden' ).html( that.content.clone() );
			callback( 'close' );
		}, this.speed );
	},
	
	/**
	 * Toggle open/close
	 *
	 * ( function ) callback - fires when animation is completed
	 */
	toggle: function( callback ) {
		if( this.element.hasClass( 'hidden' ) )
			this.open( callback );
		else
			this.close( callback );
	}
};