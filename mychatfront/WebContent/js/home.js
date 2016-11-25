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
					templateUrl:"partials/adminBlogs.html",
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
			dob:$scope.dob,
			mobileno:$scope.mobileno
	 };
	var res=$http.post("http://localhost:8066/mychat/registerUser",users); 
			res.success(function(data, status, headers, config) {
			console.log("status:"+status);
			
			
		});
}
});

GetzChat.controller('jobController',function($scope,$http,$rootScope)
{
	$http.get("http://localhost:8066/mychat/viewJobs")
    .then(function (response) {$scope.blogs = response.data;});
	
	
	$rootScope.adminBlogs=true;
	$rootScope.forum=true;
	$rootScope.jobs=false;
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	$scope.newJob={};
	console.log("in job")
	$scope.jobs=function(newJob)
	{
		
		var jobs={
				jobsName:$scope.jobsName,
				jobsDescription:$scope.jobsDescription,
				jobsLocation:$scope.jobsLocation
		};
		console.log("title:"+jobs);
		var res=$http.post("http://localhost:8066/mychat/createJobs",jobs); 
		$http.get("http://localhost:8066/mychat/viewJobs").then(function (response) {$scope.jobs = response.data;});
		res.success(function(data, status, headers, config) {
			$scope.message = data;
		console.log("status:"+status);
	});
	}
	$scope.editJob=function(jobs)
	{
		console.log("inside editjobs");
		console.log("jobs:"+jobs);
		$scope.jobDataToEdit=jobs;
	}
	$scope.saveEdit=function()
	{
		var jobs={
				jobsName:$scope.jobDataToEdit.jobsName,
				jobsDescription:$scope.jobDataToEdit.jobsDescription,
				jobsLocation:$scope.jobDataToEdit.jobsLocation
		};
		$http.put('http://localhost:8066/mychat/updateJob', jobs);
		$http.get("http://localhost:8066/mychat/viewJobs").then(function (response) {$scope.jobs = response.data;});
	}
	$scope.deletejob=function(jobDataToEdit)
	{
		console.log("delete job called");
		jobId:$scope.jobDataToEdit.jobId;
		console.log("jobId:"+jobDataToEdit.jobId);
		$http['delete']('http://localhost:8066/mychat/deleteJob/'+jobDataToEdit.jobId);
		 $http.get("http://localhost:8066/mychat/viewJobs")
	 	    .then(function (response) {$scope.jobs = response.data;});
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
						
							};
				$http.post("http://localhost:8066/mychat/authenticateUser",login).then(function (response) {
					 console.log("result data:"+response.data);
					 var r=response.data.toString();
					 console.log("response:"+r);
				     
						if(r==1)
							{
							$rootScope.blogs=true;
							$rootScope.forum=true;
							$rootScope.jobs=false;
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
							$rootScope.adminBlogs=true;
							$rootScope.jobs=true;
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
GetzChat.controller('logoutController',function($scope,$rootScope)		
		{
			console.log("logout controller called");
			$rootScope.login=true;
			$rootScope.register=true;
			$rootScope.services=true;
			$rootScope.about=true;
			$rootScope.home=true;
			$rootScope.blogs=false;
			$rootScope.forum=false;
			$rootScope.jobs=false;
			$rootScope.logout=false;
			$rootScope.chat=false;
			$rootScope.adminBlog=false;
			$rootScope.userHome=false;
		});
GetzChat.controller("blogController",function($scope,$http)
		{
	$http.get("http://localhost:8066/mychat/viewBlogs")
    .then(function (response) {$scope.blogs = response.data;});

$scope.newBlog={};
	console.log("in blogs");
	/*$rootScope.blogs=false;
	$rootScope.forum=true;
	$rootScope.jobs=true;
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;*/
	
	$scope.blogs=function(newBlog)
	{
		var blogs={
				blog_Name:$scope.blog_Name,
				blog_Description:$scope.blog_Description,
				blog_Category:$scope.blog_Category
		}
		console.log("title:"+blogs);
		var res=$http.post('http://localhost:8066/mychat/createBlogs',blogs);
		$http.get("http://localhost:8066/mychat/viewBlogs").then(function (response) {$scope.blogs = response.data;});
		res.success(function(data, status, headers, config) {
			$scope.message = data;
		console.log("status:"+status);
	});
	};
	
	$scope.editBlog=function(blogs)
	{
		console.log("inside editblog");
		console.log("blog:"+blogs);
		$scope.blogDataToEdit=blogs;
	}
	$scope.saveEdit=function()
	{
		var blogs={
				blog_Id:$scope.blogDataToEdit.blog_Id,
				blog_Name:$scope.blogDataToEdit.blog_Name,
				blog_Description:$scope.blogDataToEdit.blog_Description,
				blog_Category:$scope.blogDataToEdit.blog_Category
		};
		$http.put('http://localhost:8066/mychat/updateBlog',blogs);
	$http.get("http://localhost:8066/mychat/viewBlogs").then(function (response) {$scope.blogs = response.data;});
	}
	$scope.deleteBlog=function(blogDataToEdit)
	{
		console.log("delete blog called");
		blog_Id:$scope.blogDataToEdit.blog_Id;
		console.log("blog_Id:"+blogDataToEdit.blog_Id);
		$http['delete']('http://localhost:8066/mychat/deleteBlog/'+blogDataToEdit.blog_Id);
		 $http.get("http://localhost:8066/mychat/viewBlogs")
	 	    .then(function (response) {$scope.blogs = response.data;});
	}
	});

GetzChat.controller("adminBlogsController",function($scope,$http,$rootScope)	
		{	
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.home=false;
	$rootScope.users=true;
	$rootScope.registeredUsers=true;
		console.log(" in adminblog controller");
			 $http.get("http://localhost:8066/mychat/viewBlogs")
			    .then(function (response) {
			    	
			    	$scope.blogs = response.data;
			    	console.log("data:"+response.data);
			    });
			
$scope.appdisapp=function(adminBlog)
{
	console.log("inside appdisappblog");
	console.log("adminblog:"+adminBlog);
	$scope.blogstatus=adminBlog;
}
$scope.approveBlog=function()
{
	console.log("in approveblog");
	var blogs={
			blog_Id:$scope.blogstatus.blog_Id,
			blog_Name:$scope.blogstatus.blog_Name,
			blog_Description:$scope.blogstatus.blog_Description,
			blog_Category:$scope.blogstatus.blog_Category,
			status:true
	};
	$http.put("http://localhost:8066/mychat/updateBlog",blogs);
	 $http.get("http://localhost:8066/mychat/viewBlogs")
	    .then(function (response) {
	    	
	    	$scope.blogs = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
}
$scope.disapproveBlog=function()
{
	console.log("in disapproveblog");
	var blogs={
			blog_Id:$scope.blogstatus.blog_Id,
			blog_Name:$scope.blogstatus.blog_Name,
			blog_Description:$scope.blogstatus.blog_Description,
			blog_Category:$scope.blogstatus.blog_Category,
			status:true
	};
	$http.put("http://localhost:8066/mychat/updateBlog",blogs);
	 $http.get("http://localhost:8066/mychat/viewBlogs")
	    .then(function (response) {
	    	
	    	$scope.blogs = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
}

		});		


