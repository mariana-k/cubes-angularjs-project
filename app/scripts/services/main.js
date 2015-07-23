(function(){

'use strict';

/**
 * @ngdoc function
 * @name cubesApp.service:CreateCube
 * @description: initial cubes setup
 * Service of the cubesApp
 */
angular.module('cubesApp')
	.service('CreateCube', function() {
		// constructor
	    function CreateCube(scope) {
	        this._scope = scope;

	        this._createCube();
	    }

	    // reference the scope
		CreateCube.prototype._createCube = function() {
			var $cubeWrapper = $('.cube-wrapper'),
				$cubeDiv = $('.cube'),
				$faceDiv = $('.face'),
				$cubeOne = $('.cube .one'),
				$cubeTwo = $('.cube .two'),
				$cubeThree = $('.cube .three'),
				$cubeFour = $('.cube .four'),
				$cubeFive = $('.cube .five'),
				$cubeSix = $('.cube .six'),
				cubeWidth, 
				cubeHeight,
				cubeColor,
				cubeBorder;

			for (var key in this._scope.cubesList) {
				cubeWidth = this._scope.cubesList[key].cubewidth;
				cubeHeight = this._scope.cubesList[key].cubeheight;
				cubeColor = this._scope.cubesList[key].cubecolor;
				cubeBorder = this._scope.cubesList[key].cubeborder;
			}

			this._scope.cubeFactory($cubeWrapper, $cubeDiv, $faceDiv, $cubeOne, $cubeTwo, $cubeThree, $cubeFour, $cubeFive, $cubeSix, cubeWidth, cubeHeight, cubeColor, cubeBorder);

	    };

	    return CreateCube;		
});

/**
 * @ngdoc function
 * @name cubesApp.service:EditCube
 * @description: edit cube
 * Service of the cubesApp
 */
angular.module('cubesApp')
	.service('EditCube', function() {
		// constructor
	    function EditCube(scope) {
	        this._scope = scope;

	        this._editCube();
	    }

	    // reference the scope
		EditCube.prototype._editCube = function() {
			var cubeIdValue = $('.edit-cube-form .cubeid').val(),
				cubeWidthValue = $('.edit-cube-form .cubewidth').val(),
				cubeHeightValue = $('.edit-cube-form .cubeheight').val(),
				cubeColorValue = $('.edit-cube-form .cubecolor').val(),
				cubeBorderValue = $('.edit-cube-form .cubeborder').val(),
				$cubeWrapper,
				$cubeDiv,
				$faceDiv,
				$cubeOne,
				$cubeTwo,
				$cubeThree,
				$cubeFour,
				$cubeFive,
				$cubeSix,
				validColor = /^[A-Fa-f0-9 _]*[A-Fa-f0-9][A-Fa-f0-9 _]*$/;

			// validate and change values
			if (cubeIdValue && cubeWidthValue && cubeHeightValue && cubeColorValue && cubeBorderValue && cubeWidthValue <= 100 && cubeWidthValue >=10 && cubeHeightValue <= 100 && cubeHeightValue >=10) {			
				$cubeWrapper = $('.cube-wrapper.' + cubeIdValue);
				$cubeDiv = $cubeWrapper.find('.cube');
				$faceDiv = $cubeWrapper.find('.face');
				$cubeOne = $cubeWrapper.find('.cube .one');
				$cubeTwo = $cubeWrapper.find('.cube .two');
				$cubeThree = $cubeWrapper.find('.cube .three');
				$cubeFour = $cubeWrapper.find('.cube .four');
				$cubeFive = $cubeWrapper.find('.cube .five');
				$cubeSix = $cubeWrapper.find('.cube .six');

				if (validColor.test(cubeColorValue) && cubeColorValue.length === 6 && validColor.test(cubeBorderValue) && cubeBorderValue.length === 6) {
					this._scope.cubeFactory($cubeWrapper, $cubeDiv, $faceDiv, $cubeOne, $cubeTwo, $cubeThree, $cubeFour, $cubeFive, $cubeSix, cubeWidthValue, cubeHeightValue, cubeColorValue, cubeBorderValue);
				} else {
					alert('Invalid color value! Please, enter 6 characters from ranges A-F, a-f, 0-9.');
				}
			} else {
				alert('All fields are required. Width and Height should be between 10 and 100');
			}
	    };

	    return EditCube;		
});

/**
 * @ngdoc function
 * @name cubesApp.service:AddCube
 * @description: adds a cube to a cubes list
 * Service of the cubesApp
 */
angular.module('cubesApp')
	.service('AddCube', function() {
	
		// constructor
	    function AddCube(scope) {
	        this._scope = scope;

	        this._addCube();  
	    }

	    // reference the scope
		AddCube.prototype._addCube = function() {
			var existingId = [],
				cubeIdValue = $('.add-cube-form .cubeid').val(),
				cubeWidthValue = $('.add-cube-form .cubewidth').val(),
				cubeHeightValue = $('.add-cube-form .cubeheight').val(),
				cubeColorValue = $('.add-cube-form .cubecolor').val(),
				cubeBorderValue = $('.add-cube-form .cubeborder').val(),
				
				validColor = /^[A-Fa-f0-9 _]*[A-Fa-f0-9][A-Fa-f0-9 _]*$/,
				$lastGridDiv = $('.grid-div:last'),
				newCube = {
			        "cubeid": cubeIdValue,
			        "cubewidth": cubeWidthValue,
			        "cubeheight": cubeHeightValue,
			        "cubecolor": cubeColorValue,
			        "cubeborder": cubeBorderValue
		    };

		    // validate and add values
			if (this._scope.cubesList.length < 9 && cubeIdValue && cubeWidthValue && cubeHeightValue && cubeColorValue && cubeBorderValue && cubeWidthValue <= 100 && cubeWidthValue >=10 && cubeHeightValue <= 100 && cubeHeightValue >=10) {
				for (var key in this._scope.cubesList) {
					// add element to existingId array if a cube with this id is already on the list
			    	if (this._scope.cubesList[key].cubeid === cubeIdValue && existingId.length === 0) {
			    		existingId.push('This cube already exists');
			    		alert('A cube with this ID already exists!');
					}
				}

				if (existingId.length === 0) {
					if (validColor.test(cubeColorValue) && cubeColorValue.length === 6 && validColor.test(cubeBorderValue) && cubeBorderValue.length === 6) {
						// add a cube if an existingId array is empty
						this._scope.cubesList.push(newCube); 
						
						// remove a div so ther is always the same number of grid-divs
						$lastGridDiv.remove();
					} else {
						alert('Invalid color value! Please, enter 6 characters from ranges A-F, a-f, 0-9.');
					}
					
					// update the cubes list
					this._scope.watchCubesList(); 
				}

			} else if (this._scope.cubesList.length >= 9) {
				alert('Maximum number of cubes is 9!');
			} else {
				alert('All fields are required. Width and Height should be between 10 and 100');
			}
		};

	    return AddCube;
});

/**
 * @ngdoc function
 * @name cubesApp.service:HighlightCube
 * @description: highlights a corresponding cube when the list intems in left sidebar are clicked
 * Service of the cubesApp
 */
angular.module('cubesApp')
	.service('HighlightCube', function() {
		this.highlightCube = function(activecubeid) { 
			var $cubeWrapper = $('.cube-wrapper'),
				$editCubeId = $('.edit-cube-form .cubeid');

			$cubeWrapper.removeClass('highlighted');
			$('.' + activecubeid).addClass('highlighted');

	    	$editCubeId.val(activecubeid);
		};		
});

/**
 * @ngdoc function
 * @name cubesApp.service:InitDragAndDrop
 * @description: initializes drag and drop functionality
 * Service of the cubesApp
 */
angular.module('cubesApp')
	.service('InitDragAndDrop', function() { 
		this.initDragAndDrop = function() {
			var $cubeWrapper = $('.cube-wrapper'),
				cubeContainer = '.cubes-container',
				$gridDiv = $('.grid-div');

	    	$cubeWrapper.draggable({
				containment: cubeContainer, scroll: false
			});

			$gridDiv.droppable({
			    accept: '.cube-wrapper',
			    drop: function(event, ui) {
					var droppable = $(this);
					var draggable = ui.draggable;

					// Move draggable into droppable if it's empty
					if (droppable.find('.cube-wrapper').length === 0) {
						draggable.appendTo(droppable);
					} 

					draggable.css({top: '0px', left: '0px'});
			    }
			});
		};		
});

/**
 * @ngdoc function
 * @name cubesApp.service:LoadCubesData
 * @description: loads cubes data
 * Service of the cubesApp
 */
angular.module('cubesApp')
	.service('LoadCubesData', function($http) {
	
	// constructor
    function LoadCubesData(scope) {
        this._scope = scope;

        this._loadCubesData();
    }

    // reference the scope
	LoadCubesData.prototype._loadCubesData = function() {
		var self = this;
		
		// Load all cubes from external file
        $http.get('data/cubes.json').success(
			function(data) {
				self._scope.cubesList = data;

				// create a cubes list
				self._scope.watchCubesList();
			}
		);
    };

    return LoadCubesData;
});

/**
 * @ngdoc function
 * @name cubesApp.service:RemoveCube
 * @description: removes a cube form the list
 * Service of the cubesApp
 */
angular.module('cubesApp')
	.service('RemoveCube', function() {
	
	// constructor
    function RemoveCube(scope) {
        this._scope = scope;

        this._removeCube();
    }

    // reference the scope
	RemoveCube.prototype._removeCube = function() {
		var cubeIdValue = $('.remove-cube-form .cubeid').val();
		
		for (var key in this._scope.cubesList) {
		    if (this._scope.cubesList[key].cubeid === this._scope.cubeid) {
		    	// remove a cube from the list
		    	this._scope.cubesList.splice(key, 1);

		    	$('.cube-wrapper.' + this._scope.cubeid).remove();

		    	// append a div so ther is always the same number of grid-divs
				if (cubeIdValue) {
					$('<div/>', {
					    class: 'grid-div'
					}).appendTo('.cubes-container');
				}

		   		// update the cubes list
		    	this._scope.watchCubesList();
		    }
		}	
    };

    return RemoveCube;
});
})();
