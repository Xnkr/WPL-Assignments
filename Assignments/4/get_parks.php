<?php
$conn = new mysqli("localhost","root","root","SSA");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM markers";
$query_result = $conn->query($sql);
    
$results = array();
while($row = $query_result->fetch_assoc()){
   $results[] = array(
      'id' => $row['id'],
      'name' => $row['name'],
      'address' => $row['address'],
      'lat' => $row['lat'],
      'lng' => $row['lng'],
      'type' => $row['type']
   );
}
$json = json_encode($results);
echo $json;
?>
