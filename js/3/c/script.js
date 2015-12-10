/**
 * Created by biroa on 12/01/2015.
 *
 * Composite Design Pattern
 *
 *  It is for multiple object with the same API
 *
 *  We creating a composite that handle all different object the
 *  the same time
 *
 *  The pattern is ideal in recursive elements that are chained
 */


(function (win, $) {

    /**
     * @param src
     * @param out
     */
    function clone(src, out) {
        for (var attr in src.prototype) {
            out.prototype[attr] = src.prototype[attr];
        }
    }

    /**
     * Create the circle constructor
     * @constructor
     */
    function Circle() {
        this.item = $('<div class="circle"></div>');
    }

    /**
     * @param clr
     */
    Circle.prototype.color = function (clr) {
        this.item.css('background', clr);
    };
    /**
     *
     * @param left
     * @param top
     */
    Circle.prototype.move = function (left, top) {
        this.item.css('left', left);
        this.item.css('top', top);
    };
    /**
     * @returns {*|HTMLElement}
     */
    Circle.prototype.get = function () {
        return this.item;
    };

    /**
     * Create the rectangle constructor
     * @constructor
     */
    function Rect() {
        this.item = $('<div class="rect"></div>');
    }

    //Clone the circle properties to the React
    clone(Circle, Rect);

    /**
     *
     * @constructor
     */
    function GreenCircleBuilder() {
        this.item = new Circle();
        this.init();
    }

    GreenCircleBuilder.prototype.init = function () {
        //NOTHING
    };
    GreenCircleBuilder.prototype.get = function () {
        return this.item;
    };

    function BlueCircleBuilder() {
        this.item = new Circle();
        this.init();
    }

    BlueCircleBuilder.prototype.init = function () {
        this.item.color('blue');
        var rect = new Rect();
        rect.color("yellow");
        rect.move(100, 100);

        return this.item.get().append(rect.get());
    };
    BlueCircleBuilder.prototype.get = function () {
        return this.item;
    };


    ShapeFactory = function () {
        this.types = {};
        this.create = function (type) {
            return new this.types[type]().get();
        };
        this.register = function (type, cls) {
            if (cls.prototype.init && cls.prototype.get) {
                this.types[type] = cls;
            }
        }
    };

    function StageAdapter(id) {
        this.index = 0;
        this.contex = $(id);
    }

    StageAdapter.prototype.sig = 'stageItem_';
    StageAdapter.prototype.add = function (item) {
        ++this.index;
        item.addClass(this.sig + this.index);
        this.contex.append(item);
    };

    StageAdapter.prototype.remove = function (index) {
        this.contex.remove('.' + this.sig + index);
    };

    function CompositeController(a) {
        this.a = a;
    };

    CompositeController.prototype.action = function (act) {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        for (var item in this.a) {
            this.a[item][act].apply(this.a[item], args);
        }
    };

    var CircleGeneratorSingleton = (function () {
        var instance;

        function init() {
            var _aCircle = [],
                _stage,
                _sf = new ShapeFactory(),
                _cc = new CompositeController(_aCircle);

            function _position(circle, left, top) {
                circle.move(left, top);
            }

            function registerShapes(name, className) {
                _sf.register(name, className);
                _sf.register(name, className);
            }

            function setStage(stg) {
                _stage = stg;
            }

            function create(left, top, type) {
                var circle = _sf.create(type);
                circle.move(left, top);
                return circle;
            }

            function tint(clr) {
                _cc.action('color', clr);
            }

            function move(left, top) {
                _cc.action('move', left, top);
            }

            function add(circle) {
                _stage.add(circle.get());
                _aCircle.push(circle);
            }

            function index() {
                return _aCircle.length;
            }

            return {//expose public functions
                index: index,
                create: create,
                add: add,
                register: registerShapes,
                setStage: setStage,
                tint: tint,
                move: move
            };
        }

        return {
            getInstance: function () {
                if (!instance) {
                    instance = init();
                }

                return instance;
            }
        }
    })();

    $(win.document).ready(function () {
        var cgs = CircleGeneratorSingleton.getInstance();
        cgs.register('green', GreenCircleBuilder);
        cgs.register('blue', BlueCircleBuilder);
        cgs.setStage(new StageAdapter('.advert'));
        $('.advert').click(function (e) {
            var circle = cgs.create(e.pageX - 25, e.pageY - 25, 'green');
            cgs.add(circle);
        });


        $(document).keypress(function (e) {
            console.log(e.keyCode);
            if (e.keyCode === 97) { // 'a' is pressed
                var circle = cgs.create(Math.floor(Math.random() * 600), Math.floor(Math.random() * 600), 'blue');
                cgs.add(circle);
            } else if (e.keyCode === 98) {
                cgs.tint('black');
            } else if (e.keyCode === 119) {
                cgs.move("+=5px", "+=0px");
            } else if (e.keyCode === 113) {
                cgs.move("-=5px", "+=0px");
            }
        });

    });

})(window, jQuery);