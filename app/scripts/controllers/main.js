(function(){

'use strict';

/**
 * @ngdoc function
 * @name cubesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cubesApp
 */
angular.module('cubesApp')
	.controller('MainCtrl', function ($scope, $http, InitDragAndDrop, LoadCubesData, CreateCube, EditCube, RemoveCube, AddCube, HighlightCube) {
    	var self = this;

    	// initial setup
	    $scope.cubesList = [];
	    $scope.filteredCubes = [];
  		$scope.currentPage = 1;
  		$scope.numPerPage = 10;
  		
  		$scope.LoadCubesData = new LoadCubesData($scope);

		// *********************************
	    // Internal methods
	    // *********************************

	    /**
	     * create cubes 
	     */
	    $scope.createNewCube = function() {
	    	$scope.CreateCube = new CreateCube($scope);
	    };

		setTimeout(function(){  
			$scope.createNewCube();
		}, 100);	   	

	    /**
	     * create or update cubes list if there are any changes
	     */
	    $scope.watchCubesList = function() {
	    	return $scope.$watch('currentPage + numPerPage', function() {
			    var begin = (($scope.currentPage - 1) * $scope.numPerPage), 
			    	end = begin + $scope.numPerPage;
			    
			    $scope.filteredCubes = $scope.cubesList.slice(begin, end);
			});
	    };

	    $scope.cubeFactory = function(cubeWrapper, cubeDiv, faceDiv, cubeOne, cubeTwo, cubeThree, cubeFour, cubeFive, cubeSix, cubeWidth, cubeHeight, cubeColor, cubeBorder) { 
			cubeWrapper.css({
				'-webkit-perspective': cubeWidth * 2 + 'px'
			});	

			cubeDiv.css({
				'width': cubeWidth + 'px',
				'height': cubeHeight + 'px'
			});

			faceDiv.css({
				'width': cubeWidth + 'px',
				'height': cubeHeight + 'px',
				'background': '#' + cubeColor,
				'border-color': '#' + cubeBorder
			});

			cubeOne.css({
				'-webkit-transform': 'rotateX(90deg) translateZ(' + cubeWidth / 2 + 'px)'
			});

			cubeTwo.css({
				'-webkit-transform': 'translateZ(' + cubeWidth / 2 + 'px)'
			});

			cubeThree.css({
				'-webkit-transform': 'rotateY(90deg) translateZ(' + cubeWidth / 2 + 'px)'
			});

			cubeFour.css({
				'-webkit-transform': 'rotateY(180deg) translateZ(' + cubeWidth / 2 + 'px)'
			});

			cubeFive.css({
				'-webkit-transform': 'rotateY(-90deg) translateZ(' + cubeWidth / 2 + 'px)'
			});

			cubeSix.css({
				'-webkit-transform': 'rotateX(-90deg) translateZ(' + cubeWidth / 2 + 'px) rotate(180deg)'
			});
		};

	    /**
	     * initialize drag and drop functionality
	     */
	     setTimeout(function(){  
	     	InitDragAndDrop.initDragAndDrop(); 
	     }, 100);

	    /**
	     * inittialize Highlight Cube functionality
	     */
	    $scope.initHighlightCube = function(activeid) {
	    	HighlightCube.highlightCube(activeid);
	    };
	    
		/**
	     * add a new cube to the list or alert a warning if the id already exists
	     */
		$scope.addCube = function() {
			$scope.cubeid = self.cubeid;
		    $scope.cubewidth = self.cubewidth;
		    $scope.cubeheight = self.cubeheight;
		    $scope.cubecolor = self.cubecolor;
	    	$scope.AddCube = new AddCube($scope);

	    	setTimeout(function(){ 
		     	InitDragAndDrop.initDragAndDrop(); 
		    }, 100);
	    };

	    /**
	     * style new cube 
	     */
	    $scope.styleNewCube = function() {
	    	var cubeIdValue = $('.add-cube-form .cubeid').val();
	    	if (cubeIdValue) {	    	
				var cubeWidthValue = $('.add-cube-form .cubewidth').val(),
					cubeHeightValue = $('.add-cube-form .cubeheight').val(),
					cubeColorValue = $('.add-cube-form .cubecolor').val(),
					cubeBorderValue = $('.add-cube-form .cubeborder').val(),
			    	$cubeWrapper = $('.cube-wrapper.' + cubeIdValue),
					$cubeDiv = $cubeWrapper.find('.cube'),
					$faceDiv = $cubeWrapper.find('.face'),
					$cubeOne = $cubeWrapper.find('.cube .one'),
					$cubeTwo = $cubeWrapper.find('.cube .two'),
					$cubeThree = $cubeWrapper.find('.cube .three'),
					$cubeFour = $cubeWrapper.find('.cube .four'),
					$cubeFive = $cubeWrapper.find('.cube .five'),
					$cubeSix = $cubeWrapper.find('.cube .six');
 
				this.cubeFactory($cubeWrapper, $cubeDiv, $faceDiv, $cubeOne, $cubeTwo, $cubeThree, $cubeFour, $cubeFive, $cubeSix, cubeWidthValue, cubeHeightValue, cubeColorValue, cubeBorderValue);
	    	}
	    };

	    /**
	     * edit cubes 
	     */
	    $scope.editExistingCube = function() {
	    	$scope.cubeid = self.cubeid;
	    	$scope.EditCube = new EditCube($scope);
	    };

	    /**
	     * remove a cube from the list
	     */
	    $scope.removeCube = function() {
	    	$scope.cubeid = self.cubeid;
	    	$scope.RemoveCube = new RemoveCube($scope);

	    	setTimeout(function(){ 
		     	InitDragAndDrop.initDragAndDrop(); 
		    }, 100);
	    };  
	});

})();