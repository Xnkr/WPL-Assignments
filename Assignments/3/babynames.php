<?php
	$conn = new mysqli("localhost","root","root","SSA");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $all = "All";
    $both = "Both";
    if ($_SERVER ['REQUEST_METHOD']	== 'POST'){
        if (isset($_POST['year'])) {
            $year = $_POST['year'];
        } else {
            $year = $all;
        }
        if (isset($_POST['gender'])){
            $gender = $_POST['gender'];
        } else {
            $gender = $both;
        }
        
        if ($year == $all && $gender == $both){    
            $sql = "SELECT * FROM BabyNames ORDER BY year,gender,ranking";
        }elseif ($year == $all && $gender != $both) {
            $sql = "SELECT * FROM BabyNames WHERE gender = '$gender' ORDER BY year,ranking"; 
        }elseif ($gender == $both && $year != $all) {
            $sql = "SELECT * FROM BabyNames WHERE year = '$year' ORDER BY gender,ranking";
        }else   {
            $sql = "SELECT * FROM BabyNames WHERE year = '$year' AND gender = '$gender' ORDER BY ranking"; 
        }
        $query_result = $conn->query($sql);
        
        if ($query_result->num_rows > 0) {
            echo "<table class='table'><tr><th>"."Name"."</th>"."<th>"."Year"."</th>"."<th>"."Ranking"."</th>".
                "<th>"."Gender"."</th></tr>";
            while($row = $query_result->fetch_assoc()) {
                echo "<tr><td>".$row['name']."</td>"."<td>".$row['year']."</td>"."<td>".$row['ranking']."</td>"."<td>".$row['gender']."</td></tr>";       
            }
            echo "</table>";
        }
        mysqli_close($conn);
        exit();
    }
?>