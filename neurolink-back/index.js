const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const authRoutes = require('./routes/auth');
const { auth } = require('express-openid-connect');
require('dotenv').config();
const authMiddleware = require('./middleware/authMiddleware');
const jwt = require('jsonwebtoken'); 

const checkJwt = require('./authMiddleware');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'))

const User = require("./models/users")
const Post = require('./models/posts')
const Comment = require('./models/comments')

const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET

countries = ["Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo, Democratic Republic of the",
        "Congo, Republic of the",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic (Czechia)",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe"]

categories = ["Food", "Traditions", "Travel", "Festivals"]

mongoose.connect('mongodb://127.0.0.1:27017/CultureLink')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!")
        console.log(err)
    })

app.use('/api/auth', authRoutes);

app.get('/', async (req, res) => {
    res.render('users/register')
})

app.get('/register', async (req, res) => {
    res.render('users/register', { countries })
})

app.get('/login', async (req, res) => {
    res.render('users/login')
})


app.post('/register', async (req, res) => {
    const { username, email, password, country } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists.' });

        const user = new User({ username, email, password, country });
        await user.save();

        res.render('/login')
    } catch (error) {
        res.status(500).json({ message: 'Error registering user.' });
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
        });
        console.log(token)

      return res.render('main/landing')
    } catch (error) {
        console.error("Error generating token:", error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

app.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile.' });
    }
});
  
  // Logout Route
app.post('/logout', (req, res) => {
    //res.clearCookie('token');
    return res.render('/login')
});

app.get('/posts', async (req, res) => {
    const { category } = req.query;

    if (category) {
        const posts = await Post.find({ category })
        return res.render('posts/index', { posts, category })
    } else {
        const posts = await Post.find({})
        return res.render('posts/index', { posts, category: 'All'})
    }
    const posts = await Post.find({})
    res.render('posts/index', { posts, category })
})

app.get('/posts/new', async (req, res) => {
    const posts = await Post.find({})
    res.render('posts/new', { categories })
})

app.post('/posts', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.redirect(`/posts/${newPost._id}`)
})

app.get('/posts/:id/edit', async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    const posts = await Post.findById({});
    res.render('posts/edit', { post, categories })
})

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    console.log(post);
    res.render('posts/show', { post })
})

app.put('/posts/:id', async(req, res) => {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/post/${post._id}`)
}) 

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id)
    res.redirect('/posts')
})

app.get('/comments', async (req, res) => {
    try{
        const comments = await Comment.find()
        res.render("comments/index", {comments})
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/comments/new', async (req, res) => {
    const comments = await Comment.find({})
    res.render('comments/new')
})

app.post('/comments', async (req, res) => {
    const newComment = new Comment(req.body);
    await newComment.save();
    const user = await User.findById(newComment.user_id);
    const post = await Post.findById(newComment.post_id)
    res.redirect(`/comments/${newComment._id}`, {user, post})
})

app.get('/comments/:id/edit', async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    const comments = await Comment.find({})
    res.render('comments/edit', { comment })
})

app.get('/comments/:id', async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    const post = await Post.findById(comment.post_id)
    console.log(comment);
    res.render('comments/show', { comment, post })
})

app.put('/comments/:id', async(req, res) => {
    const { id } = req.params;
    const comment = await Comment.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/comments/${comment._id}`)
}) 

app.delete('/comments/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Comment.findByIdAndDelete(id)
    res.redirect('/comments')
})

app.get('/landing', async (req, res) => {
    res.render('main/landing')
})

app.get('/dashboard', async (req, res) => {
    res.render('users/dashboard')
})

app.get('/explore', async (req, res) => {
    res.render('culture/explore')
})

app.get('/module', async (req, res) => {
    res.render('module/details')
})

app.get('/community', async (req, res) => {
    res.render('community/index')
}) 

app.get('/profiles', async (req, res) => {
    res.render('profile/index')
}) 

app.get('/achievement', async (req, res) => {
    res.render('achievement/index')
})

app.get('/notification', async (req, res) => {
    res.render('notification/index')
})

app.get('/settings', async (req, res) => {
    res.render('settings/index')
})

app.listen(9000, () => {
    console.log("APP IS LISTENING ON PORT 3000")
})