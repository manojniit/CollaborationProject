var likes=0;
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
				.when("/allBlogs",
				{
					templateUrl:"partials/allBlogs.html",
					controller:"allBlogsController"
				})
				});
GetzChat.controller('registerController',['$scope','fileUpload',function($scope,fileUpload)
{
 console.log("i'm in register");
 $scope.register=function()
{
	 	var file=$scope.myFile;
		var	username=$scope.username;
		var	password=$scope.password;
		var	dob=$scope.dob;
		var	mobileno=$scope.mobileno;
		console.log("username:"+username);
		console.log("file is");
		console.dir(file);
		var uploadUrl="http://localhost:8046/mychat/fileUpload";
		fileUpload.uploadFileToUrl(file,uploadUrl,username,password,dob,mobileno);
		console.log("link correct");
	 };
	/*var res=$http.post("http://localhost:8046/mychat/registerUser",users); 
			res.success(function(data, status, headers, config) {
			console.log("status:"+status);
		});*/
}]);
GetzChat.service('fileUpload',['$http','$location',function($http,$scope,$location)
                               {
				this.uploadFileToUrl=function(file,uploadUrl,username,password,dob,mobileno)
				{
					console.log("link correct");
				var fd=new FormData();
					fd.append('file',file);
					fd.append('username',username);
					fd.append('password',password);
					fd.append('dob',dob);
					fd.append('mobileno',mobileno);
					console.log("fd"+fd);
					$http.post(uploadUrl,fd,{
						transformRequest:angular.identity,
						headers:{'Content-Type':undefined}
					})
					.success(function()
							{
						$scope.message="u r successfully registerd ..u can login now";
						$scope.username="";
						$scope.password="";
							})
							.error(function(){
							});
		}
	
}]);
GetzChat.directive('fileModel',['$parse',function($parse) {
	return{
        	   link: function(scope, element, attrs) {
        	          var model = $parse(attrs.fileModel);
        	          var modelSetter = model.assign;
        	          
        	          element.bind('change', function(){
        	             scope.$apply(function(){
        	                modelSetter(scope, element[0].files[0]);
        	             });
        	          });
        	   }
           };
  }])
GetzChat.controller('jobController',function($scope,$http,$rootScope)
{
	$http.get("http://localhost:8046/mychat/viewJobs")
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
		var res=$http.post("http://localhost:8046/mychat/createJobs",jobs); 
		$http.get("http://localhost:8046/mychat/viewJobs").then(function (response) {$scope.jobs = response.data;});
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
		$http.put('http://localhost:8046/mychat/updateJob', jobs);
		$http.get("http://localhost:8046/mychat/viewJobs").then(function (response) {$scope.jobs = response.data;});
	}
	$scope.deletejob=function(jobDataToEdit)
	{
		console.log("delete job called");
		jobId:$scope.jobDataToEdit.jobId;
		console.log("jobId:"+jobDataToEdit.jobId);
		$http['delete']('http://localhost:8046/mychat/deleteJob/'+jobDataToEdit.jobId);
		 $http.get("http://localhost:8046/mychat/viewJobs")
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
				$http.post("http://localhost:8046/mychat/authenticateUser",login).then(function (response) {
					 console.log("result data:"+response.data);
					 var r=response.data.toString();
					 console.log("response:"+r);
				     
						if(r==1)
							{
							$rootScope.blogs=true;
							$rootScope.allBlogs=true;
							$rootScope.forum=true;
							$rootScope.jobs=true;
							$rootScope.login=false;
							$rootScope.register=false;
							$rootScope.services=false;
							$rootScope.about=false;
							$rootScope.home=false;
							$rootScope.logout=true;
							$rootScope.chat=true;
							$rootScope.userForum=true;
							$rootScope.userJobs=true;
							console.log('logout:'+$rootScope.logout);
							console.log("user:"+response.data);
							console.log("uname from root scope:"+$rootScope.uname);
							$rootScope.uname=$scope.username;
							$rootScope.id=$scope.id;
							console.log("uname:"+$rootScope.uname);
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
							$rootScope.forum=true;
							$rootScope.about=false;
							$rootScope.home=false;
							$rootScope.adminBlogs=true;
							$rootScope.adminForums=true;
							$rootScope.adminJobs=true;
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
	$http.get("http://localhost:8046/mychat/viewForum").then(function (response) {$scope.forums= response.data;});

	console.log("in forum");
	$rootScope.blogs=true;
	$rootScope.forum=false;
	$rootScope.jobs=true;
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	
	$scope.addForum=function()
	{
		var forum={
				question_Title:$scope.question_Title,
				question_Description:$scope.question_Description
				
		};
		var res=$http.post("http://localhost:8046/mychat/createForum",forum); 
		$http.get("http://localhost:8046/mychat/viewForum").then(function (response) {$scope.forums = response.data;});
		res.success(function(data, status, headers, config) {
			$scope.message = data;
		console.log("status:"+status);
	});
	}
	$scope.editForum=function(forum)
	{
		console.log("inside editforum");
		console.log("forum:"+forum);
		$scope.forumDataToEdit=forum;
	}
	$scope.saveEdit=function()
	{
		var forum={
				question_Id:$scope.forumDataToEdit.question_Id,
				question_Title:$scope.forumDataToEdit.question_Title,
				question_Description:$scope.forumDataToEdit.question_Description
		};
		$http.put('http://localhost:8046/mychat/updateForum',forum);
	$http.get("http://localhost:8046/mychat/viewForum").then(function (response) {$scope.forums = response.data;});
	}
	$scope.deleteForum=function(forumDataToEdit)
	{
		console.log("delete forum called");
		question_Id:$scope.forumDataToEdit.question_Id;
		console.log("question_Id:"+forumDataToEdit.question_Id);
		$http['delete']('http://localhost:8046/mychat/deleteForum/'+forumDataToEdit.question_Id);
		 $http.get("http://localhost:8046/mychat/viewForum")
	 	    .then(function (response) {$scope.forums = response.data;});
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
			    $http.get("http://localhost:8046/mychat/listJobs")
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
GetzChat.controller("blogController",function($scope,$http,$rootScope)
		{
	$rootScope.userForums=true;
	$rootScope.userJobs=true;
	$rootScope.allBlogs=true;
	$rootScope.blogs=true;
	$rootScope.forum=true;
	$rootScope.jobs=true;
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.logout=true;
	console.log("blog controller");
	console.log("in userblogs");
	/*$http.get("http://localhost:8046/mychat/viewBlogs")
    .then(function (response) {$scope.blogs= response.data;});*/
	console.log("blog controller");
	console.log("name in allblogs:"+$rootScope.uname)
	$http.get("http://localhost:8046/mychat/viewUserBlogs/"+$rootScope.uname).then(function (response) {$scope.blogs= response.data;});

/*$scope.newBlog={};
*/	console.log("in blogs");
	
	
	$scope.addBlog=function()
	{
		var blog={
				blog_Name:$scope.blog_Name,
				blog_Category:$scope.blog_Category,
				blog_Description:$scope.blog_Description,
				postedBy:$rootScope.uname
		}
		console.log("title:"+blog);
		var res=$http.post('http://localhost:8046/mychat/createBlogs',blog);
		$http.get("http://localhost:8046/mychat/viewUserBlogs/"+$rootScope.uname).then(function (response) {$scope.blogs= response.data;});
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
		var blog={
				blog_Id:$scope.blogDataToEdit.blog_Id,
				blog_Name:$scope.blogDataToEdit.blog_Name,
				blog_Description:$scope.blogDataToEdit.blog_Description,
				blog_Category:$scope.blogDataToEdit.blog_Category
		};
		$http.put('http://localhost:8046/mychat/updateBlog',blog);
	$http.get("http://localhost:8046/mychat/viewUserBlogs/"+$rootScope.uname).then(function (response) {$scope.blogs = response.data;});
	}
	$scope.deleteBlog=function(blogDataToEdit)
	{
		console.log("delete blog called");
		blog_Id:$scope.blogDataToEdit.blog_Id;
		console.log("blog_Id:"+blogDataToEdit.blog_Id);
		$http['delete']('http://localhost:8046/mychat/deleteBlog/'+blogDataToEdit.blog_Id);
		 $http.get("http://localhost:8046/mychat/viewUserBlogs/"+$rootScope.uname)
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
			 $http.get("http://localhost:8046/mychat/viewBlogs")
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
			postedBy:$scope.blogstatus.postedBy,
			status:true
	};
	$http.put("http://localhost:8046/mychat/updateBlog",blogs);
	 $http.get("http://localhost:8046/mychat/viewBlogs")
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
			postedBy:$scope.blogstatus.postedBy,
			status:true
	};
	$http.put("http://localhost:8046/mychat/updateBlog",blogs);
	 $http.get("http://localhost:8046/mychat/viewBlogs")
	    .then(function (response) {
	    	
	    	$scope.blogs = response.data;
	    	
	    	console.log("data:"+response.data);
	    });
}

		});		
GetzChat.controller("allBlogsController",function($scope,$http,$rootScope)
		{
	$rootScope.userforum=false;
	$rootScope.userjobs=true;
	$rootScope.adminblogs=false;
	$rootScope.adminforum=false;
	$rootScope.register=false;
	$rootScope.home=false;
	$rootScope.addjobs=false;
	$rootScope.login=false;
	$rootScope.jobs=false;
	$rootScope.blogs=true;
	$rootScope.logout=true;
	/*console.log("username in myblog controller:"+$rootScope.uname);
			 $http.get("http://localhost:8046/mychat/viewBlogs")
			    .then(function (response) {
			    	
			    	$scope.blogs = response.data;
			    	
			    	console.log("data:"+response.data);
			    });*/
	$rootScope.userForum=true;
	console.log("root scope likes:"+$rootScope.likes);
	console.log("this is viewblogs controller");
			$scope.message="you are in view blogs";
			$scope.like=function () {
				console.log("inside the like function");
				
			     likes=likes+1;	
			     console.log("no of likes:"+likes);
			     $rootScope.likes=likes;
			     console.log("root scope likes:"+$rootScope.likes);
			}
		        console.log("scope like:"+$scope.likes);
			 $http.get("http://localhost:8046/mychat/viewBlogs")
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
				 var res = $http.post('http://localhost:8046/mychat/createBlogs',dataObj);
				 $http.get("http://localhost:8046/mychat/viewUserBlogs")
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
				$http.put('http://localhost:8046/mychat/updateBlog', dataObj);
				$http.get("http://localhost:8046/mychat/viewUserBlogs")
		 	    .then(function (response) {$scope.blogs = response.data;});
			}
			$scope.deleteBlog=function(blogDataToEdit)
			{
				console.log("delete blog called");
				blog_id:$scope.blogDataToEdit.blog_id;
				console.log("blog_id:"+blogDataToEdit.blog_id);
				$http['delete']('http://localhost:8046/mychat/deleteBlog/'+blogDataToEdit.blog_Id);
				 $http.get("http://localhost:8046/mychat/viewUserBlogs")
			 	    .then(function (response) {$scope.blogs = response.data;});
			}
		});
	
GetzChat.controller("userHomeController",function($scope,$http,$rootScope)	
		{	
	console.log("in userHome controller");
	$scope.findfriends=function()
	{
	console.log(" in findfriends function");
	console.log("name in  findfriends:"+$rootScope.uname);
			 $http.get("http://localhost:8046/mychat/findFriends/"+$rootScope.uname)
			    .then(function (response) {
			    	
			    	$scope.friends = response.data;
			    	
			    	console.log("data:"+response.data);
			    
			    });}
		});
	

