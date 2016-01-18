
//Слайдер
var uiSlider = (function(){
	var init = function(){
		_setUpListners();
	};
			
	var _setUpListners = function(){
		$("#slider").slider({
	    		min: 5000,
	    		max: 15000,
	    		values: [5000,15000],
	    		range: true,
	    		stop: function(event, ui) {
	    	    $("input#minCost").val($("#slider").slider("values",0));
	    	    $("input#maxCost").val($("#slider").slider("values",1));
	    	},
	    	slide: function(event, ui){
	    	    $("input#minCost").val($("#slider").slider("values",0));
	    	    $("input#maxCost").val($("#slider").slider("values",1));
	    	}
		});

		$("input#minCost").change(function(){
			var value1=$("input#minCost").val();
			var value2=$("input#maxCost").val();

	    	if(parseInt(value1) > parseInt(value2)){
				value1 = value2;
				$("input#minCost").val(value1);
			}
			$("#slider").slider("values",0,value1);	
		});

		
		$("input#maxCost").change(function(){	
			var value1= $("input#minCost").val();
			var value2= $("input#maxCost").val();
		
			if (value2 > 15000) { value2 = 15000; $("input#maxCost").val(15000)}

			if(parseInt(value1) > parseInt(value2)){
				value2 = value1;
				$("input#maxCost").val(value2);
			}
			$("#slider").slider("values",1,value2);
		});	
	};

	return {
			init: init
	}
})();



//Кнопка сброса чекбоксов

var resetFilter = (function(){
	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){	
		var $reset = $('.reset-filter');
			$reset.on('click', function(e){
				e.preventDefault();

				$(this).parent()
					   .find('.checkbox:checked')
					   .removeAttr('checked');
			});		 
		};

	return {
			init: init
	}
})();



//аккордеон

var accordeon = (function(){
	var init = function(){
		_setUpListners();
	};
			
	var _setUpListners = function(){	
		$('.accordeon__trigger').on('click', function(e){
			e.preventDefault();

			var $this = $(this),
				item = $this.closest('.accordeon__item'),
				list = $this.closest('.accordeon__list'),
				items = list.find('.accordeon__item'),
				content = item.find('.accordeon__inner'),
				otherContent = list.find('.accordeon__inner'),
				duration = 400;

			$this.toggleClass("accordeon__trigger-pressed")
			     .toggleClass('accordeon__trigger_after');

			if ( item.hasClass('.accordeon__item-active')){
				content.stop(true, true).slideUp(duration);
				item.stop(true, true).removeClass('.accordeon__item-active');
				content.stop(true, true).slideDown(duration);
			} 
			else {
				content.stop(true, true).slideUp(duration);
				item.stop(true, true).addClass('.accordeon__item-active');
			}
		});		
	};

	return {
			init: init
	}
})();

// Вид каталога товаров
var productViews = (function(){
	var init = function(){
		_setUpListners();
	};
			
	var _setUpListners = function(){	

		var $list = $('#list'),
			$grid = $('#grid'),
			$line = $('#line'),
			$viewsList = $('#views_list'),
			productsList = $('#products_view');

		$list.on('click', function(e){
			e.preventDefault();
			$(this).find('.views__button_container').addClass('list-active');
			$viewsList.find('div.line-active').removeClass('line-active');
			$viewsList.find('div.grid-active').removeClass('grid-active');
			productsList.removeClass('products__list_grids');
			productsList.removeClass('products__list_lines');
		});

		$grid.on('click', function(e){
			e.preventDefault();
			$(this).find('.views__button_container').addClass('grid-active');
			$viewsList.find('div.line-active').removeClass('line-active');
			$viewsList.find('div.list-active').removeClass('list-active');
			productsList.removeClass('products__list_lines');
			productsList.addClass('products__list_grids');
		});

		$line.on('click', function(e){
			e.preventDefault();
			$(this).find('.views__button_container').addClass('line-active');
			$viewsList.find('div.list-active').removeClass('list-active');
			$viewsList.find('div.grid-active').removeClass('grid-active');
			productsList.removeClass('products__list_grids');
			productsList.addClass('products__list_lines');
		});

	};

	return {
			init: init
	}
})();




// Переключение изображений товара
var slideShow = (function(){
	var init = function(){
		_setUpListners();
	};
			
	var _setUpListners = function(){	
		$('.products__slideshow-link').on('click', function(e){
			e.preventDefault();

			var $this = $(this),
				item = $this.closest('.products__slideshow-item'),
				container = $this.closest('.products__slideshow'),
				display = container.find('.products__slideshow-display'),
				path = item.find('img').attr('src'),
				duration = 300;

			display.find('img').fadeOut(duration, function() {
				$(this).attr('src', path).fadeIn(duration);
			});
		});
	};

	return {
			init: init
	}
})();


//выпадающий список
$('select').select2();


//блок инициализации елементов интерфейса
uiSlider.init();
resetFilter.init();
accordeon.init();
productViews.init();
slideShow.init();