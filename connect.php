<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $dob = $_POST['dob'];


    // Database Connection

    $conn = new mysqli('localhost','root','','formdata');
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);

    }
    else{
        $stmt = $conn->prepare("insert into form(name, email, number, dob)values(?, ?, ?, ?)");
        $stmt->bind_param("ssis", $name, $email, $number, $dob);
        $stmt->execute();
        echo"Thanks!";
        $stmt->close();
        $conn->close();
    }
