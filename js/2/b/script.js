/**
 * Created by biroa on 12/25/2015.
 *
 * Factory design pattern
 *      more control customizing items(objects)
 *      separate the object creation from the object implementation
 *      easier to add more versions and update of the object
 */

(function(win, $){

    var GreenCircle = function(){
        this.item = $('<div class="circle"></div>');
    },

        BlueCircle = function(){
        this.item = $('<div class="circle" style="background: blue"></div>');
    },
        CirckeFactory = function () {
            this.create = function(color){
                if(color === 'blue'){
                    return new BlueCircle();
                }else{
                    return new GreenCircle();
                }
            }
        }
        

    var CircleGeneratorSingleton = (function(){
        var instance;

        function init(){
            var _aCircle = [],
                _stage = $('.advert'),
                _cf = new CirckeFactory();

            function _position(circle,left,top){
                circle.css('left',left);
                circle.css('top',top);
            }

            function create(left,top, color){
                var circle = _cf.create(color).item;
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