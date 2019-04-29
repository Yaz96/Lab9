// Lab 9 
//let baseURL = "https://herokuapp.com/sportsAPI";

function displayResults(data){
	$('#listOfPosts').empty();

	for(let i = 0; i < data.posts.length; i ++){
		$('#listOfPosts').append(`<li> ${data.posts[i].title} <div> id : ${data.posts[i]._id}</div> </li>`);
	}
}
function displayResAuth(data){
	$('#listOfPosts').empty();
	$('#listOfPosts').append(`<div> Post from ${data.posts[0].author} </div>`);
	for(let i = 0; i < data.posts.length; i ++){
	$('#listOfPosts').append(`<li> ${data.posts[i].title}<div> id: ${data.posts[i]._id}</div> <div> ${data.posts[i].content}</div> <div>${data.posts[i].publishDate} </div></li>`);
}
}



function fetchBlogspot(specs){
	let url = `/post/api/blog-posts/${$('#postAuthor').val()}`; // /sports/api/list-sports
	$('#postAuthor').val('');
	if (specs){
	fetch(url)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => displayResults(responseJSON))
		.catch(err => {
			console.log(err);
		});}
		else{
			fetch(url)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => displayResAuth(responseJSON))
		.catch(err => {
			console.log(err);
		});

		}

}

function createFetchPost(postTitle,postContent,postAuthor,postPublishDate){
	let url = './post/api/blog-posts';
	let settings = {
		method : 'POST',
		headers : {
			"Content-Type" : "application/json"
		},
		body : JSON.stringify({
			title: postTitle,
			content: postContent,
			author: postAuthor,
			publishDate: postPublishDate
		})
	};

	fetch(url, settings)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				return new Promise(function(resolve, reject){
					resolve(response.json());
				})
				.then(data =>{
					throw new Error(data.message);
				})
			}
		})		
		.then(responseJSON => {
			console.log(responseJSON);
			alert("Your post was added correclty.");
		})
		.catch(err => {
			console.log(err);
		});
}
function createFetchDel(){

		let id = $('#postId').val();

	url = `/post/api/blog-posts/${id}`;
	let settings = {
		method : 'DELETE',
		headers : {
			"Content-Type" : "application/json"
		},
		body : JSON.stringify({
			_id : id
		})
	};

	fetch(url, settings)
		.then(response => {
			if(response.ok){
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => {
			alert("Your post was deleted correclty.");
		})
		.catch(err => {
			console.log(err);
		});



}

function createFetchUpdate(){
	let id = $('#postId').val();
	let data = {};
	

	if ($('#postTitle') ){
		data.title = $('#postTitle').val();
	}
	//console.log(data);
	if ($('#postContent')){
		data.content = $('#postContent').val();
	}
	if($('#postAuthor')){
		data.author = $('#postAuthor').val();
	}
	if($('#publishDate')){
		data.publishDate = $('#publishDate').val();
	}


	url = `/post/api/blog-posts/${id}`;
	let settings = {
		method : 'PUT',
		headers : {
			"Content-Type" : "application/json"
		},
		body : JSON.stringify(data)
	};
	

	fetch(url, settings)
		.then(response => {
			if(response.ok){
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => {
			alert("Your post was updated correclty.");
		})
		.catch(err => {
			console.log(err);
		});
	

}

function watchForm(){
	$('.SendButton').on('submit', function(e){
		e.preventDefault();
	
		$('#listOfPosts').empty();
		if ($('#postAuthor').val().length == 0){
			fetchBlogspot(true);
		}
		else{
			let aux = false;
			monfetchBlogspot(aux);

		}
		
	});

	$("#deleteButton").on("click", function(event){
		event.preventDefault();
		
		createFetchDel();
	});
	
	$("#updateButton").on("click", function(event){
		event.preventDefault();
	
		createFetchUpdate();
	});


	$("#sendButton").on("click", function(event){
		event.preventDefault();
		let postTitle = $('#postTitle').val();
		let postContent=	$('#postContent').val() ;
		let postAuthor = $('#postAuthor').val();
		let postPublishDate= $('#publishDate').val();
		$('#postTitle').val('');
		$('#postContent').val('') ;
		$('#postAuthor').val('');
		$('#publishDate').val('');
	
		createFetchPost(postTitle,postContent,postAuthor,postPublishDate);
	});
}

$(watchForm);
