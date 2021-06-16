<?php  

// to client
	$c_to = $new_email;
	$c_subject = "Web + Design";
	$c_body = "<html><head></head><body>"
		."<img src='https://www.malikdunston.com/logo.jpg' alt='' /><br><br>"
		.$new_firstname.", <br><br>"
		."Thanks for reaching out. <br><br>"
		."Please verify your credentials and needs entered just now. <br><br>"
		."Name : ".$new_firstname." ".$new_lastname."<br>"
		."Phone: ".$new_phone."<br>"
		."Your Needs: '".$new_needs."'<br><br><br>"
		."I will reach out to you soon.<br>"
		."Best,<br><br>"
		."Malik Dunston"
		."</body></html>";
	mail ($c_to, $c_subject, $c_body, $headers);

// to me!!!!!!!!!.
	$to = "malik.dunston.1024@gmail.com";
	$subject = "New Client: $new_firstname $new_lastname";
	$body = "
		FirstName: $new_firstname<br>
		LastName:$new_lastname<br>
		Phone: $new_phone<br>
		Email: $new_email<br>
		Resume?: $new_resume<br>
		Needs: $new_needs";
	mail ($to, $subject, $body, $headers);

// insert
	$sql = 
		"INSERT INTO clients_site (
			name_first, 
			name_last, 
			phone, 
			email, 
			resume_req, 
			needs)
		VALUES (
			'$new_firstname', 
			'$new_lastname', 
			'$new_phone', 
			'$new_email', 
			'$new_resume', 
			'$new_needs')";
	if(!mysqli_query($connect, $sql)){  
		error_log("Failed to update database".mysqli_error($connect), 3, "error_log.txt") ;
	} 
	mysqli_close($connect);

?>