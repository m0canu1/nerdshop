<?php
  /**
   *
   * Get username's id
   *
   * @param username
   * @return id
   *
   */

  function getUserId($username) {
    require '../dbconnect.php';
    $user = $db->quote($username);
    $rows_user = $db->query("SELECT id FROM user WHERE username = $user");
    $db = null;
    if ($rows_user) {
      foreach($rows_user as $row)
        return $row['id'];
    }
  }
?>
