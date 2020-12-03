
import { Router } from "express";
const express = require("express");


import { Connection } from "./db";
const bodyParser = require("body-parser");
//const router = new Router();
const router = express();
router.use(express.json())
var cors = require("cors");
router.use(cors());
var moment = require('moment'); // require
moment().format(); 
const FormData = require("form-data");
const fetch = require("node-fetch");
router.use(bodyParser.json({ type: "text/*" }));
router.use(bodyParser.urlencoded({ extended: false }));

//get latest 10 articles
router.get("/getlatest", function (req, res) {
  Connection
    .query("SELECT * FROM blog_article ORDER BY create_on_date limit 10")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

router.get("/getall", async (req, res) => {
  try {
   
   const result= await Connection.query("SELECT * FROM blog_article ORDER BY create_on_date ")
    res.status(200).json({
      status: "success",
      data: {
       blogs: result.rows,
       
      },
    })
    console.log(result);
    
  }
  catch (err) {
    console.log(err);
  }
})

router.get("/gettopten", async (req, res) => {
  try {
    
   const result= await Connection.query("SELECT * FROM blog_article ORDER BY create_on_date limit 10")
    res.status(200).json({
      status: "success",
      data: {
        blogs: result.rows,
      },
      
    })
    console.log(result);
  }
  catch (err) {
    console.log(err);
  }
})
//get top 10 articles
router.get("/gettop", function (req, res) {
  Connection
    .query("select ba.*, (select count(1) from blog_review br where br.article_id=ba.id) as Num_Likes from blog_article ba order by Num_likes limit 10"
)
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

router.post("/addblog", async (req, res) => {
  try {
    var d = new Date();
    let todaysDate = d.toLocaleString();
    console.log(todaysDate);
    const results =  await Connection.query("Insert into blog_article(title,sub_title,main_content,create_on_date) values ($1,$2,$3,$4) returning *", [req.body.title, req.body.sub_title, req.body.main_content,todaysDate])
    console.log(results);
    res.status(201).json({
      status: "sucess",
      data: {
        blog: results.rows[0]
      }
      
    })
  }
  catch (err)
  {
    console.log(err)
  }
})



router.get("/getblog/:id", async (req, res) => {
  try {
    const result= await Connection.query(
      "select * from blog_article  where id = $1",
      [req.params.id]
    );
    const reviews = await Connection.query(
      "select * from blog_review where article_id=$1", [
        req.params.id,
      ])
    res.status(200).json({
      status: "success",
      data: {
        blog: result.rows[0],
        reviews:reviews.rows
       
      },
    });
   
  } catch (err) {
    console.log(err);
  }
});


router.put("/updateblog/:id", async (req, res) => {
  try {
    const results = await Connection.query(
      "UPDATE blog_article SET title = $1, sub_title = $2, main_content = $3 where id = $4 returning *",
      [req.body.title, req.body.sub_title, req.body.main_content, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        blogs: results.rows[0],
      },
    });
    console.log(req.body)
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});



router.delete("/deleteblog/:id", function (req, res) {
  const id = req.params.id;

  Connection
    .query("DELETE FROM blog_article WHERE id=$1", [id])
    .then(() => res.send(`Blog ${id} deleted!`))
    .catch((e) => console.error(e));
});

router.post("/getblog/:id/addReview", async (req, res) => {
  try {
    const newReview = await Connection.query(
      "INSERT INTO blog_review (user_id, github_id, no_of_likes, reviewer_name,reviewer_comment) values ($1, $2, $3, $4,$5) returning *;",
      [req.params.userId, req.body.githubId, req.body.noOfLikes, req.body.reviewerName,req.body.reviewerComment]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});


router.get("/", (_, res, next) => {
	
	Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		res.json({ message: "Hello, world!" });
	});
});






export default router;
