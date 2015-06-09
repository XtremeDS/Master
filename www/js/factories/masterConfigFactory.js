app.factory('MasterConfig', function(){
	return {
		accessData:{
			email:""
		},
		personalData:{
			name:"",
			phone:"",
			zipCode:"",
			country:{
				country: 'pt',
				countryName: 'Portugal'
			}
		},
		association:{
			name:"",
			videoLink:"",
			pageLink:"",
			description:""
		}
	};	

});