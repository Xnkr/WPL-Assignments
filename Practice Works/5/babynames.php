<!DOCTYPE html>
<html>

<head>
    <title>Baby names</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
</head>

<body>
    <div class="container">
    <form action="babynames.php" method="post">
        <div class="form-row align-items-center">
    <div class="col-sm-3">
      <label for="year">Year: </label>
      <select id="year" name="Year">
                        <option value="All">All Years</option>
                        <option value="2005">2005</option>
                        <option value="2006">2006</option>
                        <option value="2007">2007</option>
                        <option value="2008">2008</option>
                        <option value="2009">2009</option>
                        <option value="2010">2010</option>
                        <option value="2011">2011</option>
                        <option value="2012">2012</option>
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                    </select>
    </div>
    <div class="col-sm-3">
      <div class="input-group">
        <label for="gender">Gender: </label>
        <select id="gender" name="Gender">
                        <option value="Both">Both</option>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                    </select>
      </div>
    </div>
    <div class="col-auto my-1">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
  <br/>
  <br/>
       
    </form>
    <?php
$conn = new mysqli("localhost","root","root","SSA");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$all = "All";
$both = "Both";

if (!isset($_POST['Year']) || !isset($_POST['Gender'])) {
    exit(0);
}

$year = $_POST['Year'];
$gender = $_POST['Gender'];

if ($year == $all && $gender == $both)   
{    
    $sql = "SELECT * FROM BabyNames ORDER BY year,gender,ranking";
}
elseif ($year == $all && $gender != $both) 
{
    $sql = "SELECT * FROM BabyNames WHERE gender = '$gender' ORDER BY year,ranking"; 
}
elseif ($gender == $both && $year != $all) 
{
    $sql = "SELECT * FROM BabyNames WHERE year = '$year' ORDER BY gender,ranking";
}
else   
{
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
?>  
</div>
<script type="text/javascript">
document.getElementById('year').value = "<?php echo $year; ?>";
document.getElementById('gender').value = "<?php echo $gender;?>";  
</script>
</body>
</html>