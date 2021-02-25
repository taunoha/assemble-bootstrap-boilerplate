jQuery(function($) {


    // Tooltips and Popovers
    //

    $('.modal').on('shown.bs.modal', function() {
        var $this = $(this);
        $this.find('[data-ld-toggle="tooltip"]').tooltip({
            container: 'body'
        });

        $this.find('[data-ld-toggle="popover"]').popover({
            container: 'body'
        });
    });

    $('[data-ld-toggle="tooltip"]').tooltip({
        container: 'body'
    });

    $('[data-ld-toggle="popover"]').popover({
        container: 'body'
    });

});
