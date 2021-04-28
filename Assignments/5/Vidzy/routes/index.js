var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

*/

var monk = require('monk');
var db = monk('localhost:27017/vidzy');

router.get('/', function (req, res, next) {
	res.redirect('/videos');
});

router.get('/videos/new', function (req, res) {
	res.render('new');
});


router.get('/videos/:id', function (req, res) {
	var collection = db.get('videos');
	collection.findOne({
		_id: req.params.id
	}, function (err, video) {
		if (err) throw err;
		res.render('show', {
			video: video
		});
	});
});



router.post('/videos', function (req, res) {
	var collection = db.get('videos');
	collection.insert({
			title: req.body.title,
			genre: req.body.genre,
			image: req.body.image,
			description: req.body.desc
		},
		function (err, video) {
			if (err) throw err;
			res.redirect('/videos');
		});
});

router.get('/videos/:id/edit', function (req, res) {
	var collection = db.get('videos');
	collection.findOne({
		_id: req.params.id
	}, function (err, video) {
		if (err) throw err;
		//res.json(video);
		res.render('edit', {
			video: video
		});
	});
});

router.put('/videos/:id', function (req, res) {
	var collection = db.get('videos');
	collection.update({
		_id: req.params.id
	}, {
		$set: {
			title: req.body.title,
			genre: req.body.genre,
			image: req.body.image,
			description: req.body.desc
		}
	}, function (err, video) {
		if (err) throw err;
		//res.json(video);
		res.redirect('/videos');
	});
});


router.get('/videos', function (req, res) {
	var collection = db.get('videos');
	var queryFilter = {};
	if (req.query.search && req.body.search !== "") {
		queryFilter.title = {
			'$regex': req.query.search,
			'$options': 'i'
		};
	}
	if (req.query.genre && req.query.genre !== "All") {
		queryFilter.genre = req.query.genre;
	}
	collection.find(queryFilter, function (err, videos) {
		if (err) throw err;
		res.render('index', {
			videos: videos
		});
	});
});




router.delete('/videos/:id', function (req, res) {
	var collection = db.get('videos');
	collection.remove({
			_id: req.params.id
		},
		function (err, video) {
			if (err) throw err;
			res.redirect('/videos');
		});
});

module.exports = router;