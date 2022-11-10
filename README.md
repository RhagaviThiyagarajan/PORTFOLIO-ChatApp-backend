# ChatApp-frontEnd-MERN

Netlify-MERN-https://chatapp-mern-portfolio.netlify.app/

Heroku-heroku-https://chatappnodeheroku.herokuapp.com/

backend-https://github.com/RhagaviThiyagarajan/PORTFOLIO-ChatApp-backend.git







Chat app

Packages used in backend
•	regex
•	Chakra ui
•	Cors
•	Dotenv
•	Mongoose
•	Cloudinary
•	bcrypt
•	https://lottiefiles.com/- chose an animation copy the json code and paste in a separate new file typing.json

packages used in frontend
•	packages used
•	chakra ui icons
•	chakra ui react
•	axios
•	framer motion
•	react-chips
•	react-lottie
•	socket-io-client


features

•	login
•	logout
•	signup


1.	LOGIN
•	Using useToast

•	And config files for authentication
•	Submit handler is used in onclick

•	After loggimg in 
•	The details are set in localstorage
•	localStorage.setItem("userInfo", JSON.stringify(data));

•	error is handled using useToast error



signup
•	name,email,password

   res.data && window.location.replace("/login");



logout
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");





