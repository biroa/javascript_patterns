/**
 * Created by biroa on 12/01/2015.
 *
 * Adapter Design Pattern
 * Changing Interface Of an Object
 */

(function (win, $) {

    function clone(src, out) {
        for (var attr in src.prototype) {
            out.prototype[attr] = src.prototype[attr];
        }
    }

    function Circle() {
        this.item = $('<div class="circle"></div>');
    }

    Circle.prototype.color = function (clr) {
        this.item.css('background', clr);
    };
    Circle.prototype.move = function (left, top) {
        this.item.css('left', left);
        this.item.css('top', top);
    };
    Circle.prototype.get = function () {
        return this.item;
    };

    function Rect() {
        this.item = $('<div class="rect"></div>');
    }

    clone(Circle, Rect);

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

    function StageAdapter(id){
        this.index = 0;
        this.contex = $(id);
    }

    StageAdapter.prototype.sig = 'stageItem_';
    StageAdapter.prototype.add = function(item){
        ++this.index;
        item.addClass(this.sig + this.index);
        this.contex.append(item);
    };
    StageAdapter.prototype.remove = function(index){
        this.contex.remove('.' + this.sig + index);
    }


    var CircleGeneratorSingleton = (function () {
        var instance;

        function init() {
            var _aCircle = [],
                _stage,
                _sf = new ShapeFactory();

            function _position(circle, left, top) {
                circle.move(left, top);
            }

            function registerShapes(name,className){
                _sf.register(name, className);
                _sf.register(name, className);
            }

            function setStage(stg){
                _stage = stg;
            }

            function create(left, top, type) {
                var circle = _sf.create(type);
                circle.move(left, top);
                return circle;
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
                register:registerShapes,
                setStage:setStage
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
        cgs.register('green',GreenCircleBuilder);
        cgs.register('blue',BlueCircleBuilder);
        cgs.setStage(new StageAdapter('.advert'));
        $('.advert').click(function (e) {
            var circle = cgs.create(e.pageX - 25, e.pageY - 25, 'green');
            cgs.add(circle);
        });


        $(document).keypress(function (e) {
            if (e.keyCode == '97') { // 'a' is pressed
                var circle = cgs.create(Math.floor(Math.random() * 600), Math.floor(Math.random() * 600), 'blue');
                cgs.add(circle);
            }
        });

    });

})(window, jQuery);