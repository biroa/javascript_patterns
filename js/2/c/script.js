/**
 * Created by biroa on 11/30/2015.
 *
 * Abstract Design Factory design pattern
 *      a more dynamic factory than Abstract Factory(ASF)
 *      add features extensions easily without modification of the factory
 *
 *      In js, there is no interfaces but there is the concept of ASF
 *          ASF is a factory where the creation process invisible to
 *          the factory what it is actually creating beyond the implementation of
 *          an interface.
 */

(function(win, $){

    function GreenCircle(){}
    GreenCircle.prototype.create = function(){
        this.item = $('<div class="circle"></div>');
        return this;
    };

    function BlueCircle(){}
    BlueCircle.prototype.create = function(){
        this.item = $('<div class="circle" style="background: blue"></div>');
        return this;
    };

        CircleFactory = function () {
            this.types = {};
            this.create = function(type){
                return new this.types[type]().create();
            };
            this.register = function(type,cls){
                if(cls.prototype.create){
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
                _cf.register('green',GreenCircle);
                _cf.register('blue',BlueCircle);


            function _position(circle,left,top){
                circle.css('left',left);
                circle.css('top',top);
            }

            function create(left,top, type){
                var circle = _cf.create(type).item;
                _position(circle, left, top);
                return circle;
            }

            function add(circle){
                _stage.append(circle);
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