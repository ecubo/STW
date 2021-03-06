// INICIO APLICACION
function initApp() {
	// Eventos FastClick para aceleración Click en dispositivos móviles
    FastClick.attach(document.body);

    // Atributo para reconocer iOS/Android
	if(navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') {
		soperativo = 'ios';
	    $('body').attr('data-so', 'ios');
	}
	else {
		soperativo = 'android';
	    $('body').attr('data-so', 'android');

	    document.addEventListener('backbutton', function(e){
	    	e.preventDefault();
	    }, true);

	    $('#fromCurrencyNumber').bind('keypress', function (e) {
	    	if (e.keyCode == 13 ) {
		    	e.preventDefault();
		    	$('#fromCurrencyNumber').trigger('change');
	    	}
		});
	}

	// Evento ir a categorías
	$('a#enter').on('click', function(e) {
		scrollDisable = false;
		e.preventDefault();

		fadeInMain();
		$('#iconMenu').fadeIn(300);

		return false;
	});


	$('select').on('click', function(e) {
		e.preventDefault();
		$(this).trigger('touchstart');
	});


	/* EVENTOS MENU
	***************************************************************/
	// Abrir menú
	$('header').on('click','#iconMenu:not(.edit)', function(e){
		e.preventDefault();
		$('header').toggleClass('active');
	});

	$('header').on('click','#iconMenu.edit', function(e){
		e.preventDefault();

		$('#removeFavorite').removeClass('edit');

		$(this).removeClass('edit');
		$('#iconMenu').attr('src','img/iconMenu.svg');
		$('#iconMore').removeClass('active');
		$('#iconMore').attr('src','img/iconMore.svg');
		$('#favoritesEvent').fadeOut(300);
		$('.listFavorites').fadeIn(300);
		$('#favoritePicture').css({'background-image':''});
		$('#inputFavorite').val('');
	});

	// Ocultar Menú
	function fadeOutMain() {
		$('#iconMore').fadeOut(300);
		$('header').removeClass('active');
		$('#main, header h2, header #iconMenu').removeClass('active');
	};

	// Mostrar Menú
	function fadeInMain() {
		$('#main, header h2, header #iconMenu').addClass('active');
		$('a#enter').css({opacity:0});
	};


	/* EVENTOS CATEGORIAS
	***************************************************************/
	// Abrir categoría
	$('#menu').on('click', '#categories:not(.active)', function(e){
		e.preventDefault();
		fadeOutMain();
		$('#iconMore').removeClass();

	    document.addEventListener('backbutton', function(e){
	    	e.preventDefault();
	    	e.stopPropagation();
	    }, true);

		setTimeout(function() {
			$('#main').removeClass();
			$('#main').addClass('categories');
			$('#main').html(htmlCategories);
			$('#iconMore').removeClass('edit');
			if (idioma == "es") {
				$('h2').text('Categorías');
			}
			else {
				$('h2').text('Choose Category');
			}
			$('header #menu ul li').removeClass('active');
			$('#categories').addClass('active');
			$('#main.categories').css({'background-image':'url(img/catalogo.png)'});
			fadeInMain();
		}, 500);
	});

	// Seleccionar categoría
	$('#main').on('click', '.btnCategory', function(e) {
		e.preventDefault();

	    document.addEventListener('backbutton', function(e){
	    	e.preventDefault();
	    	e.stopPropagation();
	    	$('#iconMore.back').trigger('click');
	    }, true);

		currentCat = $(this);
		var bk =  'url(img/catalogo'+$(this).attr('id')+'.png)';
		var bk2 = bk+', url(img/estante'+$(this).attr('id')+'.png)';

        TweenMax.to('#contenedor', 1, {
        	marginLeft: "-100%",
            ease: Back.easeIn.config(1.4),
        });
        if ($('body').data('so') == 'ios') {
	        TweenMax.to('#bkImage', 1, {
	        	backgroundImage: bk,
	        	opacity: 1
	        });
	        TweenMax.to('#contentSubcategoryList', 1, {
	        	backgroundImage: bk2,
	        });
        }
        else {
	        TweenMax.set('#bkImage', {
	        	backgroundImage: bk,
	        	opacity: 1
	        });
	        TweenMax.set('#contentSubcategoryList', {
	        	backgroundImage: bk2,
	        });
        }
		$('#contenedor').addClass('active');

		$('header').removeClass('active');
		var _this = $(this);

		var currentCategory = $(this).attr('id');
		currentTitle = $(this).attr('data-category');
		var srcCurrent = $(this).find('img').attr('src');
		$('.dummy').css('background-image','url('+srcCurrent+')');

		$('h2').fadeOut(300, function() {
			$('h2').text(currentTitle);
			$('h2').fadeIn(300);
		});

		$('#categoriesList, #subcategories').addClass('active');
		$('#iconMore').attr('src','img/iconBack2.png');
		$('#iconMore').fadeIn(300).addClass('back');

		var subCat = new Array();
		var prodCat = new Array();

		$.each( listaProductos.subcategorias, function(i, tipe) {
			if ( tipe.id_categoria == _this.data('array') ) {
				if (idioma == 'es') {
					subCat.push({nombre:tipe.nombre, id:tipe.id});
				}
				else {
					subCat.push({nombre:tipe.nombre_eng, id:tipe.id});
				}
			}
		});

		borderColor = _this.data('color');
		$('#selectProducts').css({'background-image': 'url(img/category/arrows'+_this.data('array')+'.png)', 'border-color': borderColor});

		var subcatList = '';
		var htmlOption = '<option value="'+subCat[0].id+'" selected="">'+capitalize(subCat[0].nombre)+'</option>'

		for (i = 0; i<subCat.length; i++) {
			subcatList += '<div role="button" class="btnSubCategory" data-subcategory="'+subCat[i].id+'" data-category="'+capitalize(subCat[i].nombre)+'"><img class="nonactive" src="img/subcategory/'+subCat[i].id+'.png" alt=""></div>';
			htmlOption += '<option value="'+subCat[i].id+'">'+capitalize(subCat[i].nombre)+'</option>'
		}

		$('#selectSubcategories').html(htmlOption);
		$('#contentSubcategoryList').html(subcatList);

		colorBefore = '';
		switch(currentCategory) {
			case 'restaurant':
			colorBefore = '#00baff';
			break
			case 'toys':
			colorBefore = '#ed686e';
			break
			case 'electronic':
			colorBefore = '#ff9e01';
			break
			case 'clothes':
			colorBefore = '#9c59b5';
			break
			case 'sports':
			colorBefore = '#edc211';
			break
			case 'travel':
			colorBefore = '#465766';
			break
			case 'baby':
			colorBefore = '#00d8c7';
			break
			case 'drugstore':
			colorBefore = '#00699a';
			break
			case 'food':
			colorBefore = '#b4b831';
			break
		};

		$('.btnSubCategory').attr('data-colorbefore', '#ffffff');
		$('.btnSubCategory').css('color', '#ffffff');
		$('.btnSubCategory.active').attr('data-colorbefore', colorBefore);

		$(".btnSubCategory.active").css('color', function () {
		    return $(this).data('colorbefore');
		});

		$('#selectSubcategories').trigger('change');
	});


	$('#main').on('click', '.btnSubCategory:not(.active)', function(e) {
		e.preventDefault();


	    document.addEventListener('backbutton', function(e){
	    	e.preventDefault();
	    	e.stopPropagation();
	    	$('#iconMore.back4').trigger('click');
	    }, true);

		$('#iconMore').removeClass('back');
		$('#iconMore').addClass('back4');

		var currenSubCar = $(this).attr('data-subcategory');
		$('#selectSubcategories').val(currenSubCar);
		$('#selectSubcategories').trigger('change');

		currentTitle = $(this).attr('data-category');

		$('h2').fadeOut(300, function() {
			$('h2').text(currentTitle);
			$('h2').fadeIn(300);
		});

		$('.btnSubCategory').attr('data-colorbefore', '#ffffff');
		$('.btnSubCategory').css('color', '#ffffff');
		$('.btnSubCategory.active').attr('data-colorbefore', colorBefore);


		$(".btnSubCategory.active").css('color', function () {
		    return $(this).data('colorbefore');
		});

		var currentSC = $(this).data('subcategory');
		$("#selectSubcategories").val(currentSC);
        TweenMax.to('#contentSubcategoryList .btnSubCategory', 1, {
        	opacity: 0
        });

		var value = $('#selectSubcategories').val();


		var prodCat = new Array();
		$.each( listaProductos.productos, function(i, tipe) {
			if ( tipe.id_subcategoria == value ) {
				if (idioma == 'es') {
					prodCat.push({id:tipe.id, tamano:tipe.tamano, color:tipe.color, nombre:tipe.nombre_producto});
				}
				else {
					prodCat.push({id:tipe.id, tamano:tipe.tamano, color:tipe.color, nombre:tipe.nombre_producto_eng});
				}
			}
		});

		var productList = '';
		var heightPicture = $('.btnSubCategory').width();

		for (i=0; i<prodCat.length;i++) {
			productList += '<div style="background-color:'+borderColor+';height:'+heightPicture+'px" role="button" class="btnSubCategory active" data-product="'+prodCat[i].id+'" data-category="'+prodCat[i].nombre+'" data-colorbefore="#ffffff" style="color: rgb(255, 255, 255);"><embed class="embedProducto" src="img/products/'+prodCat[i].id+'.svg" type="image/svg+xml" width="280" height="280" ><div class="mask"></div></div>';
		}

		setTimeout(function() {
			$('#contentSubcategoryList').html(productList);
			$('.btnSubCategory').addClass('producto');
		}, 1000);

        TweenMax.to('#contentSubcategoryList .btnSubCategory', 1, {
        	opacity: 1,
        	delay: 1.2
        });
	});

	$('#main').on('click','.btnSubCategory.producto', function(e) {
		e.preventDefault();
		$('#iconMore').removeClass('back4');

	    document.addEventListener('backbutton', function(e){
	    	e.preventDefault();
	    	e.stopPropagation();
	    	$('#iconMore.back2').trigger('click');
	    }, true);

		var currentProduct = $(this).attr('data-product');

		$('#selectProducts').val(currentProduct);
		$('#selectProducts').trigger('change');
	});

	$('#main').on('change', '#selectSubcategories', function(e) {
		e.preventDefault();
		var value = $(this).val();

		var prodCat = new Array();
		$.each( listaProductos.productos, function(i, tipe) {
			if ( tipe.id_subcategoria == value ) {
				if (idioma == 'es') {
					prodCat.push({id:tipe.id, tamano:tipe.tamano, color:tipe.color, nombre:tipe.nombre_producto});
				}
				else {
					prodCat.push({id:tipe.id, tamano:tipe.tamano, color:tipe.color, nombre:tipe.nombre_producto_eng});
				}
			}
		});
		if (idioma == 'es') {
			var htmlOption = '<option value="seleccionar" selected="" disabled>Seleccionar Producto</option>'
		}
		else {
			var htmlOption = '<option value="seleccionar" selected="" disabled>Select Product</option>'
		}
		for (i = 0; i<prodCat.length; i++) {
			htmlOption += '<option value="'+prodCat[i].id+'" data-color="'+prodCat[i].color+'" data-size="'+prodCat[i].tamano+'">'+capitalize(prodCat[i].nombre)+'</option>'
		}
		$('#selectProducts').html(htmlOption);
	});


	$('#main').on('change', '#selectProducts', function(e) {
		e.preventDefault();

        TweenMax.to('#contenedor', 1, {
        	marginLeft: "-200%",
            ease: Back.easeIn.config(1.4),
        });
        if ($('body').data('so') == 'ios') {
	        TweenMax.to('#bkImage, #contentSubcategoryList', 1, {
	//        	backgroundImage: bk,
	        	opacity: 0
	        });
        }
        else {
	        TweenMax.set('#bkImage, #contentSubcategoryList', {
	        	opacity: 0
	        });
        }
		$('#contenedor').addClass('active2');

		var color = $(this).find('option:selected').attr('data-color');
		var size = $(this).find('option:selected').attr('data-size');
		if (size != "0") {
			size = size.split(",");
		}
		var idVal = $(this).find('option:selected').val();

		$('h2').fadeOut(300, function() {
			$('h2').text($('#selectProducts').find('option:selected').text());
			$('h2').fadeIn(300);
		});

		$('#iconMore').removeClass('back back3').addClass('back2');

		$('#main.categories').addClass('product');
		$('#product').addClass('active');

//		alert(idVal);

		var htmlProduct = '<embed id="embed" src="img/products/'+idVal+'.svg" type="image/svg+xml" width="200" height="200" ><div id="cover"></div>';

		if (color != "0") {
			htmlProduct += listaColores;
		}
		else {
			htmlProduct += '<select style="visibility:hidden;"></select>';
		}
		if (size != "0") {
			htmlProduct += '<select id="optTalla">';
			for (var i=0; i<size.length; i++) {
				var talla = size[i];

				switch(talla) {
					case 'XS':
					talla = 'X-Small (XS)';
					break
					case 'S':
					talla = 'Small (S)';
					break
					case 'M':
					talla = 'Medium (M)';
					break
					case 'L':
					talla = 'Large (L)';
					break
					case 'XL':
					talla = 'X-Large (XL)';
					break
					case 'XXL':
					talla = 'XX-Large (XXL)';
					break
				};

				htmlProduct += '<option value="'+size[i]+'">'+talla+'</option>'
			}
			htmlProduct += '</select>';
		}
		else {
			htmlProduct += '<select style="visibility:hidden;"></select>';
		}
		htmlProduct += done;
		htmlProduct += textSize;
		$('#product').html(htmlProduct);
		$('#optTalla').trigger('change');

		$('#embed').removeClass('active');

		setTimeout(function() {
			//changeColor('#ffffff');
			$('#embed').addClass('active');
		}, 1000);

	});

	$('#main').on('change', '#color', function(e) {
		e.preventDefault();
		var newColor = $(this).find('option:selected').val();
		changeColor(newColor);
	});


	$('#main').bind('change', '#optTalla', function(e) {
		e.preventDefault();
		var mitxt = $('#optTalla').find('option:selected').text();
		$('#texSize').text(mitxt);
	});

	$('#main').on('click','#doneProduct', function(e) {
		e.preventDefault();

		$('#add2Favorite').show();

	    document.addEventListener('backbutton', function(e){
	    	e.preventDefault();
	    	e.stopPropagation();
	    	$('#iconMore.back3').trigger('click');
	    }, true);

		$('#main').addClass('show');
		$('#iconMore').removeClass('back back2 back3');
		$('#iconMore').addClass('back3');
		$('#texSize, #add2Favorite').addClass('active');
	})

	// Volver a Categorías
	$('header').on('click', '#iconMore.back', function(e){
		e.preventDefault();
		$('header').removeClass('active');

		$('#categoriesList, #subcategories').removeClass('active');
		$('#main.categories').css({'background-image':'url(img/catalogo.png)'});

        TweenMax.to('#contenedor', 1, {
        	marginLeft: "0",
            ease: Back.easeIn.config(1.4),
        });
        if ($('body').data('so') == 'ios') {
	        TweenMax.to('#bkImage', 1, {
	        	opacity: 0
	        });
	        TweenMax.to('#contentSubcategoryList', 1, {
	        	backgroundImage: '',
	        });
        }
        else {
	        TweenMax.set('#bkImage', {
	        	opacity: 0
	        });
	        TweenMax.set('#contentSubcategoryList', {
	        	backgroundImage: '',
	        });
        }
		$('#contenedor').removeClass('active');


		$('#iconMore').fadeOut(300).removeClass('back back2 back3');
		$('h2').fadeOut(300, function() {
			if (idioma == "es") {
				$('h2').text('Categorías');
			}
			else {
				$('h2').text('Choose Category');
			}
			$('h2').fadeIn(300);
		});
	});

	// Volver a Subcaregorias
	$('header').on('click', '#iconMore.back2', function(e){
		e.preventDefault();

        TweenMax.to('#contenedor', 1, {
        	marginLeft: "-100%",
            ease: Back.easeIn.config(1.4),
        });
        if ($('body').data('so') == 'ios') {
	        TweenMax.to('#bkImage, #contentSubcategoryList', 1, {
	        	opacity: 1
	        });
        }
        else {
	        TweenMax.set('#bkImage, #contentSubcategoryList', {
	        	opacity: 1
	        });
        }
		$('#contenedor').removeClass('active2');

		$('h2').fadeOut(300, function() {
			$('h2').text(currentTitle);
			$('h2').fadeIn(300);
		});

		$('header').removeClass('active');

		$('#iconMore').removeClass('back2 back3').addClass('back4');

        setTimeout(function(){
			$('#main.categories').removeClass('product');
        },1000);
		$('#product').removeClass('active');

	});

	// Volver a Configurador Producto
	$('header').on('click', '#iconMore.back3', function(e){
		e.preventDefault();

		$('header').removeClass('active');
		$('#main').removeClass('show');
		$('#iconMore').addClass('back2');
		$('#iconMore').removeClass('back3');
		$('#texSize, #add2Favorite').removeClass('active');

	});

	// Volver a Subcategorias
	$('header').on('click', '#iconMore.back4', function(e){
		e.preventDefault();

		$('#subcategoryList').animate({scrollTop:0}, 200, 'linear', function() {
			$('header').removeClass('active');
			$('#main').removeClass('show');

			$('#iconMore').addClass('back');
			$('#iconMore').removeClass('back4');

	        TweenMax.to('#contentSubcategoryList .btnSubCategory', 1, {
	        	opacity: 0
	        });

	        setTimeout(function() {
	        	currentCat.trigger('click');
		        // $('#subcategoryList').html(currentSubcategoria);
	        }, 1000);

	        TweenMax.to('#contentSubcategoryList .btnSubCategory', 1, {
	        	opacity: 1,
	        	delay: 1.2
	        });
		});
	});

	// Añadir Producto a Favoritos
	$('#main').on('click', '#add2Favorite', function(e) {
		e.preventDefault();
		$(this).fadeOut();

		var imgNewFav = $('#embed').attr('src');
		var txtNewFav = $('h2').text()+' '+$('#texSize').text();
		var newColor = $('#color').val();

		if (!$('#color').val()) {
			newColor = '#ffffff';
		}

		var allFavoritos = localStorage.getItem('misFavoritos');
		var mainFavoritos = htmlFavorites;
		numFav ++;
		var newFav = '';

		newFav += '<li class="miProductos" data-number="'+numFav+'"><div class="img" data-color="'+newColor+'" style="background-image:url('+imgNewFav+')"></div><p>'+txtNewFav+'</p></li>';

		$('#dummy').html(allFavoritos);
		$('#dummy').append(newFav);
		var misFavActualizado = $('#dummy').html();
		localStorage.setItem('misFavoritos', misFavActualizado);
		var nuevoListadoFavorito = misFavActualizado;

		$('#dummy').html(mainFavoritos);
		$('#dummy .listFavorites ul').html(nuevoListadoFavorito);
		htmlFavorites = $('#dummy').html();
		$('#favorites').trigger('click');
	});

	/* EVENTOS FAVORITOS
	***************************************************************/
	// Abrir favoritos
	$('#menu').on('click', '#favorites:not(.active)', function(e){
		e.preventDefault();
		fadeOutMain();
		$('#iconMore').removeClass();

	    document.addEventListener('backbutton', function(e){
	    	e.preventDefault();
	    	e.stopPropagation();
	    }, true);

		setTimeout(function() {
			$('#iconMore').attr('src','img/iconMore.svg');
			setTimeout(function() {
				$('#iconMore').fadeIn(300);
			}, 100);
			$('#main').removeClass();
			$('#main').addClass('favorites');
			$('#main').html(htmlFavorites);
			$('#favoritesEvent').hide();
			$('.listFavorites').show();
			$('#iconMore').removeClass('active back back2 back3');

			if (idioma == "es") {
				$('h2').text('Galería Personal');
			}
			else {
				$('h2').text('Personal Gallery');
			}

			$('header #menu ul li').removeClass('active');
			$('#favorites').addClass('active');
			fadeInMain();
		}, 500);
	});

	// Añadir Favorito
	$('header').on('click', '#iconMore:not(.active, .back, .back2, .back3, .back4)', function(e){
		e.preventDefault();

	    document.addEventListener('backbutton', function(e){
	    	e.preventDefault();
	    	e.stopPropagation();
	    	$('#removeFavorite').trigger('click');
	    }, true);

		$('#takeCamera, #takeLibrary').show();

		$('#main.favorites nav #embedFavorite, #main.favorites nav #coverEmbed').css({'display':'none'});
		$('#favoritePicture').show();

		$('header').removeClass('active');
		$(this).attr('src','img/iconSave.svg');
		$('#removeFavorite').attr('src','img/iconBack.png');
		$(this).addClass('active');

		$('#favoritesEvent').fadeIn(300);
		$('.listFavorites').fadeOut(300);
	});

	// Añadir favorito al listado
	$('header').on('click', '#iconMore.active', function(e){
		e.preventDefault();
		$('header').removeClass('active');

		if (!$('#removeFavorite').hasClass('edit') && $('#favoritePicture').css('background-image') != 'none') {
			$(this).attr('src','img/iconMore.svg');

			var imgFav = $('#favoritePicture').css('background-image');
			var textFav = $('#inputFavorite').val();
			numFav ++;

			var newFav = '';

			newFav += '<li data-number="'+numFav+'"><div class="img" style="background-image:'+imgFav+'"></div><p>'+textFav+'</p></li>';
			$('.listFavorites ul').append(newFav);

			var stringFav = $('.listFavorites ul').html();
			localStorage.setItem('misFavoritos', stringFav);

			$('#favoritePicture').css('background-image','');
			$('#inputFavorite').val('');

			$(this).removeClass('active');
			htmlFavorites = $('.favorites').html();

			$('#iconMenu').removeClass('edit');
			$('#iconMenu').attr('src','img/iconMenu.svg');

			$('#favoritesEvent').fadeOut(300);
			$('.listFavorites').fadeIn(300);
			$('#favoritePicture').attr('src','');
		}
		else if ( $('#favoritePicture').css('background-image') == 'none' ) {
		    navigator.notification.confirm(
		        messageFavoritos, // message
		        function(){},            // callback to invoke with index of button pressed
		        noFavoritos,           // title
		        ['OK']     // buttonLabels
		    );
		}
		else {
			$(this).attr('src','img/iconMore.svg');
			$('#removeFavorite').removeClass('edit')
			var imgFav = $('#favoritePicture').css('background-image');
			var textFav = $('#inputFavorite').val();

			$('#favoritePicture').css('background-image','');
			$('#inputFavorite').val('');

			$('.listFavorites li[data-number="'+favoritoActual+'"] div').css({'background-image':''+imgFav+''});
			$('.listFavorites li[data-number="'+favoritoActual+'"] p').text(textFav);

			$(this).removeClass('active');
			htmlFavorites = $('.favorites').html();

			var stringFav = $('.listFavorites ul').html();
			localStorage.setItem('misFavoritos', stringFav);

			$('#iconMenu').removeClass('edit');
			$('#iconMenu').attr('src','img/iconMenu.svg');

			$('#favoritesEvent').fadeOut(300);
			$('.listFavorites').fadeIn(300);
			$('#favoritePicture').css('background-image','');
		}

	});

	// Tomar foto de la librería
	$('#main').on('click','#takeLibrary', function(e){
		e.preventDefault();
		$('header').removeClass('active');
	    var options = {
	        quality : 15,
	        destinationType : Camera.DestinationType.FILE_URI,
	        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
	        allowEdit : true,
	        encodingType: 0,
	        // encodingType: Camera.EncodingType.JPEG,
	        targetWidth: 780,
			targetHeight: 780,
	        saveToPhotoAlbum: false,
	        correctOrientation: true
	    };
	    // Capturamos imagen
	    navigator.camera.getPicture(cameraSuccess2, cameraFail, options);
	});

	// Acceder a la cámara
	$('#main').on('click', '#takeCamera', function(e) {
		e.preventDefault();
		$('header').removeClass('active');
	    var options = {
	        quality : 15,
			destinationType : Camera.DestinationType.DATA_URL,
	        // destinationType : Camera.DestinationType.FILE_URI,
	        sourceType : Camera.PictureSourceType.CAMERA,
	        allowEdit : true,
	        encodingType: 0,
	        // encodingType: Camera.EncodingType.JPEG,
	        targetWidth: 780,
			targetHeight: 780,
	        saveToPhotoAlbum: false,
	        correctOrientation: true
	    };
	    // Capturamos imagen
	    navigator.camera.getPicture(cameraSuccess, cameraFail, options);
	});

	// Cancelar Añadir Favorito
	$('#main').on('click', '#removeFavorite:not(.edit)', function(e){
		e.preventDefault();
		$('header').removeClass('active');
		$('#iconMore').attr('src','img/iconMore.svg');
		$('#iconMore').removeClass('active');
		$('#favoritePicture').css('background-image','');
		$('#inputFavorite').val('');

		$('#favoritesEvent').fadeOut(300);
		$('.listFavorites').fadeIn(300);
	});

	// Eliminar favorito editado de la lista
	$('#main').on('click', '#removeFavorite.edit', function(e){
		e.preventDefault();
		$('header').removeClass('active');
		$('#iconMore').removeClass('active');
		$('#iconMore').attr('src','img/iconMore.svg');
		$(this).removeClass('edit');
		$('#favoritePicture').css('background-image','');
		$('#inputFavorite').val('');

		$('.listFavorites li[data-number="'+favoritoActual+'"]').remove();
		htmlFavorites = $('.favorites').html();

		var stringFav = $('.listFavorites ul').html();
		localStorage.setItem('misFavoritos', stringFav);

		$('#main.favorites nav #embedFavorite, #main.favorites nav #coverEmbed').css({'display':'none'});
		$('#favoritePicture').show();

		$('#iconMenu').removeClass('edit');
		$('#iconMenu').attr('src','img/iconMenu.svg');

		$('#favoritesEvent').fadeOut(300);
		$('.listFavorites').fadeIn(300);
	});

	// Editar favorito
	$('#main').on('click', '.listFavorites ul li', function(e) {
		e.preventDefault();
		$('header').removeClass('active')
		$('#iconMenu').addClass('edit');
		$('#iconMenu').attr('src','img/iconBack2.png');
		$('#removeFavorite').attr('src','img/iconRemove.png');
		$('#iconMore').attr('src','img/iconSave.svg');
		$('#iconMore').addClass('active');
		$('#removeFavorite').addClass('edit');

	    document.addEventListener('backbutton', function(e){
	    	e.preventDefault();
	    	e.stopPropagation();
	    	$('#iconMenu.edit').trigger('click');
	    }, true);

		favoritoActual = $(this).attr('data-number');

		var srcFA = $(this).find('.img').css('background-image');
		srcFA = srcFA.replace('url(','');
		srcFA = srcFA.replace(')','');
		var textFA = $(this).find('p').text();
		dataColor = $(this).find('.img').data('color');

		if (dataColor) {
			$('#main.favorites nav #embedFavorite, #main.favorites nav #coverEmbed').css({'opacity':0});
			$('#main.favorites nav #embedFavorite, #main.favorites nav #coverEmbed').css({'display':'block'});
			$('#favoritePicture').hide();
			$('#takeCamera, #takeLibrary').hide();

			setTimeout(function() {
				$('#main.favorites nav #embedFavorite, #main.favorites nav #coverEmbed').css({'opacity':1});
				var path=document.getElementById("embedFavorite").getSVGDocument().getElementsByTagName("path");
				$.each( path, function(i, tipe) {
					path[i].style.setProperty("fill",dataColor, "");
					// path[i].style.setProperty("stroke",'#000000', "");
				});
				var circle = document.getElementById("embedFavorite").getSVGDocument().getElementsByTagName("circle");
				$.each( circle, function(i, tipe) {
					circle[i].style.setProperty("fill",dataColor, "");
					// circle[i].style.setProperty("stroke",'#000000', "");
				});
				var ellipse = document.getElementById("embedFavorite").getSVGDocument().getElementsByTagName("ellipse");
				$.each( ellipse, function(i, tipe) {
					ellipse[i].style.setProperty("fill",dataColor, "");
					// ellipse[i].style.setProperty("stroke",'#000000', "");
				});
				var rect = document.getElementById("embedFavorite").getSVGDocument().getElementsByTagName("rect");
				$.each( rect, function(i, tipe) {
					rect[i].style.setProperty("fill",dataColor, "");
					// rect[i].style.setProperty("stroke",'#30302d', "");
				});

				dataColor = null;
			}, 1000);
		}
		else {
			$('#takeCamera, #takeLibrary').show();
			$('#main.favorites nav #embedFavorite, #main.favorites nav #coverEmbed').css({'display':'none'});
			$('#favoritePicture').show();
		}

		$('#favoritePicture').css({'background-image':'url('+srcFA+')','background-size':'cover'});
		$('#embedFavorite').attr('src', srcFA);
		$('#inputFavorite').val(textFA);

		$('#favoritesEvent').fadeIn(300);
		$('.listFavorites').fadeOut(300);
	});

	// Callback foto capturada
	function cameraSuccess(image) {
		var urlImagen = "data:image/jpeg;base64," + image;
	    $('#favoritePicture').css('background-image','url('+urlImagen+')');
	}

	// Callback foto librería tomada
	function cameraSuccess2(image) {
		urlImagen = getImageDataURL(image, function(data) { $('#favoritePicture').css('background-image','url('+data.data+')'); }, function(data) {/*alert('nop');*/});
	}

	// Callback error captura
	function cameraFail(message) {
//	    alert('No photo selected');
	}

	// Codificar FILE_URI to DATA_URL
	function getImageDataURL(url, success, error) {
	    var data, canvas, ctx;
	    var img = new Image();
	    img.onload = function(){
	        // Create the canvas element.
	        canvas = document.createElement('canvas');
	        canvas.width = img.width;
	        canvas.height = img.height;
	        // Get '2d' context and draw the image.
	        ctx = canvas.getContext("2d");
	        ctx.drawImage(img, 0, 0);
	        // Get canvas data URL
	        try{
	            data = canvas.toDataURL("image/jpeg", 0.15);
	            success({image:img, data:data});
	        }catch(e){
	            error(e);
	        }
	    }
	    // Load image URL.
	    try{
	        img.src = url;
	    }catch(e){
	        error(e);
	    }
	}


	function encodeImageUri(imageUri) {
		var c=document.createElement('canvas');
		var ctx=c.getContext("2d");
		var img=new Image();
		img.onload = function(){
			c.width = 260;
			c.height = 260;
			ctx.drawImage(img, 0,0, 260, 260);
		};
		img.src=imageUri;
		var dataURL = c.toDataURL("image/jpeg");

		return dataURL;
	}

	/* EVENTOS CONVERSOR
	***************************************************************/
	// Abrir conversor
	$('#menu').on('click', '#conversor:not(.active)', function(e){
		e.preventDefault();
		fadeOutMain();
		$('#iconMore').removeClass();

	    document.addEventListener('backbutton', function(e){
	    	e.preventDefault();
	    	e.stopPropagation();
	    }, true);

		setTimeout(function() {
			$('#main').removeClass();
			$('#main').addClass('conversor divisas');
			$('#main').html(htmlConversor);

			$('header h2').text('Conversor');

			$('header #menu ul li').removeClass('active');
			$('#conversor').addClass('active');
			fadeInMain();
		}, 600);
	});
	// Selector divisa/talla
	$('#main').on('change', '#change', function(){
		if ( $('#change').val() == 'currency' ) {
			$('.sizes').fadeOut(600);

			setTimeout(function() {
				$('#from, #fromCurrencyNumber, #to, #toCurrencyNumber, #dateCurrency').fadeIn(600);
			}, 600);

			$('#main').removeClass('tallas');
			$('#main').addClass('divisas animate');
		}
		else {
			$('#from, #fromCurrencyNumber, #to, #toCurrencyNumber, #dateCurrency').fadeOut(600);
			setTimeout(function() {
				$('.sizes').fadeIn(600);
			}, 600);
			$('#main').addClass('tallas animate');
			$('#main').removeClass('divisas');
			$('#typeSize').trigger('change');
		}
		setTimeout(function() {
			$('#main').removeClass('animate');
		}, 500);
	});

	// Cambio de moneda
	$('#main').on('change','#fromCurrencyNumber',function () {
	    var fromTotal = parseFloat(this.value.replace("/,/g", ".")).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
	    var fromTotal2 = parseFloat(this.value.replace("/,/g", ".")).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
	    this.value = fromTotal2;

	    var desde = $('#from').val();
	    var hasta = $('#to').val();

		var datObj = JSON.parse(localStorage.getItem("rates"));

		var BASE_desde = datObj[desde];
		var toDesde = 1 / BASE_desde;
		var totalBASE = fromTotal * toDesde;
		var BASE_hasta = datObj[hasta];
		var total = BASE_hasta * totalBASE;

	    var resultado = (total).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
	    resultado = $('#to option:selected').text()+' '+(resultado.replace(".", ","));

	    $('#toCurrencyNumber').text(resultado);
		$('#dateCurrency').text(dateCurrency);
	});

	// Input divisa
	$('#main').on('focus','#fromCurrencyNumber',function () {
		// $('header').removeClass('active');
		$(this).val('');
		$('#toCurrencyNumber').text('');
	});

	$('#main').on('focus blur change', '#from, #to', function() {
		if ( $('#fromCurrencyNumber').val() != '' && $('#fromCurrencyNumber') != '0') {
			$('#fromCurrencyNumber').trigger('change');
		}
		else {
			$('#fromCurrencyNumber').val('0');
			$('#toCurrencyNumber').text('0');
		}
	});

	// Cambio de tipo de talla
	$('#main').on('change','#typeSize',function () {
		var value = $(this).val();
		var key;
		var keyValue;

		switch(value) {
			case 'zapatoMujer':
				key = calzado; //Columnas
				keyValue = 'talla_calzado_mujer';
				break;
			case 'zapatoHome':
				key = calzado;
				keyValue = 'talla_calzado_hombre';
				break;
			case 'zapatoInfantil':
				key = calzado;
				keyValue = 'talla_calzado_infantil';
				break;
			case 'zapatoBebe':
				key = calzado;
				keyValue = 'talla_calzado_bebe';
				break;
			case 'textilMujer':
				key = textilM;
				keyValue = 'talla_textil_mujer';
				break;
			case 'textilHombreUp':
				key = textilHombreUp;
				keyValue = 'talla_textil_hombre_superior';
				break;
			case 'textilHombreDown':
				key = textilHombreDown;
				keyValue = 'talla_textil_hombre_inferior';
				break;
			case 'textilGirl':
				key = textilChildren
				keyValue = 'talla_textil_junior_chica';
				break;
			case 'textilBoy':
				key = textilChildren
				keyValue = 'talla_textil_junior_chico';
				break;
			case 'textilBaby':
				key = textilBebe;
				keyValue = 'talla_textil_bebe';
				break;
		};

		// Reset KEY
		var htmlOption ='';
		for (var i = 0; i < key.length; i++) {
			htmlOption += '<option value="'+i+'">'+key[i]+'</option>'
		};
		$('#fromSize, #toSize').html(htmlOption);

		// Reset VALUE
		htmlOption = '';

		for (var i = 0; i < listaTallas.tallas[keyValue].length; i++) {
			htmlOption += '<option value="'+(i+1)+'">'+listaTallas.tallas[keyValue][i][0]+'</option>'
		};
		$('#fromSizeValue, #toSizeValue').html(htmlOption);

	});

	// Selección de talla
	$('#main').on('change','#fromSizeValue',function () {
		var value = $(this).val();
		$('#toSizeValue').val(value);
	});

	// Cambiar tallas FROM
	$('#main').on('change','#fromSize',function () {
		var value = $(this).val();
		var tipo = $('#typeSize').val();
		var tallaje;

		switch(tipo) {
			case 'zapatoMujer':
				key = calzado; //Columnas
				keyValue = 'talla_calzado_mujer';
				break;
			case 'zapatoHome':
				key = calzado;
				keyValue = 'talla_calzado_hombre';
				break;
			case 'zapatoInfantil':
				key = calzado;
				keyValue = 'talla_calzado_infantil';
				break;
			case 'zapatoBebe':
				key = calzado;
				keyValue = 'talla_calzado_bebe';
				break;
			case 'textilMujer':
				key = textilM;
				keyValue = 'talla_textil_mujer';
				break;
			case 'textilHombreUp':
				key = textilHombreUp;
				keyValue = 'talla_textil_hombre_superior';
				break;
			case 'textilHombreDown':
				key = textilHombreDown;
				keyValue = 'talla_textil_hombre_inferior';
				break;
			case 'textilGirl':
				key = textilChildren
				keyValue = 'talla_textil_junior_chica';
				break;
			case 'textilBoy':
				key = textilChildren
				keyValue = 'talla_textil_junior_chico';
				break;
			case 'textilBaby':
				key = textilBebe;
				keyValue = 'talla_textil_bebe';
				break;
		};

		var htmlOption = '';

		for (var i = 0; i < listaTallas.tallas[keyValue].length; i++) {
			htmlOption += '<option value="'+(i+1)+'">'+listaTallas.tallas[keyValue][i][value]+'</option>'
		};

		$('#fromSizeValue').html(htmlOption);

	});

	// Cambiar tallas TO
	$('#main').on('change','#toSize',function () {
		var value = $(this).val();
		var tipo = $('#typeSize').val();
		var tallaje;

		switch(tipo) {
			case 'zapatoMujer':
				key = calzado; //Columnas
				keyValue = 'talla_calzado_mujer';
				break;
			case 'zapatoHome':
				key = calzado;
				keyValue = 'talla_calzado_hombre';
				break;
			case 'zapatoInfantil':
				key = calzado;
				keyValue = 'talla_calzado_infantil';
				break;
			case 'zapatoBebe':
				key = calzado;
				keyValue = 'talla_calzado_bebe';
				break;
			case 'textilMujer':
				key = textilM;
				keyValue = 'talla_textil_mujer';
				break;
			case 'textilHombreUp':
				key = textilHombreUp;
				keyValue = 'talla_textil_hombre_superior';
				break;
			case 'textilHombreDown':
				key = textilHombreDown;
				keyValue = 'talla_textil_hombre_inferior';
				break;
			case 'textilGirl':
				key = textilChildren
				keyValue = 'talla_textil_junior_chica';
				break;
			case 'textilBoy':
				key = textilChildren
				keyValue = 'talla_textil_junior_chico';
				break;
			case 'textilBaby':
				key = textilBebe;
				keyValue = 'talla_textil_bebe';
				break;
		};
		var htmlOption = '';

		for (var i = 0; i < listaTallas.tallas[keyValue].length; i++) {
			htmlOption += '<option value="'+(i+1)+'">'+listaTallas.tallas[keyValue][i][value]+'</option>'
		};

		$('#toSizeValue').html(htmlOption);
		$('#toSizeValue').val($('#fromSizeValue').val());
	});

	/* EVENTOS MAPA
	***************************************************************/
	// Abrir MAPA
	var latitude,longitude;

	$('#menu').on('click', '#geolocation:not(.active)', function(e){
		e.preventDefault();
//		fadeOutMain();
		$('#iconMore').removeClass();
		$('header').removeClass('active');

	    document.addEventListener('backbutton', function(e){
	    	e.preventDefault();
	    	e.stopPropagation();
	    }, true);

		if (checkConnection()) {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}
		else {
	        noConnection();
		}
	});

	function onSuccess(position) {
		latitud = position.coords.latitude;
		longitud = position.coords.longitude;

		window.open('https://www.google.com/maps/d/viewer?mid=zwdcHPVPf2dU.kAi8yY7NbFx4&z=12&ll='+latitud+','+longitud+'', '_blank', 'location=no');
		// ,'closebuttoncaption=Volver'
	};

	function onError(error) {
		if (checkConnection()) {
			latitud = 40.474581;
			longitud = -3.676149;

			window.open('https://www.google.com/maps/d/viewer?mid=zwdcHPVPf2dU.kAi8yY7NbFx4&z=12&ll='+latitud+','+longitud+'', '_blank', 'location=no');
		}
		else {
			noConnection();
		}
	}

};

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    if (states[networkState] != states[Connection.NONE]) {
        conexion = true;
    }
    else {
        conexion = false;
    }

    return conexion;
};

function noConnection() {
    navigator.notification.confirm(
        messageDatos, // message
        sinConexion,            // callback to invoke with index of button pressed
        noConexion,           // title
        ['OK']     // buttonLabels
    );
    function sinConexion() {
    //
    };
};

function onDeviceReady() {

	scrollDisable = true;
	// Prevenir default
	$(document).on('touchmove', function(e) {
		if (scrollDisable) {
	        e.preventDefault();
		}
	});


	// Definición de idioma
    navigator.globalization.getPreferredLanguage(
	    function (language) {

			function completeMonedas () {

				listaTallas = JSON.parse(localStorage.getItem('listaTallas'));
				listaProductos = JSON.parse(localStorage.getItem('listaProductos'));

				listaMonedas = JSON.parse(localStorage.getItem('listaMonedas'));
				var rates = {};
				var fechaCambio;

				$.each( listaMonedas.divisas, function(i, cambio) {
					rates[cambio.divisa] = cambio.tipo;
					fechaCambio = cambio.fecha;
				});


				var datStr = JSON.stringify(rates);
				localStorage.setItem('rates',datStr);
				localStorage.setItem('fechaCambio', fechaCambio);

				datObj = JSON.parse(localStorage.getItem("rates"));
				var timestamp = localStorage.getItem("fechaCambio");
				var formattedDate;


				// if (language.value.split("-")[0] == 'es') {
		    	if ( /es/.test(language.value) ) {
		    		// language.value == 'es-ES'

		    		// Recogida de idioma
		    		idioma = 'es';

		    		// CATEGORÍAS
		    		categoriesToSP();
					htmlCategories = $('#main').html();

					// CONVERSOR
	    			$('option[value="currency"]').text('Moneda');
	    			$('option[value="size"]').text('Talla');
					weekday = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado"];
					monthname = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];


					formattedDate = parseInt(timestamp.substring(8,10)) + ' de '
					                + monthname[parseInt(timestamp.substring(5,7))-1] + ' de '
					                + timestamp.substring(0,4);
					dateCurrency = 'Datos actualizados el '+formattedDate;
					$('#dateCurrency').text(dateCurrency);


					// TALLAS
					$('option[value="zapatoMujer"]').text('Calzado mujer');
					$('option[value="zapatoHome"]').text('Calzado hombre');
					$('option[value="zapatoInfantil"]').text('Calzado infantil');
					$('option[value="zapatoBebe"]').text('Calzado bebé');
					$('option[value="textilMujer"]').text('Ropa mujer');
					$('option[value="textilHombreUp"]').text('Camisa hombre');
					$('option[value="textilHombreDown"]').text('Pantalón hombre');
					$('option[value="textilGirl"]').text('Ropa niña');
					$('option[value="textilBoy"]').text('Ropa niño');
					$('option[value="textilBaby"]').text('Ropa bebé');

					textilChildren = ["Talla","Años","Altura"];
					textilHombreUp = ["Pecho","Talla","Talla","Talla"];
					textilHombreDown = ["Cintura","Talla","Talla","Talla"];
					textilM = ["Pecho","Cintura","Cadera","Talla","Talla","Talla"];
					textilBebe = ["Talla (cm)","Meses"];

					// FAVORITOS
					$('#inputFavorite').attr('placeholder', 'Descripción de tu nuevo favorito.');
		    	}
		    	else {
					idioma = 'en';

					htmlCategories = $('#main').html();

					formattedDate = monthname[parseInt(timestamp.substring(5,7))-1] + ' '
					                + parseInt(timestamp.substring(8,10)) + ', ' + timestamp.substring(0,4);
					dateCurrency = 'Mid-market rates: '+formattedDate;
					$('#dateCurrency').text(dateCurrency);

		    	}

				htmlConversor = $('#mainConversor').html();
				$('#mainConversor').remove();

				// Favoritos
				if( localStorage.getItem("misFavoritos") ) {
					var stringFav = localStorage.getItem('misFavoritos');
					$('.listFavorites ul').html(stringFav);
					if ( $('.listFavorites li').length > 0 ) {
						numFav = $('.listFavorites li:last-child').attr('data-number');
					}
					else {
						numFav = 0;
					}
				}
				else {
					numFav = 0;
				}


				htmlFavorites = $('#mainFavoritos').html();
				var heightPicture = $('#favoritePicture').width();
				$('#favoritePicture').css({height:heightPicture});


				var heightPicture = $('#btnSubCategory').width();
				$('#btnSubCategory').css({height:heightPicture});

				$('#mainFavoritos').remove();


		    	$('header, #page-wrap, #main').fadeIn();

			};

			$.ajax({
				dataType: "json",
				async: true,
				timeout: 2000, //2 segs
				url: "http://shoptheworld.labstoreshopper.com/api/tallas/",
				success: function(data){
					localStorage.setItem('listaTallas', JSON.stringify(data));
				},
				error: function(){
					if (!localStorage.getItem('listaTallas')) {
						var path = window.location.href.replace('index.html', '');
						$.getJSON(path + "json/tallas.json", function(data)
						{
							localStorage.setItem('listaTallas', JSON.stringify(data));
						});
					}
				}
			}).always(function() {
					$.ajax({
						dataType: "json",
						async: true,
						timeout: 2000, //2 segs
						url: "http://shoptheworld.labstoreshopper.com/api/productos/",
						success: function(data){
							localStorage.setItem('listaProductos', JSON.stringify(data));
						},
						error: function(){
							if (!localStorage.getItem('listaProductos')) {
								var path = window.location.href.replace('index.html', '');
								$.getJSON(path + "json/productos.json", function(data)
								{
									localStorage.setItem('listaProductos', JSON.stringify(data));
								});
							}
						}
					}).always(function() {
							$.ajax({
								dataType: "json",
								async: true,
								timeout: 2000, //2 segs
								url: "http://shoptheworld.labstoreshopper.com/api/divisas/cambio/",
								success: function(data){
									localStorage.setItem('listaMonedas', JSON.stringify(data));
								},
								error: function(){
									if (!localStorage.getItem('listaMonedas')) {
										var path = window.location.href.replace('index.html', '');
										$.getJSON(path + "json/cambio.json", function(data)
										{
											localStorage.setItem('listaMonedas', JSON.stringify(data));
										});
									}
								}
							}).always(function(){
									completeMonedas();
								});

						});
				});
	    },
	    function () {
	    	// Añadir selector de idioma
	    }
	);

	initApp();

};




// Definición de variables
var htmlCategories, htmlConversor, htmlFavorites, idioma, soperativo, myScroll, favoritoActual, numFav, listaTallas, listaProductos, listaMonedas, listaColores, currentTitle, done, dataColor, colorBefore, borderColor, currentCat, scrollDisable, currentPositionY;

var textSize ='<p id="texSize"></p>'
done = '<p id="doneProduct">Done!</p>';
var favoriteIcon = '<img src="img/menuFavoritos.png" id="add2Favorite" alt="">'

listaColores = '<select id="color"><option value="#ffffff">White</option><option value="#000000">Black</option><option value="#ff0000">Red</option><option value="#a2c037">Light Green</option><option value="#289548">Dark Green</option><option value="#009de0">Light Blue</option><option value="#322b80">Dark Blue</option><option value="#f4f4f4">Light Gray</option><option value="#4f4f4f">Dark Gray</option><option value="#e7b142">Light Orange</option><option value="#cd5b1c">Dark Orange</option><option value="#5a287f">Violet</option><option value="#c4007a">Magenta</option><option value="#e06896">Pink</option><option value="#ffed00">Yellow</option><option value="#724f2b">Brown</option></select>';
var tallas_tipos = ['talla_calzado_hombre', 'talla_calzado_mujer', 'talla_calzado_infantil', 'talla_calzado_bebe', 'talla_textil_hombre_superior', 'talla_textil_hombre_inferior', 'talla_textil_mujer', 'talla_textil_junior_chica', 'talla_textil_junior_chico', 'talla_textil_bebe'];

var calzado = ["US / Canada","UK","EURO","CM"];
var zapatoHome = new Array();
var zapatoMujer = new Array();
var zapatoInfantil = new Array();
var zapatoBebe = new Array();

var textilHombreUp = ["Chest","Size","Size","Size"];
var textilHombreUp2 = new Array();
var textilHombreDown = ["Waist","Size","Size","Size"];
var textilHombreDown2 = new Array();
var textilM = ["Chest","Waist","Hip","Size","Size","Size"];
var textilMujer = new Array();


var textilChildren = ["Size","Years","Height"];
var textilGirl = new Array();
var textilBoy = new Array();

var textilBebe = ["Size (cm)","Months"];
var textilBaby = new Array();


// Arrays KEYs tallas
var calzado = ["US / Canada","UK","EURO","CM"];
var textilChildren = ["Size","Years","Height"];
var textilHombreUp = ["Chest","Size","Size","Size"];
var textilHombreDown = ["Waist","Size","Size","Size"];
var textilM = ["Chest","Waist","Hip","Size","Size","Size"];
var textilBebe = ["Size (cm)","Months"];


// Conexión Datos
var messageDatos = 'You must have internet access. Try again later.';
var noConexion = 'No internet';
// Arrays Fechas cambio moneda
var weekday=new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
var monthname=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var datosOpenexchangerates;
var dateCurrency;
// Alertas favoritos
var messageFavoritos = 'You must include the image...';
var noFavoritos = 'Ops!';


$(document).ready(function() {
// Evento dispositivo listo
	document.addEventListener("deviceready", onDeviceReady, false);
})

// Traducción inicial a español
function categoriesToSP() {
	$('#home h1').html('la 1ªAPP que te permitirá <br/>comprar en todo el mundo');
	$('#enter').text('COMENZAR');
	$('h2').text('Categorías')

	$('.btnCategory[data-category="Restaurant"]').attr('data-category','Restaurante');
	$('.btnCategory[data-category="Toys"]').attr('data-category','Juguetes');
	$('.btnCategory[data-category="Electronic"]').attr('data-category','Electrónica');
	$('.btnCategory[data-category="Clothes"]').attr('data-category','Ropa');
	$('.btnCategory[data-category="Sports"]').attr('data-category','Deportes');
	$('.btnCategory[data-category="Travel"]').attr('data-category','Viajes');
	$('.btnCategory[data-category="Baby"]').attr('data-category','Bebé');
	$('.btnCategory[data-category="Drugstore"]').attr('data-category','Higiene');
	$('.btnCategory[data-category="Food"]').attr('data-category','Comida');

	$('option[value="subcategories"]').text('Subcategorías');
	$('option[value="products"]').text('Productos');

	$('#geolocation').text('Geolocalización');
	$('#categories').text('Gategorías');
	$('#favorites').text('Favoritos');

	messageDatos = 'Es necesario disponer de acceso a internet. Inténtalo de nuevo más tarde.';
	noConexion = 'Sin conexión';

	messageFavoritos = 'Debes incluir al menos la imagen...';
	noFavoritos = '¡Ops!';

	listaColores = '<select id="color"><option value="#ffffff">Blanco</option><option value="#000000">Negro</option><option value="#ff0000">Rojo</option><option value="#a2c037">Verde Claro</option><option value="#289548">Verde Oscuro</option><option value="#009de0">Azul Claro</option><option value="#322b80">Azul Oscuro</option><option value="#f4f4f4">Gris Claro</option><option value="#4f4f4f">Gris Oscuro</option><option value="#e7b142">Naranja Claro</option><option value="#cd5b1c">Naranja Oscuro</option><option value="#5a287f">Morado</option><option value="#c4007a">Magenta</option><option value="#e06896">Rosa</option><option value="#ffed00">Amarillo</option><option value="#724f2b">Marrón</option></select>';
	done = '<p id="doneProduct">¡OK!</p>';
};

// Capitalizar txt
function capitalize(txt) {
	var capitalized = txt.charAt(0).toUpperCase() + txt.slice(1);
	return capitalized;
}

// Convertir a SVG
function changeColor(color) {

	var path=document.getElementById("embed").getSVGDocument().getElementsByTagName("path");
	$.each( path, function(i, tipe) {
		path[i].style.setProperty("fill",color, "");
		// path[i].style.setProperty("stroke",'#30302d', "");
		// path[i].style.setProperty("stroke-width",'0.12', "");
		// path[i].style.setProperty("stroke-miterlimit",'10', "");
	});
	var circle = document.getElementById("embed").getSVGDocument().getElementsByTagName("circle");
	$.each( circle, function(i, tipe) {
		circle[i].style.setProperty("fill",color, "");
		// circle[i].style.setProperty("stroke",'#30302d', "");
		// circle[i].style.setProperty("stroke-width",'0.12', "");
		// circle[i].style.setProperty("stroke-miterlimit",'10', "");
	});
	var ellipse = document.getElementById("embed").getSVGDocument().getElementsByTagName("ellipse");
	$.each( ellipse, function(i, tipe) {
		ellipse[i].style.setProperty("fill",color, "");
		// ellipse[i].style.setProperty("stroke",'#30302d', "");
		// ellipse[i].style.setProperty("stroke-width",'0.12', "");
		// ellipse[i].style.setProperty("stroke-miterlimit",'10', "");
	});
	var rect = document.getElementById("embed").getSVGDocument().getElementsByTagName("rect");
	$.each( rect, function(i, tipe) {
		rect[i].style.setProperty("fill",color, "");
		// rect[i].style.setProperty("stroke",'#30302d', "");
		// rect[i].style.setProperty("stroke-width",'0.12', "");
		// rect[i].style.setProperty("stroke-miterlimit",'10', "");
	});

};


/* BORRAR. Solo para pruebas Chrome

$(document).ready(function() {
				$.ajax({
					dataType: "json",
					async: true,
					timeout: 2000, //2 segs
					url: "http://shoptheworld.labstoreshopper.com/api/tallas/",
					success: function(data){
						localStorage.setItem('listaTallas', JSON.stringify(data));
					},
					error: function(){
						if (!localStorage.getItem('listaTallas')) {
							var path = window.location.href.replace('index.html', '');
							$.getJSON(path + "json/tallas.json", function(data)
							{
								localStorage.setItem('listaTallas', JSON.stringify(data));
							});
						}
					}
				}).always(function() {
						$.ajax({
							dataType: "json",
							async: true,
							timeout: 2000, //2 segs
							url: "http://shoptheworld.labstoreshopper.com/api/productos/",
							success: function(data){
								localStorage.setItem('listaProductos', JSON.stringify(data));
							},
							error: function(){
								if (!localStorage.getItem('listaProductos')) {
									var path = window.location.href.replace('index.html', '');
									$.getJSON(path + "json/productos.json", function(data)
									{
										localStorage.setItem('listaProductos', JSON.stringify(data));
									});
								}
							}
						}).always(function() {
								$.ajax({
									dataType: "json",
									async: true,
									timeout: 2000, //2 segs
									url: "http://shoptheworld.labstoreshopper.com/api/divisas/cambio/",
									success: function(data){
										localStorage.setItem('listaMonedas', JSON.stringify(data));
									},
									error: function(){
										if (!localStorage.getItem('listaMonedas')) {
											var path = window.location.href.replace('index.html', '');
											$.getJSON(path + "json/cambio.json", function(data)
											{
												localStorage.setItem('listaMonedas', JSON.stringify(data));
											});
										}
									}
								}).always(function(){
									completeMonedas();
								});

							});
					});

			function completeMonedas () {
				listaTallas = JSON.parse(localStorage.getItem('listaTallas'));
				listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
				listaMonedas = JSON.parse(localStorage.getItem('listaMonedas'));
				var rates = {};
				var fechaCambio;

				$.each( listaMonedas.divisas, function(i, cambio) {
					rates[cambio.divisa] = cambio.tipo;
					fechaCambio = cambio.fecha;
				});


				var datStr = JSON.stringify(rates);
				localStorage.setItem('rates',datStr);
				localStorage.setItem('fechaCambio', fechaCambio);

				datObj = JSON.parse(localStorage.getItem("rates"));
				var timestamp = localStorage.getItem("fechaCambio");
				var formattedDate;


				// if (language.value.split("-")[0] == 'es') {
		    		// language.value == 'es-ES'

		    		// Recogida de idioma
		    		idioma = 'es';

		    		// CATEGORÍAS
		    		categoriesToSP();
					htmlCategories = $('#main').html();

					// CONVERSOR
	    			$('option[value="currency"]').text('Moneda');
	    			$('option[value="size"]').text('Talla');
					weekday = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado"];
					monthname = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];


					formattedDate = parseInt(timestamp.substring(8,10)) + ' de '
					                + monthname[parseInt(timestamp.substring(5,7))-1] + ' de '
					                + timestamp.substring(0,4);
					dateCurrency = 'Datos actualizados el '+formattedDate;
					$('#dateCurrency').text(dateCurrency);


					// TALLAS
					$('option[value="zapatoMujer"]').text('Calzado mujer');
					$('option[value="zapatoHome"]').text('Calzado hombre');
					$('option[value="zapatoInfantil"]').text('Calzado infantil');
					$('option[value="zapatoBebe"]').text('Calzado bebé');
					$('option[value="textilMujer"]').text('Ropa mujer');
					$('option[value="textilHombreUp"]').text('Camisa hombre');
					$('option[value="textilHombreDown"]').text('Pantalón hombre');
					$('option[value="textilGirl"]').text('Ropa niña');
					$('option[value="textilBoy"]').text('Ropa niño');
					$('option[value="textilBaby"]').text('Ropa bebé');

					textilChildren = ["Talla","Años","Altura"];
					textilHombreUp = ["Pecho","Talla","Talla","Talla"];
					textilHombreDown = ["Cintura","Talla","Talla","Talla"];
					textilM = ["Pecho","Cintura","Cadera","Talla","Talla","Talla"];
					textilBebe = ["Talla (cm)","Meses"];

					// FAVORITOS
					$('#inputFavorite').attr('placeholder', 'Descripción de tu nuevo favorito.');

				htmlConversor = $('#mainConversor').html();
				$('#mainConversor').remove();

				// Favoritos
				if( localStorage.getItem("misFavoritos") ) {
					var stringFav = localStorage.getItem('misFavoritos');
					stringFav += '<li data-number="100"><div class="img" style="background-image:url(img/catalogotoys.png)"></div><p>Añadido</p></li>';
					$('.listFavorites ul').html(stringFav);
					if ( $('.listFavorites li').length > 0 ) {
						numFav = $('.listFavorites li:last-child').attr('data-number');
					}
					else {
						numFav = 0;
					}
				}
				else {
					numFav = 0;
				}


				htmlFavorites = $('#mainFavoritos').html();
				var heightPicture = $('#favoritePicture').width();
				$('#favoritePicture').css({height:heightPicture});
				$('#mainFavoritos').remove();


		    	$('header, #page-wrap, #main').fadeIn();

			};

	 initApp();

});

*******************************************/