(function($, window, document, undefine) {
    "use strict";
    var Instagram = {
        init: function(options, elem) {
            var $self = this;
            $self.elem = elem;
            $self.$elem = $(elem);
            $self.options = $.extend({}, $.fn.instaplugin.option, options);
            $self.apiType();
            $self.fetch();
        },
        apiType: function() {
            var $self = this,
                username,
                ajax_user_search,
                query_type,
                hashtag;
            if ($self.options.getData === 'user') {
                $self.username = $self.options.user;
                $self.ajax_user_search = 'https://api.instagram.com/v1/users/search';
                $self.query_type = $self.username;
            } else if ($self.options.getData === 'tag') {
                $self.hashtag = $self.options.tagedName;
                $self.ajax_user_search = 'https://api.instagram.com/v1/users/search';
                $self.query_type = $self.hashtag;
            } else {
                console.log('no tag or user found');
            }
        },
        apiData: function(data) {
            var $self = this,
                api_url;
            if ($self.options.getData === 'user') {
                $self.api_url = 'https://api.instagram.com/v1/users/' + data.data[0].id + '/media/recent';
            }
            if ($self.options.getData === 'tag') {
                $self.api_url = 'https://api.instagram.com/v1/tags/' + $self.hashtag + '/media/recent';
            }
        },
        fetch: function() {
            var $self = this;
            $.ajax({
                url: $self.ajax_user_search,
                dataType: 'jsonp',
                type: 'GET',
                data: {
                    access_token: $self.options.accessTocken,
                    q: $self.query_type
                },
                success: function(data) {
                    $self.apiData(data);
                    $.ajax({
                        url: $self.api_url,
                        dataType: 'jsonp',
                        type: 'GET',
                        data: {
                            access_token: $self.options.accessTocken,
                            count: $self.options.showImage
                        },
                        success: function(data2) {
                            for (var x = 0; x < data2.data.length; x++) {
                                $self.imageSizefunc(x, data2);
                            }
                            $self.coloumnNumber();
                        },
                        error: function(data2) {
                            console.log(data2);
                        }
                    });
                },
                error: function(data) {
                    console.log(data);
                }
            });
        },
        coloumnNumber: function() {
            var $self = this,
                no_margin,
                add_padding,
                hoverEffectVelue,
                wrapColumn = $($self.$elem[0]).children('li');

            ($self.options.margin === true) ? no_margin = '': no_margin = 'no-margin';
            ($self.options.padding === true) ? add_padding = 'add-padding': add_padding = '';
            ($self.options.hoverEffect === true) ? hoverEffectVelue = '' + $self.options.hoverAnimation + '': hoverEffectVelue = '';

            wrapColumn.wrapAll("<ul class='widget-instaplugin col-no-" + $self.options.column + " " + no_margin + " " + hoverEffectVelue + " " + add_padding + "'></ul>");
        },
        checkSelector: function(data2, instaData) {
            var $self = this;
            var selector = $($self.$elem[0]);
            selector.append(instaData);
        },
        imageSizefunc: function(x, data2) {
            var $self = this,
                small_image,
                instaData;

            if ($self.options.imageSize === 'small') {
                small_image = data2.data[x].images.thumbnail.url;
            } else if ($self.options.imageSize === 'medium') {
                small_image = data2.data[x].images.low_resolution.url;
            } else if ($self.options.imageSize === 'large') {
                small_image = data2.data[x].images.standard_resolution.url;
            } else {
                small_image = data2.data[x].images.standard_resolution.url.replace("/s640x640/", "/");
            }

            //Instagram template For list Style
            instaData = '<li><a href="' + data2.data[x].link + '"><img src="' + small_image + '"><div class="instagram_meta"><span class="comments">' + data2.data[x].comments.count + '</span>,<span class="like">' + data2.data[x].likes.count + '</span></a></li>';

            //Instagram template For Slider Style

            $self.checkSelector(data2, instaData);
        }
    };

    $.fn.instaplugin = function(options) {
        return $(this).each(function() {
            var instagram = Object.create(Instagram);
            instagram.init(options, this);
            $.data(this, 'instaplugin', instagram);
        });
    };

    $.fn.instaplugin.option = {
        accessTocken: '2070535567.a49315a.7e681503c94f4daeb5dbd8e7d594512e',
        getData: 'tag',
        user: 'softhopper',
        tagedName: 'softhopper_pick',
        showImage: 5,
        imageSize: 'small', //small, medium, large, original
        column: 5,
        noMargin: true,
        padding: false,
        hoverEffect: true,
        hoverAnimation: 'fade'
    };
})(jQuery, window, document);