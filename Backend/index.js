const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const passport= require('passport');
const session=require('express-session');
const LocalStrategy=require('passport-local').Strategy;
const crypto=require('crypto');
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
 const ExtractJwt = require("passport-jwt").ExtractJwt;
const cookieParser=require('cookie-parser');

const { createProduct } = require('./controller/Product');
const productRouter=require('./routes/Products');
const categoriesRouter=require('./routes/Category');
const brandsRouter=require('./routes/Brands');
const usersRouter=require('./routes/User');
const authRouter=require('./routes/Auth');
const cartRouter=require('./routes/Cart');
const orderRouter=require('./routes/Order');
const { User } = require('./models/User');
const { isAuth, sanitizeUser, cookieExtractor } = require('./services/common');
const port=8080;
const SECRET_KEY="SECRET_KEY";
// const token = jwt.sign({ foo: "bar" }, SECRET_KEY);


 var opts = {};
 opts.jwtFromRequest = cookieExtractor;
 opts.secretOrKey = SECRET_KEY;

//middlewares
app.use(express.static('build'));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored 
  })
);
app.use(passport.authenticate("session"));

app.use(cors({
    exposedHeaders:['X-Total-Count']
}));
app.use(express.json());
app.use('/products',isAuth(),productRouter.router);
app.use("/brands",isAuth(),  brandsRouter.router);
app.use("/categories", isAuth(), categoriesRouter.router);
app.use("/users", isAuth(), usersRouter.router);
app.use('/auth',authRouter.router);
app.use("/cart", isAuth(), cartRouter.router);
app.use("/orders", isAuth(), orderRouter.router);

//passport strategies
passport.use('local',
  new LocalStrategy(
    {usernameField:'email'},
    async function (email, password, done) {
    try {
         const user =await User.findOne({ email: email}).exec(); 
          if (!user) {
                     done(null, false, { message: "invalid credentials" });
                   } 
          crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256',async function(err, hashedPassword){
                  if(!crypto.timingSafeEqual(user.password,hashedPassword)) {
                   return done(null, false, { message: "invalid credentials" });
                  }
                  const token=jwt.sign(sanitizeUser(user),SECRET_KEY);
                    done(null,{id:user.id,role:user.role});
                   
          })

    } catch (error) {
      console.log(error);
       done(error);
    } 
     
  })
);

passport.use('jwt',
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(jwt_payload);
    try {
       const user=await User.findOne({ id: jwt_payload.sub })
       if (user) {
         return done(null, sanitizeUser(user));
       } else {
         return done(null, false);
       }
    } catch (error) {
        if (err) {
          return done(err, false);
        }
    }
  })
);

passport.serializeUser(function (user, cb) {
  console.log('serialize',user);
  process.nextTick(function () {
    return cb(null,{id:user.id,role:user.role});
  });
});

passport.deserializeUser(function (user, cb) {
   console.log("deserialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});
const stripe = require("stripe")(
  "sk_test_51OWaQoSJiXHqMzaA4bFvYfceKewRQwQJiiNTrRSTcyCUxIOw38AtCtOCKe1gIflm4nTNPFA58qR7ZS4WiRpG9t4a00hxa4n3ry"
);

app.use(express.static("public"));
app.use(express.json());



app.post("/create-payment-intent", async (req, res) => {
  console.log("req is ",req);
  const {totalAmt } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmt*100,
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


main().catch(err => console.log(err));
  async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log('database is connected');
  }



app.post('/products',createProduct);
app.listen(port,()=>
{
    console.log("server is running on port 8080");
});