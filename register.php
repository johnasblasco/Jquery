<?php
// Get form data
$email = $_POST['email'];
$username = $_POST['username'];
$password = $_POST['password'];

// Construct XML data
$userData = '<user>
    <email>' . htmlspecialchars($email) . '</email>
    <username>' . htmlspecialchars($username) . '</username>
    <password>' . htmlspecialchars($password) . '</password>
    <gamesPlayed>0</gamesPlayed>
    <score>0</score>
</user>';

// Read existing XML file
$file = 'data.xml';
$xml = simplexml_load_file($file);

// Append new user data to XML
$newUser = new SimpleXMLElement($userData);
$users = $xml->addChild('user');
addChild($users, $newUser);

// Save updated XML file
$xml->asXML($file);

// Respond to AJAX request
header('Content-Type: application/json');
echo json_encode(['success' => true]);

// Function to add child to SimpleXMLElement recursively
function addChild(&$to, &$from) {
    $toDom = dom_import_simplexml($to);
    $fromDom = dom_import_simplexml($from);
    $toDom->appendChild($toDom->ownerDocument->importNode($fromDom, true));
}
?>
