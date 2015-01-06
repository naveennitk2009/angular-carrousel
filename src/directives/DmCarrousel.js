appDirectives.directive('dmCarrousel', ['$compile', function($compile) {

  return {
    restrict: 'E',
    scope: {
	  data: '=imageData'
	},
    compile: function(tElement, tAttributes) {
    	
    	return function(scope, iElement, iAttributes, containerCtrl) {
    	
	    	var currentIndex = 0;
	    	var totalSlides = scope.data.length;
	    		    	
	    	var tpl = '<ul class="dm-car">';
	    	
	    	angular.forEach(scope.data,function(image,index) {
		    	tpl += '<li><div><img dm-src="'+image.path+'" alt="'+image.name+'" /></div></li>';
		    		
	    	})
	    	
	    	tpl += "</ul>";
	    	
	    	
	    	iElement.append($compile(angular.element(tpl))(scope));
	    	
	    	var nav = '<div class="dm-car-controls">' +
                '  <span class="dm-car-control dm-car-control-prev" ng-click="goToPrev()">&lsaquo;</span>' +
                '  <span class="dm-car-control dm-car-control-next" ng-click="goToNext()">&rsaquo;</span>' +
                '</div>';
                
            iElement.append($compile(angular.element(nav))(scope));
			
	    	console.log(iElement);
	    	
	    	var slides = iElement[0].querySelectorAll("li");
	    	var slides2 = angular.element(iElement[0].querySelectorAll("li"));
	    	angular.element(iElement[0].querySelector('.current'))
	    	
	    	console.log(slides.length);
	    	
	    	slides[0].className = "current";
	    	
	    	var currentImage = angular.element(slides[0]).find("img");
	    	loadImage(currentImage);
	    		    	
	    	slides[1].className = "next";
	    	
	    	var nextImage = angular.element(slides[1]).find("img");
	    	loadImage(nextImage);
	    				
    		scope.goToNext = function() {
	    		
	    		console.log("Go to next slide");
	    		if(currentIndex < totalSlides-1) {
		    		currentIndex ++;
					goToSlide(currentIndex);	
	    		}
	    		else {
		    		console.error('Already showing last');
	    		}
	    		
    		}
    		
    		scope.goToPrev = function() {
	    		
	    		console.log("Go to previous slide");
	    		if(currentIndex > 0) {
		    		currentIndex --;
					goToSlide(currentIndex);	
	    		}
	    		else {
		    		console.error('Already showing first');
	    		}
    		}
    		
    		function goToSlide(index) {
    			
    			console.log("Go to slide " + index);
    			
    			//TODO - find a better way to remove class names
    			angular.forEach(slides,function(slide,index){
	    				angular.element(slide).removeClass("current prev next");
    			})
    			
    			if(index < totalSlides && index >= 0) {
    				slides[index].className = "current";
    			}
    			else {
	    			console.error("Image index out of range");
    			}
    			
    			if(index < totalSlides-1) {
	    			slides[index+1].className = "next";
	    			var image = angular.element(slides[index+1]).find("img");
					loadImage(image);
    			}
    			
    			if(index > 0) {
	    			slides[index-1].className = "prev";	
	    			var image = angular.element(slides[index-1]).find("img");
					loadImage(image);
    			}
    			
    		}
    		
    		function loadImage(element) {
	    		
	    		if(element.attr('src') === undefined && element.attr("dm-src") != undefined) {
	    			console.log("Loading image");
			    	element.attr('src',element.attr("dm-src"));
		    	}
	    		
    		}
    		
    	}
    	
    }
  };
}]);