var GetzChat=angular.module('GetzChat',['ngRoute']);
GetzChat.config(function($routeProvider)
		{
		$routeProvider.when('/register',
		{
			 templateUrl:'partials/register.html', 
			 controller:'registerController'
		})
		.when('/blogs',
				{
			templateUrl:'partials/blogs.html',
			controller:'blogController'	
				})
				.when("/jobs",
				{
					templateUrl:'partials/jobs.html',
					controller:'jobController'
				});
	});
GetzChat.controller('registerController',function($scope,$http)
{
 console.log("i'm in register");
 $scope.register=function()
{
	 var users={
			username:$scope.username,
			password:$scope.password,
			dob:$scope.dob
	 };
	var res=$http.post("http://localhost:8066/mychat/registerUser",users); 
			res.success(function(data, status, headers, config) {
			console.log("status:"+status);
			
			
		});
}
});
GetzChat.controller('blogController',function($scope,$http)
{
	console.log("in blog")
	$scope.blogs=function()
	{
		
		var blogs={
				name:$scope.name,
				description:$scope.description
		};
		var res=$http.post("http://localhost:8066/mychat/create",blogs); 
		res.success(function(data, status, headers, config) {
		console.log("status:"+status);
	});
	}
	})
	GetzChat.controller('jobController',function($scope,$http)
{
	console.log("in job")
	$scope.jobs=function()
	{
		
		var jobs={
				jobsName:$scope.jobsName,
				jobsDescription:$scope.jobsDescription,
				jobsLocation:$scope.jobsLocation
		};
		var res=$http.post("http://localhost:8066/mychat/createJobs",jobs); 
		res.success(function(data, status, headers, config) {
		console.log("status:"+status);
	});
	}
	})



