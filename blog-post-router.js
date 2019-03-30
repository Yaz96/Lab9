const express = require('express');
//const uuid = require('uuid');
const router = express.Router();
const {Listposts} = require('./blog-post-model');

router.get('/blog-posts', ( req,res, next) => { // /list-sports

	let infoOfAllSports = Listposts.get();
	let err = new Error(`Internal server error.` )
	err.statusCode = 500;
	if ( infoOfAllSports ){
		res.status(200).json({
			message : "Successfully sent the list of posts",
			status : 200,
			sports : infoOfAllSports
		});
	}
	else{
		res.status(500).json({
			message: "Internal Server Error",
			status : 500
		});
		next("Status Error: " + err.statusCode);
		return next(err);
	}
});


router.get('/blog-posts/:author', (req, res, next) =>{
	
	let blogAuthor = req.params.author;
	let errNoauth = new Error(`No author in parameters.` )
	errNoauth.statusCode = 406;

	let errNotFound = new Error(`Author Not found in the list.` )
	errNotFound.statusCode = 406;

	if(!blogAuthor){
		next(errNoauth);
	}
	

	let infoOfAllpost = Listposts.getauth(blogAuthor);

	if( infoOfAllpost.length != 0){
		res.status(200).json({
			message : "Succesfully sent the post of determined author",
			status : 200,
			post : infoOfAllpost
		});
	}
	else{
	//error status
	res.status(406).json({
		message: "Author Not found in the list",
		status : 406
	});
	next("Status Error: " + errNotFound.statusCode);
	return next(errNotFound);

	 }
});


router.post('/blog-posts', (req,res,next) => {
	let requiredFields = ['title', 'content','author','publishDate'];
	
	let post = req.body;

	

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			let errField = new Error(`Missing field ${currentField} in body.` )
			errField.statusCode = 406;
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
				next("Status Error: " + errField.statusCode);
			 return next(errField); // it sends the error to the terminal
		}
	}
	post = Listposts.post(post);

	res.status(201).json({
		message : "Successfully added new post",
		status : 201,
		post
	})
}); 

router.delete('/blog-posts/:id', (req,res,next) => {

	let bodyId = req.body.id
	let paramsId = req.params.id;
	
	let errMissingField = new Error(`Missing field Id in body or path, or it doesn't match.` )
	errMissingField.statusCode = 406;

	let errIDnotFound = new Error(`Id not found` );
	errIDnotFound.statusCode = 404;

  if( !paramsId  ||  !bodyId || bodyId != paramsId  ){
    res.status(406).json({
      message : "Missing field Id in body or path, or it doesn't match",
      status : 406
		});
		next("Status Error: " + errMissingField.statusCode);
		return next(errMissingField);

  }


	if( Listposts.delete(bodyId) ){
  	res.status(204).json({
		});
	}
	else{

    res.status(404).json({
      message : "Id not found.",
      status : 404
		});
		next("Status Error: " + errIDnotFound.statusCode);
		return next(errIDnotFound);
}
}); 

router.put('/blog-posts/:id', (req,res, next) => {
	let requiredFields = ['title', 'content',"author",'publishDate'];
	let body = req.body
	let paramsId = req.params.id;

	let errIdNotFound = new Error("Id not Found");
	errIdNotFound.statusCode = 406;
	let errMissingId = new Error("Missing Id in Params");
	errMissingId.statusCode = 406;

	let errMissingBod = new Error('Missing Body');
	errMissingBod.statusCode = 404;

	if ( !body.author && !body.title && !body.content && !body.publishDate ){
		res.status(404).json({
			message : "Missing Body",
			status : 404
			});
			next("Status Error: " + errMissingBod.statusCode);
			return next(errMissingBod);
	}

  if( !paramsId ){
    res.status(406).json({ 
      message : "Missing field Id",
      status : 406
		});
		next("Status Error: " + errMissingId.statusCode);
		return next(errMissingId);
  }

  let aux =  Listposts.put(body,paramsId);
if(aux ){
  res.status(200).json({
	message : "Succesfully Updated",
	status : 200,
	updatedpost: aux
	}).send("Finish");
}
else{
	res.status(406).json({
		message : "Unsuccesfully Updated, ID not found",
		status : 406
		});
		next("Status Error: " + errIdNotFound.statusCode);
		return next(errIdNotFound);

}

}); 




module.exports = router;
