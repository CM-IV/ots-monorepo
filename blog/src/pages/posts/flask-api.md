---
title: "Flask API for post data."
description: "Demonstrating a Python Flask API with CRUD functionality."
pubDate: "Mon, 15 Nov 2021"
author: "CM-IV"
layout: "../../layouts/blogPost.astro"
draft: false
---

This isn't my first rodeo when it comes to REST API creation as I've made
them in the past using other programming languages like Go and JavaScript.
However, this time around I wanted to see what all the fuss was about
and check out the Python Flask web framework. This demonstration of
CRUD fuctionality will be quick and dirty, and all of the code will
be contained within one Python file. Within a production environment,
you'd want to implement physical information hiding wherever possible
to have separation of concerns and extend the APIs longevity.
In order to follow along, I'm assuming that you already have [Python3](https://www.python.org/downloads/)
and [pip3](https://pip.pypa.io/en/stable/installation/) installed on your system.
Using the `pipenv` command, you need to create a Pipfile to hold and list your project dependencies.
Do this by running `pipenv install` in your main
project directory. Next, you need to create a virtual environment
for your development work by running `pipenv shell` in the terminal.
This will create for you the virtual environment that you need to begin and
it can be deactivated by using the `exit` command.

Your generated Pipfile will be within the root directory of the project
and the file should look like this after everything is installed:

```txt
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
flask-sqlalchemy = "*"
flask-marshmallow = "*"
marshmallow-sqlalchemy = "*"
flask = "*"

[dev-packages]

[requires]
python_version = "3.8"
```

As you can see, we will be installing some extra packages to help us work with the Sqlite
database. In order to install these packages, the command

```
pip3 install flask flask-sqlalchemy flask-marshmallow marshmallow-sqlalchemy
```

should be run in the terminal. After that is done, you should be all set.

Starting off within the Python file that houses our API, we want to import all of
the packages needed for flask as well as the Sqlalchemy and Marshmallow dependencies.

```
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import date
import os


app = Flask(__name__)
dbDir = os.path.abspath(os.path.dirname(__file__))

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(dbDir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#Init db
db = SQLAlchemy(app)

# Init marshmallow
ma = Marshmallow(app)
```

Notice the `import os` module is brought in to help us deal with
file paths in order to find the Sqlite database file.
Just below that we also set the database URI string
as the Sqlite file that will be generated later after the
classes (sql tables) are made with sqlalchemy.
Sqlalchemy and Marshmallow are initialize with the app
object that we instantiated earlier as well.
The first Post class is the database model for our table.

```
# Post class/model
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    description = db.Column(db.String(200))
    publishDate = db.Column(db.TIMESTAMP, default=date.today())
    author = db.Column(db.String(50))
    alt = db.Column(db.String(50))

    def __init__(self, title, description, author, alt):
        self.title = title
        self.description = description
        self.author = author
        self.alt = alt
```

The id is an incrementing integer number that increases by one when a new
post is added to the database. The title, description, publishDate, author, and alt
will all be displayed to the end user so we will leave out the id number in the initialization because of this.
The publishDate is actually a timestamp taken from the Python datetime module, this made it simple to
get the current time for each post on creation. The init function of the class
initializes each of the properties for `self`, which is similar to
`this` in other programming languages.

Next up is the PostSchema class which uses Marshmallow
for serializing our post data. The Meta subclass has each
of the data fields defined. The PostSchema class is then
assigned to a variable post_schema to be used later, the same
thing goes for PostSchema with multiple posts.

Finally we have the routes that will be used to query
the API. We have Get, Get all, Put, Delete, and Post
methods which means full CRUD functionality is available.

```
# Create a post
@app.route('/post', methods=['POST'])
def add_Post():
    title = request.json['title']
    description = request.json['description']
    author = request.json['author']
    alt = request.json['alt']

    new_post = Post(title, description, author, alt)

    db.session.add(new_post)
    db.session.commit()

    return post_schema.jsonify(new_post)


# Fetch all posts
@app.route('/post', methods=['GET'])
def get_posts():
    all_posts = Post.query.all()
    result = posts_schema.dump(all_posts)
    return jsonify(result)

# Fetch one post
@app.route('/post/<id>', methods=['GET'])
def get_post(id):
    post = Post.query.get(id)
    return post_schema.jsonify(post)

# Update a post
@app.route('/post/<id>', methods=['PUT'])
def update_Post(id):
    post = Post.query.get(id)

    title = request.json['title']
    description = request.json['description']
    author = request.json['author']
    alt = request.json['alt']

    post.title = title
    post.description = description
    post.author = author
    post.alt = alt

    db.session.commit()

    return post_schema.jsonify(post)

# Delete a post
@app.route('/post/<id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()

    return post_schema.jsonify(post)


# Run server
if __name__ == '__main__':
    app.run(debug=True)
```

The two GET requests are similar toeach other, but one only fetches the
posts by their ID while the other fetches all of the posts. The GET all
posts route queries for all posts, then dumps the result into our defined
schema and returns JSON data.

The POST route instantiates a new Post instance so that
the defined variables can be added to the database. The database
has to commit the change before the data can be updated or added.

The DELETE route first queries the post by ID like in the previous GET
request, and then in a database session deletes the post as the changes are
committed to the database.

Here is the entire Python API file:

```
from logging import debug
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import date
import os


app = Flask(__name__)
dbDir = os.path.abspath(os.path.dirname(__file__))

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(dbDir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#Init db
db = SQLAlchemy(app)

# Init marshmallow
ma = Marshmallow(app)

# Post class/model
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    description = db.Column(db.String(200))
    publishDate = db.Column(db.TIMESTAMP, default=date.today())
    author = db.Column(db.String(50))
    alt = db.Column(db.String(50))

    def __init__(self, title, description, author, alt):
        self.title = title
        self.description = description
        self.author = author
        self.alt = alt

# Post schema
class PostSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'description', 'publishDate', 'author', 'alt')

# Init schema
post_schema = PostSchema()
posts_schema = PostSchema(many=True)


# Create a post
@app.route('/post', methods=['POST'])
def add_Post():
    title = request.json['title']
    description = request.json['description']
    author = request.json['author']
    alt = request.json['alt']

    new_post = Post(title, description, author, alt)

    db.session.add(new_post)
    db.session.commit()

    return post_schema.jsonify(new_post)


# Fetch all posts
@app.route('/post', methods=['GET'])
def get_posts():
    all_posts = Post.query.all()
    result = posts_schema.dump(all_posts)
    return jsonify(result)

# Fetch one post
@app.route('/post/<id>', methods=['GET'])
def get_post(id):
    post = Post.query.get(id)
    return post_schema.jsonify(post)

# Update a post
@app.route('/post/<id>', methods=['PUT'])
def update_Post(id):
    post = Post.query.get(id)

    title = request.json['title']
    description = request.json['description']
    author = request.json['author']
    alt = request.json['alt']

    post.title = title
    post.description = description
    post.author = author
    post.alt = alt

    db.session.commit()

    return post_schema.jsonify(post)

# Delete a post
@app.route('/post/<id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()

    return post_schema.jsonify(post)


# Run server
if __name__ == '__main__':
    app.run(debug=True)
```
