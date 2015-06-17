app.factory('MasterConfig', function(){
	return {
		accessData:{
			email: "2140139@myipleiria.pt",
			password: "123456789"
		},
		personalData:{
			name:"Emanuel Coelho",
			phone:"123654789",
			zipCode:"2400",
			country:{
				country:'pt',
				countryName:'Portugal'
			},
			address:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
		},
		association:{
			name:"Airsot",
			videoLink:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			pageLink:"http://www.google.com",
			description:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. "
		}
	};
});