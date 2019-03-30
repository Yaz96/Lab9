 const uuid = require('uuid');

let posts = [ // sportsDB
					{
						id: uuid.v4(),
						title: 'The Beatles',
						content: 'The Beatles fue una banda de rock inglesa activa...',
						author: 'Clemente',
						publishDate: '24-Mar-2019'
					},
					{
						id: uuid.v4(),
						title: `The Who`,
						content: 'The Who es una banda británica de rock considerada un icono de la música del siglo XX...',
						author: 'Clemente',
						publishDate: '24-Mar-2019'
					},
					{
						id: uuid.v4(),
					title: `Tool`,
					content: 'Tool es una banda estadounidense de metal progresivo surgida en 1990 en Los Ángeles, California...',
					author: 'Clemente',
					publishDate: '24-Mar-2019'
					},
					{

					id: uuid.v4(),
					title: 'alt-j',
					content: 'Alt J es una banda inglesa de indie rock, formada en el año 2007. Su álbum debut An Awesome Wave, lanzado en mayo de 2012...',
					author: 'Carlos',
					publishDate: '24-Mar-2019'

					}
				];


const Listposts = {  //ListSports
	get : function(){
		return posts;
	},
	getauth : function(author){
		let AthorPosts = [];
		let blogAuthor= author;
		posts.forEach(item => {
			if(item.author == blogAuthor){
				AthorPosts.push(item);
			}
			
		});
		return AthorPosts;

	},

	post : function(post){
		post['id'] = uuid.v4();
		posts.push(post);
		return post;
	},
	delete: function(bodyId){
		let flag = false;
		for(let i=0; i<posts.length; i++) {
			if (posts[i].id === bodyId){
			posts.splice(i, 1);
			flag = true;
			}
		  }
		  return flag;
	},

	put: function(body,paramsId){

		let postaux = [];
		let i=0;
		let auxflag = true;
  while ( auxflag ) {
	if (i==posts.length){
		return false;
		}
	
    if (posts[i].id === paramsId){
		if ("title" in body ){
			posts[i].title =  body.title;
		}
		if ("content" in body ){
			posts[i].content =  body.content;
		}
		if ("author" in body ){
			posts[i].author =  body.author;
		}
		if ("publishDate" in body ){
			posts[i].publishDate =  body.publishDate;
		}
		
		return posts[i];
	}
	
		i++;
  	}

}

}




module.exports = {Listposts};





