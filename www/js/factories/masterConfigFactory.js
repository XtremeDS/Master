app.factory('MasterConfig', function(){
	return {
		accessData:{
			email: null,
			password: null
		},
		personalData:{
			name:null,
			phone:null,
			zipCode:null,
			country:false,
			address:null
		},
		association:{
			logo: null,
			videoLink:null,
			pageLink:null,
			description:null
		}
	};
});