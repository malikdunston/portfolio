<?php  

	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	error_reporting(E_ALL);
	ini_set('display_errors', 1);

// $connect = mysqli_connect("server ( + 'port:3306')", "mySQL username", "pw", "db name");
// change this to a user who only has INSERT permissions (security)
	$connect = mysqli_connect("localhost", "crdunsto_forms", "Abl3ton29LiveCecilDunston!!", "crdunsto_main");

	if( !$connect ) {// == null if creation of connection object failed 
		// report the error to the user, then exit program
		error_log("Object not created".mysqli_error($connect), 3, "error_log.txt");
	}
	if( mysqli_connect_errno() )  {// returns false if no error occurred 
		// report the error to the user, then exit program
		error_log("Connect failed: ".mysqli_connect_errno()." : ". mysqli_connect_error(), 3, "error_log.txt");
	}

	$data = json_decode(file_get_contents("php://input"));  

// json -> php
	$new_firstname = mysqli_real_escape_string($connect, $data->firstname);    
	$new_lastname = mysqli_real_escape_string($connect, $data->lastname);  
	$new_phone = mysqli_real_escape_string($connect, $data->phone);  
	$new_email = mysqli_real_escape_string($connect, $data->email);  
	$new_resume = mysqli_real_escape_string($connect, $data->resume);  
	$new_needs = mysqli_real_escape_string($connect, $data->needs);  

// headers
	$headers  = "From: Malik Dunston < hello@malikdunston.com >\n";
	$headers .= "Cc: Malik Dunston < hello@malikdunston.com >\n"; 
	$headers .= "X-Sender: Malik Dunston < hello@malikdunston.com >\n";
	$headers .= 'X-Mailer: PHP/' . phpversion();
	$headers .= "X-Priority: 1\n"; // Urgent message!
	$headers .= "Return-Path: malik.dunston.1024@gmail.com\n"; // Return path for errors
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=iso-8859-1\n";

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