var config = {
		    apiKey: "AIzaSyCdLfLiEu7CRAFVQfRTO5f_bsumA4npMvw",
		    authDomain: "appphonegap-56c52.firebaseapp.com",
		    databaseURL: "https://appphonegap-56c52.firebaseio.com",
		    storageBucket: "appphonegap-56c52.appspot.com",
		    messagingSenderId: "693846590691"
		  };

var app = angular.module('finanzaPersonal', ['ngAnimate', 'firebase']);
	// Initialize Firebase
	firebase.initializeApp(config);
	app.controller('menu', function($scope){
		$scope.ocultarMenu = function(){
			$(".ui-menu").css("left","-205px");
		}
		$scope.goPage = function(href){
			$scope.ocultarMenu();
			$(".page").css("visibility","hidden");
			setTimeout(function(){$("#" + href).css("visibility","visible");},1000);
		}
		$scope.goPage('page1');
	})
	.controller('registroGastos', function($scope,$firebaseArray){

		//var ref  = new Firebase("https://apptienda.firebaseio.com");
		// Initialize Firebase
		//firebase.initializeApp(config);

		var refGastos  = firebase.database().ref('Gastos');
		var refCategorias  = firebase.database().ref('Categorias');

		$scope.listaGastos = $firebaseArray(refGastos);
		$scope.listaCategorias = $firebaseArray(refCategorias);
	  	$scope.FechaActual = new Date();

		$scope.agregarGasto = function(){
			if($scope.nombreCategoria!=undefined){
				$scope.listaGastos.$add({
					nombreCategoria: $scope.nombreCategoria,
					monto: parseFloat($scope.monto),
					fecha: $scope.FechaActual
				});
				$scope.monto = "";
			}
			else{
				alert("No te olvides seleccionar una categoria");
			}
		}/*
		$scope.agregarCategoria = function(){
				$scope.listaCategorias.$add({
					nombre: $scope.monto,
				});
				$scope.monto = "";
		}*/
		$scope.eliminarGasto = function(a){
			$scope.listaGastos.$remove(this.item);
		}
		$scope.getTotalGastos = function(){
			var total = 0;
			for (var i = 0; i < $scope.listaGastos.length; i++) {
				var gasto = $scope.listaGastos[i];
				total += gasto.monto;
			};
			return total;
		}
		$scope.mostrarMenu = function(){
			$(".ui-menu").css("left","0px");
		}
		setTimeout(function(){$(".page1").css("opacity","1");},10);
	})
	.controller('registroIngresos', function($scope,$firebaseArray){
		var refIngresos  = firebase.database().ref('Ingresos');
		var refCategorias  = firebase.database().ref('Categorias');
		$scope.listaIngresos = $firebaseArray(refIngresos);
		$scope.listaCategorias = $firebaseArray(refCategorias);
		$scope.FechaActual = new Date();

		$scope.agregarIngreso = function(){
			if($scope.nombreCategoria!=undefined){
				$scope.listaIngresos.$add({
					nombreCategoria: $scope.nombreCategoria,
					monto: parseFloat($scope.monto),
					fecha: $scope.FechaActual
				});
				$scope.monto = "";
			}
			else{
				alert("No te olvides seleccionar una categoria");
			}
		}
		$scope.eliminarIngreso = function(a){
			$scope.listaIngreso.$remove(this.item);
		}
		$scope.getTotalIngresos = function(){
			var total = 0;
			for (var i = 0; i < $scope.listaIngresos.length; i++) {
				var ingreso = $scope.listaIngresos[i];
				total += ingreso.monto;
			};
			return total;
		}
		$scope.mostrarMenu = function(){
			$(".ui-menu").css("left","0px");
		}
	});