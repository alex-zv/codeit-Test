<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Форма</title>
	<meta name="viewport" content="width=device-width" />
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="js/plugins/Chart.min.js"></script>
	<script src="js/plugins/owl.carousel.min.js"></script>
	<script src="js/plugins/jquery.validate.min.js"></script>

	<script src="js/scripts.js"></script>
</head>
<body>
	<div class="wrapper">
		<div class="formWrap">
			<h2>Sign Up</h2>
			<form action="#" method="POST" id="formReg">

				<div class="inputWrap">
					<input type="text" name="name" placeholder="Username" required />
					<div class="inputIcon"><img src="img/username_ico.png" alt=""></div>
				</div>
				<div class="inputWrap">
					<input type="text" name="secondname" placeholder="Secondname" required />
					<div class="inputIcon"><img src="img/username_ico.png" alt=""></div>
				</div>
				<div class="inputWrap">
					<input type="email" name="email" placeholder="Email" required />
					<div class="inputIcon"><img src="img/email_ico.png" alt=""></div>
				</div>
				<div class="inputWrap">
					<select name="gender" id="gender" required>
						<option value="default">Select gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div>
				<div class="inputWrap">
					<input type="password" name="pass" placeholder="Password" required />
					<div class="inputIcon"><img src="img/pass_ico.png" alt=""></div>
				</div>
				<div class="inputWrap">
					<label>
						Conditions of Agreement<input type="checkbox" name="aggrement" required />
					</label>
				</div>
				<div class="inputWrap submitBtn">
					<input type="submit" value="Send" />
				</div>
				
				
				
				
				

				
			</form>
		</div>
	</div>
</body>
</html>