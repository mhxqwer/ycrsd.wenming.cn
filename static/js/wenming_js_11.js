$(function () {
        /*
         * 侧边tab颜色控制器
         */
        function navColorController(boxId) {
            var $buttons = $($(boxId).find("button")),
                quantity = $buttons.length;
            switch (quantity) {
                case 1:
                    $($buttons[0]).css("background-color", "#c91a1f");
                    break;
                case 3:
                    $($buttons[0]).css("background-color", "#c91a1f");
                    $($buttons[1]).css("background-color", "#f3b73d");
                    $($buttons[2]).css("background-color", "#108ad7");
                    break;
                case 5:
                    $($buttons[0]).css("background-color", "#c91a1f");
                    $($buttons[1]).css("background-color", "#fd7126");
                    $($buttons[2]).css("background-color", "#f3b73d");
                    $($buttons[3]).css("background-color", "#3ccfbf");
                    $($buttons[4]).css("background-color", "#108ad7");
                    break;
                default:
                    for (var i = 0; i < quantity; i++) {
                        $buttons[i].css("background-color: rgba(0,0,0,0.1)");
                    }
                    break;
            }
        };
        navColorController("#navWenMing");
        navColorController("#navShiJian");
        navColorController("#navGengDuo");

        /*
         * 下方友情链接列表，鼠标放上之后切换子列表
         */
        $('.bottom_nav_list').hover(function () {
            var $this = $(this),
                $nav_box = this.closest('.bottom_nav'),
                $nav_list = $($nav_box).find('.bottom_nav_list'),
                $nav_inner = $($nav_box).find('.link_list')
            ;
            for (var i = 0; i < $nav_list.length; i++) {
                var list_single = $($nav_list[i]),
                    inner_single = $($nav_inner[i])
                ;
                if (list_single[0] === this) {
                    $this.addClass('hover');
                    inner_single.addClass('show');
                } else {
                    list_single.removeClass('hover');
                    inner_single.removeClass('show');
                }
            }
        });

        /*
         * 栏目左方tab组，鼠标点击后切换子列表
         */
        $('.sub_nav_tab').click(function () {
            var $this = $(this),
                $nav_box = this.closest('.sub_nav'),
                $nav_tab = $($nav_box).find('.sub_nav_tab'),
                $content_inner = $($nav_box).siblings('.civiliz-group');
            ;
            for (var i = 0; i < $nav_tab.length; i++) {
                var list_single = $($nav_tab[i]),
                    inner_single = $($content_inner[i])
                ;
                if (list_single[0] === this) {
                    $this.addClass('active');
                    inner_single.addClass('show');
                } else {
                    list_single.removeClass('active');
                    inner_single.removeClass('show');
                }
            }
        });

        /*
         * 推荐列表。鼠标不在上方时自动滚动，鼠标在上方时停止滚动
         */
        var $recommend_list = $('.recommend_list');
        if ($recommend_list.find('.recommend_item').length > 5) {
            var $items = $recommend_list.find('.recommend_item'),
                itemsCount = $items.length,
                $controller = $($recommend_list.next('.controller_group'));
            ;
            $recommend_list.css("display", "block");
            $recommend_list.find('.recommend_list__liner_box').css("width", (($items.length + 1) * 200).toString() + "px");
            $controller.addClass('show');

            for (var i = 0; i < itemsCount; i++) {
                var item_single = $($items[i]);
                item_single.css("margin", "0 17px");
            }
            var offset = 0,
                offsetTarget = offset,
                flagHover,
                flagHover_controller,
                timer_control,
                itemWidth = parseInt($($items[0]).css("width")),
                itemMargin = parseInt($($items[0]).css("margin-left")),
                maxLength = itemsCount * (itemWidth + 2 * itemMargin),
                speed = 0.2,
                correction = function (value) {
                    while (value < -maxLength) {
                        value += maxLength;
                    }
                    while (value > 0) {
                        value -= maxLength;
                    }
                    return value;
                },
                //自动滚动段
                timer = setInterval(function () {
                    if (!flagHover) {
                        offset += -speed;
                    }
                    offset = correction(offset);
                    offsetTarget = correction(offsetTarget);
                    for (var i = 0; i < itemsCount; i++) {
                        var $item_single = $($items[i]);
                        $item_single.css("left", offset.toString() + "px");
                        if ($item_single.position().left < -parseInt($($items[0]).css("width"))) {
                            $item_single.css("left", (parseInt($item_single.css("left")) + maxLength).toString() + "px");
                        }
                    }
                })
            ;
            //鼠标放上列表时，停止自动滚动，并重置手动移动的时间戳
            $recommend_list.hover(function () {
                flagHover = true;
            }, function () {
                flagHover = false;
            });
            $controller.hover(function () {
                flagHover = true;
                flagHover_controller = true;
            }, function () {
                flagHover = false;
                flagHover_controller = false;
                if (timer_control != null) {
                    clearInterval(timer_control);
                    timer_control = null;
                }
            });

            var $prev = $($controller.find('.controller_prev')[0]),
                $after = $($controller.find('.controller_after')[0])
            ;

            function controllerAction(isPrev) {
                if (timer_control != null) {
                    clearInterval(timer_control);
                    timer_control = null;
                }
                timer_control = setInterval(function () {
                    if (!isPrev) {
                        offset += speed * 3;
                    } else {
                        offset -= speed * 3;
                    }
                });
            }

            $prev.click(function () {
                controllerAction(true);
            });
            $after.click(function () {
                controllerAction(false);
            });
        } else {
            $recommend_list.css({
                "display": "-moz-flex",
                "display": "-ms-flex",
                "display": "-o-flex",
                "display": "-webkit-flex",
                "display": "flex",
                "justify-content": "space-around"
            });
            var $items = $recommend_list.find('.recommend_item');
            $recommend_list.find('.recommend_list__liner_box').remove();
            $recommend_list.append($items);
        }

    }
)