(function($){
    
    // Global Variables.
    
    var portfolio_container = $('#portfolio-container'),
        $sizer = portfolio_container.find('.shuffle__sizer'),
        portfolio_controls = $('#portfolio-controls a');
    
    /* Plugins */
    $(".button-collapse").sideNav(); // Nabvar collapse.
    $('.parallax').parallax(); // Parallax Effect.
    
    smoothScroll.init(); // Anchor Navigation.
    
    
    /* Shuffle Pluginf for sort projects */
    portfolio_container.shuffle({
        itemSelector: '.portfolio-item',
        sizer: $sizer
    });
    
    portfolio_controls.on('click', function(){
        var $this = $(this),
            isActive = $this.hasClass( 'active' ),
            group = isActive ? 'all' : $this.data( 'project' );

        if( !isActive ){
            $('#portfolio-controls .active').removeClass('active');
        }

        console.log(group);
        
        $this.toggleClass('active');
        portfolio_container.shuffle('shuffle', group);
    });
    
})(jQuery);