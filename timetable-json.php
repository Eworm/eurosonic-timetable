<?php

    $day = intval($_GET['day']);
    // header
    echo file_get_contents('http://festival.eurosonic-noorderslag.nl/?eID=noorderslag_data_json&action=schedule&day=' . $day . '&lang=NL');

?>