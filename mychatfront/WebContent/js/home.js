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
				})
				.when("/login",
						{
					templateUrl:'partials/login.html',
					controller:'loginController'					
						})
				.when("/userHome",
						{
					templateUrl:'partials/userHome.html',
					controller:'userHomeController'					
						})
				.when("/admin",
						{
					templateUrl:'partials/admin.html',
					controller:'adminController'					
						})
					.when("/forum",
							{
						templateUrl:"partials/forum.html",
						controller:"forumController"
							})
				.when("/logout",
				{
					templateUrl:"partials/logout.html",
					controller:"logoutController"
				})
				.when("/adminJobs",
				{
					templateUrl:"partials/adminJobs.html",
					controller:"adminJobsController"
				})
				.when("/adminBlogs",
				{
					templateUrl:"partials/adminJobs.html",
					controller:"adminBlogsController"
				})
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
letzChaat.controller("blogController",function($scope,$http)	
		{	
			 $http.get("http://localhost:8066/letzchaat/viewBlogs")
			    .then(function (response) {$scope.blogs = response.data;});
			
			$scope.newBlog={};
			console.log("In Controller");
			$scope.addBlog=function(newBlog)
			{
				var dataObj = {
		    			blogTitle:$scope.blogTitle,
		    			blogDescription:$scope.blogDescription,
		 				category:$scope.category
		 		};
				console.log("title:"+dataObj);
				 var res = $http.post('http://localhost:8066/letzchaat/addBlog',dataObj);
				 $http.get("http://localhost:8066/letzchaat/viewBlogs")
			 	    .then(function (response) {$scope.blogs = response.data;});
			 		res.success(function(data, status, headers, config) {
			 			$scope.message = data;
			 			console.log("status:"+status);
			 		});
			 		 
			};
			$scope.editBlog=function(blog)
			{
				console.log("inside editblog");
				console.log("blog:"+blog);
				$scope.blogDataToEdit=blog;
			}
			$scope.saveEdit=function()
			{
				var dataObj = {
		    			blogTitle:$scope.blogDataToEdit.blogTitle,
		    			blogDescription:$scope.blogDataToEdit.blogDescription,
		 				category:$scope.blogDataToEdit.category,
		 				blog_id:$scope.blogDataToEdit.blog_id
		 		};
				$http.put('http://localhost:8066/letzchaat/updateBlog', dataObj);
				$http.get("http://localhost:8066/letzchaat/viewBlogs")
		 	    .then(function (response) {$scope.blogs = response.data;});
			}
			$scope.deleteBlog=function(blogDataToEdit)
			{
				console.log("delete blog called");
				blog_id:$scope.blogDataToEdit.blog_id;
				console.log("blog_id:"+blogDataToEdit.blog_id);
				$http.delete('http://localhost:8066/letzchaat/deleteBlog/'+blogDataToEdit.blog_id);
				 $http.get("http://localhost:8066/letzchaat/viewBlogs")
			 	    .then(function (response) {$scope.blogs = response.data;});
			}
			
		}

		);

GetzChat.controller('jobController',function($scope,$http,$rootScope)
{
	console.log("in job")
	$rootScope.blogs=true;
	$rootScope.forum=true;
	$rootScope.jobs=true;
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	
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
	});
GetzChat.controller('loginController',['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope)
           {
			console.log("login controller");
			$scope.login=function()
			{
				var login={
						username:$scope.username,
						password:$scope.password
						
				}
				$http.post("http://localhost:8066/mychat/authenticateUser",login).then(function (response) {
					 console.log("result data:"+response.data);
					 var r=response.data.toString();
					 console.log("response:"+r);
				     
						if(r==1)
							{
							$rootScope.blogs=true;
							$rootScope.forum=true;
							$rootScope.jobs=true;
							$rootScope.login=false;
							$rootScope.register=false;
							$rootScope.services=false;
							$rootScope.about=false;
							$rootScope.home=false;
							$rootScope.logout=true;
							$rootScope.chat=true;
							console.log('logout:'+$rootScope.logout);
							console.log("user:"+response.data);
							$location.path('/userHome');
							}
						if(r==0)
							{
							$scope.username="";
							$scope.password="";
							$scope.message="username/password incorrect";
							$location.path('/login');
							}
						if(r==2)
						{
							$rootScope.login=false;
							$rootScope.register=false;
							$rootScope.services=false;
							$rootScope.about=false;
							$rootScope.home=false;
							$rootScope.adminBlog=true;
							$rootScope.users=true;
							$rootScope.registeredUsers=true;
							$rootScope.logout=true;
							
						$location.path('/admin');
						}
				});  
			}
	}
        
    ]);

GetzChat.controller("adminController",function($scope,$http)
		{
			$scope.message="this is admin home"
		});

GetzChat.controller("forumController",function($scope,$http,$rootScope)
		{
	console.log("in forum");
	$rootScope.blogs=true;
	$rootScope.forum=true;
	$rootScope.jobs=true;
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	
	$scope.forum=function()
	{
		var forum={
				question_Title:$scope.question_Title,
				question_Description:$scope.question_Description
				
		};
		var res=$http.post("http://localhost:8066/mychat/createForum",forum); 
		res.success(function(data, status, headers, config) {
		console.log("status:"+status);
	});
	}
	});
GetzChat.controller("adminJobsController",function($scope,$http,$rootScope)
		{
			 $rootScope.login=false;
				$rootScope.register=false;
				$rootScope.services=false;
				$rootScope.about=false;
				$rootScope.home=false;
				$rootScope.adminBlog=true;
				$rootScope.users=true;
				$rootScope.registeredUsers=true;
				$rootScope.logout=true;
				$rootScope.adminJobs=true;
			  console.log("you are in adminjobs");
			  console.log("inside job controller");
			    $http.get("http://localhost:8066/mychat/listJobs")
			    .then(function (response) {$scope.jobs = response.data;});
			   
		});
/*GetzChat.controller('jobsController',function($scope,$http)		
		{
	console.log("inside job controller");
    $http.get("http://localhost:8066/mychat/viewJobs")
    .then(function (response) {$scope.jobs = response.data;});
    
    $scope.applyJob=function()
    {
    	 console.log("applyJob function called");
    	 var jobData={
           jobId:$scope.jobId,
    	 registrationNumber:$scope.registrationNumber,
    	 studentId:$scope.studentId,
    	 certificateNumber:$scope.certificateNumber	
    	 };
    	 var res = $http.post('http://localhost:8066/mychat/registerJobs',jobData);
    }
		}
       
		);
*/


