<?php

// Include User and Password variables
include("user.php");

$link = mysql_connect('localhost', $user, $pass)
        or die('Could not connect: ' . mysql_error());

mysql_select_db('jenlowew_heart') or die('Could not select database');


// Formulate Query
// This is the best way to perform an SQL query
// For more examples, see mysql_real_escape_string()
//"SELECT `heartratesbymin` FROM `testheartrate` WHERE day = \'2014-03-04\'";
$query = sprintf("SELECT * FROM avgheartdaily");

// Perform Query
$result = mysql_query($query) or die('Query failed: ' . mysql_error());

// Check result
// This shows the actual query sent to MySQL, and the error. Useful for debugging.
if (!$result) {
    $message  = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $query;
    die($message);
}

// Use result
// Attempting to print $result won't allow access to information in the resource
// One of the mysql result functions must be used
// See also mysql_result(), mysql_fetch_array(), mysql_fetch_row(), etc.
while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    echo $row['day'] . ',' . $row['daynum'] . ',' , $row['avgheart'];
    echo "\n";
}

// Free the resources associated with the result set
// This is done automatically at the end of the script
mysql_free_result($result);

// Closing connection
mysql_close($link);

?>