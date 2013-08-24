var HH_ = {
    all_headers: $('h1,h2,h3,h4,h5,h6'),
    header_index: 0,
    scrollToElement: function(dest) {
        $('html, body').animate({ scrollTop: dest.offset().top }, 250);
    }
};


self.port.on("next-header", function() {
    HH_.header_index++;
    if( HH_.header_index >= HH_.all_headers.length ) {
        HH_.header_index = 0;
    }
    HH_.scrollToElement( $(HH_.all_headers[HH_.header_index]) );
});

self.port.on("prev-header", function() {
    if( HH_.header_index == 0 )
        HH_.header_index = HH_.all_headers.length - 1;
    else
        HH_.header_index--;

    HH_.scrollToElement( $(HH_.all_headers[HH_.header_index]) );
});
