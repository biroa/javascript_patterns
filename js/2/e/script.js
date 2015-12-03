/**
 * Created by biroa on 12/01/2015.
 *
 * Builder Design pattern extending ...
 *
 *  Similar to the Factory but it does lot more than one thing
 *
 *
 */

(function(win, $){

    function Circle(){
        this.item = $('<div class="circle"></div>');
    }
    Circle.prototype.color = function(clr){
        this.item.css('background',clr);
    };
    Circle.prototype.move = function(left,top){
        this.item.css('left',left);
        this.item.css('top',top);
    };
    Circle.prototype.get = function(){
        return this.item;
    };


    function GreenCircleBuilder(){
        this.item = new Circle();
        this.init();
    }
    GreenCircleBuilder.prototype.init = function(){
        //NOTHING
    };
    GreenCircleBuilder.prototype.get = function(){
        return this.item;
    };

    function BlueCircleBuilder(){
        this.item = new Circle();
        this.init();
    }
    BlueCircleBuilder.prototype.init = function(){
        this.item.color('blue');
        return this;
    };
    BlueCircleBuilder.prototype.get = function(){
        return this.item;
    };


        CircleFactory = function () {
            this.types = {};
            this.create = function(type){
                return new this.types[type]().get();
            };
            this.register = function(type,cls){
                if(cls.prototype.init && cls.prototype.get){
                    this.types[type] = cls;
                }
            }
        };
        

    var CircleGeneratorSingleton = (function(){
        var instance;

        function init(){
            var _aCircle = [],
                _stage = $('.advert'),
                _cf = new CircleFactory();
                _cf.register('green',GreenCircleBuilder);
                _cf.register('blue',BlueCircleBuilder);


            function _position(circle,left,top){
                circle.move(left,top);
            }

            function create(left,top, type){
                var circle = _cf.create(type);
                circle.move(left,top);
                return circle;
            }

            function add(circle){
                _stage.append(circle.get());
                _aCircle.push(circle);
            }

            function index(){
                return _aCircle.length;
            }

            return {//expose public functions
                index:index,
                create:create,
                add:add
            };
        }

        return{
            getInstance:function(){
                if(!instance){
                    instance =  init();
                }

                return instance;
            }
        }
    })();

    $(win.document).ready(function(){
        $('.advert').click(function(e){
            var cgs = CircleGeneratorSingleton.getInstance();
            var circle = cgs.create(e.pageX-25,e.pageY-25,'green');
            cgs.add(circle);
        });


        $(document).keypress(function(e){
            if(e.keyCode == '97'){ // 'a' is pressed
                var cgs = CircleGeneratorSingleton.getInstance();
                var circle = cgs.create(Math.floor(Math.random()*600),Math.floor(Math.random()*600), 'blue');
                cgs.add(circle);
            }
        });

    });

})(window, jQuery);