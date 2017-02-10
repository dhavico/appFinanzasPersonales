angular.module('finanzaPersonal', ['ngAnimate', 'firebase'])
	.controller('registroGastos', function($scope,$firebaseArray){

		//var ref  = new Firebase("https://apptienda.firebaseio.com");
		// Initialize Firebase
		var config = {
		    apiKey: "AIzaSyCdLfLiEu7CRAFVQfRTO5f_bsumA4npMvw",
		    authDomain: "appphonegap-56c52.firebaseapp.com",
		    databaseURL: "https://appphonegap-56c52.firebaseio.com",
		    storageBucket: "appphonegap-56c52.appspot.com",
		    messagingSenderId: "693846590691"
		  };
		firebase.initializeApp(config);

		var ref  = firebase.database().ref();

		$scope.listaGastos = $firebaseArray(ref);
		$scope.listaCategorias = [{ value: "ALIMENTACIÓN", text: "ALIMENTACIÓN", selected: "selected"},
								  { value: "HIJOS", text: "HIJOS"},
								  { value: "OTROS", text: "OTROS"}];
	  	$scope.FechaActual = new Date();

		$scope.agregarGasto = function(){
			if($scope.nombreCategoria!=undefined){
				$scope.listaGastos.$add({
					nombreCategoria: $scope.nombreCategoria,
					monto: parseFloat($scope.monto)
				});
				$scope.monto = "";
			}
			else{
				alert("No te olvides seleccionar una categoria");
			}
		}
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
		setTimeout(function(){$(".page1").css("opacity","1");},3000);
	});